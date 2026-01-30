const fs = require('fs');
const path = require('path');

const generatedFile = path.join(__dirname, 'src/data/generated-products.ts');
const srcDir = path.join(__dirname, 'src');

if (!fs.existsSync(generatedFile)) {
    console.error('Generated file not found');
    process.exit(1);
}

const content = fs.readFileSync(generatedFile, 'utf8');
const lines = content.split('\n');
let missingCount = 0;

const errors = [];
lines.forEach((line, index) => {
    const match = line.match(/import\s+.*from\s+'@\/(.*)';/);
    if (match) {
        const relativePath = match[1];
        const fullPath = path.join(srcDir, relativePath);
        if (!fs.existsSync(fullPath)) {
            errors.push(`Line ${index + 1}: Missing file ${relativePath}`);
            missingCount++;
        }
    }
});

if (missingCount === 0) {
    fs.writeFileSync('missing_files.txt', 'All imports are valid.', 'utf8');
} else {
    fs.writeFileSync('missing_files.txt', errors.join('\n') + `\nFound ${missingCount} missing files.\n`, 'utf8');
}
