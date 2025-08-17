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
  collectionNames = null, // New prop for multiple collections
  showGradients = false,
  displayScrollbar = false,
  className = '',
}) {
  const listRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Image modal states
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

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

  // Image modal functions
  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setIsImageModalOpen(false);
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isImageModalOpen) {
        closeImageModal();
      }
    };

    if (isImageModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isImageModalOpen]);

  // -----------------FIREBASE-------------------------------------
  // Firebase States
  const [pendings, setPendings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendings = async () => {
      try {
        // Determine which collections to fetch from
        const collectionsToFetch = collectionNames || [collectionName];

        console.log(
          '🔥 PendingAnimatedList: Fetching from collections:',
          collectionsToFetch
        );
        console.log('🔥 Using database:', dbTestigoMX.app.name);

        // Fetch from all collections
        const allPendingsPromises = collectionsToFetch.map(async (colName) => {
          const querySnapshot = await getDocs(collection(dbTestigoMX, colName));
          return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            collection: colName, // Add collection name to identify source
            ...doc.data(),
          }));
        });

        // Wait for all collections to be fetched
        const allPendingsArrays = await Promise.all(allPendingsPromises);

        // Flatten all arrays into a single array
        const allPendings = allPendingsArrays.flat();

        // Filter only unauthorized items (authorized: false)
        const unauthorizedPendings = allPendings.filter(
          (item) => item.authorized === false
        );

        console.log(
          '🔥 PendingAnimatedList: Found',
          allPendings.length,
          'total documents'
        );
        console.log(
          '🔥 PendingAnimatedList: Found',
          unauthorizedPendings.length,
          'unauthorized documents'
        );
        console.log('🔥 PendingAnimatedList: Data:', unauthorizedPendings);

        setPendings(unauthorizedPendings);
        setLoading(false);
      } catch (error) {
        console.error(
          '❌ Error fetching pendings from collections:',
          collectionsToFetch,
          error
        );
      }
    };

    fetchPendings();
  }, [collectionName, collectionNames]);

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
          pendings.map((pending, index) => {
            // Determine fields based on collection - support different schemas
            const title = pending.type || pending.tipo || 'No Title';
            const description =
              pending.description || pending.senas || 'No Description';
            const priority = pending.priority || 'normal';
            const tags = pending.tags || [];

            // Get image URL based on collection
            let imageUrl = null;
            if (
              pending.collection === 'objects' &&
              pending.imageUrls &&
              pending.imageUrls.length > 0
            ) {
              imageUrl = pending.imageUrls[0];
            } else if (
              (pending.collection === 'reportLost' ||
                pending.collection === 'reportMissing') &&
              pending.posterUrl
            ) {
              imageUrl = pending.posterUrl;
            }

            // Format createdAt date
            const formatDate = (timestamp) => {
              if (!timestamp) return 'No Date';

              // Handle both Firestore Timestamp and regular date strings/objects
              let date;
              if (timestamp && typeof timestamp.toDate === 'function') {
                // Firestore Timestamp
                date = timestamp.toDate();
              } else if (
                timestamp &&
                typeof timestamp === 'object' &&
                timestamp.seconds
              ) {
                // Firestore Timestamp-like object
                date = new Date(timestamp.seconds * 1000);
              } else {
                // Regular date string or Date object
                date = new Date(timestamp);
              }

              return date.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
              });
            };

            const formattedDate = formatDate(pending.createdAt);

            return (
              <AnimatedItem
                key={pending.id}
                index={index}
                onMouseEnter={() => setSelectedIndex(index)}
                onClick={() => setSelectedIndex(index)}
              >
                <div
                  className={`group rounded-xl border border-neutral-800 bg-[#0d1117] p-4 shadow-md transition-colors duration-200 hover:bg-[#161b22]`}
                >
                  <div className="mb-2">
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="truncate text-base font-semibold text-white">
                        {title}
                      </h4>
                      {priority && priority !== 'normal' && (
                        <span
                          className={`ml-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium text-white ${
                            priority === 'urgent'
                              ? 'bg-red-600'
                              : priority === 'high'
                                ? 'bg-orange-500'
                                : priority === 'medium'
                                  ? 'bg-yellow-500 text-black'
                                  : 'bg-green-500 text-black'
                          } `}
                        >
                          {priority}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {pending.collection && (
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                            pending.collection === 'objects'
                              ? 'bg-green-600/20 text-green-400'
                              : pending.collection === 'reportLost'
                                ? 'bg-red-600/20 text-red-400'
                                : pending.collection === 'reportMissing'
                                  ? 'bg-orange-600/20 text-orange-400'
                                  : 'bg-blue-600/20 text-blue-400'
                          }`}
                        >
                          {pending.collection}
                        </span>
                      )}
                      <span className="rounded-full bg-purple-600/20 px-2 py-0.5 text-[10px] font-medium text-purple-400">
                        📅 {formattedDate}
                      </span>
                    </div>
                  </div>

                  {/* Content section with description and image */}
                  <div className="flex items-start gap-3">
                    <p className="line-clamp-3 flex-1 text-sm text-neutral-300">
                      {description}
                    </p>

                    {/* Image section */}
                    {imageUrl && (
                      <div className="flex-shrink-0">
                        <img
                          src={imageUrl}
                          alt="Preview"
                          className="h-16 w-16 cursor-pointer rounded-lg border border-neutral-700 object-cover transition-colors hover:border-neutral-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            openImageModal(imageUrl);
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1">
                    {tags.map((tag, idx) => (
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
            );
          })}
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

      {/* Image Modal */}
      {isImageModalOpen && selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeImageModal}
        >
          <div className="relative max-h-[90vh] max-w-[90vw] p-4">
            {/* Close button */}
            <button
              className="absolute -top-2 -right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white transition-colors hover:bg-red-700"
              onClick={closeImageModal}
            >
              ✕
            </button>

            {/* Image */}
            <img
              src={selectedImage}
              alt="Full size preview"
              className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
