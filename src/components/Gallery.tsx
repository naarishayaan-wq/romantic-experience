import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import instaPic from '../assets/insta_pic.webp';
import romanticWalk from '../assets/romantic_walk.png';
import cozyPicnic from '../assets/cozy_picnic.png';
import sunsetHeart from '../assets/sunset_heart.png';
import ourBeautifulDream from '../assets/our_beautiful_dream.mp4';
import thirdVideo from '../assets/third_video.mp4';
import fourthVideo from '../assets/fourth_video.mp4';

type GalleryItem =
  | { type: 'image'; src: string; alt: string }
  | { type: 'video'; src: string; alt: string };

const items: GalleryItem[] = [
  {
    type: 'image',
    src: instaPic,
    alt: 'Our Beautiful Moment'
  },
  {
    type: 'video',
    src: ourBeautifulDream,
    alt: 'Our Beautiful Dream'
  },
  {
    type: 'video',
    src: thirdVideo,
    alt: 'A beautiful memory'
  },
  {
    type: 'video',
    src: fourthVideo,
    alt: 'For You My Wife'
  }
];

export default function Gallery() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto w-full">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
            className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer"
            onClick={() => setSelectedItem(item)}
            role="button"
            tabIndex={0}
            aria-label={item.type === 'video' ? `Play video: ${item.alt}` : `View ${item.alt} in fullscreen`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedItem(item);
              }
            }}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 z-10" />
            {item.type === 'video' ? (
              <>
                <video
                  src={item.src}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  muted
                  loop
                  playsInline
                  autoPlay
                  aria-hidden="true"
                />
                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                    <Play className="w-5 h-5 text-white/90 ml-0.5" />
                  </div>
                </div>
              </>
            ) : (
              <img 
                src={item.src} 
                alt={item.alt} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            )}
            {/* Soft border inner glow */}
            <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none z-20" />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-12 cursor-pointer"
            onClick={() => setSelectedItem(null)}
          >
            <button 
              className="absolute top-6 right-6 p-2 rounded-full glass text-white/70 hover:text-white z-50 transition-colors"
              onClick={() => setSelectedItem(null)}
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            
            {selectedItem.type === 'video' ? (
              <motion.video
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                src={selectedItem.src}
                controls
                autoPlay
                playsInline
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                src={selectedItem.src}
                alt={selectedItem.alt}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
