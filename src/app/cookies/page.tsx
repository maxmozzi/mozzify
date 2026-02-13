import React from 'react';
import styles from './cookies.module.css';

export const metadata = {
    title: 'Cookie Policy | Mozzify',
    description: 'Learn about how Mozzify uses cookies to improve your shopping experience.',
};

export default function CookiesPage() {
    return (
        <div className={styles.container} style={{ paddingTop: '100px' }}>
            <header className={styles.header}>
                <h1 className={styles.title}>Cookie Policy</h1>
                <p className={styles.lastUpdated}>Effective Date: February 13, 2026</p>
            </header>

            <section className={styles.contentSection}>
                <h2>What are cookies?</h2>
                <p>
                    Like most websites, our websites use cookies to collect information. Cookies are small data files which are placed on your computer or other devices (such as smartphones or tablets) as you browse our websites. They are used to ‘remember’ when your computer or device accesses our websites. They allow us to remember whether you are logged in to the site and what items you had in your shopping basket. Cookies are essential for the effective operation of our websites and to help you shop with us online. They are also used to tailor the products and services offered and advertised to you, both on our websites and elsewhere.
                </p>
            </section>

            <section className={styles.contentSection}>
                <h2>Information collected</h2>
                <p>
                    Some cookies collect information about browsing and purchasing behaviour when you access our websites via the same computer or device. This includes information about pages viewed, products purchased and your journey around a website. All data passed by cookies is anonymous and will never contain individual detail such as your name, address, telephone number or payment information but may contain our customer reference number that is unique to you. For more detailed information about how cookies work, please visit <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>www.allaboutcookies.org</a>.
                </p>
            </section>

            <section className={styles.contentSection}>
                <h2>How are cookies managed?</h2>
                <p>The cookies stored on your computer or other device when you access our websites are designed by:</p>
                <ul>
                    <li>Mozzify Limited or on our behalf, and are necessary to enable you to make purchases on our websites;</li>
                    <li>third parties who participate with us in marketing programmes; and</li>
                    <li>third parties who publish web banner advertisements for us.</li>
                </ul>
            </section>

            <section className={styles.contentSection}>
                <h2>What are cookies used for?</h2>
                <p>
                    Cookies are used with our marketing partners to present you with appropriate offers and advertising as you browse other sites on the internet, based on your browsing activity while on our site. Cookies also allow us to work alongside our web analytics partner, Google Analytics, to see how you like to use our website, which pages or special functions you prefer and help us to make them better.
                </p>
                <p>The main purposes for which cookies are used are:</p>
                <ul>
                    <li>For functional purposes essential to effective operation of our websites, particularly in relation to online transactions, site navigation and preferences.</li>
                    <li>For marketing and advertising, particularly web banner advertisements and targeted updates through digital channels and social media.</li>
                    <li>To enable us to collect information about your browsing and shopping behaviour, helping us to improve your shopping experience and to monitor performance.</li>
                </ul>
            </section>

            <section className={styles.contentSection}>
                <h2>Marketing cookies</h2>
                <p>
                    Mozzify Limited work with partners who serve advertisements or present online offers on our behalf. Most of these marketing partners use both session and persistent cookies. These cookies are used to deliver adverts more relevant to you and your interests. All data collected by third party cookies is anonymous and will never contain your name, address, telephone number, email address or payment details.
                </p>
            </section>

            <section className={styles.contentSection}>
                <h2>What type of cookies do we use?</h2>
                <p>There are two types of cookie that may be used during your visit to our site:</p>
                <ul>
                    <li><strong>Session cookies:</strong> Session cookies are deleted after each visit to our site. They allow you to add an item to the basket and then move through the checkout. Disallowing these cookies via your web browser will mean you are unable to place an order on this site.</li>
                    <li><strong>Persistent cookies:</strong> Persistent cookies remember you for a set period of time, allowing wishlist and/or previously viewed products to be displayed the next time you visit our site and whether you were logged into your account.</li>
                </ul>
            </section>

            <section className={styles.contentSection}>
                <h2>Changing your preferences</h2>
                <p>To make changes to your cookie consent preferences you can return to the settings by clicking the button below.</p>
                <button className={styles.button}>Update preferences</button>
            </section>

            <section className={styles.contentSection}>
                <h2>Turning off and deleting cookies</h2>
                <p>
                    Most web browsers will provide the option to turn off or disallow cookies. How you do this depends on the web browser you are using. Instructions for disallowing cookies can usually be found in the browser's 'Help' menu.
                </p>
                <p>Further details on how to disable cookies for the most popular desktop browsers are set out below:</p>
                <ul>
                    <li><strong>Google Chrome:</strong> Choose “Settings” and click on “Advanced”. Under "Privacy and Security" click “Content Settings” then “Cookies”.</li>
                    <li><strong>Safari:</strong> Choose Preferences &gt; Privacy and click on “Block all cookies”.</li>
                    <li><strong>Mozilla Firefox:</strong> Click on the menu icon then select “Options”. Click on the icon “Privacy & Security”. Find the menu “cookie” and select the relevant options.</li>
                    <li><strong>Microsoft Edge:</strong> Settings &gt; Cookies and site permissions.</li>
                </ul>
            </section>

            <section className={styles.contentSection}>
                <h2>Cookies we use</h2>

                <h3>Strictly necessary cookies</h3>
                <div className={styles.tableContainer}>
                    <table className={styles.cookieTable}>
                        <thead>
                            <tr>
                                <th>Cookie name</th>
                                <th>What is the cookie used for?</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>_tracking_consent</td><td>Used to store a user’s preferences.</td></tr>
                            <tr><td>cart, cart_sig, cart_ts</td><td>Used in connection with checkout and to maintain items in your cart.</td></tr>
                            <tr><td>Secure_customer_sig</td><td>Used in connection with a customer login.</td></tr>
                            <tr><td>OptanonConsent</td><td>Used to store information about cookie categories and consent status.</td></tr>
                            <tr><td>_dd_s</td><td>Used to group all events generated from a unique user session for performance monitoring.</td></tr>
                        </tbody>
                    </table>
                </div>

                <h3>Performance Cookies</h3>
                <div className={styles.tableContainer}>
                    <table className={styles.cookieTable}>
                        <thead>
                            <tr>
                                <th>Cookie Name</th>
                                <th>What is the cookie used for?</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>_ga, _ga_xxx</td><td>Used by Google Analytics to distinguish unique users and calculate visitor data.</td></tr>
                            <tr><td>shopify_y, shopify_s</td><td>Used to identify a given browser session/shop combination.</td></tr>
                        </tbody>
                    </table>
                </div>

                <h3>Targeting Cookies</h3>
                <div className={styles.tableContainer}>
                    <table className={styles.cookieTable}>
                        <thead>
                            <tr>
                                <th>Cookie Name(s)</th>
                                <th>What is the cookie used for?</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>_fbp</td><td>Used by Facebook to deliver advertisement products and track efficiency.</td></tr>
                            <tr><td>_uetsid, _uetvid</td><td>Used by Microsoft Bing Ads to track visits and show relevant ads.</td></tr>
                            <tr><td>_ttp</td><td>Owned by TikTok, used for advertising and analytics.</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
