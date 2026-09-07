"use client";

import { useEffect, useRef } from "react";
import { logout } from "@/app/login/actions";

const IDLE_TIMEOUT = 15 * 60 * 1000; // 15 minutes in milliseconds

export function AutoLogout() {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Function to handle the actual logout
    const handleLogout = async () => {
      console.log("User idle for too long, logging out...");
      await logout();
    };

    // Reset the timer on any user activity
    const resetTimer = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(handleLogout, IDLE_TIMEOUT);
    };

    // Events that signify user activity
    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
    ];

    // Attach listeners
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // Start the timer initially
    resetTimer();

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, []);

  return null; // This component doesn't render anything, it just sits in the background
}
