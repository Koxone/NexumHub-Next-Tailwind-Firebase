'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DonationsModal from '../Modals/DonationsModal';
import localFont from 'next/font/local';
import { useTranslation } from 'react-i18next';
import i18n from '@/lib/i18n';
import { usePathname } from 'next/navigation';

const inter = localFont({
  src: '../../Fonts/Inter.ttf',
});

export default function MainHeader() {
  const [showPayPal, setShowPayPal] = useState(false);
  const paypalRef = useRef(null);
  const { i18n, t } = useTranslation();

  const pathname = usePathname();

  const toggleLanguage = () => {
    if (i18n.language === 'en') {
      i18n.changeLanguage('es');
    } else if (i18n.language === 'es') {
      i18n.changeLanguage('pt');
    } else {
      i18n.changeLanguage('en');
    }
  };

  useEffect(() => {
    if (showPayPal && paypalRef.current) {
      const script = document.createElement('script');
      script.src =
        'https://www.paypal.com/sdk/js?client-id=AXr4UIOmeot54V2uNE_M4bGGch06W-yNS1LHcezuvFN0VQI_Vw9-GOXvs0tzdua4eVnYAYYbVdHqlEYq&vault=true&intent=subscription';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        if (window.paypal) {
          window.paypal
            .Buttons({
              style: {
                shape: 'pill',
                color: 'blue',
                layout: 'vertical',
                label: 'subscribe',
              },
              createSubscription: (data, actions) =>
                actions.subscription.create({
                  plan_id: 'P-75E64413KL930952ENBWCOXA',
                }),
              onApprove: (data) => {
                alert(
                  `Thank you for subscribing! Subscription ID: ${data.subscriptionID}`
                );
              },
            })
            .render(paypalRef.current);
        }
      };
    }
  }, [showPayPal]);

  return (
    <>
      <header
        className={`flex ${pathname === '/project' ? 'hidden' : 'flex'} h-16 w-full items-center border-b border-gray-800 bg-gray-900 px-5 py-8 md:p-8 ${inter.className}`}
      >
        <img
          className="mr-auto h-fit max-h-10 w-full max-w-9 cursor-pointer object-contain md:max-h-15 md:max-w-13"
          src="/logo.png"
          alt="logo icon"
        />

        <div className="flex items-center gap-2 text-xs text-white sm:gap-8 sm:text-base">
          <a
            className="transition-transform duration-200 hover:scale-125 hover:text-[#FFD700]"
            target="_blank"
            href="https://resume.koxland.dev/"
          >
            {t('header.resume')}
          </a>
          <a
            className="transition-transform duration-200 hover:scale-125 hover:text-[#FFD700]"
            target="_blank"
            href="https://github.com/Koxone"
          >
            Github
          </a>
          <a
            className="hidden transition-transform duration-200 hover:scale-125 hover:text-[#FFD700] md:block"
            target="_blank"
            href="https://www.youtube.com/@KoxDeveloper"
          >
            Youtube
          </a>
          <a
            className="transition-transform duration-200 hover:scale-125 hover:text-[#FFD700]"
            href="#footer"
          >
            Contact
          </a>
          <span
            className="hidden cursor-pointer transition-transform duration-200 hover:scale-125 hover:text-[#FFD700] md:block"
            onClick={() => setShowPayPal(true)}
          >
            Donate
          </span>

          {/* Language Button */}
          <button
            onClick={toggleLanguage}
            className="flex cursor-pointer items-center gap-1 rounded-md border border-gray-500 px-3 py-1 text-xs font-medium text-[#FFD700] transition-colors duration-200 hover:border-yellow-400 hover:text-yellow-400 sm:text-sm"
          >
            {i18n.language.toUpperCase()}
            <img src="/StackIcons/LanguageIcon.svg" alt="Language" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {showPayPal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
            onClick={() => setShowPayPal(false)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <DonationsModal
                paypalRef={paypalRef}
                setShowPayPal={setShowPayPal}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
