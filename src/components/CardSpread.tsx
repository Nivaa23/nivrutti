"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface CardSpreadCard {
  id?: string | number;
  src?: string;
  alt?: string;
  title?: string;
  content?: React.ReactNode;
  [key: string]: any;
}

export interface CardSpreadProps {
  cards: CardSpreadCard[];
  cardWidth?: number;
  cardHeight?: number;
  cardRadius?: number;
  radius?: number;
  arc?: number;
  cardColor?: string;
  cardPadding?: number;
  borderColor?: string;
  shadow?: number;
  lift?: number;
  push?: number;
  pushReach?: number;
  restOpacity?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
  stagger?: number;
  fit?: boolean;
  maxScale?: number;
  interactive?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: (card: CardSpreadCard, index: number) => React.ReactNode;
}

export default function CardSpread({
  cards = [],
  cardWidth = 360,
  cardHeight = 510,
  cardRadius = 28,
  radius = 460,
  arc = 18,
  cardColor = "rgba(255, 255, 255, 0.85)",
  cardPadding = 0,
  borderColor = "rgba(255, 255, 255, 0.95)",
  shadow = 0.28,
  lift = 28,
  push = 5,
  pushReach = 2,
  restOpacity = 0.94,
  stiffness = 150,
  damping = 16,
  mass = 1.0,
  stagger = 0.06,
  fit = true,
  maxScale = 1.0,
  interactive = true,
  className = "",
  style = {},
  children
}: CardSpreadProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDeckHovered, setIsDeckHovered] = useState(false);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const totalCards = cards.length;
  const centerIndex = (totalCards - 1) / 2;

  // Spring transition conforming to React Bits Pro defaults
  const springConfig = {
    type: "spring" as const,
    stiffness: shouldReduceMotion ? 260 : stiffness,
    damping: shouldReduceMotion ? 30 : damping,
    mass: mass
  };

  return (
    <div
      className={`card-spread-root ${className}`}
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px 0 30px",
        userSelect: "none",
        ...style
      }}
      onMouseEnter={() => {
        if (interactive) setIsDeckHovered(true);
      }}
      onMouseLeave={() => {
        if (interactive) {
          setIsDeckHovered(false);
          setHoveredIndex(null);
        }
      }}
    >
      {/* Desktop & Tablet Spread Deck */}
      <div
        className="card-spread-stage"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1200px",
          height: `${cardHeight + 70}px`,
          justifyContent: "center",
          alignItems: "center",
          perspective: "1200px"
        }}
      >
        {cards.map((card, index) => {
          const offset = index - centerIndex; // -1, 0, 1 for 3 cards
          const isCurrentHovered = hoveredIndex === index;
          const isSpreadActive = isDeckHovered || hoveredIndex !== null;

          // Resting state: compact overlapping fan
          const restingX = offset * (cardWidth * 0.44); // ~158px offset
          const restingRotate = offset * (arc * 0.55); // -10deg, 0deg, +10deg
          const restingY = Math.abs(offset) * 14;

          // Spread state: open fan revealing cards
          const spreadSpacing = cardWidth * 1.02; // ~367px spacing between card centers
          const spreadX = offset * spreadSpacing;
          const spreadRotate = offset * (arc * 0.28); // gentle -5deg, 0deg, +5deg
          const spreadY = Math.abs(offset) * 6;

          let targetX = isSpreadActive ? spreadX : restingX;
          let targetY = isSpreadActive ? spreadY : restingY;
          let targetRotate = isSpreadActive ? spreadRotate : restingRotate;
          let targetScale = 1;
          let targetZIndex = 15;
          let targetOpacity = 1;

          if (shouldReduceMotion) {
            targetRotate = 0;
            targetX = isSpreadActive ? offset * (cardWidth * 0.95) : offset * (cardWidth * 0.4);
            targetY = isCurrentHovered ? -12 : 0;
            targetZIndex = isCurrentHovered ? 35 : 15 + index;
          } else if (isCurrentHovered) {
            // Hovered card lifts up, straightens cleanly for maximum legibility
            targetY -= lift;
            targetRotate = 0;
            targetScale = 1.025;
            targetZIndex = 40;
            targetOpacity = 1;
          } else if (hoveredIndex !== null) {
            // Sibling cards pushed outward when one card is directly hovered
            const pushDir = index < hoveredIndex ? -1 : 1;
            const dist = Math.abs(index - hoveredIndex);
            if (dist <= pushReach) {
              targetX += pushDir * (push * 5);
              targetRotate += pushDir * (push * 0.6);
            }
            targetOpacity = restOpacity;
            targetZIndex = 10 + index;
          } else if (isDeckHovered) {
            targetZIndex = 20 + index;
          } else {
            // Resting z-index stack
            targetZIndex = index === 1 ? 25 : 15 + index;
          }

          const currentShadowStrength = isCurrentHovered ? shadow * 1.5 : shadow;

          return (
            <motion.div
              key={card.id || index}
              className="card-spread-card-wrapper"
              initial={{
                opacity: 0,
                y: 50,
                x: restingX,
                rotate: restingRotate
              }}
              animate={{
                opacity: targetOpacity,
                x: targetX,
                y: targetY,
                rotate: targetRotate,
                scale: targetScale,
                zIndex: targetZIndex
              }}
              transition={{
                ...springConfig,
                delay: stagger * index,
                opacity: { duration: 0.2 }
              }}
              style={{
                position: "absolute",
                width: `${cardWidth}px`,
                minHeight: `${cardHeight}px`,
                borderRadius: `${cardRadius}px`,
                backgroundColor: cardColor,
                border: `1px solid ${borderColor}`,
                padding: cardPadding ? `${cardPadding}px` : undefined,
                boxShadow: isCurrentHovered
                  ? `0 24px 50px rgba(0, 0, 0, ${currentShadowStrength * 0.35}), 0 0 35px rgba(71, 144, 226, 0.16)`
                  : `0 14px 34px rgba(0, 0, 0, ${currentShadowStrength * 0.22})`,
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                cursor: interactive ? "pointer" : "default",
                transformOrigin: `50% ${radius}px`,
                willChange: "transform, opacity",
                overflow: "hidden"
              }}
              onMouseEnter={() => {
                if (interactive) setHoveredIndex(index);
              }}
              onMouseLeave={() => {
                if (interactive) setHoveredIndex(null);
              }}
              tabIndex={interactive ? 0 : -1}
              onFocus={() => {
                if (interactive) {
                  setIsDeckHovered(true);
                  setHoveredIndex(index);
                }
              }}
              onBlur={() => {
                if (interactive) {
                  setHoveredIndex(null);
                }
              }}
              aria-label={card.alt || card.title || `Deck card ${index + 1}`}
            >
              {children ? children(card, index) : card.content}
            </motion.div>
          );
        })}
      </div>

      {/* Mobile Touch Carousel View (<= 860px) */}
      <div
        className="card-spread-mobile-container"
        style={{
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          gap: "18px"
        }}
      >
        {/* Segmented Selector for Touch */}
        <div
          role="tablist"
          aria-label="Expertise categories"
          style={{
            display: "inline-flex",
            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(16px)",
            padding: "5px",
            borderRadius: "24px",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.04)",
            gap: "4px"
          }}
        >
          {cards.map((card, idx) => (
            <button
              key={card.id || idx}
              role="tab"
              aria-selected={activeMobileIndex === idx}
              onClick={() => setActiveMobileIndex(idx)}
              style={{
                border: "none",
                background: activeMobileIndex === idx ? "#2563eb" : "transparent",
                color: activeMobileIndex === idx ? "#ffffff" : "#475569",
                padding: "8px 16px",
                borderRadius: "18px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.25s ease"
              }}
            >
              {card.title || `Card ${idx + 1}`}
            </button>
          ))}
        </div>

        {/* Selected Card Rendering on Mobile */}
        <div style={{ width: "100%", maxWidth: "420px", padding: "0 10px" }}>
          {cards.map((card, idx) => {
            if (activeMobileIndex !== idx) return null;
            return (
              <motion.div
                key={card.id || idx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  width: "100%",
                  minHeight: "470px",
                  borderRadius: `${cardRadius}px`,
                  backgroundColor: cardColor,
                  border: `1px solid ${borderColor}`,
                  boxShadow: "0 12px 32px rgba(0, 0, 0, 0.08)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  overflow: "hidden"
                }}
              >
                {children ? children(card, idx) : card.content}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
