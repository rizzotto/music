import React from "react";
import { motion } from "framer-motion";

function Title({
  title,
  onPlayPause,
}: {
  title: string;
  onPlayPause: () => void;
}) {
  const words = React.useMemo(() => title.split(" "), [title]);
  let index = 0;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onPlayPause();
    }
  };

  return (
    <h1
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="text-7xl font-light leading-[0.9] tracking-[-0.1em] md:text-8xl md:leading-[0.9] md:tracking-[-0.1em]"
    >
      {words.map((word, i) => (
        <motion.span key={i} className="inline-block mr-8 break-keep">
          {word.split("").map((c, j) => (
            <motion.span
              key={`${c}-${j}`}
              className="inline-block"
              initial={{ y: -30, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: {
                  ease: "easeInOut",
                  delay: index++ * 0.03,
                  duration: 0.3,
                },
              }}
            >
              {c}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </h1>
  );
}

export default Title;
