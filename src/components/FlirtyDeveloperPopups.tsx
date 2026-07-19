import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code2, Heart, GitCommit } from 'lucide-react';

interface PopupMessage {
  id: number;
  icon: React.ReactNode;
  text: React.ReactNode;
  delay: number;
  duration: number;
}

export default function FlirtyDeveloperPopups() {
  const [activePopups, setActivePopups] = useState<PopupMessage[]>([]);

  const messages: PopupMessage[] = [
    {
      id: 1,
      icon: <Heart className="w-4 h-4 text-rose-400" />,
      text: <span className="text-white/90">Just thinking about your beautiful smile...</span>,
      delay: 2000,
      duration: 5000,
    },
    {
      id: 2,
      icon: <Heart className="w-4 h-4 text-purple-400" />,
      text: <span className="text-white/90">You are the most amazing person in my life.</span>,
      delay: 4500,
      duration: 6000,
    },
    {
      id: 3,
      icon: <Heart className="w-4 h-4 text-rose-400" />,
      text: <span className="text-white/90">Every moment with you feels like magic. ✨</span>,
      delay: 8000,
      duration: 7000,
    },
    {
      id: 4,
      icon: <Heart className="w-4 h-4 text-fuchsia-400" />,
      text: <span className="text-white/90">I love you more than words can say.</span>,
      delay: 12000,
      duration: 7000,
    },
    {
      id: 5,
      icon: <Heart className="w-4 h-4 text-purple-400" />,
      text: <span className="text-white/90">You are my today and all of my tomorrows. ❤️</span>,
      delay: 16000,
      duration: 8000,
    },
    {
      id: 6,
      icon: <Heart className="w-4 h-4 text-rose-400" />,
      text: <span className="text-white/90">Forever yours, completely in love.</span>,
      delay: 21000,
      duration: 8000,
    }
  ];

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    messages.forEach((msg) => {
      // Add popup
      const addTimer = setTimeout(() => {
        setActivePopups((prev) => [...prev, msg]);
        
        // Remove popup after its duration
        const removeTimer = setTimeout(() => {
          setActivePopups((prev) => prev.filter((p) => p.id !== msg.id));
        }, msg.duration);
        timeouts.push(removeTimer);
        
      }, msg.delay);
      timeouts.push(addTimer);
    });

    return () => timeouts.forEach((t) => clearTimeout(t));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-4 pointer-events-none w-[95%] max-w-[400px] md:max-w-[500px]">
      <AnimatePresence>
        {activePopups.map((popup) => (
          <motion.div
            key={popup.id}
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.9, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="glass-card px-5 py-4 rounded-xl shadow-2xl shadow-purple-500/10 border border-purple-500/30 flex items-start gap-4"
            style={{ 
              background: 'rgba(15, 5, 25, 0.6)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <div className="mt-1 shrink-0 animate-pulse scale-125">
              {popup.icon}
            </div>
            <div className="font-mono text-base md:text-lg leading-relaxed drop-shadow-md">
              {popup.text}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
