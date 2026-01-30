"use client";

import React, { useEffect, useState } from "react";
import CurvedScrollBarContainer from "../curvedScrollBar/CurvedScrollBarContainer";
import Image from "next/image";

type ScrollableCardProps = {
  radius?: number;
  thumbColor?: string;
  thumbColorActive?: string;
  trackColor?: string;
  trackColorActive?: string;
  children: React.ReactNode;
  alwaysShow?: boolean;
};

const ScrollableCard = ({
  radius = 20,
  thumbColor = "rgb(200, 118, 25)",
  thumbColorActive = "rgb(250, 88, 25)",
  trackColor = "transparent",
  trackColorActive = "transparent",
  alwaysShow = false,
  children,
}: ScrollableCardProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="h-[500px] w-full max-w-[600px]">
      <CurvedScrollBarContainer
        radius={radius}
        thumbColor={thumbColor}
        thumbColorActive={thumbColorActive}
        trackColor={trackColor}
        trackColorActive={trackColorActive}
        alwaysShow={alwaysShow}
      >
        {children}
      </CurvedScrollBarContainer>
    </div>
  );
};

export default ScrollableCard;
