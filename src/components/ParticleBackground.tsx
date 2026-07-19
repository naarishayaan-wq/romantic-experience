import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let lastScrollY = window.scrollY;

    // Colors: pink shades
    const colors = [
      'rgba(255, 105, 180, 0.4)', // Hot Pink
      'rgba(255, 182, 193, 0.4)', // Light Pink
      'rgba(255, 20, 147, 0.4)',  // Deep Pink
      'rgba(219, 112, 147, 0.4)'  // Pale Violet Red
    ];

    const particleTexts = ["My wife", "Waifu", "Wife", "Baka"];

    const elegantFonts = [
      'Georgia, serif',
      '"Palatino Linotype", "Book Antiqua", Palatino, serif',
      '"Times New Roman", Times, serif',
      '"Garamond", serif',
      'cursive',
      '"Brush Script MT", cursive',
      '"Courier New", Courier, monospace',
      'Arial, sans-serif'
    ];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
      pulseRate: number;
      maxAlpha: number;
      isText: boolean;
      text: string;
      fontFamily: string;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 4 + 1; // 1 to 5
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3 - 0.1; // Slight upward drift
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.maxAlpha = Math.random() * 0.5 + 0.3;
        this.alpha = Math.random() * this.maxAlpha;
        this.pulseRate = (Math.random() * 0.01) + 0.005;
        this.isText = Math.random() > 0.2; // 80% chance to be text
        this.text = particleTexts[Math.floor(Math.random() * particleTexts.length)];
        this.fontFamily = elegantFonts[Math.floor(Math.random() * elegantFonts.length)];
      }

      update(canvasWidth: number, canvasHeight: number, deltaY: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Scroll effect (parallax)
        this.y -= deltaY * (this.size * 0.2); // Closer (larger) particles move faster

        // Pulse alpha
        this.alpha += this.pulseRate;
        if (this.alpha <= 0 || this.alpha >= this.maxAlpha) {
          this.pulseRate = -this.pulseRate;
        }

        // Wrap around
        const boundsY = canvasHeight + 300;
        if (this.y < -150) this.y += boundsY;
        if (this.y > canvasHeight + 150) this.y -= boundsY;
        
        const boundsX = canvasWidth + 300;
        if (this.x < -150) this.x += boundsX;
        if (this.x > canvasWidth + 150) this.x -= boundsX;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const colorWithAlpha = this.color.replace(/[\d.]+\)$/g, `${Math.max(0, this.alpha)})`);

        if (this.isText) {
          ctx.save();
          ctx.fillStyle = colorWithAlpha;
          const isMobile = window.innerWidth < 768;
          const baseSize = isMobile ? this.size * 2 + 10 : this.size * 3 + 12; // Responsive sizing
          ctx.font = `italic ${baseSize}px ${this.fontFamily}`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.shadowBlur = 8;
          ctx.shadowColor = colorWithAlpha;
          ctx.fillText(this.text, this.x, this.y);
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          
          // Soft glowing effect
          const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size * 2
          );
          
          gradient.addColorStop(0, colorWithAlpha);
          gradient.addColorStop(1, 'rgba(0,0,0,0)');
          
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const particleCount = Math.min(window.innerWidth / 10, 120); // More particles for better effect
      particles = Array.from({ length: particleCount }, () => new Particle(canvas.width, canvas.height));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      particles.forEach(particle => {
        particle.update(canvas.width, canvas.height, deltaY);
        particle.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 mix-blend-screen"
      style={{ opacity: 0.7 }}
    />
  );
}
