"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import styles from './newsletter-modal.module.css';

interface NewsletterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className={styles.overlay} onClick={onClose}>
                    <motion.div
                        className={styles.modal}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className={styles.glow} />

                        <button className={styles.closeButton} onClick={onClose} aria-label="Close">
                            <X size={24} />
                        </button>

                        <div className={styles.header}>
                            <span className={styles.welcome}>Join the Movement</span>
                            <h2 className={styles.title}>
                                WELCOME TO <br />
                                <span className={styles.highlight}>THE CLUB</span>
                            </h2>
                            <p className={styles.offer}>
                                Sign up now and get <strong>10% OFF</strong> your first order.
                                Plus early access to drops and exclusive offers.
                            </p>
                        </div>

                        <form className={styles.form} onSubmit={(e) => { e.preventDefault(); onClose(); }}>
                            <input
                                type="email"
                                placeholder="YOUR EMAIL ADDRESS"
                                className={styles.inputField}
                                required
                            />
                            <button type="submit" className={styles.button}>
                                GET MY DISCOUNT
                            </button>
                        </form>

                        <p className={styles.disclaimer}>
                            By signing up, you agree to our <a href="/privacy">Privacy Policy</a> and <a href="/terms">Terms of Service</a>.
                        </p>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
