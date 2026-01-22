"use client";
import styles from './newsletter.module.css';

export default function Newsletter() {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.content}>
                    <h2 className={styles.title}>Join the Movement</h2>
                    <p className={styles.text}>
                        Sign up for early access to drops, exclusive collaborations, and insider events.
                    </p>
                    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="ENTER YOUR EMAIL"
                            className={styles.input}
                            required
                        />
                        <button type="submit" className={styles.button}>
                            Subscribe
                        </button>
                    </form>
                    <p className={styles.disclaimer}>
                        By subscribing you agree to our Terms & Privacy Policy.
                    </p>
                </div>
            </div>
        </section>
    );
}
