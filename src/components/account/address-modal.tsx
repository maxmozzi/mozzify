"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import styles from './address-modal.module.css';

export interface AddressData {
    id?: number;
    fullName?: string;
    address: string;
    city: string;
    zip: string;
    country: string;
    phone?: string;
    type?: string;
}

interface AddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: AddressData | null;
}

export default function AddressModal({ isOpen, onClose, initialData }: AddressModalProps) {
    const isEditing = !!initialData;
    const title = isEditing ? 'Edit Address' : 'Add New Address';

    // In a real app, we would use state here initialized with initialData
    // For visual demo, we can just use defaultValue in inputs if initialData exists

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
                                <h2 className={styles.title}>{title}</h2>
                                <button className={styles.closeBtn} onClick={onClose}>
                                    <X size={20} />
                                </button>
                            </div>

                            <form className={styles.formGrid} onSubmit={(e) => { e.preventDefault(); onClose(); }}>
                                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                                    <label className={styles.label}>Full Name</label>
                                    <input
                                        type="text"
                                        className={styles.input}
                                        defaultValue={initialData?.fullName || "Max Mozzi"}
                                        placeholder="e.g. John Doe"
                                    />
                                </div>

                                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                                    <label className={styles.label}>Address</label>
                                    <input
                                        type="text"
                                        className={styles.input}
                                        defaultValue={initialData?.address || ""}
                                        placeholder="Street address, P.O. box, etc."
                                    />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>City</label>
                                    <input
                                        type="text"
                                        className={styles.input}
                                        defaultValue={initialData?.city || ""}
                                    />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Postal Code</label>
                                    <input
                                        type="text"
                                        className={styles.input}
                                        defaultValue={initialData?.zip || ""}
                                    />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Country</label>
                                    <select className={styles.input} defaultValue={initialData?.country || "Spain"}>
                                        <option value="Spain">Spain</option>
                                        <option value="France">France</option>
                                        <option value="Germany">Germany</option>
                                        <option value="Italy">Italy</option>
                                        <option value="Portugal">Portugal</option>
                                        <option value="United States">United States</option>
                                    </select>
                                </div>

                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Phone</label>
                                    <input
                                        type="tel"
                                        className={styles.input}
                                        defaultValue={initialData?.phone || ""}
                                        placeholder="+34 000 000 000"
                                    />
                                </div>

                                <div className={`${styles.actions} ${styles.fullWidth}`}>
                                    <button type="button" className={styles.cancelBtn} onClick={onClose}>
                                        Cancel
                                    </button>
                                    <button type="submit" className={styles.saveBtn}>
                                        {isEditing ? 'Update Address' : 'Add Address'}
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
