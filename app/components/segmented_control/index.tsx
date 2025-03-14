"use client";

import { MotionConfig, motion } from "framer-motion";
import clsx from "clsx";
import { Gradient, useAppContext } from "@/app/context/provider";

const TABS = ["Water Plane", "Plane", "Sphere"];

export default function SegmentedControl() {
  const { gradient, setGradient } = useAppContext();

  function handler(tab: Gradient["type"]) {
    setGradient({
      ...gradient,
      type: tab,
    });
  }

  return (
    <div className="flex items-center relative mx-auto w-full">
      <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.4 }}>
        <motion.ul
          layout
          className="mx-auto flex w-fit gap-2       flex-row justify-center"
        >
          {TABS.map((tab) => (
            <motion.li
              layout
              className={clsx(
                "relative cursor-pointer px-2 py-1 text-sm md:px-4 md:py-2 md:text-lg outline-none transition-colors text-black"
              )}
              tabIndex={0}
              key={tab}
              onFocus={() => handler(tab)}
              onClick={() => handler(tab)}
            >
              {gradient.type === tab ? (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-0 rounded-lg bg-white border border-black"
                />
              ) : null}
              <span className="relative text-inherit">{tab}</span>
            </motion.li>
          ))}
        </motion.ul>
      </MotionConfig>
    </div>
  );
}
