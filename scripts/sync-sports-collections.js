const fs = require('fs');
const path = require('path');

// --- CONFIGURATION ---
const CONFIG = {
    SPORTS_TAGS: {
        football: ['football', 'soccer', 'cleats'],
        basketball: ['basketball', 'nba', 'jordan'],
        running: ['running', 'jogging', 'marathon'],
        gym: ['gym', 'training', 'workout', 'fitness', 'crossfit']
    },
    // In a real app, strict mode might reject tags not in this list
    ALLOWED_SPORTS_TAGS: ['football', 'basketball', 'running', 'gym'],
    MAX_RETRIES: 3,
    INITIAL_BACKOFF_MS: 1000,
    LOG_FILE: path.join(__dirname, 'sports-sync.log')
};

// --- MOCK SHOPIFY API ---
const shopify = {
    product: {
        update: async (id, data) => {
            // Simulate random network failure
            if (Math.random() < 0.1) {
                throw new Error('Simulated Network Error');
            }
            console.log(`[Shopify Mock] API Update Success for Product ${id}:`, JSON.stringify(data));
            return { id, ...data };
        }
    }
};

// --- UTILS ---

/**
 * Normalizes a tag: lowercase, trim, remove extra spaces.
 */
function normalizeTag(tag) {
    if (!tag) return '';
    return tag.toLowerCase().trim().replace(/\s+/g, ' ');
}

/**
 * Sleep helper for backoff
 */
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Update Product with Retry Logic (Exponential Backoff)
 */
async function updateProductWithRetry(productId, data, attempt = 1) {
    try {
        await shopify.product.update(productId, data);
        return { status: 'ok', attempt };
    } catch (error) {
        if (attempt >= CONFIG.MAX_RETRIES) {
            console.error(`[Error] Failed to update product ${productId} after ${CONFIG.MAX_RETRIES} attempts.`);
            return { status: 'error', error: error.message };
        }

        const delay = CONFIG.INITIAL_BACKOFF_MS * Math.pow(2, attempt - 1);
        console.warn(`[Retry] Attempt ${attempt} failed for product ${productId}. Retrying in ${delay}ms...`);
        await wait(delay);
        return updateProductWithRetry(productId, data, attempt + 1);
    }
}

/**
 * Log action to file and console
 */
function logAction(entry) {
    const logLine = JSON.stringify(entry);
    console.log(`[LOG] ${entry.status.toUpperCase()} - Product ${entry.product_handle}: ${entry.message || 'Updated'}`);
    fs.appendFileSync(CONFIG.LOG_FILE, logLine + '\n');
}

// --- CORE LOGIC ---

/**
 * Core function to process a single product.
 * Returns the result of the operation.
 */
async function processProduct(product, triggerType) {
    const originalTags = Array.isArray(product.tags) ? product.tags : product.tags.split(',').map(t => t.trim());
    const normalizedOriginalTags = originalTags.map(normalizeTag);
    let finalTags = [...new Set(normalizedOriginalTags)]; // Deduplicate
    let hasChanges = false;
    let addedCollections = [];

    // 1. Identification & Assignment
    // Check keywords in existing tags to assign "Official" Sports Tags
    // NOTE: The requirements say if it has 'football' -> add to Sports > Football.
    // It also implies we might want to auto-tag based on keywords, OR just validate existing.
    // "Si el producto tiene football -> añadir a Sports > Football" implies the tag acts as the trigger for the collection.
    // But "Tags no reconocidos... No crear subcolecciones automáticamente" implies we strictly filter.

    // Let's assume this script is responsible for ensuring data consistency:
    // If a product has "soccer", ensure it has "football".

    // Map of recognized keys (football) to their keywords (soccer, cleats)
    Object.entries(CONFIG.SPORTS_TAGS).forEach(([sportKey, keywords]) => {
        // Did we find any keyword in the product's tags?
        const match = finalTags.some(t => keywords.some(k => t.includes(k)));

        if (match) {
            // Ensure the canonical tag exists
            if (!finalTags.includes(sportKey)) {
                finalTags.push(sportKey);
                hasChanges = true;
                addedCollections.push(sportKey);
            } else {
                // It already has the tag, but we count this as "belonging" to the collection
                // For logging purposes we might want to know it belongs.
            }
        }
    });

    // 2. Cleaning/Validation?
    // "Tags no reconocidos... Registrar en logs".
    // We don't remove tags usually unless strictly requested to clean up. 
    // "No eliminar otras asignaciones de colecciones existentes." -> OK.

    // 3. Execution
    const timestamp = new Date().toISOString();

    if (hasChanges) {
        // Perform Update
        const result = await updateProductWithRetry(product.id, { tags: finalTags.join(', ') });

        const logEntry = {
            timestamp,
            trigger: triggerType,
            product_id: product.id,
            product_handle: product.title.toLowerCase().replace(/ /g, '-'),
            category: product.category, // Added category logging
            original_tags: originalTags,
            final_tags: finalTags,
            added_collections: addedCollections,
            status: result.status,
            error: result.error
        };
        logAction(logEntry);
        return logEntry;
    } else {
        // IDEMPOTENCY Log (Optional, but good for "Backend Action" requirement to see what we found)
        const logEntry = {
            timestamp,
            trigger: triggerType,
            product_id: product.id,
            product_handle: product.title.toLowerCase().replace(/ /g, '-'),
            category: product.category, // Added category logging
            final_tags: finalTags,
            status: 'skipped'
        };
        // logAction(logEntry); // Uncomment for verbose logs
        return logEntry;
    }
}

// --- TRIGGERS SIMULATION ---

async function runDailyCron() {
    console.log('--- STARTING DAILY CRON RECONCILIATION ---');

    // Mock Data Source
    const mockProducts = [
        { id: 101, title: "Pro Soccer Cleats", tags: "shoes, new, soccer", category: "Shoes" }, // Should add 'football'
        { id: 102, title: "Elite Basketball Jersey", tags: "clothing, jersey, basketball", category: "Clothing" }, // No change
        { id: 103, title: "Running Shorts", tags: "shorts, run", category: "Clothing" }, // Should add 'running'
        { id: 104, title: "Gym Towel", tags: "accessory, crossfit", category: "Accessories" }, // Should add 'gym'
        { id: 105, title: "Casual T-Shirt", tags: "casual, cotton", category: "Clothing" }, // No sports tags
        { id: 106, title: "Mixed Sport Gear", tags: "gym, football", category: "Equipment" } // Multiple existing
    ];

    const results = [];
    for (const p of mockProducts) {
        const res = await processProduct(p, 'cron_daily');
        results.push(res);
    }

    // Audit: Aggregate Categories per Sport
    const auditMap = {}; // { football: { Shoes: 1, Clothing: 2 } }

    results.forEach(res => {
        if (res.final_tags) {
            res.final_tags.forEach(tag => {
                if (CONFIG.ALLOWED_SPORTS_TAGS.includes(tag)) {
                    if (!auditMap[tag]) auditMap[tag] = {};
                    const cat = res.category || 'Uncategorized';
                    auditMap[tag][cat] = (auditMap[tag][cat] || 0) + 1;
                }
            });
        }
    });

    console.log('--- CATEGORY AUDIT PER SPORT ---');
    console.table(auditMap);

    console.log('--- CRON COMPLETE ---');
}

async function simulateProductUpdate(product) {
    console.log(`--- TRIGGER: PRODUCT UPDATE [${product.title}] ---`);
    await processProduct(product, 'webhook_product_update');
}

// --- EXECUTION ---

(async () => {
    // 1. Run Cron
    await runDailyCron();

    // 2. Simulate a Webhook Event
    await simulateProductUpdate({
        id: 999,
        title: "New Yoga Mat",
        tags: "fitness, new-arrival"
    }); // Should add 'gym'
})();
