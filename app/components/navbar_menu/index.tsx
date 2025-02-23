"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  IconArrowsShuffle,
  IconMusic,
  IconRotateClockwise,
  IconSettings,
} from "@tabler/icons-react";
import {
  defaultColors,
  songs,
  Song as SongType,
  useAppContext,
} from "@/app/context/provider";
import { cn } from "@/lib/utils";
import { Switch } from "../switch";
import { Label } from "../label";
import SegmentedControl from "../segmented_control";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string | null) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  // Close the popover when Escape is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(null);
      }
    };

    if (active === item) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [active, item, setActive]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onMouseEnter={() => setActive(item)}
      onFocus={() => setActive(item)} // Set active on focus
      className="relative"
      tabIndex={0} // Make the item focusable
    >
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-full"
      >
        {item === "music" ? (
          <IconMusic color="white" />
        ) : (
          <IconSettings color="white" />
        )}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ scale: 0.85, y: 10 }}
          animate={{ scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_-_2.8rem)] right-[32px] pr-3 pt-4 z-50">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-transparent backdrop-blur-sm rounded-2xl overflow-hidden border border-white/[0.2] shadow-sm"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // Reset state on mouse leave
      className="relative rounded-full border border-white/[0.2] bg-opacity-5 bg-white shadow-input flex flex-col justify-center px-2 py-4 gap-6"
    >
      {children}
    </nav>
  );
};

export const Song = ({ song }: { song: SongType }) => {
  const { setCurrentSong } = useAppContext();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      setCurrentSong(song);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      onClick={() => setCurrentSong(song)}
      onKeyDown={handleKeyDown} // Handle keyboard interactions
      tabIndex={0}
      className="flex space-x-2 cursor-pointer focus-visible::outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-50 rounded-md"
    >
      <Image
        src={song.cover}
        width={64}
        height={64}
        alt={song.cover}
        className="flex-shrink-0 rounded-md"
      />
      <div className="flex flex-col text-white">
        <span className="font-semibold">{song.title}</span>
        <span className="font-light text-xs">{song.artist}</span>
      </div>
    </motion.div>
  );
};

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const { setGradient, gradient } = useAppContext();

  function handleShuffle() {
    // Function to generate a random hex color
    const getRandomHexColor = (): string => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    // Generate an array of 3 unique hex colors
    const colors: string[] = [];
    while (colors.length < 3) {
      const color = getRandomHexColor();
      if (!colors.includes(color)) {
        colors.push(color);
      }
    }

    setGradient({
      ...gradient,
      colors: colors,
    });
  }

  function handleReset() {
    setGradient({
      ...gradient,
      colors: defaultColors,
    });
  }

  return (
    <div
      className={cn(
        "fixed right-10 inset-y-0 max-h-2xl my-auto z-40 self-center",
        className
      )}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="music">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-4">
            {songs.map((s) => (
              <Song key={s.title} song={s} />
            ))}
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="settings">
          <div className="flex flex-col space-y-4 text-sm gap-2">
            <div className="flex items-center space-x-2">
              <Switch
                checked={gradient.grain}
                onCheckedChange={() =>
                  setGradient({
                    ...gradient,
                    grain: !gradient.grain,
                  })
                }
                id="grain"
              />
              <Label htmlFor="grain">Grain</Label>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleShuffle}
                className="px-4 py-1 flex items-center gap-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
              >
                <IconArrowsShuffle />
                <span>Shuffle Color</span>
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-1 flex items-center gap-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
              >
                <IconRotateClockwise />
              </button>
            </div>
            <SegmentedControl />
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
