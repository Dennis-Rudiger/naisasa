export const BEAR_STATES = {
  IDLE: 'IDLE',
  WATCHING: 'WATCHING',
  HIDING: 'HIDING',
  PEEKING: 'PEEKING',
} as const;

export const BEAR_IMAGES = {
  [BEAR_STATES.IDLE]: '/assets/img/watch_bear_1.png',
  [BEAR_STATES.WATCHING]: '/assets/img/watch_bear_2.png',
  [BEAR_STATES.HIDING]: '/assets/img/hide_bear_1.png',
  [BEAR_STATES.PEEKING]: '/assets/img/peak_bear_1.png',
};
