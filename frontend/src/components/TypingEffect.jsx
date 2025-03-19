import React, { useState, useEffect } from 'react';

export const TypingEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  const typingSpeed = 120;
  const deletingSpeed = 60;
  const pauseTime = 1500;

  useEffect(() => {
    if (!isDeleting && index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else if (isDeleting && index > 0) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
        setIndex(index - 1);
      }, deletingSpeed);
      return () => clearTimeout(timeout);
    } else if (index === text.length) {
      setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (index === 0 && isDeleting) {
      setIsDeleting(false);
    }
  }, [index, isDeleting, text]);

  return (
    <h2 className="text-3xl font-semibold text-white">
      {displayText}
      <span className="animate-blink">|</span>
    </h2>
  );
};
