import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function Settings({ title }: { title: string }) {
  const [currentTab, setCurrentTab] = useState(undefined); // 0 for Music, 1 for Background
  const tabs = ["Music", "Background"];

  function handleTabClick(e, index) {
    e.stopPropagation();
    setCurrentTab(index);
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        layout
        className="absolute flex gap-4 bottom-10 left-1/2 right-1/2 border rounded-md"
      >
        <motion.button
          onClick={(e) => handleTabClick(e, 0)}
          className="flex gap-2  rounded-lg p-2"
          layout
        >
          <span>M</span>
        </motion.button>
        <motion.button
          onClick={(e) => handleTabClick(e, 1)}
          className="flex gap-2  rounded-lg p-2"
          layout
        >
          <span>S</span>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}

export default Settings;
