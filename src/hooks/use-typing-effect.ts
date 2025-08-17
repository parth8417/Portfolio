import { useState, useEffect, useCallback } from 'react';

interface UseTypingEffectProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
}

export function useTypingEffect({
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenWords = 1500,
}: UseTypingEffectProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const currentWord = words[currentWordIndex];

  const typeText = useCallback(() => {
    if (displayedText.length < currentWord.length) {
      setDisplayedText(currentWord.substring(0, displayedText.length + 1));
    } else {
      // Done typing current word
      setIsPaused(true);
      setTimeout(() => {
        setIsPaused(false);
        setIsTyping(false);
      }, delayBetweenWords);
    }
  }, [displayedText, currentWord, delayBetweenWords]);

  const deleteText = useCallback(() => {
    if (displayedText.length > 0) {
      setDisplayedText(displayedText.substring(0, displayedText.length - 1));
    } else {
      // Done deleting, move to next word
      setIsTyping(true);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }
  }, [displayedText, words.length]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isPaused) {
      if (isTyping) {
        timeout = setTimeout(typeText, typingSpeed);
      } else {
        timeout = setTimeout(deleteText, deletingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isTyping, isPaused, typeText, deleteText, typingSpeed, deletingSpeed]);

  return {
    text: displayedText,
    isTyping,
    isPaused,
    currentWordIndex,
  };
}
