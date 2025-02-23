"use client";

import React from "react";
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

  const {
    audioRef,
    paused,
    currentTime,
    duration,
    handlePlayPause,
    handleSeek,
    formatDuration,
    analyserRef,
  } = useAudioPlayer();

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
            className="flex gap-3 w-[300px]"
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
              className="rounded-md h-16 w-16 bg-slate-400"
              alt="album cover"
            />
            <div className="flex flex-col">
              <span className="font-semibold">{currentSong.title}</span>
              <span className="font-light text-xs">{currentSong.artist}</span>
            </div>
          </motion.div>
        </div>
        <audio ref={audioRef} src={currentSong.src} preload="metadata" />
        <Visualizer
          analyser={analyserRef.current}
          time={formatDuration(currentTime)}
        />
      </div>

      <Navbar />

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
