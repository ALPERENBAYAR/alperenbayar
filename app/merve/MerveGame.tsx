"use client";

import { useEffect, useRef, useState } from "react";

type Platform = {
  x: number;
  width: number;
};

type Phase =
  | "waiting"
  | "growing"
  | "turning"
  | "walking"
  | "shifting"
  | "falling"
  | "celebrating"
  | "over";

export default function MerveGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const restartRef = useRef<() => void>(() => undefined);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [reached, setReached] = useState(false);
  const [merveReady, setMerveReady] = useState(false);

  const scoreRef = useRef(0);
  const gameOverRef = useRef(false);
  const reachedRef = useRef(false);
  const merveImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const deviceScale = Math.min(window.devicePixelRatio || 1, 1.5);

    const state = {
      phase: "waiting" as Phase,
      platforms: [] as Platform[],
      platformIndex: 0,
      platformY: 0,
      viewWidth: 0,
      hero: {
        x: 0,
        y: 0,
        width: 34,
        height: 58,
        walkSpeed: 3.4,
      },
      stick: {
        length: 0,
        rotation: 0,
        growSpeed: 6.5,
        rotationSpeed: 6,
      },
      cameraX: 0,
      targetCameraX: 0,
      lastTime: performance.now(),
      celebrationStart: 0,
    };

    const colors = {
      skyTop: "#ffd6e7",
      skyBottom: "#ff9ebd",
      hillFar: "#f7a9c4",
      hillNear: "#e67aa2",
      platform: "#2a1220",
      platformEdge: "#1c0d15",
      stick: "#f2c79b",
      stickShadow: "#2a2f40",
      score: "#2a1220",
      heart: "rgba(255,255,255,0.35)",
    };

    const updateCanvasSize = () => {
      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : window.innerWidth;
      const height = Math.min(window.innerHeight * 0.75, 520);

      canvas.width = width * deviceScale;
      canvas.height = height * deviceScale;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(deviceScale, 0, 0, deviceScale, 0, 0);

      state.viewWidth = width;
      state.platformY = height * 0.74;
      state.hero.y = state.platformY - state.hero.height;
    };

    const loadMerveImage = () => {
      const img = new Image();
      img.src = "/merve.png";
      img.onload = () => {
        merveImageRef.current = img;
        setMerveReady(true);
      };
      img.onerror = () => {
        setMerveReady(false);
      };
    };

    const createPlatform = (startX: number): Platform => {
      const maxGap = Math.max(60, Math.min(160, state.viewWidth * 0.35));
      const minGap = Math.max(40, Math.min(90, state.viewWidth * 0.2));
      const gap = Math.random() * (maxGap - minGap) + minGap;
      const maxWidth = Math.max(70, Math.min(170, state.viewWidth * 0.32));
      const minWidth = Math.max(60, Math.min(120, state.viewWidth * 0.2));
      const width = Math.random() * (maxWidth - minWidth) + minWidth;
      return { x: startX + gap, width };
    };

    const resetGame = () => {
      const baseWidth = Math.max(90, Math.min(150, state.viewWidth * 0.28));
      state.platforms = [{ x: 0, width: baseWidth }];
      state.platforms.push(
        createPlatform(state.platforms[0].x + state.platforms[0].width)
      );
      state.platformIndex = 0;
      state.hero.x =
        state.platforms[0].x + state.platforms[0].width - state.hero.width;
      state.hero.y = state.platformY - state.hero.height;
      state.stick.length = 0;
      state.stick.rotation = 0;
      state.phase = "waiting";
      state.cameraX = 0;
      state.targetCameraX = 0;
      state.celebrationStart = 0;
      scoreRef.current = 0;
      setScore(0);
      gameOverRef.current = false;
      setGameOver(false);
      reachedRef.current = false;
      setReached(false);
    };

    restartRef.current = resetGame;

    const drawBackground = () => {
      const width = canvas.width / deviceScale;
      const height = canvas.height / deviceScale;
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, colors.skyTop);
      gradient.addColorStop(1, colors.skyBottom);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const heart = (x: number, y: number, size: number) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(size, size);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-2.5, -2.5, -6, 0.5, 0, 6);
        ctx.bezierCurveTo(6, 0.5, 2.5, -2.5, 0, 0);
        ctx.fill();
        ctx.restore();
      };

      ctx.fillStyle = colors.heart;
      const heartCount = width < 480 ? 10 : 22;
      for (let i = 0; i < heartCount; i += 1) {
        const x = (i * 70 + (state.cameraX * 0.2) % 70) % width;
        const y = height * 0.2 + (i % 5) * 22;
        heart(x + 10, y + 8, 1.2);
      }

      ctx.fillStyle = colors.hillFar;
      ctx.beginPath();
      ctx.moveTo(-40, height * 0.6);
      ctx.quadraticCurveTo(width * 0.2, height * 0.52, width * 0.4, height * 0.58);
      ctx.quadraticCurveTo(width * 0.6, height * 0.66, width * 0.78, height * 0.6);
      ctx.quadraticCurveTo(width * 0.92, height * 0.56, width + 40, height * 0.62);
      ctx.lineTo(width + 40, height);
      ctx.lineTo(-40, height);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = colors.hillNear;
      ctx.beginPath();
      ctx.moveTo(-40, height * 0.72);
      ctx.quadraticCurveTo(width * 0.2, height * 0.64, width * 0.35, height * 0.7);
      ctx.quadraticCurveTo(width * 0.55, height * 0.78, width * 0.8, height * 0.7);
      ctx.quadraticCurveTo(width * 0.95, height * 0.66, width + 40, height * 0.74);
      ctx.lineTo(width + 40, height);
      ctx.lineTo(-40, height);
      ctx.closePath();
      ctx.fill();
    };

    const drawPlatforms = () => {
      ctx.fillStyle = colors.platform;
      ctx.strokeStyle = colors.platformEdge;
      ctx.lineWidth = 2;
      state.platforms.forEach((platform) => {
        ctx.fillRect(platform.x, state.platformY, platform.width, 16);
        ctx.strokeRect(platform.x, state.platformY, platform.width, 16);
      });
    };

    const drawStick = () => {
      if (state.stick.length <= 0) return;
      ctx.save();
      ctx.translate(state.hero.x + state.hero.width, state.platformY);
      ctx.rotate((state.stick.rotation * Math.PI) / 180);
      ctx.fillStyle = colors.stickShadow;
      ctx.fillRect(3, 0, 4, -state.stick.length);
      ctx.fillStyle = colors.stick;
      ctx.fillRect(0, 0, 4, -state.stick.length);
      ctx.restore();
    };

    const drawMerve = (x: number, y: number, scale = 1) => {
      const headRadius = 13 * scale;
      const centerX = x + (state.hero.width / 2) * scale;
      const headY = y + 12 * scale;

      ctx.fillStyle = "#f0c6ad";
      ctx.beginPath();
      ctx.arc(centerX, headY, headRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#5b3a25";
      ctx.beginPath();
      ctx.arc(centerX, headY - 7 * scale, headRadius + 5 * scale, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(
        centerX - headRadius - 8 * scale,
        headY - 6 * scale,
        headRadius + 12 * scale,
        30 * scale
      );
      ctx.fillRect(centerX - 3 * scale, headY - 6 * scale, headRadius + 8 * scale, 30 * scale);

      ctx.fillStyle = "#8e2a2f";
      ctx.fillRect(centerX - 18 * scale, headY - 8 * scale, 36 * scale, 10 * scale);
      ctx.beginPath();
      ctx.moveTo(centerX - 18 * scale, headY - 8 * scale);
      ctx.lineTo(centerX - 30 * scale, headY - 2 * scale);
      ctx.lineTo(centerX - 18 * scale, headY + 2 * scale);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(centerX + 4.5 * scale, headY - 1.5 * scale, 4.2 * scale, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#7a4a2a";
      ctx.beginPath();
      ctx.arc(centerX + 5.5 * scale, headY - 1.5 * scale, 2.4 * scale, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#201010";
      ctx.beginPath();
      ctx.arc(centerX + 6.2 * scale, headY - 2 * scale, 1.2 * scale, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#1b1b1b";
      ctx.beginPath();
      ctx.arc(centerX - 4 * scale, headY - 2 * scale, 1.3 * scale, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(235,140,155,0.5)";
      ctx.beginPath();
      ctx.ellipse(centerX - 7.5 * scale, headY + 3 * scale, 3.6 * scale, 2.3 * scale, 0, 0, Math.PI * 2);
      ctx.ellipse(centerX + 7.5 * scale, headY + 3 * scale, 3.6 * scale, 2.3 * scale, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#c35c6a";
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.moveTo(centerX - 4.2 * scale, headY + 6.5 * scale);
      ctx.quadraticCurveTo(centerX, headY + 7.8 * scale, centerX + 4.2 * scale, headY + 6.5 * scale);
      ctx.stroke();

      ctx.fillStyle = "#1c1c1c";
      ctx.fillRect(centerX - 11 * scale, headY + 12 * scale, 22 * scale, 12 * scale);

      ctx.fillStyle = "#121212";
      ctx.fillRect(centerX - 12 * scale, headY + 22 * scale, 24 * scale, 20 * scale);

      ctx.fillStyle = "#0c0c0c";
      ctx.fillRect(centerX - 10 * scale, headY + 44 * scale, 6 * scale, 8 * scale);
      ctx.fillRect(centerX + 4 * scale, headY + 44 * scale, 6 * scale, 8 * scale);
    };

    const drawMerveImage = (x: number, y: number, scale = 1) => {
      const img = merveImageRef.current;
      if (!img) {
        drawMerve(x, y, scale);
        return;
      }

      const targetW = 34 * scale;
      const targetH = 58 * scale;
      const ratio = Math.min(targetW / img.width, targetH / img.height);
      const drawW = img.width * ratio;
      const drawH = img.height * ratio;
      const drawX = x + (targetW - drawW) / 2;
      const drawY = y + (targetH - drawH);
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    };

    const drawCat = (x: number, y: number, scale = 1) => {
      const bodyW = 16 * scale;
      const bodyH = 10 * scale;
      const headR = 5.5 * scale;
      const headX = x + bodyW - 1 * scale;
      const headY = y - 1 * scale;

      ctx.fillStyle = "#cfcfd2";
      ctx.fillRect(x, y, bodyW, bodyH);

      ctx.beginPath();
      ctx.arc(headX, headY, headR, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#b7b8bc";
      ctx.beginPath();
      ctx.moveTo(headX - 5 * scale, headY - 5 * scale);
      ctx.lineTo(headX - 2 * scale, headY - 9 * scale);
      ctx.lineTo(headX, headY - 4 * scale);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(headX + 5 * scale, headY - 5 * scale);
      ctx.lineTo(headX + 2 * scale, headY - 9 * scale);
      ctx.lineTo(headX, headY - 4 * scale);
      ctx.fill();

      ctx.fillStyle = "#1f1f1f";
      ctx.beginPath();
      ctx.arc(headX - 2 * scale, headY - 1 * scale, 0.9 * scale, 0, Math.PI * 2);
      ctx.arc(headX + 2 * scale, headY - 1 * scale, 0.9 * scale, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#d28686";
      ctx.beginPath();
      ctx.moveTo(headX, headY + 1 * scale);
      ctx.lineTo(headX - 1.2 * scale, headY + 2.5 * scale);
      ctx.lineTo(headX + 1.2 * scale, headY + 2.5 * scale);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = "#2b2b2b";
      ctx.lineWidth = 0.9 * scale;
      ctx.beginPath();
      ctx.moveTo(headX - 5 * scale, headY + 1 * scale);
      ctx.lineTo(headX - 1 * scale, headY + 1.5 * scale);
      ctx.moveTo(headX - 5 * scale, headY + 3 * scale);
      ctx.lineTo(headX - 1 * scale, headY + 2.5 * scale);
      ctx.moveTo(headX + 5 * scale, headY + 1 * scale);
      ctx.lineTo(headX + 1 * scale, headY + 1.5 * scale);
      ctx.moveTo(headX + 5 * scale, headY + 3 * scale);
      ctx.lineTo(headX + 1 * scale, headY + 2.5 * scale);
      ctx.stroke();

      ctx.strokeStyle = "#b7b8bc";
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.moveTo(x + 2 * scale, y + 2 * scale);
      ctx.quadraticCurveTo(x - 6 * scale, y - 4 * scale, x + 2 * scale, y - 8 * scale);
      ctx.stroke();
    };

    const drawAlperen = (x: number, y: number, scale = 1) => {
      const headRadius = 11.5 * scale;
      const centerX = x + (state.hero.width / 2) * scale;
      const headY = y + 12 * scale;

      ctx.fillStyle = "#edc3a7";
      ctx.beginPath();
      ctx.arc(centerX, headY, headRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#171717";
      ctx.beginPath();
      ctx.arc(centerX, headY - 7 * scale, headRadius + 4.5 * scale, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(
        centerX - headRadius - 4 * scale,
        headY - 8 * scale,
        headRadius * 2 + 8 * scale,
        10 * scale
      );

      ctx.strokeStyle = "#131313";
      ctx.lineWidth = 2.2 * scale;
      ctx.beginPath();
      ctx.moveTo(centerX - 8.5 * scale, headY - 6.5 * scale);
      ctx.lineTo(centerX - 1 * scale, headY - 7.5 * scale);
      ctx.moveTo(centerX + 8.5 * scale, headY - 6.5 * scale);
      ctx.lineTo(centerX + 1 * scale, headY - 7.5 * scale);
      ctx.stroke();

      ctx.fillStyle = "#0e0e0e";
      ctx.beginPath();
      ctx.arc(centerX - 4 * scale, headY - 2.2 * scale, 1.7 * scale, 0, Math.PI * 2);
      ctx.arc(centerX + 4 * scale, headY - 2.2 * scale, 1.7 * scale, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#8a4a4a";
      ctx.lineWidth = 1.7 * scale;
      ctx.beginPath();
      ctx.moveTo(centerX - 4.2 * scale, headY + 5.8 * scale);
      ctx.quadraticCurveTo(centerX, headY + 6.7 * scale, centerX + 4.2 * scale, headY + 5.8 * scale);
      ctx.stroke();

      ctx.fillStyle = "#1b1f28";
      ctx.fillRect(centerX - 12 * scale, headY + 10 * scale, 24 * scale, 16 * scale);
      ctx.fillStyle = "#12151c";
      ctx.fillRect(centerX - 12 * scale, headY + 22 * scale, 24 * scale, 26 * scale);

      ctx.fillStyle = "#0b0e14";
      ctx.fillRect(centerX - 10 * scale, headY + 46 * scale, 6 * scale, 8 * scale);
      ctx.fillRect(centerX + 4 * scale, headY + 46 * scale, 6 * scale, 8 * scale);
    };

    const drawHero = (now: number) => {
      const width = canvas.width / deviceScale;
      const heroScale = Math.max(1.5, Math.min(width / 300, 2));
      const yOffset = heroScale >= 1.6 ? -18 : -12;
      const isWalking = state.phase === "walking";
      const bob = isWalking ? Math.sin(now / 90) * 2.6 : 0;
      const sway = isWalking ? Math.sin(now / 110) * 1.4 : 0;
      const step = isWalking ? Math.sin(now / 70) * 0.8 : 0;
      drawMerveImage(state.hero.x + sway, state.hero.y + yOffset + bob, heroScale);
      drawCat(
        state.hero.x - 14 + sway * 0.8,
        state.hero.y + 42 + bob * 0.6 + step,
        heroScale * 0.9
      );
    };

    const drawScore = () => {
      const width = canvas.width / deviceScale;
      ctx.fillStyle = colors.score;
      ctx.font = "600 18px system-ui";
      ctx.textAlign = "right";
      ctx.fillText(`${scoreRef.current}`, width - 16, 28);
      ctx.textAlign = "start";
    };

    const drawCelebration = (now: number) => {
      const width = canvas.width / deviceScale;
      const height = canvas.height / deviceScale;
      const elapsed = Math.max(0, now - state.celebrationStart);
      const progress = Math.min(elapsed / 2600, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      ctx.fillStyle = "rgba(7,8,18,0.7)";
      ctx.fillRect(0, 0, width, height);

      const baseY = height * 0.52;
      const leftX = width / 2 - 130 + ease * 85;
      const rightX = width / 2 + 80;

      drawMerveImage(leftX, baseY, 1.1);

      const platformY = baseY + 58;
      const platformWidth = 90;
      ctx.fillStyle = colors.platform;
      ctx.strokeStyle = colors.platformEdge;
      ctx.lineWidth = 2;
      ctx.fillRect(rightX - 10, platformY, platformWidth, 16);
      ctx.strokeRect(rightX - 10, platformY, platformWidth, 16);

      drawAlperen(rightX + 16, baseY, 1.1);

      const pulse = 1 + Math.sin(now / 180) * 0.08;
      ctx.save();
      ctx.translate(width / 2, baseY + 12);
      ctx.scale(pulse, pulse);
      ctx.fillStyle = "#ff5c8a";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-10, -10, -24, 4, 0, 22);
      ctx.bezierCurveTo(24, 4, 10, -10, 0, 0);
      ctx.fill();
      ctx.restore();

      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.font = "600 20px system-ui";
      ctx.textAlign = "center";
      ctx.fillText("10. adımda Alperen seni bekliyordu", width / 2, height * 0.24);
      ctx.textAlign = "start";
    };

    const update = (dt: number) => {
      if (state.phase === "growing") {
        state.stick.length += state.stick.growSpeed * dt;
      }

      if (state.phase === "turning") {
        state.stick.rotation += state.stick.rotationSpeed * dt * 6;
        if (state.stick.rotation >= 90) {
          state.stick.rotation = 90;
          const current = state.platforms[state.platformIndex];
          const next = state.platforms[state.platformIndex + 1];
          const gap = next.x - (current.x + current.width);
          const maxReach = gap + next.width;
          if (state.stick.length >= gap && state.stick.length <= maxReach) {
            state.phase = "walking";
          } else {
            state.phase = "falling";
          }
        }
      }

      if (state.phase === "walking") {
        const target =
          state.platforms[state.platformIndex + 1].x +
          state.platforms[state.platformIndex + 1].width -
          state.hero.width;
        state.hero.x += state.hero.walkSpeed * dt * 6;
        if (state.hero.x >= target) {
          state.hero.x = target;
          scoreRef.current += 1;
          setScore(scoreRef.current);

          if (scoreRef.current >= 10) {
            state.stick.length = 0;
            state.stick.rotation = 0;
            state.phase = "celebrating";
            state.celebrationStart = performance.now();
            if (!reachedRef.current) {
              reachedRef.current = true;
              setReached(true);
              setGameOver(true);
              gameOverRef.current = true;
            }
            return;
          }

          state.phase = "shifting";
          state.stick.length = 0;
          state.stick.rotation = 0;
          state.platformIndex += 1;
          const last = state.platforms[state.platforms.length - 1];
          state.platforms.push(createPlatform(last.x + last.width));
          if (state.platforms.length > 12) {
            state.platforms = state.platforms.slice(state.platforms.length - 12);
            state.platformIndex = Math.max(0, state.platformIndex - 1);
          }
          state.targetCameraX = state.platforms[state.platformIndex].x - 60;
        }
      }

      if (state.phase === "shifting") {
        const diff = state.targetCameraX - state.cameraX;
        state.cameraX += diff * 0.08;
        if (Math.abs(diff) < 0.8) {
          state.cameraX = state.targetCameraX;
          state.stick.length = 0;
          state.stick.rotation = 0;
          state.phase = "waiting";
        }
      }

      if (state.phase === "falling") {
        state.hero.y += 6 * dt * 6;
        if (state.hero.y > state.platformY + 120) {
          state.phase = "over";
          if (!gameOverRef.current) {
            gameOverRef.current = true;
            setGameOver(true);
          }
        }
      }

      if (state.phase === "celebrating") {
        const elapsed = performance.now() - state.celebrationStart;
        if (elapsed > 2600) {
          state.phase = "over";
        }
      }
    };

    const draw = (now: number) => {
      const width = canvas.width / deviceScale;
      const height = canvas.height / deviceScale;

      ctx.clearRect(0, 0, width, height);
      drawBackground();

      ctx.save();
      ctx.translate(-state.cameraX, 0);
      drawPlatforms();
      drawStick();
      drawHero(now);
      ctx.restore();

      drawScore();

      if (reachedRef.current) {
        drawCelebration(now);
      }
    };

    const loop = () => {
      const now = performance.now();
      const dt = (now - state.lastTime) / 16.666;
      state.lastTime = now;
      update(dt);
      draw(now);
      requestAnimationFrame(loop);
    };

    const handlePointerDown = () => {
      if (state.phase !== "waiting") return;
      state.phase = "growing";
    };

    const handlePointerUp = () => {
      if (state.phase !== "growing") return;
      state.phase = "turning";
    };

    const handleTouchStart = (event: TouchEvent) => {
      event.preventDefault();
      handlePointerDown();
    };

    const handleTouchEnd = (event: TouchEvent) => {
      event.preventDefault();
      handlePointerUp();
    };

    updateCanvasSize();
    loadMerveImage();
    resetGame();
    loop();

    canvas.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });
    window.addEventListener("resize", updateCanvasSize);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
      <div className="flex items-center justify-between gap-4 pb-3">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-white/45">
            Oyun
          </p>
          <p className="text-lg font-semibold text-white">Skor: {score}</p>
        </div>
        <button
          type="button"
          onClick={() => restartRef.current()}
          onPointerUp={(event) => {
            event.preventDefault();
            restartRef.current();
          }}
          onTouchEnd={(event) => {
            event.preventDefault();
            restartRef.current();
          }}
          className="min-h-[44px] touch-manipulation rounded-full border border-white/20 bg-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 transition hover:border-white/40 hover:bg-white/20"
        >
          Yeniden Başlat
        </button>
      </div>
      <canvas
        ref={canvasRef}
        className="h-[420px] w-full select-none rounded-2xl border border-white/10 bg-black/20 touch-none"
      />
      <div className="mt-4 flex flex-col gap-2 text-sm text-white/70">
        <p>Basılı tut: köprü uzar. Bırak: düşür.</p>
        <p>Platforma ulaşınca skor artar. Amaç Alperen'e ulaşmak.</p>
      </div>
      {gameOver && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="rounded-2xl border border-white/20 bg-black/70 px-6 py-4 text-center">
            <p className="text-lg font-semibold text-white">
              {reached ? "Ulaştın!" : "Oyun Bitti"}
            </p>
            <p className="text-sm text-white/70">
              {reached
                ? "10. adımda Alperen seni bekliyordu. Yeniden Başlat ile tekrar oynayabilirsin."
                : "Tekrar denemek için Yeniden Başlat."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
