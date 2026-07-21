import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function InteractivePopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Show popup shortly after entering
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible && !isAccepted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="glass-card max-w-md w-full p-8 rounded-3xl text-center shadow-2xl border border-purple-500/30 pointer-events-auto relative"
            style={{ 
              background: 'rgba(20, 10, 30, 0.85)',
              backdropFilter: 'blur(24px)'
            }}
          >
            {!isAccepted ? (
              <div className="flex flex-col items-center">
                <Heart className="w-12 h-12 text-rose-400 mb-6 drop-shadow-[0_0_15px_rgba(225,29,72,0.6)] animate-pulse" fill="rgba(225,29,72,0.3)" />
                <h3 className="font-serif text-3xl text-white/90 mb-2 italic">
                  Siapa kamu?
                </h3>
                <p className="text-white/70 mb-6 text-sm font-light">
                  Apa yang kamu lakukan di situs web ini?
                </p>
                
                <div className="flex flex-col items-center gap-5 w-full mt-2">
                  <p className="text-white/95 text-lg md:text-xl font-medium tracking-wide">Masukkan 3 digit terakhir nomor WhatsApp-mu:</p>
                  <input
                    type="text"
                    maxLength={3}
                    value={inputValue}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setInputValue(val);
                      if (val.length === 3) {
                        if (val === '580') {
                          setIsAccepted(true);
                          setTimeout(() => setIsVisible(false), 3000);
                        } else {
                          // Wrong number: grant normal website access
                          setIsVisible(false);
                        }
                      }
                    }}
                    placeholder="***"
                    className="bg-black/20 border border-purple-500/50 rounded-xl px-4 py-3 text-center text-white focus:outline-none focus:ring-2 focus:ring-purple-400 w-32 tracking-[0.5em] font-mono text-xl shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                  />
                </div>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", duration: 0.8, bounce: 0.5 }}
                className="flex flex-col items-center py-8 text-center space-y-5"
              >
                <motion.div 
                  animate={{ scale: [1, 1.15, 1] }} 
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <Heart className="w-20 h-20 text-rose-500 mb-2 drop-shadow-[0_0_25px_rgba(225,29,72,0.8)]" fill="rgba(225,29,72,0.6)" />
                </motion.div>
                <h3 className="font-serif text-3xl md:text-4xl text-white/95 italic text-glow text-rose-200">
                  Ya Ampun! ✨
                </h3>
                <p className="text-xl md:text-2xl font-light text-white/90">
                  Selamat datang istriku!
                </p>
                <p className="text-lg font-medium text-purple-200 mt-4 bg-purple-900/40 px-6 py-3 rounded-2xl border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                  Selamat datang di situs web ini, Ratu. ❤️
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
