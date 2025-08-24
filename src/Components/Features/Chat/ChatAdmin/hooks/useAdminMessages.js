import { useState, useEffect } from 'react';
import { db } from '@/lib/firebaseKxChat';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';

export const useAdminMessages = ({ projectId, selectedUser, messagesEndRef }) => {
  const [chats, setChats] = useState({});

  // Escuchar todos los mensajes
  useEffect(() => {
    const messagesRef = collection(db, 'chats', projectId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatsData = {};
      snapshot.docs.forEach((doc) => {
        const msg = {
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate(),
        };
        if (!chatsData[msg.userId]) chatsData[msg.userId] = [];
        chatsData[msg.userId].push(msg);
      });
      setChats(chatsData);
    });

    return () => unsubscribe();
  }, [projectId]);

  // Scroll automático cuando cambian los mensajes o se selecciona un usuario
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats, selectedUser]);

  return {
    chats,
  };
};