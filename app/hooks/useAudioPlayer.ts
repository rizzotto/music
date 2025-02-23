import { useState, useRef, useEffect } from "react";

const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  // Initialize audio context and analyser
  const initializeAudioContext = () => {
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
  };

  // Handle play/pause
  const handlePlayPause = () => {
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
  };

  const switchSong = (src: string) => {
    const audio = audioRef.current;

    if (audio) {
      audio.src = src;
      audio.load();
      audio.play().then(() => {
        if (paused) {
          setPaused(false);
        }
      });
    }
  };

  // Handle time update
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
    }
  };

  // Handle loaded metadata
  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) {
      setDuration(audio.duration);
    }
  };

  // Handle seek
  const handleSeek = (value: number) => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = value * duration;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Handle song end
  const handleSongEnd = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0; // Reset to the beginning
      setIsPlaying(false);
      setPaused(true);
    }
  };

  // Format duration
  const formatDuration = (durationSeconds: number) => {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${minutes}:${formattedSeconds}`;
  };

  // Add event listeners to the audio element
  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("canplay", handleLoadedMetadata);
      audio.addEventListener("ended", handleSongEnd); // Add ended event listener

      if (audio.readyState >= 1) {
        setDuration(audio.duration);
      }
    }

    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("canplay", handleLoadedMetadata);
        audio.removeEventListener("ended", handleSongEnd); // Remove ended event listener
      }
      audioContextRef.current?.close();
    };
  }, []);

  return {
    analyserRef,
    audioRef,
    currentTime,
    duration,
    formatDuration,
    handlePlayPause,
    handleSeek,
    isPlaying,
    paused,
    switchSong,
  };
};

export default useAudioPlayer;
