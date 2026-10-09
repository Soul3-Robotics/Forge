const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const hash = text => crypto.createHash('sha256').update(text).digest('hex');
const changes = [
    ["src/App.tsx",
        "95be3e498249f44d5af4bda717e2bb8baedb6408afb410340114ba857305ef54",
        "a5d5f1c17016fd678759bc80a9e8851004887533b920f1b12677a6d209bb3fe3", [
            [13, 0, ["  const [showLoader, setShowLoader] = useState(true);", "", "  useEffect(() => {", "    if (!loaded) return;", "    // Keep the existing fade, then remove its invisible infinite animations.", "    const timer = setTimeout(() => setShowLoader(false), 1000);", "    return () => clearTimeout(timer);", "  }, [loaded]);"]],
            [44, 1, ["      {showLoader && <div"]],
            [54, 1, ["      </div>}"]],
        ]],
    ["src/components/HeroSection.tsx",
        "3fe05d6432e797ad2e5e3d01cd1329d759cffbe1be8d1084410da13ce48c3fa9",
        "908e42ea7ffcab995190428362c907d17333662d345a4d59511d86b9dbec889e", [
            [0, 1, ["import React, { useEffect, useRef } from 'react';"]],
            [56, 2, ["export const HeroSection: React.FC<{ active?: boolean }> = ({ active = true }) => {", "  const heroRef = useRef<HTMLDivElement>(null);", "  const scrollButtonRef = useRef<HTMLDivElement>(null);"]],
            [64, 0, ["    const animations: ReturnType<typeof animate>[] = [];"]],
            [65, 0, ["      if (!heroRef.current) return;"]],
            [66, 1, ["      animations.push(animate(heroRef.current.querySelectorAll('.welcome-text .letter'), {"]],
            [70, 1, ["      }));"]],
            [73, 1, ["      animations.push(animate(heroRef.current.querySelectorAll('.headline-text .letter'), {"]],
            [77, 1, ["      }));"]],
            [80, 1, ["    return () => {", "      clearTimeout(timer);", "      animations.forEach(animation => animation.revert());", "    };"]],
            [86, 0, ["    if (!active) return;"]],
            [87, 1, ["      const button = scrollButtonRef.current;", "      if (!button) return;", "      const scrollY = window.scrollY;", "      button.style.opacity = String(Math.max(0, 1 - scrollY / 200));", "      button.style.pointerEvents = scrollY > 200 ? 'none' : 'auto';"]],
            [90, 0, ["    handleScroll();"]],
            [92, 1, ["  }, [active]);"]],
            [102, 1, ["    <div ref={heroRef} className=\"w-full h-screen relative flex flex-col justify-center overflow-hidden bg-black hero-section\">"]],
            [106, 1, ["        <ParallaxHero active={active}>"]],
            [166, 0, ["        ref={scrollButtonRef}"]],
            [167, 4, []],
            [177, 1, ["          <div className=\"relative w-full h-full animate-[spin_12s_linear_infinite] text-[11px] font-black tracking-widest uppercase\" style={{ animationPlayState: active ? 'running' : 'paused' }}>"]],
        ]],
    ["src/components/RecoveryGlobe.tsx",
        "e3254bfedbc3cb8d401ceeab351b351e0ecbfebe815ff0f17feb76a8af93a052",
        "a7a83bab22ab05c646b13d58e86bb301fc5cab70210472f4406f6a2137c994c4", [
            [5, 0, ["  setActive: (active: boolean) => void;"]],
            [22, 0, ["  const activeRef = useRef(false);", "  const syncAnimationRef = useRef<(() => void) | null>(null);", "  const requestRenderRef = useRef<(() => void) | null>(null);"]],
            [42, 0, ["    setActive: (active: boolean) => {", "      if (activeRef.current === active) return;", "      activeRef.current = active;", "      if (active) requestRenderRef.current?.();", "      else syncAnimationRef.current?.();", "    },"]],
            [44, 0, ["      requestRenderRef.current?.();"]],
            [69, 0, ["    const controller = new AbortController();"]],
            [72, 2, ["          fetch('/recovery-globe/data.json', { signal: controller.signal }),", "          fetch('/recovery-globe/countries.json', { signal: controller.signal })"]],
            [79, 0, ["        if (controller.signal.aborted) return;"]],
            [85, 0, ["        if (controller.signal.aborted) return;"]],
            [89, 0, ["    return () => controller.abort();"]],
            [93, 0, ["    const container = containerRef.current;"]],
            [96, 0, ["        .onGlobeReady(() => requestRenderRef.current?.())"]],
            [128, 3, ["        const { clientWidth: width, clientHeight: height } = container;", "        if (globe.width() !== width) globe.width(width);", "        if (globe.height() !== height) globe.height(height);", "        requestRenderRef.current?.();"]],
            [132, 1, ["      observer.observe(container);", "", "      // The pinned 3D sections overlap geometrically, so viewport intersection", "      // cannot tell us when the globe is visible. The scene timeline owns that.", "      let warmingUp = true;", "      let running = true;", "      let renderUntil = 0;", "      let idleTimer: ReturnType<typeof setTimeout> | undefined;", "      const syncAnimation = () => {", "        const shouldRun = !document.hidden && (warmingUp || (activeRef.current && performance.now() < renderUntil));", "        if (running === shouldRun) return;", "        running = shouldRun;", "        if (shouldRun) globe.resumeAnimation();", "        else globe.pauseAnimation();", "      };", "      // Allow camera tweens (1100ms), geometry transitions and orbit damping", "      // to settle before resting. Pointer and scene updates wake rendering.", "      const requestRender = () => {", "        renderUntil = performance.now() + 2000;", "        clearTimeout(idleTimer);", "        idleTimer = setTimeout(syncAnimation, 2050);", "        syncAnimation();", "      };", "      syncAnimationRef.current = syncAnimation;", "      requestRenderRef.current = requestRender;", "      document.addEventListener('visibilitychange', requestRender);", "      const pointerEvents = ['pointerdown', 'pointermove', 'pointerup', 'wheel'] as const;", "      pointerEvents.forEach(event => container.addEventListener(event, requestRender, { passive: true }));", "      controls.addEventListener('change', requestRender);", "      syncAnimation();"]],
            [135, 1, ["      const readyTimer = setTimeout(() => {", "        warmingUp = false;", "        syncAnimation();"]],
            [140, 0, ["        clearTimeout(readyTimer);", "        clearTimeout(idleTimer);", "        document.removeEventListener('visibilitychange', requestRender);", "        pointerEvents.forEach(event => container.removeEventListener(event, requestRender));", "        controls.removeEventListener('change', requestRender);", "        syncAnimationRef.current = null;", "        requestRenderRef.current = null;"]],
            [141, 8, ["        globe._destructor();", "        globe.controls().dispose();", "        globe.renderer().dispose();", "        container.replaceChildren();"]],
            [155, 0, ["", "  useEffect(() => {", "    requestRenderRef.current?.();", "  }, [layer, selectedCountry, selectedCity, isWorldMode]);"]],
        ]],
    ["src/components/SceneController.tsx",
        "ca8666db60ad3c26dc027d22c9dfff767209199471de570578a03b6e34b773a3",
        "f7fc3c0acbe9da62fe460ecd5a3a1920ca37d74588a9a13eed59dcbfbd746357", [
            [0, 1, ["import React, { useEffect, useRef, useState } from 'react';"]],
            [24, 0, ["  const [heroActive, setHeroActive] = useState(true);"]],
            [27, 0, ["    const context = gsap.context(() => {", "      let crumbleAnim: ReturnType<typeof animate> | null = null;", "      let heroWasActive = true;"]],
            [47, 0, ["      const globeStart = sectionConfigs[1].startTime + 1.5;", "      const globeEnd = sectionConfigs[1].startTime + sectionConfigs[1].pauseDuration + 0.5;"]],
            [49, 0, ["        onUpdate: () => {", "          const time = tl.time();", "          globeRef.current?.setActive(time > globeStart && time < globeEnd);", "          const heroIsActive = time < 2;", "          if (heroIsActive !== heroWasActive) {", "            heroWasActive = heroIsActive;", "            setHeroActive(heroIsActive);", "          }", "        },"]],
            [107, 2, []],
            [128, 1, ["                      delay: stagger(30),"]],
            [203, 3, ["      return () => crumbleAnim?.revert();", "    }, containerRef);", "", "    return () => context.revert();"]],
            [239, 1, ["            <HeroSection active={heroActive} />"]],
        ]],
    ["src/components/ui/wilderness.tsx",
        "a0833fa213d2634868b4fe16968ed3e02fbdd6fe1fba50bcfb2ca8acdb8285ce",
        "0093c8441de4d936b012642b9b425c72d0da731c82c54c973fab135617945f01", [
            [22, 0, ["  active?: boolean;"]],
            [183, 0, ["  active = true,"]],
            [192, 1, ["    if (!active) return;", "    let frame = 0;", "    let pointerX = 0;", "    let pointerY = 0;"]],
            [195, 4, ["      pointerX = e.clientX;", "      pointerY = e.clientY;", "      if (!frame) {", "        frame = requestAnimationFrame(() => {", "          const newXValue = pointerX - window.innerWidth / 2;", "          const newYValue = pointerY - window.innerHeight / 2;"]],
            [201, 2, ["          updateLayers(pointerX, newXValue, newYValue, newRotateDegree);", "          frame = 0;"]],
            [204, 1, []],
            [207, 7, []],
            [251, 0, ["", "    window.addEventListener('mousemove', handleMouseMove, { passive: true });", "    return () => {", "      window.removeEventListener('mousemove', handleMouseMove);", "      cancelAnimationFrame(frame);", "    };", "  }, [active, layers]);"]],
        ]],
];

try {
    const pending = [];

    for (const [file, beforeHash, afterHash, edits] of changes) {
        const original = fs.readFileSync(file, 'utf8');
        const normalized = original.replace(/\r\n/g, '\n');
        const currentHash = hash(normalized);

        if (currentHash === afterHash) continue;

        if (currentHash !== beforeHash) {
            throw new Error(file + ' differs from the tested version. No files changed.');
        }

        const lines = normalized.split('\n');
        for (const [start, count, replacement] of [...edits].reverse()) {
            lines.splice(start, count, ...replacement);
        }

        let updated = lines.join('\n');
        if (hash(updated) !== afterHash) {
            throw new Error('Script copy error. No files changed.');
        }

        if (original.includes('\r\n')) {
            updated = updated.replace(/\n/g, '\r\n');
        }

        pending.push({ file, original, updated });
    }

    if (!pending.length) {
        console.log('The performance fixes are already applied.');
    } else {
        const backup = '.forge-performance-backup-' + Date.now();

        for (const item of pending) {
            const dest = path.join(backup, item.file);
            fs.mkdirSync(path.dirname(dest), { recursive: true });
            fs.writeFileSync(dest, item.original, { flag: 'wx' });
        }

        try {
            for (const item of pending) fs.writeFileSync(item.file, item.updated);
        } catch (error) {
            for (const item of pending) fs.writeFileSync(item.file, item.original);
            throw error;
        }

        console.log('Applied locally. Backups: ' + backup);
        console.log('Next: npm ci, then npm run build, then npm run preview');
    }
} catch (error) {
    console.error(error.message);
    process.exitCode = 1;
}