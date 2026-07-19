import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';
import { motion } from 'framer-motion';
import lovinOnMeAudio from '../assets/lovin_on_me.mp3';

interface AudioPlayerProps {
  /** When true, the ambient track begins playing with a soft fade-in. */
  autoStart?: boolean;
}

export default function AudioPlayer({ autoStart = false }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // We handle gracefully if no source is loaded.
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Create audio element
    const audio = new Audio(lovinOnMeAudio);
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleError = () => {
      console.log('Audio failed to load, falling back to visual-only mode');
      setHasError(true);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('error', handleError);
      audio.pause();
    };
  }, []);

  // Once cued, start playback and fade the volume in smoothly.
  useEffect(() => {
    if (!autoStart || hasError) return undefined;

    const audio = audioRef.current;
    if (!audio) return undefined;

    audio
      .play()
      .then(() => {
        // Start from the beginning
        audio.currentTime = 0;
        setIsPlaying(true);
      })
      .catch(() => setHasError(true));

    const targetVolume = isMuted ? 0 : 0.5;
    const fadeStep = 0.02;
    const fadeInterval = setInterval(() => {
      const audioEl = audioRef.current;
      if (!audioEl) {
        clearInterval(fadeInterval);
        return;
      }
      const next = Math.min(audioEl.volume + fadeStep, targetVolume);
      audioEl.volume = next;
      if (next >= targetVolume) {
        clearInterval(fadeInterval);
      }
    }, 120);

    return () => clearInterval(fadeInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart, hasError]);

  // Fake progress simulation if audio fails
  useEffect(() => {
    if (hasError && isPlaying) {
      const interval = setInterval(() => {
        setProgress(prev => (prev + 0.1 > 100 ? 0 : prev + 0.1));
      }, 100);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [hasError, isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      if (!hasError) audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (!hasError) {
        audioRef.current.play().catch(() => setHasError(true));
      }
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 1 }}
      className="fixed top-6 right-6 z-50 glass rounded-2xl p-3 flex items-center gap-4 transition-all hover:bg-white/10"
    >
      <button 
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white/80"
      >
        {isPlaying ? (
          <Pause className="w-4 h-4" />
        ) : (
          <Play className="w-4 h-4 ml-1" />
        )}
      </button>

      <div className="flex flex-col gap-1.5 w-24">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/50">
          <Music className="w-3 h-3" />
          <span className="truncate">Playing</span>
        </div>
        
        {/* Progress bar */}
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-purple-300/60 rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <button 
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        className="p-2 text-white/50 hover:text-white/90 transition-colors"
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>

      {/* Equalizer bars (only active when playing) */}
      <div className="flex items-end gap-0.5 h-4 ml-1">
        {[1, 2, 3].map((bar) => (
          <motion.div
            key={bar}
            className="w-1 bg-white/40 rounded-t-sm"
            animate={{
              height: isPlaying && !isMuted ? ["20%", "100%", "40%", "80%", "20%"] : "20%"
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: bar * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
