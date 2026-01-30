"use client";
import { useState } from 'react';
import { X, ShoppingBag } from 'lucide-react';
import styles from './mini-cart.module.css';

export default function MiniCart({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    if (!isOpen) return null;

    return (
        <>
            <div className={styles.overlay} onClick={onClose} />
            <div className={styles.drawer}>
                <div className={styles.header}>
                    <h2>Your Cart (0)</h2>
                    <button onClick={onClose}><X size={24} /></button>
                </div>

                <div className={styles.emptyState}>
                    <ShoppingBag size={48} className={styles.icon} />
                    <p>Your cart is empty.</p>
                    <button className={styles.shopBtn} onClick={onClose}>
                        Start Shopping
                    </button>
                </div>

                {/* 
        <div className={styles.footer}>
           <div className={styles.total}>
              <span>Total</span>
              <span>$0.00</span> lol
           </div>
           <button className={styles.checkoutBtn}>Checkout</button>
        </div> 
        */}
            </div>
        </>
    );
}
