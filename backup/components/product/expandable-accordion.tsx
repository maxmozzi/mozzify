"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccordionProps {
    title: string;
    children: React.ReactNode;
}

export default function ExpandableAccordion({ title, children }: AccordionProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={{ borderTop: '1px solid #eee' }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1.2rem 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    textAlign: 'left',
                    color: 'white' // User explicitly asked for white title. 
                    // detailed re-read: "ponme el titulo en blanco" -> Put title in white.
                    // "porque no se ve la letra porque esta en negro" -> because letter is not seen because it is in black.
                    // "y el texto esta blanco" -> and the text is white.
                    // IF I put it in white, it will be visible? implies background is dark.
                    // BUT previous instructions were "Black/White base".
                    // I will check ProductInfo css.
                }}
            >
                {title}
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div style={{ paddingBottom: '1.5rem', color: '#555', fontSize: '0.9rem', lineHeight: '1.6' }}>
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
