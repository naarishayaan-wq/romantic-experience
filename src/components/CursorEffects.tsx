import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CursorEffects() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      // Spawn particles
      const newParticles = Array.from({ length: 6 }).map((_, i) => ({
        id: Date.now() + i,
        x: e.clientX,
        y: e.clientY
      }));
      setParticles(prev => [...prev, ...newParticles].slice(-20)); // Keep max 20
    };

    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {/* Main cursor glow */}
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-white/5 blur-2xl mix-blend-screen"
        animate={{
          x: mousePosition.x - 64,
          y: mousePosition.y - 64,
          scale: isClicking ? 0.8 : 1
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      />
      
      {/* Tiny dot */}
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full bg-white/50 backdrop-blur-sm"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          scale: isClicking ? 2 : 1
        }}
        transition={{ type: "spring", stiffness: 500, damping: 25, mass: 0.1 }}
      />

      {/* Click bursts */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full bg-purple-300/80"
          initial={{ x: particle.x, y: particle.y, scale: 1, opacity: 1 }}
          animate={{
            x: particle.x + (Math.random() - 0.5) * 100,
            y: particle.y + (Math.random() - 0.5) * 100 - 50,
            scale: 0,
            opacity: 0
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          onAnimationComplete={() => {
            setParticles(prev => prev.filter(p => p.id !== particle.id));
          }}
        />
      ))}
    </div>
  );
}
