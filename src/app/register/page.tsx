"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from '@/styles/account.module.css';

export default function RegisterPage() {
    return (
        <div className={styles.pageContainer}>
            <motion.div
                className={styles.authCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <h1 className={styles.title}>Create Account</h1>

                <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            placeholder="Full Name"
                            className={styles.input}
                            required
                        />
                    </div>
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
                        Create Account
                    </button>
                </form>

                <p className={styles.secondaryText}>
                    Already have an account?
                    <Link href="/login" className={styles.link}>
                        Sign In
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
