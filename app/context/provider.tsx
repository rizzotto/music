"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

export const songs = [
  {
    title: "DTMF",
    artist: "Bad Bunny",
    src: "/dtmf.mp3",
    cover: "/dtmf.jpg",
  },
  {
    title: "Glitter",
    artist: "Tyler, The Creator",
    src: "/glitter.mp3",
    cover: "/glitter.jpg",
  },
  {
    title: "Count Me Out",
    artist: "Kendrick Lamar",
    src: "/count.mp3",
    cover: "/count.png",
  },
  {
    title: "Solo",
    artist: "Frank Ocean",
    src: "/solo.mp3",
    cover: "/solo.jpeg",
  },
];

export type Song = {
  title: string;
  artist: string;
  src: string;
  cover: string;
};

export type Gradient = {
  type: string;
  grain: boolean;
};

type AppContextType = {
  currentSong: Song;
  setCurrentSong: (song: Song) => void;
  gradient: Gradient;
  setGradient: (gradient: Gradient) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentSong, setCurrentSong] = useState<Song>({
    title: "Glitter",
    artist: "Tyler, The Creator",
    src: "/glitter.mp3",
    cover: "/glitter.jpg",
  });
  const [gradient, setGradient] = useState<Gradient>({
    type: "Water Plane",
    grain: true,
  });

  return (
    <AppContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        gradient,
        setGradient,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
