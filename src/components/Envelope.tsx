import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Envelope() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLetterOut, setIsLetterOut] = useState(false);

  const handleOpen = () => {
    if (isOpen) {
      setIsLetterOut(false);
      setTimeout(() => setIsOpen(false), 500);
    } else {
      setIsOpen(true);
      setTimeout(() => setIsLetterOut(true), 600);
    }
  };

  return (
    <div
      className="relative w-full max-w-md mx-auto aspect-[4/3] cursor-pointer group"
      onClick={handleOpen}
      role="button"
      tabIndex={0}
      aria-label={isOpen ? 'Close the letter' : 'Open the letter'}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleOpen();
        }
      }}
    >
      {/* Glow effect behind envelope */}
      <div className="absolute inset-0 bg-purple-400/20 blur-[60px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-700" />
      
      {/* Envelope Base */}
      <motion.div 
        className="absolute inset-0 bg-[#e8dccb] rounded-md shadow-2xl overflow-visible"
        animate={{ 
          y: isOpen ? 50 : 0,
          scale: isOpen ? 1 : 1
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Envelope back styling */}
        <div className="absolute inset-0 border-[1px] border-black/5 rounded-md flex items-center justify-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div 
              className="absolute z-30 w-12 h-12 bg-fuchsia-900 rounded-full shadow-inner flex items-center justify-center border-2 border-fuchsia-800/50"
              animate={{ 
                opacity: isOpen ? 0 : 1,
                scale: isOpen ? 0 : 1 
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="font-serif text-purple-200/80 text-xl italic drop-shadow-md">Y</span>
            </motion.div>
          </div>
        </div>

        {/* Envelope Flap (Top) */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-1/2 bg-[#dfcbb3] origin-top z-20 shadow-[0_10px_10px_-10px_rgba(0,0,0,0.2)]"
          style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
          animate={{ rotateX: isOpen ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
        
        {/* Envelope Sides to cover letter initially */}
        <div className="absolute inset-0 bg-[#f2e6d6] z-10" style={{ clipPath: 'polygon(0 0, 50% 50%, 0 100%)' }} />
        <div className="absolute inset-0 bg-[#eee0ce] z-10" style={{ clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)' }} />
        <div className="absolute inset-0 bg-[#e3d1bb] z-10" style={{ clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)' }} />

        {/* The Letter */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ y: "10%", opacity: 0, scale: 0.9 }}
              animate={{ 
                y: isLetterOut ? "-120%" : "0%", 
                opacity: 1,
                scale: isLetterOut ? 1.5 : 0.9,
                zIndex: isLetterOut ? 50 : 5
              }}
              exit={{ y: "10%", opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute left-[5%] right-[5%] h-[90%] top-[5%] bg-[#faf9f6] rounded shadow-lg p-6 md:p-8 overflow-hidden pointer-events-none flex flex-col justify-center"
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.05\'/%3E%3C/svg%3E")'
              }}
            >
              <div className="font-['Alex_Brush'] text-slate-800 text-2xl md:text-3xl leading-relaxed text-center opacity-90 mix-blend-multiply">
                <p className="mb-4">My Dearest,</p>
                <p className="mb-4">
                  Every moment with you feels like a quiet kind of magic. 
                  You make the ordinary beautiful.
                </p>
                <p>Always yours.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
