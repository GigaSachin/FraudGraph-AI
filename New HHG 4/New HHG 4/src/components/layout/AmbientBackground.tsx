import React, { useEffect, useRef } from 'react';

export const AmbientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes for faint background network
    const particleCount = 28;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      radius: Math.random() * 2 + 1.2,
      // Subtle palette: sage, soft taupe, muted lavender, warm amber
      color: [
        'rgba(77, 130, 113, 0.22)',   // Sage
        'rgba(122, 111, 142, 0.18)',  // Lavender
        'rgba(164, 153, 137, 0.25)',  // Warm Stone
        'rgba(199, 136, 50, 0.16)',   // Amber
      ][Math.floor(Math.random() * 4)],
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.09;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(77, 130, 113, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce gently at screen edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Soft ambient organic radial gradients */}
      <div 
        className="absolute top-[-10%] left-[15%] w-[650px] h-[650px] rounded-full opacity-35 filter blur-[110px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(227, 236, 232, 0.85) 0%, rgba(246, 243, 237, 0) 70%)'
        }}
      />
      <div 
        className="absolute top-[40%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-30 filter blur-[130px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(236, 232, 242, 0.7) 0%, rgba(246, 243, 237, 0) 70%)'
        }}
      />
      <div 
        className="absolute bottom-[-10%] left-[30%] w-[550px] h-[550px] rounded-full opacity-25 filter blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(243, 220, 183, 0.5) 0%, rgba(246, 243, 237, 0) 70%)'
        }}
      />

      {/* Subtle Data Grid Texture */}
      <div className="absolute inset-0 bg-grid-subtle opacity-70" />

      {/* Dynamic drifting canvas particles */}
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};
