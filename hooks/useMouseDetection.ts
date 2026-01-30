/*
2026-01-25 00:24:51

Detect window scroll and mouse movement.

*/
import { useEffect, useRef, useState } from "react";

type MouseDetectionOptions = {
  scrollIdleDelay?: number; // ms
  cursorIdleDelay?: number; // ms
};

function useMouseDetection(options: MouseDetectionOptions = {}) {
  const { scrollIdleDelay = 1000, cursorIdleDelay = 1000 } = options;

  const [isScrolling, setIsScrolling] = useState(false);
  const [isCursorMoving, setIsCursorMoving] = useState(false);

  const scrollTimeoutRef = useRef<number | null>(null);
  const cursorTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);

      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, scrollIdleDelay);
    };

    const handleMouseMove = () => {
      setIsCursorMoving(true);

      if (cursorTimeoutRef.current) {
        window.clearTimeout(cursorTimeoutRef.current);
      }

      cursorTimeoutRef.current = window.setTimeout(() => {
        setIsCursorMoving(false);
      }, cursorIdleDelay);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);

      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      if (cursorTimeoutRef.current) {
        window.clearTimeout(cursorTimeoutRef.current);
      }
    };
  }, [scrollIdleDelay, cursorIdleDelay]);

  return {
    isScrolling,
    isCursorMoving,
  };
}

export default useMouseDetection;
