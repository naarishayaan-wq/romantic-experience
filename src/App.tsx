import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useState, useEffect, useRef } from 'react';
import EntryGate from './components/EntryGate';
import Experience from './components/Experience';
import CursorEffects from './components/CursorEffects';
import FlirtyDeveloperPopups from './components/FlirtyDeveloperPopups';
import InteractivePopup from './components/InteractivePopup';
import welcomeSound from '@assets/Welcome_Baby_1783502355140.wav';

const queryClient = new QueryClient();

function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [startBackgroundMusic, setStartBackgroundMusic] = useState(false);
  const welcomeAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (hasEntered) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 800); // match entry gate fade out duration
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [hasEntered]);

  const handleEnter = () => {
    setHasEntered(true);

    // Play the welcome greeting right as the visitor enters.
    const welcomeAudio = new Audio(welcomeSound);
    welcomeAudioRef.current = welcomeAudio;

    const beginBackgroundMusic = () => setStartBackgroundMusic(true);
    welcomeAudio.addEventListener('ended', beginBackgroundMusic);
    welcomeAudio.addEventListener('error', beginBackgroundMusic);

    welcomeAudio.play().catch(() => {
      // Autoplay was blocked -- fall back straight to the background music
      // fade-in so the experience never stalls silently.
      beginBackgroundMusic();
    });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="bg-mesh min-h-[100dvh] w-full text-foreground relative selection:bg-white/20">
          <CursorEffects />
          
          {!hasEntered && (
            <EntryGate onEnter={handleEnter} />
          )}
          
          {hasEntered && (
            <div 
              className={`transition-opacity duration-1000 ease-in-out ${
                showContent ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {showContent && (
                <>
                  <FlirtyDeveloperPopups />
                  <InteractivePopup />
                  <Experience startBackgroundMusic={startBackgroundMusic} />
                </>
              )}
            </div>
          )}
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
