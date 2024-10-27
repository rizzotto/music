"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Gradient from "../gradient";
import Slider from "../slider";
import violent from "@/public/violent_crimes.jpeg";
import Title from "../title";

function Player() {
  const [paused, setPaused] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("canplay", handleLoadedMetadata); // Ensure duration gets set when audio is ready to play

      // If the audio duration is already available, set it directly
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
    };
  }, []);

  function handleClick() {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        setPaused(true);
      } else {
        audio.play();
        setIsPlaying(true);
        setPaused(false);
      }
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
          {/* Updated Slider */}
          <Slider
            value={duration ? currentTime / duration : 0}
            onSeek={handleSeek}
          />
          <div className="flex gap-3">
            <img
              src={violent.src}
              className="rounded-md h-16 w-16 bg-slate-400"
            />
            <div className="flex flex-col">
              <span className="font-semibold">Violent Crimes</span>
              <span className="font-light text-xs">Kanye West</span>
            </div>
          </div>
        </div>
        <audio ref={audioRef} src="/violent_crimes.mp3" preload="metadata" />

        <div className="track-duration">
          <p>{formatDuration(currentTime)}</p>
          {/* <p>{formatDuration(duration)}</p> */}
        </div>
      </div>

      <motion.div
        className="absolute inset-0 z-[-1]"
        animate={{
          // opacity: paused ? 0.9 : 1,
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
