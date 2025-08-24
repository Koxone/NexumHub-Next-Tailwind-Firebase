import { useState, useEffect, useRef } from 'react';
import { db } from '@/lib/firebaseKxChat';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';

export const useMessages = ({ isOpen, usernameSet, projectId, userId }) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Scroll automático
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Escuchar mensajes en tiempo real
  useEffect(() => {
    if (!isOpen || !usernameSet) return;

    const messagesRef = collection(db, 'chats', projectId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate(),
        }))
        .filter((msg) => msg.userId === userId);
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, [isOpen, projectId, userId, usernameSet]);

  return {
    messages,
    messagesEndRef,
  };
};