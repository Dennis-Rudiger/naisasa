import { useState, useEffect, useRef } from 'react';
import { BEAR_IMAGES } from '@/constants/bearImages';

export type InputFocus = 'EMAIL' | 'PASSWORD' | null;

interface UseBearAnimationProps {
  watchBearImages: string[];
  hideBearImages: string[];
  peakBearImages: string[];
  emailLength: number;
  showPassword: boolean;
}

export function useBearAnimation({ emailLength, showPassword }: UseBearAnimationProps) {
  const [currentFocus, setCurrentFocus] = useState<InputFocus>(null);
  const [currentImage, setCurrentImage] = useState<string>(BEAR_IMAGES.watch[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const prevFocus = useRef(currentFocus);
  const prevShowPassword = useRef(showPassword);
  const timeouts = useRef<NodeJS.Timeout[]>([]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => timeouts.current.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    // Clear existing timeouts
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];

    const animateImages = (
      images: string[],
      interval: number,
      reverse = false,
      onComplete?: () => void,
    ) => {
      if (images.length === 0) {
        onComplete?.();
        return;
      }

      setIsAnimating(true);
      const imageSequence = reverse ? [...images].reverse() : images;

      imageSequence.forEach((img, index) => {
        const timeoutId = setTimeout(() => {
          setCurrentImage(img);
          if (index === imageSequence.length - 1) {
            setIsAnimating(false);
            onComplete?.();
          }
        }, index * interval);
        timeouts.current.push(timeoutId);
      });
    };

    // For password input, animate through hide bear images
    const animateWatchingBearImages = () => {
      const progress = Math.min(emailLength / 30, 1);
      const index = Math.min(
        Math.floor(progress * (BEAR_IMAGES.watch.length - 1)),
        BEAR_IMAGES.watch.length - 1,
      );
      setCurrentImage(BEAR_IMAGES.watch[Math.max(0, index)]);
      setIsAnimating(false);
    };

    // Animation Logic based on Focus and ShowPassword
    if (currentFocus === 'EMAIL') {
      if (prevFocus.current === 'PASSWORD') {
        // Reverse hideBearImages when moving from PASSWORD to EMAIL
        animateImages(BEAR_IMAGES.hide, 60, true, animateWatchingBearImages);
      } else {
        animateWatchingBearImages();
      }
    } else if (currentFocus === 'PASSWORD') {
      if (prevFocus.current !== 'PASSWORD') {
        // First time entering password field
        animateImages(BEAR_IMAGES.hide, 40, false, () => {
          if (showPassword) {
            animateImages(BEAR_IMAGES.peek, 50);
          }
        });
      } else if (showPassword && prevShowPassword.current === false) {
        // Show password selected
        animateImages(BEAR_IMAGES.peek, 50);
      } else if (!showPassword && prevShowPassword.current === true) {
        // Hide password selected
        animateImages(BEAR_IMAGES.peek, 50, true);
      }
    }

    prevFocus.current = currentFocus;
    prevShowPassword.current = showPassword;
  }, [
    currentFocus,
    showPassword,
    emailLength,
  ]);

  return {
    currentImage,
    setCurrentFocus,
    currentFocus,
    isAnimating
  };
}
