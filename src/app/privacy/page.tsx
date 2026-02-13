import React from 'react';
import styles from './privacy.module.css';

export const metadata = {
    title: 'Privacy Notice | Mozzify',
    description: 'Read the privacy notice for Mozzify to understand how we collect and use your data.',
};

export default function PrivacyPage() {
    return (
        <div className={styles.container} style={{ paddingTop: '100px' }}>
            <header className={styles.header}>
                <h1 className={styles.title}>Privacy Notice</h1>
                <p className={styles.lastUpdated}>Last updated: 13 Feb 2026</p>
            </header>

            <section className={styles.contentSection}>
                <h2>Customer, App, Marketing, Promotions, Events and Social Media Privacy Notice</h2>
                <p>This privacy notice will apply to you if you:</p>
                <ul>
                    <li>have purchased any of our products or services from our Website, App or retail store, or at one of our events or pop-up stores</li>
                    <li>use any of our Apps</li>
                    <li>have signed up to receive marketing emails from us</li>
                    <li>have entered any of our promotions/competitions</li>
                    <li>attended any of our events</li>
                    <li>interact with us on social media</li>
                </ul>
                <p>This policy covers how Mozzify uses pixels.</p>
            </section>

            <section className={styles.contentSection}>
                <h2>CCTV and Access Control Privacy Notice</h2>
                <p>This privacy notice will apply to you if you have attended Mozzify's premises including our retail stores, offices or any other physical premises.</p>
            </section>

            <section className={styles.contentSection}>
                <h2>Rest of the World Privacy Notice</h2>
                <p>This privacy notice will apply to you if you interact with us in any way that is not already covered by one of our other privacy notices. For example, if you:</p>
                <ul>
                    <li>use our website or links to or follows our social media accounts but does not post comments on our social media</li>
                    <li>work at a supplier of ours or another organisation that we deal with</li>
                    <li>are an associate member of our lifting club</li>
                    <li>are an athlete or influencer that we have a paying relationship with</li>
                    <li>are a model we engage to fit and showcase our products</li>
                    <li>are a personal trainer or other who provides us with paid content</li>
                    <li>are one of our shareholders</li>
                    <li>are a member of the public who contacts us or anyone else who is affected by our activities to the extent not covered by another of our privacy notices.</li>
                </ul>
                <p>This policy covers how Mozzify uses pixels.</p>
            </section>
        </div>
    );
}
