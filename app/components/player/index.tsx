"use client";

import React from "react";
import { motion } from "framer-motion";
import Gradient from "../gradient";
import Slider from "../slider";

function Player() {
  const [paused, setPaused] = React.useState(false);

  function handleClick() {
    setPaused((prev) => !prev);
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
      <div className="flex flex-col gap-4 w-full max-w-[400px]">
        <h1 className="text-7xl tracking-tighter font-light">Press to Play</h1>
        <Slider value={30} />
        <div className="flex gap-3">
          <div className="rounded-md h-12 w-12 bg-slate-400" />
          <div className="flex flex-col">
            <span className="font-semibold">La Noche</span>
            <span className="font-light text-xs">Yago</span>
          </div>
        </div>
      </div>
      <motion.div
        // data-trigger-container={true}
        className="absolute inset-0 z-[-1]"
        animate={{
          opacity: paused ? 0.8 : 1,
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
