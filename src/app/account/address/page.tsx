"use client";
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, Plus, MapPin, Edit2, Trash2 } from 'lucide-react';
import styles from '@/styles/account.module.css';
import AddressModal, { AddressData } from '@/components/account/address-modal';

export default function AddressPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState<AddressData | null>(null);

    const addresses: AddressData[] = [
        { id: 1, type: 'Home', fullName: 'Max Mozzi', address: 'Calle de la Moda, 123, Piso 4, Puerta B', city: 'Barcelona', zip: '08001', country: 'Spain', isDefault: true, phone: '+34 600 000 000' } as any,
        { id: 2, type: 'Office', fullName: 'Max Mozzi', address: 'Avinguda Diagonal, 456, Planta 2', city: 'Barcelona', zip: '08006', country: 'Spain', isDefault: false, phone: '+34 600 111 222' } as any,
    ];

    const handleAddNew = () => {
        setEditingAddress(null);
        setIsModalOpen(true);
    };

    const handleEdit = (addr: AddressData) => {
        setEditingAddress(addr);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setTimeout(() => setEditingAddress(null), 300);
    };

    return (
        <div className={styles.dashboardContainer} style={{ paddingTop: '120px' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div style={{ marginBottom: '2rem' }}>
                    <Link href="/account" className={styles.link} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
                        <ChevronLeft size={16} /> Back to Dashboard
                    </Link>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
                        <h1 className={styles.title} style={{ margin: 0 }}>My Addresses</h1>
                        <button
                            className={styles.button}
                            style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
                            onClick={handleAddNew}
                        >
                            <Plus size={16} /> Add New Address
                        </button>
                    </div>
                </div>

                <div className={styles.dahboardGrid} style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                    {addresses.map(addr => (
                        <div key={addr.id} className={styles.card} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <MapPin size={18} />
                                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>{addr.type} as any</h3>
                                </div>
                                {(addr as any).isDefault && (
                                    <span style={{ fontSize: '0.7rem', background: '#f0f0f0', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 600 }}>Default</span>
                                )}
                            </div>

                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem', color: '#444', marginBottom: '1.5rem' }}>
                                <p>{addr.fullName}</p>
                                <p>{addr.address}</p>
                                <p>{addr.city}, {addr.zip}</p>
                                <p>{addr.country}</p>
                                <p style={{ fontSize: '0.85rem', color: '#888', marginTop: '0.5rem' }}>{addr.phone}</p>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                                <button className={styles.link} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }} onClick={() => handleEdit(addr)}>
                                    <Edit2 size={14} /> Edit
                                </button>
                                <button className={styles.link} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#ff4d4f' }}>
                                    <Trash2 size={14} /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            <AddressModal
                isOpen={isModalOpen}
                onClose={handleClose}
                initialData={editingAddress}
            />
        </div>
    );
}
