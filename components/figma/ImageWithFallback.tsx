import { useState, type ImgHTMLAttributes } from 'react';

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export function ImageWithFallback({ fallbackSrc = 'https://via.placeholder.com/300x200?text=Image', src, alt = '', ...props }: ImageWithFallbackProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return <img src={currentSrc ?? fallbackSrc} alt={alt} onError={() => setCurrentSrc(fallbackSrc)} {...props} />;
}
