"use client";

import { motion } from "framer-motion";

export default function TypingIndicator() {
  return (
    <div className="flex w-full mb-2 justify-start">
      <div className="bg-white dark:bg-whatsapp-dark-message-in rounded-lg rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-1 w-fit relative">
        <span className="absolute top-0 -left-2 w-3 h-3 bg-white dark:bg-whatsapp-dark-message-in [clip-path:polygon(0_0,100%_0,100%_100%)]" />

        {[0, 1, 2].map((dot) => (
            <motion.div
                key={dot}
                className="w-1.5 h-1.5 bg-gray-500 dark:bg-gray-400 rounded-full"
                animate={{ y: [0, -5, 0] }}
                transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: dot * 0.2,
                    ease: "easeInOut"
                }}
            />
        ))}
      </div>
    </div>
  );
}