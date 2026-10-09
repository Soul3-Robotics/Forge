const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const hash = text => crypto.createHash('sha256').update(text).digest('hex');
const changes = [
    ["index.html",
        "2d3148824403c2b86716670dfe308a6dbbc71d7394a0f654271be9a9922ff389",
        "4c719f9411f46d631e01daed247198cdacec2e7c1e6f6f9c0fa99d0aaf271573", [
            [4, 1, ["    <link rel=\"icon\" type=\"image/png\" href=\"/favicon.png\" />", "    <link rel=\"preload\" as=\"image\" href=\"/src/assets/background.webp\" fetchpriority=\"high\" />", "    <link rel=\"preload\" as=\"image\" href=\"/src/assets/floor.webp\" fetchpriority=\"high\" />"]],
        ]],
    ["src/App.tsx",
        "a5d5f1c17016fd678759bc80a9e8851004887533b920f1b12677a6d209bb3fe3",
        "866c6ed92f6765b6b759d2ed2ce504c059f905c88f08e8848fb01be1f17cdab1", [
            [7, 1, ["import logo from './assets/brand-mark.webp';", "import heroBackground from './assets/background.webp';", "import heroFloor from './assets/floor.webp';"]],
            [23, 3, ["    let cancelled = false;", "    // Reveal the first section as soon as its own artwork is ready. The globe", "    // is prepared later, when visitors approach it in the scroll timeline.", "    Promise.all([heroBackground, heroFloor, logo].map(src => {", "      const image = new Image();", "      image.src = src;", "      return image.decode().catch(() => undefined);", "    })).then(() => {", "      if (!cancelled) setLoaded(true);", "    });", "    return () => { cancelled = true; };"]],
        ]],
    ["src/components/AboutUs.tsx",
        "d808c8ceeaa68f0412f7078dbb9bb79594646d1fa241f380e796a78821569a40",
        "03479eb904aeb413a94fd4f1cdae5a03de13f85b9b329623e539eb16d1505a34", [
            [0, 2, ["import { forwardRef, lazy, Suspense, useCallback, useImperativeHandle, useRef, useState } from 'react';"]],
            [4, 1, ["const RecoveryGlobe = lazy(() => import('./RecoveryGlobe').then(module => ({ default: module.RecoveryGlobe })));", "", "export interface AboutUsHandle extends RecoveryGlobeHandle {", "  preload: () => void;", "}", "", "export const AboutUs = forwardRef<AboutUsHandle>((_, ref) => {", "  const [requested, setRequested] = useState(false);", "  const instance = useRef<RecoveryGlobeHandle | null>(null);", "  const progress = useRef(0);", "  const active = useRef(false);", "", "  // Preserve navigation that happens while the separate 3D bundle is loading.", "  const attachGlobe = useCallback((globe: RecoveryGlobeHandle | null) => {", "    instance.current = globe;", "    globe?.setProgress(progress.current);", "    globe?.setActive(active.current);", "  }, []);", "", "  useImperativeHandle(ref, () => ({", "    preload: () => setRequested(true),", "    setProgress: value => {", "      progress.current = value;", "      instance.current?.setProgress(value);", "    },", "    setActive: value => {", "      active.current = value;", "      if (value) setRequested(true);", "      instance.current?.setActive(value);", "    }", "  }), []);", ""]],
            [32, 1, ["          {requested && <Suspense fallback={null}>", "            <RecoveryGlobe ref={attachGlobe} />", "          </Suspense>}"]],
            [39, 0, [""]],
        ]],
    ["src/components/ContactUs.tsx",
        "20cdd9e1ca8c93eac440feb42511520861dfff3829d4c57cd83545d34cb77332",
        "5df63ec01c0f515330a2715a9bef6cede90647ba3d2dfc6a4c0fe4cff1227eda", [
            [3, 1, ["export const ContactUs: React.FC<{ loadMap?: boolean }> = ({ loadMap = true }) => {"]],
            [63, 1, ["                src={loadMap ? \"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.834468648358!2d72.89725831518398!3d19.07098795708573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c627a20bcaa9%3A0xb2fd3bcfeac0052a!2sriidl%20Somaiya%20Vidyavihar!5e0!3m2!1sen!2sin!4v1683884872322!5m2!1sen!2sin\" : undefined}"]],
        ]],
    ["src/components/HeroSection.tsx",
        "908e42ea7ffcab995190428362c907d17333662d345a4d59511d86b9dbec889e",
        "3a8faf142be75b51195db397559fca22480caaaeda113891a685f53724514439", [
            [2, 1, ["import logo from '../assets/brand-mark.webp';"]],
            [215, 0, [""]],
        ]],
    ["src/components/NavBar.tsx",
        "485892a13fa4ffe10aa7c5ea2d5b5e58013036d649f78477f50245c5b88df875",
        "d563f49e0447767d3c94ec19ad0385f1de2088f29742b87fcfa784fb2d6b3f50", [
            [1, 1, ["import logo from '../assets/logo.webp';"]],
        ]],
    ["src/components/RecoveryGlobe.tsx",
        "a7a83bab22ab05c646b13d58e86bb301fc5cab70210472f4406f6a2137c994c4",
        "ec0ff5c68801785d7de5fe15050eca7b36329f81a0d85d07466e9f40716b3885", [
            [26, 0, ["  const progressRef = useRef(0);"]],
            [52, 1, ["    setProgress: updateProgress", "  }));", "", "  function updateProgress(p: number) {", "    progressRef.current = p;", "    if (!globeInstance.current) return;"]],
            [77, 1, []],
            [181, 1, ["      // Warm the shaders independently of the hero's loading screen."]],
            [284, 0, ["", "  // Initialize labels first, then replay queued navigation with this render's", "  // loaded data. Phase guards in updateProgress avoid redundant state updates.", "  useEffect(() => {", "    if (records.length && geo) updateProgress(progressRef.current);", "  });"]],
        ]],
    ["src/components/SceneController.tsx",
        "f7fc3c0acbe9da62fe460ecd5a3a1920ca37d74588a9a13eed59dcbfbd746357",
        "925a38919b795c341a997941335ed46705fe1d36c06ac9f923d74cf69fffd39e", [
            [7, 1, ["import type { AboutUsHandle } from './AboutUs';"]],
            [9, 2, ["import missionBg from '../assets/our-mission.webp';", "import contactBg from '../assets/background.webp';"]],
            [23, 1, ["  const globeRef = useRef<AboutUsHandle>(null);"]],
            [25, 0, ["  const [missionRequested, setMissionRequested] = useState(false);", "  const [contactRequested, setContactRequested] = useState(false);"]],
            [31, 0, ["      let globeRequested = false;", "      let missionPrepared = false;", "      let contactPrepared = false;"]],
            [57, 0, ["          // Start preparing 3D during the hero exit, well before its reveal.", "          if (!globeRequested && time > 0.5) {", "            globeRequested = true;", "            globeRef.current?.preload();", "          }", "          if (!missionPrepared && time > 8) {", "            missionPrepared = true;", "            setMissionRequested(true);", "          }", "          if (!contactPrepared && time > 12.5) {", "            contactPrepared = true;", "            setContactRequested(true);", "          }"]],
            [232, 1, ["        <img src={missionRequested ? missionBg : undefined} alt=\"Mission Background\" decoding=\"async\" className=\"absolute inset-0 w-full h-full object-cover\" />"]],
            [265, 1, ["            <ContactUs loadMap={contactRequested} />"]],
        ]],
    ["src/components/ui/wilderness.tsx",
        "0093c8441de4d936b012642b9b425c72d0da731c82c54c973fab135617945f01",
        "e607a88bd3d5ea54e013f9a3e0e9aba98ef55b9e472be89d8deda7b3efc39cb9", [
            [2, 2, ["import customSkyBg from '../../assets/background.webp';", "import customFloorBg from '../../assets/floor.webp';"]],
            [276, 0, ["          fetchPriority=\"high\"", "          decoding=\"async\""]],
        ]],
];

async function main() {
    const pending = [];

    for (const [file, beforeHash, afterHash, edits] of changes) {
        const original = fs.readFileSync(file);
        const normalized = original.toString('utf8').replace(/\r\n/g, '\n');

        if (hash(normalized) === afterHash) continue;

        if (hash(normalized) !== beforeHash) {
            throw new Error(
                file + ' differs from the expected version. Apply the earlier fix-lag.cjs first, or send me this error. No project files changed.'
            );
        }

        const lines = normalized.split('\n');
        for (const [start, count, replacement] of [...edits].reverse()) {
            lines.splice(start, count, ...replacement);
        }

        let updated = lines.join('\n');
        if (hash(updated) !== afterHash) {
            throw new Error('Script copy error. No project files changed.');
        }

        if (original.includes(Buffer.from('\r\n'))) {
            updated = updated.replace(/\n/g, '\r\n');
        }

        pending.push({ file, original, updated: Buffer.from(updated) });
    }

    let sharp;
    try {
        sharp = require(path.resolve('.forge-image-tools/node_modules/sharp'));
    } catch {
        throw new Error(
            'First run: npm install --prefix .forge-image-tools --no-audit --no-fund sharp@0.35.4'
        );
    }

    const images = [
        ['src/assets/background.png', 'src/assets/background.webp', null],
        ['src/assets/floor.png', 'src/assets/floor.webp', null],
        ['src/assets/our-mission.png', 'src/assets/our-mission.webp', null],
        ['src/assets/logo.png', 'src/assets/logo.webp', { height: 240 }],
        ['src/assets/favicon.png', 'src/assets/brand-mark.webp', { height: 192 }],
        ['src/assets/favicon.png', 'public/favicon.png', {
            width: 64,
            height: 64,
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        }],
    ];

    // Prepare everything before writing any project files.
    for (const [source, file, size] of images) {
        let image = sharp(source);
        if (size) image = image.resize(size);

        const updated = await (file.endsWith('.png')
            ? image.png()
            : image.webp(size
                ? { lossless: true }
                : { lossless: true, effort: 6 }
            )).toBuffer();

        const original = fs.existsSync(file) ? fs.readFileSync(file) : null;

        if (original?.equals(updated)) continue;
        if (original) {
            throw new Error(
                file + ' already exists with different content. No project files changed.'
            );
        }

        pending.push({ file, original, updated });
    }

    if (!pending.length) {
        console.log('These optimizations are already applied.');
        return;
    }

    const backup = '.forge-pagespeed-backup-' + Date.now();
    for (const { file, original } of pending) {
        if (original === null) continue;
        const dest = path.join(backup, file);
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.writeFileSync(dest, original, { flag: 'wx' });
    }

    const written = [];
    try {
        for (const item of pending) {
            fs.mkdirSync(path.dirname(item.file), { recursive: true });
            written.push(item);
            fs.writeFileSync(item.file, item.updated);
        }
    } catch (error) {
        for (const item of written.reverse()) {
            if (item.original === null) fs.rmSync(item.file, { force: true });
            else fs.writeFileSync(item.file, item.original);
        }
        throw error;
    }

    console.log('Applied locally. Backups: ' + backup);
    console.log('Next: npm ci, then npm run build, then npm run preview');
}

main().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
});