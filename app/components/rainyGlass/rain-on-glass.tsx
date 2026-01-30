"use client";

import { useEffect, useRef, useCallback } from "react";

interface Droplet {
  x: number;
  y: number;
  radius: number;
  velocity: number;
  trail: { x: number; y: number; radius: number }[];
  lastTrailTime: number;
  wobble: number;
  wobbleSpeed: number;
}

interface RainOnGlassProps {
  className?: string;
  dropletCount?: number;
  maxDropletSize?: number;
  minDropletSize?: number;
  speed?: number;
  trailLength?: number;
  backgroundColor?: string;
  blurAmount?: number;
}

export function RainOnGlass({
  className = "",
  dropletCount = 60,
  maxDropletSize = 12,
  minDropletSize = 2,
  speed = 1,
  trailLength = 15,
  backgroundColor = "rgba(30, 40, 60, 0.85)",
  blurAmount = 8,
}: RainOnGlassProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropletsRef = useRef<Droplet[]>([]);
  const animationRef = useRef<number | null>(null);

  const createDroplet = useCallback(
    (canvas: HTMLCanvasElement, atTop = false): Droplet => {
      const radius =
        minDropletSize + Math.random() * (maxDropletSize - minDropletSize);
      return {
        x: Math.random() * canvas.width,
        y: atTop ? -radius : Math.random() * canvas.height,
        radius,
        velocity:
          (0.5 + Math.random() * 1.5) * speed * (radius / maxDropletSize),
        trail: [],
        lastTrailTime: 0,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.02 + Math.random() * 0.03,
      };
    },
    [maxDropletSize, minDropletSize, speed]
  );

  const checkCollision = (d1: Droplet, d2: Droplet): boolean => {
    const dx = d1.x - d2.x;
    const dy = d1.y - d2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < d1.radius + d2.radius;
  };

  const mergeDroplets = (d1: Droplet, d2: Droplet): Droplet => {
    const totalArea =
      Math.PI * d1.radius * d1.radius + Math.PI * d2.radius * d2.radius;
    const newRadius = Math.sqrt(totalArea / Math.PI);
    const larger = d1.radius > d2.radius ? d1 : d2;

    return {
      x: larger.x,
      y: Math.max(d1.y, d2.y),
      radius: Math.min(newRadius, maxDropletSize * 1.5),
      velocity: Math.max(d1.velocity, d2.velocity) * 1.2,
      trail: larger.trail,
      lastTrailTime: larger.lastTrailTime,
      wobble: larger.wobble,
      wobbleSpeed: larger.wobbleSpeed,
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize droplets
    dropletsRef.current = Array.from({ length: dropletCount }, () =>
      createDroplet(canvas, false)
    );

    const drawDroplet = (droplet: Droplet) => {
      const { x, y, radius, trail } = droplet;

      // Draw trail
      trail.forEach((point, index) => {
        const alpha = (index / trail.length) * 0.3;
        const trailRadius = point.radius * (0.3 + (index / trail.length) * 0.4);

        ctx.beginPath();
        ctx.arc(point.x, point.y, trailRadius, 0, Math.PI * 2);

        const gradient = ctx.createRadialGradient(
          point.x - trailRadius * 0.3,
          point.y - trailRadius * 0.3,
          0,
          point.x,
          point.y,
          trailRadius
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.8})`);
        gradient.addColorStop(0.5, `rgba(200, 220, 255, ${alpha * 0.4})`);
        gradient.addColorStop(1, `rgba(150, 180, 220, ${alpha * 0.1})`);

        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Draw main droplet with glass-like refraction effect
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);

      const mainGradient = ctx.createRadialGradient(
        x - radius * 0.4,
        y - radius * 0.4,
        0,
        x,
        y,
        radius
      );
      mainGradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
      mainGradient.addColorStop(0.3, "rgba(220, 235, 255, 0.6)");
      mainGradient.addColorStop(0.7, "rgba(180, 200, 230, 0.3)");
      mainGradient.addColorStop(1, "rgba(100, 140, 180, 0.15)");

      ctx.fillStyle = mainGradient;
      ctx.fill();

      // Highlight
      ctx.beginPath();
      ctx.arc(
        x - radius * 0.3,
        y - radius * 0.3,
        radius * 0.25,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.fill();

      // Subtle border
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.lineWidth = 0.5;
      ctx.stroke();
    };

    const animate = (timestamp: number) => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      let droplets = dropletsRef.current;

      // Update droplets
      droplets.forEach((droplet) => {
        // Add wobble effect
        droplet.wobble += droplet.wobbleSpeed;
        const wobbleOffset = Math.sin(droplet.wobble) * 0.5;

        // Move droplet
        droplet.y += droplet.velocity;
        droplet.x += wobbleOffset;

        // Add trail points
        if (timestamp - droplet.lastTrailTime > 50) {
          droplet.trail.push({
            x: droplet.x,
            y: droplet.y - droplet.radius,
            radius: droplet.radius,
          });

          if (droplet.trail.length > trailLength) {
            droplet.trail.shift();
          }

          droplet.lastTrailTime = timestamp;
        }

        // Gradually slow down smaller droplets (surface tension effect)
        if (droplet.radius < maxDropletSize * 0.5) {
          droplet.velocity *= 0.998;
          if (droplet.velocity < 0.1) {
            droplet.velocity = 0.1 + Math.random() * 0.2;
          }
        }
      });

      // Check for collisions and merge droplets
      const toRemove = new Set<number>();
      const toAdd: Droplet[] = [];

      for (let i = 0; i < droplets.length; i++) {
        if (toRemove.has(i)) continue;

        for (let j = i + 1; j < droplets.length; j++) {
          if (toRemove.has(j)) continue;

          if (checkCollision(droplets[i], droplets[j])) {
            const merged = mergeDroplets(droplets[i], droplets[j]);
            toRemove.add(i);
            toRemove.add(j);
            toAdd.push(merged);
            break;
          }
        }
      }

      // Apply merges
      droplets = droplets.filter((_, index) => !toRemove.has(index));
      droplets.push(...toAdd);

      // Reset droplets that go off screen and spawn new ones
      droplets = droplets.map((droplet) => {
        if (droplet.y > rect.height + droplet.radius * 2) {
          return createDroplet(canvas, true);
        }
        if (
          droplet.x < -droplet.radius ||
          droplet.x > rect.width + droplet.radius
        ) {
          return createDroplet(canvas, true);
        }
        return droplet;
      });

      // Maintain droplet count
      while (droplets.length < dropletCount) {
        droplets.push(createDroplet(canvas, true));
      }

      dropletsRef.current = droplets;

      // Draw all droplets
      droplets.forEach(drawDroplet);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [createDroplet, dropletCount, maxDropletSize, trailLength]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor }}
    >
      {/* Blur overlay for glass effect */}
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: `blur(${blurAmount}px)`,
          WebkitBackdropFilter: `blur(${blurAmount}px)`,
        }}
      />

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Rain droplets canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Glass reflection overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)",
        }}
      />
    </div>
  );
}
