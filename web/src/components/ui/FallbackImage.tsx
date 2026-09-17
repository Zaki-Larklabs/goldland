"use client";

import React, { useState } from "react";

export function FallbackImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[#070C1C] group-hover:bg-[#0A1128] transition-colors w-full h-full">
        <img
          src="/images/goldland-logo.png"
          alt="Goldland Contracting"
          className="w-1/2 opacity-40 object-contain p-4"
        />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
}
