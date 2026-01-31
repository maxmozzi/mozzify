"use client";

import { MessageCircle } from 'lucide-react';
import styles from './chatbot-icon.module.css';

export default function ChatbotIcon() {
    return (
        <button className={styles.chatbotBtn}>
            <MessageCircle size={28} color="white" />
        </button>
    );
}
