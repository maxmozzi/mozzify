"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import styles from './edit-profile-modal.module.css';

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className={styles.overlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1001 }}>
                        <motion.div
                            className={styles.modal}
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            style={{ pointerEvents: 'auto' }}
                        >
                            <div className={styles.header}>
                                <h2 className={styles.title}>Edit Profile</h2>
                                <button className={styles.closeBtn} onClick={onClose}>
                                    <X size={20} />
                                </button>
                            </div>

                            <form className={styles.form} onSubmit={(e) => { e.preventDefault(); onClose(); }}>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Full Name</label>
                                    <input type="text" className={styles.input} defaultValue="Max Mozzi" />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Email Address</label>
                                    <input type="email" className={styles.input} defaultValue="max.mozzify@example.com" />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Phone Number</label>
                                    <input type="tel" className={styles.input} defaultValue="+34 600 000 000" />
                                </div>

                                <div className={styles.actions}>
                                    <button type="button" className={styles.cancelBtn} onClick={onClose}>
                                        Cancel
                                    </button>
                                    <button type="submit" className={styles.saveBtn}>
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
