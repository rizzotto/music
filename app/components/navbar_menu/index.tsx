"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { IconMusic, IconSettings } from "@tabler/icons-react";
import { songs, Song as SongType, useAppContext } from "@/app/context/provider";
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
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onMouseEnter={() => setActive(item)}
      className="relative"
    >
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white"
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
            // change this
            <div className="absolute top-[calc(100%_-_2.8rem)] right-[32px] pr-3 pt-4 z-50">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-transparent backdrop-blur-sm rounded-2xl overflow-hidden border border-white/[0.2]  shadow-sm"
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
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative rounded-full border border-white/[0.2] bg-opacity-5 bg-white shadow-input flex flex-col justify-center px-2 py-4 gap-6"
    >
      {children}
    </nav>
  );
};

export const Song = ({ song }: { song: SongType }) => {
  const { setCurrentSong } = useAppContext();

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      onClick={() => setCurrentSong(song)}
      className="flex space-x-2 cursor-pointer"
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
            <SegmentedControl />
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
