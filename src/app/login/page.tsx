"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from '@/styles/account.module.css';

export default function LoginPage() {
    return (
        <div className={styles.pageContainer}>
            <motion.div
                className={styles.authCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <h1 className={styles.title}>Welcome Back</h1>

                <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                    <div className={styles.inputGroup}>
                        <input
                            type="email"
                            placeholder="Email Address"
                            className={styles.input}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            type="password"
                            placeholder="Password"
                            className={styles.input}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.button}>
                        Sign In
                    </button>
                </form>

                <p className={styles.secondaryText}>
                    Don't have an account?
                    <Link href="/register" className={styles.link}>
                        Create one
                    </Link>
                </p>

                <div style={{ marginTop: '2rem', opacity: 0.5, fontSize: '0.8rem' }}>
                    <Link href="/account" className={styles.link}>[DEBUG: Go direct to Account]</Link>
                </div>
            </motion.div>
        </div>
    );
}
