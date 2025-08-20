'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';

// Firebase
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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

export default function TasksAnimatedList({
  items = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6',
    'Item 7',
    'Item 8',
    'Item 9',
    'Item 10',
    'Item 11',
    'Item 12',
    'Item 13',
    'Item 14',
    'Item 15',
  ],
  collectionName = 'tasks',
  showGradients = false,
  enableArrowNavigation = true,
  displayScrollbar = false,
  className = '',
}) {
  const listRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [keyboardNav, setKeyboardNav] = useState(false);

  const [topGradientOpacity, setTopGradientOpacity] = useState(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);

  const handleScroll = (e) => {
    if (!showGradients) return;
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setTopGradientOpacity(Math.min(scrollTop / 50, 1));
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);
    setBottomGradientOpacity(
      scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1)
    );
  };

  useEffect(() => {
    if (!enableArrowNavigation) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex((prev) => Math.min(prev + 1, items.length - 1));
      } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enableArrowNavigation, items.length]);

  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;
    const container = listRef.current;
    const selectedItem = container.querySelector(
      `[data-index="${selectedIndex}"]`
    );
    if (selectedItem) {
      const extraMargin = 50;
      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const itemTop = selectedItem.offsetTop;
      const itemBottom = itemTop + selectedItem.offsetHeight;

      if (itemTop < containerScrollTop + extraMargin) {
        container.scrollTo({ top: itemTop - extraMargin, behavior: 'smooth' });
      } else if (
        itemBottom >
        containerScrollTop + containerHeight - extraMargin
      ) {
        container.scrollTo({
          top: itemBottom - containerHeight + extraMargin,
          behavior: 'smooth',
        });
      }
    }
    setKeyboardNav(false);
  }, [selectedIndex, keyboardNav]);

  const scrollStyle = displayScrollbar
    ? {}
    : {
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      };

  // -----------------FIREBASE-------------------------------------
  // Firebase States
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const tasksArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(tasksArray);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className={`relative w-full ${className}`}>
      <div
        ref={listRef}
        className={`overflow-y-auto ${
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

        {tasks.map((task, index) => (
          <AnimatedItem
            key={task.id}
            index={index}
            onMouseEnter={() => setSelectedIndex(index)}
            onClick={() => setSelectedIndex(index)}
          >
            <div
              className={`group rounded-xl border border-blue-400/50 bg-[#0d1117] p-4 transition-colors duration-200 hover:bg-[#161b22]`}
            >
              <div className="mb-2 flex items-center justify-between">
                <h4 className="truncate text-base font-semibold text-white">
                  {task.name}
                </h4>
                <span
                  className={`ml-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium text-white uppercase ${
                    task.priority === 'urgent'
                      ? 'bg-red-600'
                      : task.priority === 'high'
                        ? 'bg-orange-500'
                        : task.priority === 'medium'
                          ? 'bg-yellow-500 text-black'
                          : 'bg-green-500 text-black'
                  } `}
                >
                  {task.priority}
                </span>
              </div>

              <p className="line-clamp-3 text-sm text-neutral-300">
                {task.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1">
                {task.tags?.map((tag, idx) => (
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
