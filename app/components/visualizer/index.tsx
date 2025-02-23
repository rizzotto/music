"use client";

import React, { useEffect, useRef } from "react";

interface VisualizerProps {
  analyser: AnalyserNode | null;
  time: string;
}

const Visualizer = ({ analyser, time }: VisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Visualize audio
  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasCtx = canvas?.getContext("2d");

    if (canvas && canvasCtx) {
      const bufferLength = analyser ? analyser.frequencyBinCount : 0;
      const dataArray = new Uint8Array(bufferLength);

      const draw = () => {
        requestAnimationFrame(draw);

        if (analyser) {
          analyser.getByteFrequencyData(dataArray);
        }

        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        canvasCtx.fillStyle = "rgba(0, 0, 0, 0)";
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

        const barWidth = 2;
        let barHeight;
        let x = 0;

        if (analyser) {
          for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] / 3 || 2;
            barHeight = Math.max(barHeight, 2);

            canvasCtx.fillStyle = "#ffffff";
            canvasCtx.fillRect(
              x,
              canvas.height - barHeight,
              barWidth,
              barHeight
            );

            x += barWidth + 6;
          }
        } else {
          for (let i = 0; i < 38; i++) {
            barHeight = 2;
            barHeight = Math.max(barHeight, 2);

            canvasCtx.fillStyle = "#ffffff";
            canvasCtx.fillRect(
              x,
              canvas.height - barHeight,
              barWidth,
              barHeight
            );

            x += barWidth + 6;
          }
        }
      };

      draw();
    }
  }, [analyser]);

  return (
    <div className="flex flex-col gap-1">
      <canvas ref={canvasRef} className="mt-4 w-[250px]" />
      <div className="track-duration text-xs">
        <p>{time}</p>
      </div>
    </div>
  );
};

export default Visualizer;
