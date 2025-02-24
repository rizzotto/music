"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Gradient from "../gradient";
import Slider from "../slider";
import Title from "../title";
import { useAppContext } from "@/app/context/provider";
import { Navbar } from "../navbar_menu";
import useAudioPlayer from "@/app/hooks/useAudioPlayer";
import Visualizer from "../visualizer"; // Import the Visualizer component

function Player() {
  const { currentSong } = useAppContext();
  const playerRef = useRef<HTMLDivElement | null>(null);

  const {
    analyserRef,
    audioRef,
    currentTime,
    duration,
    formatDuration,
    handlePlayPause,
    handleSeek,
    paused,
    switchSong,
  } = useAudioPlayer();

  useEffect(() => {
    if (currentSong.src) {
      switchSong(currentSong.src);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        ease: "easeInOut",
        duration: 0.5,
      }}
      className="relative flex flex-col h-svh px-10 py-14 z-[2] text-white md:p-20"
      onClick={handlePlayPause}
      ref={playerRef}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-4 w-full max-w-[700px]">
          <Title
            title={paused ? "Press to Play" : "Rizz Music"}
            onPlayPause={handlePlayPause}
          />
          <Slider
            value={duration ? currentTime / duration : 0}
            onSeek={handleSeek}
          />
          <motion.div
            className="flex gap-3 w-[300px] md:2-[400px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            key={currentSong.title}
          >
            <motion.img
              initial={{
                filter: "grayscale(1)",
              }}
              animate={{ filter: `grayscale(${paused ? 1 : 0})` }}
              src={currentSong.cover}
              className="rounded-md h-16 w-16 md:w-28 md:h-28 bg-slate-400"
              alt="album cover"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-md md:text-2xl">
                {currentSong.title}
              </span>
              <span className="font-light text-xs md:text-lg">
                {currentSong.artist}
              </span>
            </div>
          </motion.div>
        </div>
        <audio ref={audioRef} src={currentSong.src} preload="metadata" />
        <Visualizer
          analyser={analyserRef.current}
          time={formatDuration(currentTime)}
        />
      </div>

      <Navbar audioRef={audioRef} playerRef={playerRef} />

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
