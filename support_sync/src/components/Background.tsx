import { cn } from "@/utils/cn";
import { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  blur = 10,
  waveWidth = 50,
  waveOpacity = 0.8, 
  colors = ["#fbcfe8", "#e9d5ff", "#f3e8ff", "#f9f5ff", "#f0abfc"],
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  blur?: number;
  waveWidth?: number;
  waveOpacity?: number;
  colors?: string[];
}) => {
  const noise = createNoise3D();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = (canvas.width = window.innerWidth);
    const h = (canvas.height = window.innerHeight);
    ctx.filter = `blur(${blur}px)`;

    const drawWave = (n: number) => {
      let nt = 0;
      const getSpeed = () => 0.001; // Adjust speed as necessary

      const render = () => {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "#e0f7fa"; // Lighter bluish-violet background color
        ctx.globalAlpha = waveOpacity; // Apply reduced opacity
        ctx.fillRect(0, 0, w, h);

        for (let i = 0; i < n; i++) {
          ctx.beginPath();
          ctx.lineWidth = waveWidth;
          ctx.strokeStyle = colors[i % colors.length];

          for (let x = 0; x < w; x += 5) {
            const y = noise(x / 800, 0.3 * i, nt) * 100;
            ctx.lineTo(x, y + h * 0.5); // Center the wave vertically
          }

          ctx.stroke();
          ctx.closePath();
        }
        nt += getSpeed();
        requestAnimationFrame(render);
      };
      render();
    };

    drawWave(5); // Draw 5 waves

    window.onresize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawWave(5); // Redraw waves on resize
    };
  };

  useEffect(() => {
    initCanvas();
  }, []);

  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      <canvas className="absolute inset-0 z-0" ref={canvasRef} />

      {/* Smaller Grid Background with Borders */}
      <div className="absolute inset-0 z-10 grid grid-cols-20 grid-rows-20 gap-0.5">
        {Array.from({ length: 400 }).map((_, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-700 opacity-30 h-full w-full border border-gray-300 dark:border-gray-600"
          />
        ))}
      </div>

      <div className={cn("relative z-20", className)}>{children}</div>
    </div>
  );
};
