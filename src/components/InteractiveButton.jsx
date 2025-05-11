"use client";
import { useState, useEffect, useRef } from "react";
import style from "../styles/mainbuttton.module.css";
import { client } from "../app/client";
import { ConnectButton, lightTheme, useActiveAccount } from "thirdweb/react";

export default function InteractiveButton({ children }) {
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Maximum distance the button can move
  const maxDistance = 15;

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current || !buttonRef.current) return;

      // Check if mouse is over the button
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const isMouseOverButton =
        e.clientX >= buttonRect.left &&
        e.clientX <= buttonRect.right &&
        e.clientY >= buttonRect.top &&
        e.clientY <= buttonRect.bottom;

      // If mouse is over button, don't change position
      if (isMouseOverButton) {
        setIsHovered(true);
        return;
      } else {
        setIsHovered(false);
      }

      // Get container dimensions and position
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerCenterX = containerRect.left + containerRect.width / 2;
      const containerCenterY = containerRect.top + containerRect.height / 2;

      // Calculate direction vector from container center to mouse
      const directionX = e.clientX - containerCenterX;
      const directionY = e.clientY - containerCenterY;

      // Calculate distance
      const distance = Math.sqrt(
        directionX * directionX + directionY * directionY
      );

      if (distance === 0) return; // Avoid division by zero

      // Normalize the direction vector
      const normalizedX = directionX / distance;
      const normalizedY = directionY / distance;

      // Calculate movement factor (decreases as mouse gets further away)
      const moveFactor = Math.max(0, 1 - Math.min(distance / 400, 1));

      // Calculate movement amount
      const moveX = normalizedX * maxDistance * moveFactor;
      const moveY = normalizedY * maxDistance * moveFactor;

      // Set new position
      setButtonPosition({ x: moveX, y: moveY });
    };

    const handleMouseLeave = () => {
      setButtonPosition({ x: 0, y: 0 });
      setIsHovered(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className={style.container}>
      <div
        ref={buttonRef}
        className={style.button}
        style={{
          transform: `translate(${buttonPosition.x}px, ${buttonPosition.y}px)`,
          transition: isHovered
            ? " all 0.2s ease,background-color 0.3s ease"
            : "transform 0.2s ease, background-color 0.3s ease",
        }}
      >
        {/* <ConnectButton client={client} /> */}
        {children}
      </div>
    </div>
  );
}
