import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useState } from 'react';

interface EntryGateProps {
  onEnter: () => void;
}

export default function EntryGate({ onEnter }: EntryGateProps) {
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0c] bg-opacity-90 backdrop-blur-md"
        >
          <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center">
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
              className="relative mb-12"
            >
              <div className="absolute inset-0 bg-purple-400/20 blur-3xl rounded-full scale-150 animate-pulse" />
              <Heart className="w-16 h-16 text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] animate-pulse" strokeWidth={1} />
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="font-serif text-2xl md:text-3xl text-white/90 leading-relaxed tracking-wide mb-16 text-glow"
            >
              Someone prepared something special just for you...
            </motion.h1>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 1 }}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEnter}
              className="glass px-8 py-4 rounded-full font-sans text-sm tracking-[0.2em] uppercase text-white/80 hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] border border-white/20 hover:border-white/40"
            >
              Tap to Enter <span className="ml-2">♡</span>
            </motion.button>
          </div>
          
          <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen bg-[radial-gradient(circle_at_50%_50%,_rgba(251,113,133,0.1)_0%,_transparent_50%)]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
