import { useState, useEffect } from 'react';

export const useImageFallback = (src: string, fallback: string) => {
  const [imgSrc, setImgSrc] = useState(src);

  // Update imgSrc when src prop changes
  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const handleError = () => {
    setImgSrc(fallback);
  };

  return { imgSrc, handleError };
};
