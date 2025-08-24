'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebaseKxChat';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import crypto from 'crypto';
import { sendDiscord } from '@/lib/sendDiscord';
import MessagesList from './Components/MessagesList';
import MessageInput from './Components/MessageInput';
import { useDraggable } from './Hooks/useDraggable';
import { useMessages } from './Hooks/useMessages';
import ChatHeader from './Components/ChatHeader';
import UsernameForm from './Components/UsernameForm';

// Zustand
import { useKxChat } from '@/Stores/useKxChat';
import { useOpenChatButton } from '@/Stores/useOpenChatButton';

const KxChatEngine = ({
  projectId = 'KxChatEngine',
  buttonText = '💬 Open Chat',
  chatTitle = 'KX Chat',
}) => {
  // Zustand
  const { isOpenKxChat, closeChat } = useKxChat();
  const { toggleChat } = useOpenChatButton();

  // Estados con persistencia en localStorage
  const [username, setUsername] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('kxchat_username') || '';
    }
    return '';
  });

  const [usernameSet, setUsernameSet] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('kxchat_username');
    }
    return false;
  });

  const [userId] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('kxchat_userId');
      if (stored) return stored;
      const newId = crypto.randomBytes(16).toString('hex');
      localStorage.setItem('kxchat_userId', newId);
      return newId;
    }
    return crypto.randomBytes(16).toString('hex');
  });

  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Custom Hooks
  const { position, handleMouseDown } = useDraggable();
  const { messages, messagesEndRef } = useMessages({
    isOpen: isOpenKxChat,
    usernameSet,
    projectId,
    userId,
  });

  // Guardar username en localStorage al confirmar
  const handleSetUsername = () => {
    if (username.trim()) {
      localStorage.setItem('kxchat_username', username.trim());
      setUsernameSet(true);
    }
  };

  // Enviar mensaje
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || loading) return;

    setLoading(true);
    try {
      const messageData = {
        text: newMessage,
        userId,
        username,
        isAdmin: false,
        read: false,
        timestamp: serverTimestamp(),
        projectId,
      };

      const messagesRef = collection(db, 'chats', projectId, 'messages');
      await addDoc(messagesRef, messageData);

      await sendDiscord(
        `💬 Nuevo mensaje de **${username || 'Usuario'}**: ${newMessage}`
      );

      setNewMessage('');
      console.log('✅ Mensaje guardado y enviado a Discord');
    } catch (error) {
      console.error('❌ Error enviando mensaje:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    closeChat();
    toggleChat();
  };

  if (!isOpenKxChat) {
    return null;
  }

  return (
    <div
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      className="border-border-main fixed right-4 bottom-4 z-50 flex h-[32rem] w-96 flex-col rounded-lg border bg-white shadow-2xl"
    >
      <ChatHeader
        title={chatTitle}
        onMouseDown={handleMouseDown}
        onClose={handleClick}
      />

      {!usernameSet ? (
        <UsernameForm
          username={username}
          setUsername={setUsername}
          onContinue={handleSetUsername}
        />
      ) : (
        <>
          <MessagesList messages={messages} messagesEndRef={messagesEndRef} />

          <MessageInput
            value={newMessage}
            onChange={setNewMessage}
            onSend={sendMessage}
            loading={loading}
            disabled={loading || !newMessage.trim()}
          />
        </>
      )}
    </div>
  );
};

export default KxChatEngine;
