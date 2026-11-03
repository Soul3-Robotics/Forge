// Shared timing for the pinned scroll sequence. Timeline seconds map
// linearly onto SCENE_SCROLL pixels of scroll distance.
export const SCENE_DURATION = 35;
export const SCENE_SCROLL = 27300;

export const sceneTimeToScroll = (time: number) =>
  Math.round((time / SCENE_DURATION) * SCENE_SCROLL);
