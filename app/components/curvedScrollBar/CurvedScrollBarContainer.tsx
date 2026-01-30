/*
2026-01-23 15:27:41


*/
"use client";
import React, { useRef, useEffect, useState } from "react";
import "./CurvedScrollBarContainer.css";
import useMouseDetection from "@/hooks/useMouseDetection";

// config
const OFFSET = 7;
const EXTRA_INSET = 2;
const MIN_START_RATIO = 0.8;
const MIN_THUMB = 20;
const SEGMENTS = 50;

// Default settings
const DEFAULT_RADIUS = 20;
const DEFAULT_THUMB_COLOR = "rgb(200, 118, 25)";
const DEFAULT_THUMB_COLOR_ACTIVE = "rgb(250, 88, 25)";
const DEFAULT_TRACK_COLOR = "transparent";
const DEFAULT_TRACK_COLOR_ACTIVE = "transparent";

// Props type
type CurvedScrollBarContainerProps = {
  radius?: number;
  thumbColor?: string;
  thumbColorActive?: string;
  trackColor?: string;
  trackColorActive?: string;
  children: React.ReactNode;
  className?: string;
  alwaysShow?: boolean;
};

const CurvedScrollBarContainer = ({
  radius = DEFAULT_RADIUS,
  thumbColor = DEFAULT_THUMB_COLOR,
  thumbColorActive = DEFAULT_THUMB_COLOR_ACTIVE,
  trackColor = DEFAULT_TRACK_COLOR,
  trackColorActive = DEFAULT_TRACK_COLOR_ACTIVE,
  children,
  className = "",
  alwaysShow = false,
}: CurvedScrollBarContainerProps) => {
  const { isScrolling, isCursorMoving } = useMouseDetection();

  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const trackPathRef = useRef<SVGPathElement>(null);
  const thumbPathRef = useRef<SVGPathElement>(null);

  const [dragging, setDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const pointerIdRef = useRef<number | null>(null);
  const pathLengthRef = useRef(0);
  const thumbLengthRef = useRef(50);

  // Opacity 계산 및 적용
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let opacity = 0.4; // 기본값

    if (alwaysShow) {
      opacity = 1; // alwaysShow가 true면 항상 완전히 표시
    } else if (dragging || isHovering) {
      opacity = 1; // 드래그 중이거나 호버 시 완전히 표시
    } else if (isScrolling || isCursorMoving) {
      opacity = 1; // 스크롤/마우스 이동 중
    }

    container.style.setProperty("--thumb-opacity", opacity.toString());
  }, [isScrolling, isCursorMoving, isHovering, dragging, alwaysShow]);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    const trackPath = trackPathRef.current;
    const thumbPath = thumbPathRef.current;

    if (!container || !content || !trackPath || !thumbPath) return;

    // Apply radius & custom colors to container
    container.style.borderRadius = `${radius}px`;
    container.style.setProperty("--thumb-color", thumbColor);
    container.style.setProperty("--thumb-color-active", thumbColorActive);
    container.style.setProperty("--track-color", trackColor);
    container.style.setProperty("--track-color-active", trackColorActive);
    container.style.setProperty("--card-border-radius", `${radius}px`);

    // Update path function
    const updatePath = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      const r = parseFloat(getComputedStyle(container).borderRadius) || 0;

      const effectiveRadius = Math.max(r - OFFSET, 0);
      // Calculate trackX as a percentage from the right edge
      // This ensures the scrollbar stays within visible bounds
      const rightOffset = Math.max(OFFSET + 0, r * 0.1); // Use 40% of border radius or minimum 27px
      const trackX = w - rightOffset;
      const topY = OFFSET;
      const bottomY = h - OFFSET;
      const cornerX = trackX - effectiveRadius;

      const minStartX = w * MIN_START_RATIO;
      let startX = trackX - effectiveRadius * EXTRA_INSET;
      if (startX < minStartX) startX = minStartX;
      if (startX > cornerX) startX = cornerX;

      const d = `
        M ${startX} ${topY}
        L ${cornerX} ${topY}
        A ${effectiveRadius} ${effectiveRadius} 0 0 1 ${trackX} ${topY + effectiveRadius}
        L ${trackX} ${bottomY - effectiveRadius}
        A ${effectiveRadius} ${effectiveRadius} 0 0 1 ${cornerX} ${bottomY}
        L ${startX} ${bottomY}
      `;
      trackPath.setAttribute("d", d);

      // Update SVG viewBox to match container dimensions
      if (svgRef.current) {
        svgRef.current.setAttribute("viewBox", `0 0 ${w} ${h}`);
      }

      pathLengthRef.current = trackPath.getTotalLength();
      const ratio = content.clientHeight / content.scrollHeight;
      thumbLengthRef.current = Math.max(
        MIN_THUMB,
        pathLengthRef.current * ratio
      );

      updateThumb();
    };

    // Update thumb function
    const updateThumb = () => {
      const scrollableHeight = content.scrollHeight - content.clientHeight || 1;
      const scrollRatio = content.scrollTop / scrollableHeight;
      const startOffset =
        (pathLengthRef.current - thumbLengthRef.current) * scrollRatio;
      const endOffset = startOffset + thumbLengthRef.current;

      const points = [];
      for (let i = 0; i <= SEGMENTS; i++) {
        const t = startOffset + ((endOffset - startOffset) / SEGMENTS) * i;
        const p = trackPath.getPointAtLength(t);
        points.push(`${p.x} ${p.y}`);
      }

      const segmentD = `M ${points[0]} ${points
        .slice(1)
        .map((pt) => `L ${pt}`)
        .join(" ")}`;
      thumbPath.setAttribute("d", segmentD);
    };

    // Pointer down handler
    const handlePointerDown = (e: PointerEvent) => {
      e.preventDefault();
      setDragging(true);
      pointerIdRef.current = e.pointerId;
      thumbPath.setPointerCapture(e.pointerId);
    };

    // Pointer move handler
    const handlePointerMove = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerIdRef.current) return;
      const rect = container.getBoundingClientRect();
      let ratio = (e.clientY - rect.top) / rect.height;
      ratio = Math.max(0, Math.min(1, ratio));
      content.scrollTop = ratio * (content.scrollHeight - content.clientHeight);
      updateThumb();
    };

    // Pointer up handler
    const handlePointerUp = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerIdRef.current) return;
      setDragging(false);
      try {
        thumbPath.releasePointerCapture(pointerIdRef.current);
      } catch {}
      pointerIdRef.current = null;
    };

    // Event listeners
    thumbPath.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    content.addEventListener("scroll", updateThumb);
    window.addEventListener("resize", updatePath);

    // Initial update
    updatePath();

    // Cleanup
    return () => {
      thumbPath.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      content.removeEventListener("scroll", updateThumb);
      window.removeEventListener("resize", updatePath);
    };
  }, [
    dragging,
    radius,
    thumbColor,
    thumbColorActive,
    trackColor,
    trackColorActive,
  ]);

  return (
    <section
      ref={containerRef}
      className={`scroll-container ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div ref={contentRef} className="scroll-content">
        {children}
      </div>
      <svg
        ref={svgRef}
        className="scrollbar-svg"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <path ref={trackPathRef} className="scrollbar-track" />
        <path ref={thumbPathRef} className="scrollbar-thumb" />
      </svg>
    </section>
  );
};

export default CurvedScrollBarContainer;
