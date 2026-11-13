import { useState } from 'react';

interface LuxuryImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function LuxuryImage({ src, alt, className = '', fallbackTitle }: LuxuryImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F5EFE6] via-[#EFE8DC] to-[#E7DFD2] text-[#504440] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#C59A4E] mb-2">
          Rasa Kannauj
        </span>
        <span className="font-playfair italic text-base text-[#2C1810]">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
