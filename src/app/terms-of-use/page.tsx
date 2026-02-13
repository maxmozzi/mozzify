import React from 'react';
import styles from './terms-of-use.module.css';

export const metadata = {
    title: 'Terms of Use | Mozzify',
    description: 'Rules and conditions for using the Mozzify website and app.',
};

export default function TermsOfUsePage() {
    return (
        <div className={styles.container} style={{ paddingTop: '100px' }}>
            <header className={styles.header}>
                <h1 className={styles.title}>Website and App Terms of Use</h1>
                <p className={styles.lastUpdated}>Effective Date: February 13, 2026</p>
            </header>

            <div className={styles.alert}>
                UNLESS YOU OPT OUT, THESE TERMS AND CONDITIONS CONTAIN A BINDING ARBITRATION CLAUSE AND CLASS ACTION WAIVER THAT IMPACT YOUR RIGHTS ABOUT HOW TO RESOLVE DISPUTES.
            </div>

            <section className={styles.contentSection}>
                <p>PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY BEFORE USING OUR SITES</p>
            </section>

            <section className={styles.contentSection}>
                <h2>What's in these terms?</h2>
                <p>
                    These terms tell you the rules for using our website mozzify.com and our e-comm app (known as the Mozzify App on the App Store) (together being “our sites”).
                </p>
            </section>

            <section className={styles.contentSection}>
                <h2>Who we are and how to contact us</h2>
                <p>
                    Our sites are operated by Mozzify Inc. ("We"). We are Mozzify Inc – a company dedicated to providing premium digital experiences.
                </p>
                <div className={styles.contactBox}>
                    <p>You can contact us via the support section on our sites or at:</p>
                    <p>Email: <a href="mailto:support@mozzify.com" className={styles.emailLink}>support@mozzify.com</a></p>
                </div>
            </section>

            <section className={styles.contentSection}>
                <h2>By using our sites you accept these terms</h2>
                <p>
                    By using our sites, you confirm that you accept these terms of use and that you agree to comply with them. If you do not agree to these terms, you must not use our sites.
                </p>
            </section>

            <section className={styles.contentSection}>
                <h2>There are other terms that may apply to you</h2>
                <p>These terms of use refer to the following additional terms, which also apply to your use of our sites:</p>
                <ul>
                    <li>Our Privacy Notice, which sets out how we may use your personal data.</li>
                    <li>Our Cookie Policy, which sets out information about the cookies on our sites.</li>
                    <li>If you purchase goods from our sites, our Terms and Conditions of sale will apply to the sales.</li>
                </ul>
            </section>

            <section className={styles.contentSection}>
                <h2>We may make changes to these terms</h2>
                <p>
                    We amend these terms from time to time. Every time you wish to use our sites, please check these terms to ensure you understand the terms that apply at that time.
                </p>
            </section>

            <section className={styles.contentSection}>
                <h2>We may make changes to our sites</h2>
                <p>
                    We may update and change our sites from time to time to reflect changes to our products, our users' needs and our business priorities.
                </p>
            </section>

            <section className={styles.contentSection}>
                <h2>We may suspend or withdraw our sites</h2>
                <p>Our sites are made available free of charge.</p>
                <p>
                    We do not guarantee that our sites, or any content on them, will always be available or be uninterrupted. We may suspend or withdraw or restrict the availability of all or any part of our sites for business and operational reasons. We will try to give you reasonable notice of any suspension or withdrawal.
                </p>
            </section>

            <section className={styles.contentSection}>
                <h2>You must keep your account details safe</h2>
                <p>
                    If you choose, or you are provided with, a username, password or any other piece of information as part of our security procedures, you must treat such information as confidential. You must not disclose it to any third party.
                </p>
                <p>
                    We have the right to disable any username or password at any time, if in our reasonable opinion you have failed to comply with any of the provisions of these terms of use.
                </p>
            </section>

            <section className={styles.contentSection}>
                <h2>How you may use material on our sites</h2>
                <p>
                    We are the owner or the licensee of all intellectual property rights in our sites, and in the material published on them. Those works are protected by copyright laws and treaties around the world. All such rights are reserved.
                </p>
                <p>
                    You must not use any part of the content on our sites for commercial purposes without obtaining a license to do so from us and our licensors.
                </p>
            </section>

            <section className={styles.contentSection}>
                <h2>Do not rely on information on our sites</h2>
                <p>
                    The content on our sites is provided for general information only. It is not intended to amount to advice on which you should rely. You must obtain professional or specialist advice before taking, or refraining from, any action on the basis of the content on our sites.
                </p>
            </section>

            <section className={styles.contentSection}>
                <h2>User-generated content is not approved by us</h2>
                <p>
                    Our sites may include information and materials uploaded by other users. This information and these materials have not been verified or approved by us. The views expressed by other users on our sites do not represent our views or values.
                </p>
            </section>

            <section className={styles.contentSection}>
                <h2>Our responsibility for loss or damage suffered by you</h2>
                <p>
                    We do not exclude or limit in any way our liability to you where it would be unlawful to do so. This includes liability for death or personal injury caused by our negligence and for fraud or fraudulent misrepresentation.
                </p>
            </section>

            <section className={styles.contentSection}>
                <h2>How we may use your personal data</h2>
                <p>We will only use your personal data as set out in our Privacy Notice.</p>
            </section>

            <section className={styles.contentSection}>
                <h2>We are not responsible for viruses and you must not introduce them</h2>
                <p>We do not guarantee that our sites will be secure or free from bugs or viruses.</p>
                <p>
                    You must not misuse our sites by knowingly introducing viruses, trojans, worms, logic bombs or other material that is malicious or technologically harmful.
                </p>
            </section>

            <section className={styles.contentSection}>
                <h2>Class Action Waiver</h2>
                <p>READ THIS SECTION CAREFULLY - IT MAY SIGNIFICANTLY AFFECT YOUR LEGAL RIGHTS.</p>
                <p>
                    You agree that you and Mozzify will resolve any disputes, claims, or controversies on an individual basis, and that claim(s), if any, brought under these Terms and Conditions in connection with any of the sites will be brought in an individual capacity, and not on behalf of, or as part of, any purported class, consolidated, or representative proceeding.
                </p>
            </section>

            <section className={styles.contentSection}>
                <h2>Which country's laws apply to any disputes?</h2>
                <p>
                    If you are a consumer, please note that these terms of use, their subject matter and their formation are governed by local law. We both agree to the jurisdiction of the relevant courts.
                </p>
            </section>
        </div>
    );
}
