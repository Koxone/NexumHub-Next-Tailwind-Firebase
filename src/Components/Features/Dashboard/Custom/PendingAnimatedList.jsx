'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';

// Firebase
import { collection, getDocs } from 'firebase/firestore';
import { dbTestigoMX } from '@/lib/firebaseTestigoMX';

const AnimatedItem = ({ children, index, onMouseEnter, onClick }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, triggerOnce: false });

  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.2, delay: 0.1 }}
      className="mb-4 cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

export default function PendingAnimatedList({
  collectionName = 'objects',
  showGradients = false,
  displayScrollbar = false,
  className = '',
}) {
  const listRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const [topGradientOpacity, setTopGradientOpacity] = useState(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);

  const scrollStyle = displayScrollbar
    ? {}
    : {
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      };

  // Handle scroll for gradient effects
  const handleScroll = (e) => {
    if (!showGradients) return;

    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const isAtTop = scrollTop === 0;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

    setTopGradientOpacity(isAtTop ? 0 : 1);
    setBottomGradientOpacity(isAtBottom ? 0 : 1);
  };

  // -----------------FIREBASE-------------------------------------
  // Firebase States
  const [pendings, setPendings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendings = async () => {
      try {
        console.log(
          '🔥 PendingAnimatedList: Fetching from collection:',
          collectionName
        );
        console.log('🔥 Using database:', dbTestigoMX.app.name);

        const querySnapshot = await getDocs(
          collection(dbTestigoMX, collectionName)
        );

        const pendingsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log(
          '🔥 PendingAnimatedList: Found',
          pendingsArray.length,
          'documents'
        );
        console.log('🔥 PendingAnimatedList: Data:', pendingsArray);

        setPendings(pendingsArray);
        setLoading(false);
      } catch (error) {
        console.error(
          '❌ Error fetching pendings from collection:',
          collectionName,
          error
        );
      }
    };

    fetchPendings();
  }, [collectionName]);

  return (
    <div className={`relative w-full ${className}`}>
      <div
        ref={listRef}
        className={`max-h-[390px] overflow-y-auto md:max-h-[340px] ${
          displayScrollbar
            ? '[&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-thumb]:rounded-[4px] [&::-webkit-scrollbar-thumb]:bg-[#222] [&::-webkit-scrollbar-track]:bg-[#060010]'
            : 'no-scrollbar'
        }`}
        style={scrollStyle}
        onScroll={handleScroll}
      >
        {!displayScrollbar && (
          <style>{`
            .no-scrollbar::-webkit-scrollbar { display: none; }
          `}</style>
        )}

        {loading && (
          <div className="flex items-center justify-center p-8">
            <div className="text-neutral-300">
              Loading from {collectionName}...
            </div>
          </div>
        )}

        {!loading && pendings.length === 0 && (
          <div className="flex items-center justify-center p-8">
            <div className="text-neutral-500">
              No data found in collection "{collectionName}"
            </div>
          </div>
        )}

        {!loading &&
          pendings.map((pending, index) => (
            <AnimatedItem
              key={pending.id}
              index={index}
              onMouseEnter={() => setSelectedIndex(index)}
              onClick={() => setSelectedIndex(index)}
            >
              <div
                className={`group rounded-xl border border-neutral-800 bg-[#0d1117] p-4 shadow-md transition-colors duration-200 hover:bg-[#161b22]`}
              >
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="truncate text-base font-semibold text-white">
                    {pending.type}
                  </h4>
                  <span
                    className={`ml-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium text-white ${
                      pending.priority === 'urgent'
                        ? 'bg-red-600'
                        : pending.priority === 'high'
                          ? 'bg-orange-500'
                          : pending.priority === 'medium'
                            ? 'bg-yellow-500 text-black'
                            : 'bg-green-500 text-black'
                    } `}
                  >
                    {pending.priority}
                  </span>
                </div>

                <p className="line-clamp-3 text-sm text-neutral-300">
                  {pending.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1">
                  {pending.tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-neutral-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedItem>
          ))}
      </div>

      {showGradients && (
        <>
          <div
            className="pointer-events-none absolute top-0 right-0 left-0 h-[50px] bg-gradient-to-b from-[#060010] to-transparent transition-opacity duration-300"
            style={{ opacity: topGradientOpacity }}
          />
          <div
            className="pointer-events-none absolute right-0 bottom-0 left-0 h-[100px] bg-gradient-to-t from-[#060010] to-transparent transition-opacity duration-300"
            style={{ opacity: bottomGradientOpacity }}
          />
        </>
      )}
    </div>
  );
}
