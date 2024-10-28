"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Gradient from "../gradient";
import Slider from "../slider";
import glitter from "@/public/glitter.jpg";
import Title from "../title";

function Player() {
  const [paused, setPaused] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("canplay", handleLoadedMetadata);

      if (audio.readyState >= 1) {
        setDuration(audio.duration);
      }
    }

    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("canplay", handleLoadedMetadata);
      }
      audioContextRef.current?.close();
    };
  }, []);

  function initializeAudioContext() {
    if (!audioContextRef.current) {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const audio = audioRef.current;
      if (audio) {
        const source = audioContext.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
      }
    }
  }

  function handleClick() {
    const audio = audioRef.current;

    if (audio) {
      initializeAudioContext();

      // Resume audio context for browsers that require user interaction
      audioContextRef.current?.resume().then(() => {
        if (isPlaying) {
          audio.pause();
          setIsPlaying(false);
          setPaused(true);
        } else {
          audio.play();
          setIsPlaying(true);
          setPaused(false);
        }
      });
    }
  }

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) {
      setDuration(audio.duration);
    }
  };

  const handleSeek = (value: number) => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = value * duration;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  function formatDuration(durationSeconds: number) {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${minutes}:${formattedSeconds}`;
  }

  // REWORK EVERYTHING - CHECK DEFAULT START
  function visualize() {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;

    console.log("aaaaaa");

    if (canvas && analyser) {
      const canvasCtx = canvas.getContext("2d");
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const draw = () => {
        requestAnimationFrame(draw);

        analyser.getByteFrequencyData(dataArray);

        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

        // Set transparent background
        canvasCtx.fillStyle = "rgba(0, 0, 0, 0)";
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

        const barWidth = 2;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          // Default barHeight of 2 pixels if data is minimal
          barHeight = dataArray[i] / 3 || 2;
          barHeight = Math.max(barHeight, 2);

          // Scale down bars for a smaller visual effect
          canvasCtx.fillStyle = "#ffffff";
          canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

          x += barWidth + 6; // Adjust spacing
        }
      };
      draw();
    }
  }

  useEffect(() => {
    if (analyserRef.current) {
      visualize();
    }
  }, [analyserRef.current]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        ease: "easeInOut",
        duration: 0.5,
      }}
      className="relative flex flex-col h-svh px-10 py-14 z-[2] text-white md:p-20"
      onMouseDown={handleClick}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-4 w-full max-w-[700px]">
          <Title title={paused ? "Press to Play" : "Rizz Music"} />
          <Slider
            value={duration ? currentTime / duration : 0}
            onSeek={handleSeek}
          />
          <div className="flex gap-3">
            <motion.img
              initial={{
                filter: "grayscale(1)",
              }}
              animate={{ filter: `grayscale(${paused ? 1 : 0})` }}
              src={glitter.src}
              className="rounded-md h-16 w-16 bg-slate-400"
              alt="album cover"
            />
            <div className="flex flex-col">
              <span className="font-semibold">Glitter</span>
              <span className="font-light text-xs">Tyler, The Creator</span>
            </div>
          </div>
        </div>
        <audio ref={audioRef} src="/glitter.mp3" preload="metadata" />
        <div className="flex flex-col gap-1">
          <canvas ref={canvasRef} className="mt-4 w-[250px]" />
          <div className="track-duration">
            <p>{formatDuration(currentTime)}</p>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute inset-0 z-[-1]"
        animate={{
          filter: `grayscale(${paused ? 1 : 0})`,
        }}
        initial={{
          opacity: 1,
        }}
        transition={{
          ease: "easeInOut",
          duration: 1,
        }}
      >
        <Gradient />
      </motion.div>
    </motion.main>
  );
}

export default Player;
