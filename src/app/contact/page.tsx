'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        orderNumber: '',
        comment: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        // Limit comment to 1000 characters
        if (name === 'comment' && value.length > 1000) return;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log('Form submitted:', formData);
        setSubmitted(true);
        setIsSubmitting(false);
    };

    if (submitted) {
        return (
            <div style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 1rem', textAlign: 'center', minHeight: '60vh' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>THANK YOU</h1>
                <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
                    We have received your message and will get back to you within 24 hours.
                </p>
                <Link href="/" style={{ textDecoration: 'underline', fontWeight: 600 }}>Return to Home</Link>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 1.5rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '2rem', textTransform: 'uppercase' }}>Contact Us</h1>
            <p style={{ marginBottom: '2rem', color: '#666' }}>
                Please fill out the form below and we will get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>

                {/* Name */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="name" style={{ fontWeight: 600, fontSize: '0.9rem' }}>NAME *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                </div>

                {/* Email */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="email" style={{ fontWeight: 600, fontSize: '0.9rem' }}>EMAIL *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                </div>

                {/* Phone (Optional) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="phone" style={{ fontWeight: 600, fontSize: '0.9rem' }}>PHONE NUMBER (OPTIONAL)</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                </div>

                {/* Order Number (Optional) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="orderNumber" style={{ fontWeight: 600, fontSize: '0.9rem' }}>ORDER NUMBER (OPTIONAL)</label>
                    <input
                        type="text"
                        id="orderNumber"
                        name="orderNumber"
                        placeholder="e.g. #12345"
                        value={formData.orderNumber}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                </div>

                {/* Comment */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <label htmlFor="comment" style={{ fontWeight: 600, fontSize: '0.9rem' }}>COMMENT *</label>
                        <span style={{ fontSize: '0.8rem', color: '#888' }}>{formData.comment.length}/1000</span>
                    </div>
                    <textarea
                        id="comment"
                        name="comment"
                        required
                        value={formData.comment}
                        onChange={handleChange}
                        rows={6}
                        style={{ ...inputStyle, resize: 'vertical' }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                        background: 'black',
                        color: 'white',
                        border: 'none',
                        padding: '1rem',
                        fontSize: '1rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        opacity: isSubmitting ? 0.7 : 1,
                        marginTop: '1rem'
                    }}
                >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
            </form>
        </div>
    );
}

const inputStyle = {
    padding: '0.8rem',
    border: '1px solid #e5e5e5',
    borderRadius: '2px',
    fontSize: '1rem',
    outline: 'none',
    width: '100%'
};
