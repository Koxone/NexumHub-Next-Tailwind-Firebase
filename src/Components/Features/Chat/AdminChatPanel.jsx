'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { getApp } from 'firebase/app';

// Usa la app de chat ya creada
const db = getFirestore(getApp('KxChatEngineApp'));

function AdminChatPanel({ projectId = 'KxChatEngine', chatTitle = 'Panel de Soporte' }) {
  const [chats, setChats] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Escuchar mensajes en tiempo real
  useEffect(() => {
    const messagesRef = collection(db, 'chats', projectId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatsData = {};
      snapshot.docs.forEach((doc) => {
        const msg = { id: doc.id, ...doc.data(), timestamp: doc.data().timestamp?.toDate() };
        if (!chatsData[msg.userId]) chatsData[msg.userId] = [];
        chatsData[msg.userId].push(msg);
      });
      setChats(chatsData);
    });

    return () => unsubscribe();
  }, [projectId]);

  // Scroll automático
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats, selectedUser]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;
    setLoading(true);
    try {
      const messagesRef = collection(db, 'chats', projectId, 'messages');
      await addDoc(messagesRef, {
        text: newMessage,
        isAdmin: true,
        userId: selectedUser,
        timestamp: serverTimestamp(),
      }); 
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed left-4 bottom-4 z-50 flex h-[32rem] w-96 flex-col rounded-lg border border-gray-200 bg-white shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between rounded-t-lg bg-blue-500 p-4 text-white">
        <h3 className="font-semibold">{chatTitle}</h3>
        {selectedUser && (
          <button
            onClick={() => setSelectedUser(null)}
            className="text-sm font-bold text-white hover:text-gray-200"
          >
            ← Back
          </button>
        )}
      </div>

      {/* Lista de usuarios o chat */}
      {!selectedUser ? (
        <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <p className="mb-3 font-semibold text-gray-600">Active Users</p>
          <ul className="space-y-2">
            {Object.keys(chats).map((user) => (
              <li key={user}>
                <button
                  onClick={() => setSelectedUser(user)}
                  className="w-full rounded-lg border bg-white px-4 py-2 text-left shadow hover:bg-gray-100"
                >
                  User {user.slice(0, 6)}…
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          {/* Mensajes */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4">
            {chats[selectedUser]?.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isAdmin ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 shadow-sm ${
                    msg.isAdmin ? 'bg-gray-200 text-gray-800' : 'bg-blue-500 text-white'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-xs opacity-75">
                      {msg.timestamp?.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="rounded-b-lg border-t border-gray-200 bg-white p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Escribe tu respuesta..."
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !newMessage.trim()}
                className="rounded-lg bg-blue-500 p-2 text-white transition-colors duration-200 hover:bg-blue-600 disabled:bg-gray-300"
              >
                {loading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                ) : (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminChatPanel;
