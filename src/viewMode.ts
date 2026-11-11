// Decides whether a visitor sees the cinematic experience or the quick view.
export const QUICK_PATH = '/quick';
export const CINEMATIC_URL = '/?view=cinematic';
export const QUICK_URL = '/quick?view=quick';
const KEY = 'soul3-view';

type View = 'quick' | 'cinematic';

const read = (): View | null => {
  try { const v = localStorage.getItem(KEY); return v === 'quick' || v === 'cinematic' ? v : null; } catch { return null; }
};
const save = (v: View) => { try { localStorage.setItem(KEY, v); } catch { /* storage unavailable */ } };

// Phones, tablets, reduced motion and low power devices get the quick view by default.
const prefersQuick = () => {
  const mq = (q: string) => window.matchMedia(q).matches;
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  return mq('(max-width: 1023px)') || mq('(pointer: coarse)') || mq('(prefers-reduced-motion: reduce)')
    || (nav.deviceMemory !== undefined && nav.deviceMemory < 4) || !!nav.connection?.saveData;
};

export const resolveView = (): View => {
  const url = new URL(window.location.href);
  const explicit = url.searchParams.get('view');
  if (explicit === 'quick' || explicit === 'cinematic') {
    save(explicit);
    url.searchParams.delete('view');
    window.history.replaceState(null, '', url.pathname + url.search + url.hash);
  }
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (path === QUICK_PATH) return 'quick';
  if (explicit === 'cinematic') return 'cinematic';
  const view = read() ?? (prefersQuick() ? 'quick' : 'cinematic');
  if (view === 'quick') window.history.replaceState(null, '', QUICK_PATH + window.location.hash);
  return view;
};
