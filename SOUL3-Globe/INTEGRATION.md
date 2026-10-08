# Integrating into SOUL3 (React + TypeScript + GSAP + Lenis)

## Fastest temporary option: host the existing files

Copy the contents of `web/` to your Vite project's `public/soul3-globe/`. Asset references in this export are relative, so it can run at `/soul3-globe/index.html` without overwriting your site's files.

Link to that page, or embed it in a React component:

```tsx
export default function RecoveryAtlasEmbed() {
  return (
    <iframe
      title="SOUL3 Recovery Atlas"
      src="/soul3-globe/index.html"
      style={{ width: '100%', height: '100svh', border: 0 }}
    />
  );
}
```

This preserves the standalone UI and its own scrolling. An iframe has a separate scroll context; it will not automatically synchronize with the main SceneController/Lenis timeline. For the continuous cinematic experience, use the native approach below.

## Recommended final option: native React component

The original SOUL3 source was not available for inspection. These steps describe the integration points; they are not a patch against your project.

1. Put the bundled textures and JSON files in `public/recovery-globe/`. Install `globe.gl` at the same version as this export (`npm install globe.gl@2.44.1`), preserving your existing package manager.
2. Convert the relevant markup into `RecoveryGlobe.tsx`. Scope or namespace the styles: this export's global `header`, `main`, `footer`, and `h1` rules must not overwrite your existing theme.
3. Mount Globe.GL once using a container ref and a React effect. Keep the instance in a ref. Keep the selected country/city and active layer in React state rather than global DOM IDs. Reuse one globe instance for the continuous world-to-India sequence if appropriate.
4. Move the camera interpolation and marker-reveal logic from `india.js` into an imperative `setProgress(progress)` function, where progress ranges from 0 to 1.
5. In SceneController, add a dedicated globe interval, proposed between The Problem and Our Mission. Drive `setProgress` from the existing GSAP master timeline. Remove this export's window scroll listener, sticky journey height, and independent scroll buttons for that integrated interval.
6. Keep Lenis and ScrollTrigger in charge of page scrolling. Disable Globe.GL wheel zoom within the pinned scene so the globe does not consume scrolling. Retain explicit zoom buttons if desired. Exclude forms and native select controls from any custom scroll handling as your existing setup requires.
7. Extend the master timeline and scroll distance for the new scene. Update SideNav destinations to match the actual new timeline positions; don't keep the old hard-coded 7500px offsets unchanged.
8. Fade city panels and enable pointer interactions only once the India reveal has completed. Preserve accessible selectors, keyboard focus behavior, data source links, mobile layouts and reduced-motion behavior.
9. On unmount, disconnect observers, remove listeners, cancel pending work, stop rendering and dispose the globe instance through the chosen package's lifecycle API. Handle React development-mode effect remounts. Lazy-load rendering code and pause it outside the scene.
10. Verify forward and reverse scrolling, navigation dots, refresh at mid-scroll, resizing, touch scrolling, slow asset loads and WebGL failure. Keep the country/city information usable if 3D is unavailable.

## Where to find the reusable code

- World data/filters: `web/app.js` and `web/assets/data.json`.
- India locations, counts, coverage, dates and sources: `cities` in `web/india.js`.
- Camera: `update()` in `web/india.js` interpolates the view from altitude 2.15 to 0.42 on desktop, or 0.76 on mobile.
- City reveal: `setCityMode()` and `marker()` in `web/india.js`.
- Panel content: `selectCity()` in `web/india.js`.
- Journey styling: the “Scroll journey” section of `web/style.css`.

## Prompt to give your coding assistant

Integrate this SOUL3 Recovery Globe export into my existing React/TypeScript/Vite website. Inspect App.tsx, SceneController.tsx, SideNav.tsx and my package manifest first. Build a scoped RecoveryGlobe component and connect its world-to-India camera progress to the existing GSAP/ScrollTrigger master timeline and Lenis setup. Preserve the current sections and insert the globe between The Problem and Our Mission. Update navigation offsets to match the new timeline. Reuse the included assets and sourced data; retain all years, geographic coverage and missing-data labels. Do not invent patient or rehabilitation totals. Support cleanup, lazy loading, mobile input, reduced motion and reverse scrolling. Do not add a second competing page-scroll controller. Build the project and report the actual changes and remaining limitations.
