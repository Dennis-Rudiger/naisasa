import { useState, useEffect } from 'react';

interface BearImages {
  watchBearImages: string[];
  hideBearImages: string[];
  peakBearImages: string[];
}

export function useBearImages(): BearImages {
  return {
    watchBearImages: ['/src/img/watch_bear_1.png', '/src/img/watch_bear_2.png'],
    hideBearImages: ['/src/img/hide_bear_1.png', '/src/img/hide_bear_2.png'],
    peakBearImages: ['/src/img/peak_bear_1.png', '/src/img/peak_bear_2.png']
  };
}
