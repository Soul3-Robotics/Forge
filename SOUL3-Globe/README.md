# SOUL3 Recovery Globe

The complete standalone source for the SOUL3 globe built in this conversation, including the country explorer and scroll-driven India journey. This is the HTML/CSS/JavaScript version of the published experience, not a finished React integration.

## Run locally

Install Node.js if needed, open a terminal in this folder, and run:

```sh
npm start
```

Open http://localhost:3000. No npm install is required: the Globe.GL browser bundle is included. Alternatively, run `python3 -m http.server 3000 --directory web`.

Use an HTTP server. Opening index.html directly as a file will prevent JSON data from loading in many browsers.

## Included files

- `web/index.html`: page structure, panels, data-source dialog.
- `web/style.css`: SOUL3 theme, responsive layouts and sticky scroll scene.
- `web/app.js`: interactive world globe, country selector, metric filters and controls.
- `web/india.js`: scroll-to-India camera motion, six registry markers and city panel.
- `web/assets/data.json`: country-level estimates, uncertainty intervals and source links.
- `web/assets/countries.json`: simplified Natural Earth country geometry.
- `web/assets/earth.jpg`, `bump.png`: globe surface and relief textures.
- `web/assets/globe.min.js`: bundled Globe.GL 2.44.1 rendering library.
- `server.mjs`: local development server using Node built-ins.
- `INTEGRATION.md`: transfer instructions for your React/GSAP/Lenis website.

## How it works

The first globe supports country selection and three data layers. A second, full-screen scroll scene appears below it. `india.js` measures progress through a sticky section, drives the camera toward India, and reveals clickable city markers. Scrolling backwards reverses the transition. Both globe render loops pause when their sections leave view. Reduced-motion users receive a discrete change of viewpoint.

No backend, API keys, authentication service, or ChatGPT subscription is required to run this export. Google Fonts is optional; fallback fonts work if it is unavailable. The exported website contains aggregate published statistics only, not identifiable patient records.

## Data limitations

Country stroke estimates are GBD 2021 all-age, both-sex counts. Rehabilitation coverage is limited to India and China, with different reporting dates. India city markers show historical registered first-ever strokes: Mumbai H-ward (2005–2006), and defined Kota, Varanasi, Cuttack, Cachar and Tirunelveli registry populations (2018–2019). Silchar marks the Cachar registry. Counts include fatal events and are not current patients, city-wide prevalence, or rehabilitation caseloads. Some registry areas include rural populations.

City rehabilitation counts were not established by these studies. The interface deliberately says “not reported.” The rehabilitation categories are general WHO post-stroke guidance, not measured local demand. Do not invent city totals or distribute the national estimate across cities.

Source links, dates and coverage details are included in the interface. Preserve them when integrating.

## Credits

Globe.GL / Three.js ecosystem: https://github.com/vasturiano/globe.gl (MIT; retain upstream license notices). The minified vendor bundle is unmodified.
Earth and relief textures: three-globe example assets, https://github.com/vasturiano/three-globe/tree/master/example/img .
Country geometry: Globe.GL example Natural Earth dataset; boundaries are illustrative and do not express a position on disputes.
Health data: GBD study, WHO, and Indian stroke registry papers linked in the interface and code. These third-party materials retain their respective attribution and terms; this export does not relicense them.

## Verification

JavaScript syntax, local asset references, country identifiers, city study totals, and simulated scroll/city-selection states were checked. A visual browser test of this downloadable export has not been performed. Test desktop and mobile in your existing website before deployment.
