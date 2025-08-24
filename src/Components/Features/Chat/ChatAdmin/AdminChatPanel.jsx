'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { useAdminChat } from '@/Stores/useAdminChat';
import { db } from '@/lib/firebaseKxChat';

// Componentes modulares
import UsersList from './Components/UsersList';
import AdminMessageInput from './Components/AdminMessageInput';
import { useAdminMessages } from './hooks/useAdminMessages';
import AdminMessagesList from './Components/AdminMessagesList';
import AdminChatHeader from './Components/AdminChatHeader';

function AdminChatPanel({
  projectId = 'KxChatEngine',
  chatTitle = 'Support Admin Panel',
}) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Zustand
  const { isOpenAdminChat, closeChat } = useAdminChat();

  // Custom Hook
  const { chats } = useAdminMessages({
    projectId,
    selectedUser,
    messagesEndRef,
  });

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;
    setLoading(true);
    try {
      const messagesRef = collection(db, 'chats', projectId, 'messages');
      await addDoc(messagesRef, {
        text: newMessage,
        isAdmin: true,
        userId: selectedUser,
        read: true,
        timestamp: serverTimestamp(),
      });
      setNewMessage('');

      // marcar mensajes previos como leídos
      chats[selectedUser]
        ?.filter((m) => !m.isAdmin && !m.read)
        .forEach(async (m) => {
          const ref = doc(db, 'chats', projectId, 'messages', m.id);
          await updateDoc(ref, { read: true });
        });
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpenAdminChat) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 flex h-[32rem] w-96 flex-col rounded-lg border border-gray-200 bg-white shadow-2xl">
      <AdminChatHeader
        title={chatTitle}
        selectedUser={selectedUser}
        onBack={() => setSelectedUser(null)}
        onClose={() => closeChat()}
      />

      {!selectedUser ? (
        <UsersList chats={chats} onUserSelect={setSelectedUser} />
      ) : (
        <>
          <AdminMessagesList
            messages={chats[selectedUser] || []}
            messagesEndRef={messagesEndRef}
          />

          <AdminMessageInput
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
}

export default AdminChatPanel;
