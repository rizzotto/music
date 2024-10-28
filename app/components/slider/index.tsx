import { useRef, useState } from "react";

interface SliderProps {
  value: number; // The current progress (0 to 1)
  onSeek: (value: number) => void; // Callback to handle seeking
}

function Slider({ value, onSeek }: SliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const getPercent = (x: number) => {
    if (!containerRef.current) return 0;
    const bound = containerRef.current.getBoundingClientRect();
    const percent = (x - bound.left) / bound.width;
    return Math.min(Math.max(percent, 0), 1); // Clamp between 0 and 1
  };

  const handleMove = (clientX: number) => {
    const percent = getPercent(clientX);
    onSeek(percent);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      const touch = e.touches[0];
      handleMove(touch.clientX);
    }
  };

  return (
    <span
      ref={containerRef}
      className="flex touch-none h-6 py-2 max-w-[400px]"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={() => setIsDragging(true)}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      <span className="size-full border rounded-full border-white overflow-hidden relative">
        <span
          role="slider"
          aria-valuemin={0}
          aria-valuenow={value * 100}
          aria-valuemax={100}
          tabIndex={0}
          className="block h-full bg-white"
          style={{ width: `${value * 100}%` }}
        />
      </span>
    </span>
  );
}

export default Slider;
