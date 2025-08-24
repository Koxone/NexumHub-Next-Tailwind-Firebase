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
import { getFunctions, httpsCallable } from 'firebase/functions';
import crypto from 'crypto';

// Configuración de Firebase exclusiva para KxChatEngine
const firebaseConfig = {
  apiKey: 'AIzaSyDwKMS8ceCT99R2kY1kFkM8ukUAvnn2BvE',
  authDomain: 'kxchatengine.firebaseapp.com',
  projectId: 'kxchatengine',
  storageBucket: 'kxchatengine.firebasestorage.app',
  messagingSenderId: '482974536128',
  appId: '1:482974536128:web:4f91009cfa71bf3a68f825',
};

// Inicializar Firebase solo para este proyecto
const app = !getApps().some((a) => a.name === 'KxChatEngineApp')
  ? initializeApp(firebaseConfig, 'KxChatEngineApp')
  : getApp('KxChatEngineApp');

const db = getFirestore(app);
const functions = getFunctions(app);

const KxChatEngine = ({
  projectId = 'KxChatEngine',
  adminEmail = 'tu-email@gmail.com',
  buttonText = '💬 Abrir Chat',
  chatTitle = 'Chat de Soporte',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId] = useState(() => crypto.randomBytes(16).toString('hex'));
  const messagesEndRef = useRef(null);

  // Encriptar mensaje
  const encryptMessage = (message) => {
    return crypto.createHash('sha256').update(message).digest('hex');
  };

  // Enviar notificación por email
  const sendEmailNotification = async (message, userMessage) => {
    try {
      const sendNotification = httpsCallable(
        functions,
        'sendEmailNotification'
      );
      await sendNotification({
        adminEmail,
        projectId,
        encryptedMessage: message,
        originalMessage: userMessage,
        userId,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error sending email notification:', error);
    }
  };

  // Scroll al último mensaje
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Escuchar mensajes en tiempo real
  useEffect(() => {
    if (!isOpen) return;

    const messagesRef = collection(db, 'chats', projectId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate(),
      }));
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, [isOpen, projectId]);

  // Enviar mensaje
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || loading) return;

    setLoading(true);
    try {
      const encryptedMessage = encryptMessage(newMessage);
      const messageData = {
        text: newMessage,
        encryptedText: encryptedMessage,
        userId,
        isAdmin: false,
        timestamp: serverTimestamp(),
        projectId,
      };

      const messagesRef = collection(db, 'chats', projectId, 'messages');
      await addDoc(messagesRef, messageData);

      // Enviar notificación por email
      await sendEmailNotification(encryptedMessage, newMessage);

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error al enviar mensaje. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // Marcar mensaje como leído
  const markAsRead = async (messageId) => {
    try {
      const messageRef = doc(db, 'chats', projectId, 'messages', messageId);
      await updateDoc(messageRef, { read: true });
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed right-4 bottom-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2 rounded-full bg-blue-500 px-6 py-3 text-white shadow-lg transition-all duration-200 hover:bg-blue-600"
        >
          <span>{buttonText}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed right-4 bottom-4 z-50 flex h-[32rem] w-96 flex-col rounded-lg border border-gray-200 bg-white shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between rounded-t-lg bg-blue-500 p-4 text-white">
        <h3 className="font-semibold">{chatTitle}</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-xl font-bold text-white hover:text-gray-200"
        >
          ×
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4">
        {messages.length === 0 ? (
          <div className="mt-8 text-center text-gray-500">
            <p>¡Hola! 👋</p>
            <p>¿En qué podemos ayudarte?</p>
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
            placeholder="Escribe tu mensaje..."
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
 
      {/* Status */}
      <div className="rounded-b-lg bg-gray-100 px-4 py-2">
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <span className="text-xs text-gray-600">Conectado</span>
          <span className="text-xs text-gray-400">
            ID: {userId.slice(0, 8)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default KxChatEngine;
