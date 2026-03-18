import { useState, useEffect } from 'react';

interface AutoScaleConfig {
  baseScale: number;
  minViewportWidth: number;
  maxViewportWidth: number;
  minScale: number;
  maxScale: number;
}

const DEFAULT_CONFIG: AutoScaleConfig = {
  baseScale: 1.0,
  minViewportWidth: 320,
  maxViewportWidth: 768,
  minScale: 0.85,
  maxScale: 1.0,
};

export function useAutoUiScale(config: Partial<AutoScaleConfig> = {}): number {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  
  const [autoScale, setAutoScale] = useState(() => {
    if (typeof window === 'undefined') return finalConfig.baseScale;
    return calculateAutoScale(window.innerWidth, window.innerHeight, finalConfig);
  });

  useEffect(() => {
    const handleResize = () => {
      const newScale = calculateAutoScale(window.innerWidth, window.innerHeight, finalConfig);
      setAutoScale(newScale);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [finalConfig]);

  return autoScale;
}

function calculateAutoScale(
  width: number,
  height: number,
  config: AutoScaleConfig
): number {
  // For very small screens (mobile portrait), scale down
  if (width < config.minViewportWidth) {
    return config.minScale;
  }

  // For medium screens (mobile landscape, small tablets), interpolate
  if (width < config.maxViewportWidth) {
    const ratio = (width - config.minViewportWidth) / (config.maxViewportWidth - config.minViewportWidth);
    return config.minScale + ratio * (config.maxScale - config.minScale);
  }

  // For larger screens, use base scale
  return config.baseScale;
}
