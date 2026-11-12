// The SOUL3 site is the home page for everyone. The cinematic story is opt-in at /experience.
export const HOME_URL = '/';
export const CINEMATIC_PATH = '/experience';
export const CINEMATIC_URL = CINEMATIC_PATH;

type View = 'quick' | 'cinematic';

export const resolveView = (): View => {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (path === CINEMATIC_PATH) return 'cinematic';
  // Old links (/quick, ?view=...) all land on the home page.
  if (path !== '/' || window.location.search.includes('view=')) {
    window.history.replaceState(null, '', HOME_URL + window.location.hash);
  }
  try { localStorage.removeItem('soul3-view'); } catch { /* storage unavailable */ }
  return 'quick';
};
