'use client';

import React, { useState, useEffect, useRef } from 'react';
import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  doc,
  updateDoc,
} from 'firebase/firestore';
import crypto from 'crypto';
import { useKxChat } from '@/Stores/useKxChat';
import { sendDiscord } from '@/lib/sendDiscord';

// Configuración Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_KXCHAT_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_KXCHAT_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_KXCHAT_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_KXCHAT_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    process.env.NEXT_PUBLIC_KXCHAT_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_KXCHAT_FIREBASE_APP_ID,
};

// Inicializar Firebase
const app = !getApps().some((a) => a.name === 'KxChatEngineApp')
  ? initializeApp(firebaseConfig, 'KxChatEngineApp')
  : getApp('KxChatEngineApp');

const db = getFirestore(app);

const KxChatEngine = ({
  projectId = 'KxChatEngine',
  buttonText = '💬 Open Chat',
  chatTitle = 'Support Chat',
}) => {
  // Zustand
  const { isOpenKxChat, openChat, closeChat, toggleChat } = useKxChat();

  const [username, setUsername] = useState('');
  const [usernameSet, setUsernameSet] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId] = useState(() => crypto.randomBytes(16).toString('hex'));
  const messagesEndRef = useRef(null);

  // Scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Escuchar mensajes
  useEffect(() => {
    if (!isOpenKxChat || !usernameSet) return;

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
  }, [isOpenKxChat, projectId, userId, usernameSet]);

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

      // 👉 Guardar en Firestore
      const messagesRef = collection(db, 'chats', projectId, 'messages');
      await addDoc(messagesRef, messageData);

      // 👉 Enviar alerta a Discord
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
  if (!isOpenKxChat) {
    return;
  }

  return (
    <div className="fixed right-4 bottom-4 z-50 flex h-[32rem] w-96 flex-col rounded-lg border border-gray-200 bg-white shadow-2xl">
      {/* Header */}
      <div className="bg-bg-primary flex items-center justify-between rounded-t-lg p-4 text-white">
        <h3 className="font-semibold">{chatTitle}</h3>
        <button
          onClick={() => closeChat()}
          className="cursor-pointer text-xl font-bold text-white hover:text-gray-200"
        >
          ×
        </button>
      </div>

      {/* Si no hay username */}
      {!usernameSet ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-gray-50 p-6">
          <p className="font-semibold text-gray-600">Enter your Username</p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your name..."
            className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            onClick={() => username.trim() && setUsernameSet(true)}
            className="bg-bg-primary cursor-pointer rounded-lg px-4 py-2 text-white hover:bg-blue-600"
          >
            Continue
          </button>
        </div>
      ) : (
        <>
          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4">
            {messages.length === 0 ? (
              <div className="mt-8 text-center text-gray-500">
                <p>Hello 👋</p>
                <p>How can we help you?</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isAdmin ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.isAdmin
                        ? 'bg-gray-200 text-gray-800'
                        : 'bg-blue-500 text-white'
                    } shadow-sm`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-xs opacity-75">
                        {message.timestamp?.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      {!message.isAdmin && (
                        <div className="flex space-x-1">
                          <span className="text-xs opacity-75">
                            {message.read ? '✓✓' : '✓'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
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
                    sendMessage(e);
                  }
                }}
                placeholder="Type your message..."
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !newMessage.trim()}
                className="bg-bg-primary cursor-pointer rounded-lg p-2 text-white transition-colors duration-200 hover:bg-blue-600 disabled:bg-gray-300"
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default KxChatEngine;
