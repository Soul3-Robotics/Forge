import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import Globe from 'globe.gl';

export interface RecoveryGlobeHandle {
  setProgress: (p: number) => void;
  setActive: (active: boolean) => void;
}

const compact = (n: number) => n >= 1e9 ? (n / 1e9).toFixed(2) + 'B' : n >= 1e6 ? (n / 1e6).toFixed(2) + 'M' : n >= 1e3 ? (n / 1e3).toFixed(1) + 'K' : String(n);
const metrics: any = { stroke: 'people living with stroke', incident: 'new stroke cases during the year', rehab: 'people who may benefit from rehabilitation' };

const cities = [
  { name: 'Mumbai', region: 'Maharashtra', lat: 19.076, lng: 72.878, count: 456, period: '2005–2006', scope: 'H-ward study population, ages 25+. Historical first-ever strokes over two years; not all of Mumbai or current patients.', source: 'https://onlinelibrary.wiley.com/doi/full/10.1111/j.1747-4949.2009.00313.x' },
  { name: 'Kota', region: 'Rajasthan', lat: 25.214, lng: 75.864, count: 2347, period: '2018–2019', scope: 'Defined urban registry area, ages 18+. Includes fatal events; not a current patient or rehabilitation caseload.', source: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10884975/' },
  { name: 'Varanasi', region: 'Uttar Pradesh', lat: 25.318, lng: 82.974, count: 2024, period: '2018–2019', scope: 'Defined urban registry area, ages 18+. Includes fatal events; not a current patient or rehabilitation caseload.', source: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10884975/' },
  { name: 'Cuttack', region: 'Odisha · urban + rural registry', lat: 20.462, lng: 85.883, count: 3226, period: '2018–2019', scope: 'Defined urban and rural registry population, ages 18+. The marker locates Cuttack; this count is not city-only and includes fatal events.', source: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10884975/' },
  { name: 'Silchar / Cachar', short: 'Silchar', region: 'Assam · Cachar registry', lat: 24.833, lng: 92.779, count: 2493, period: '2018–2019', scope: 'Cachar urban and rural registry population, ages 18+. Silchar is a location marker for the registry, not a city-only count. Includes fatal events.', source: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10884975/' },
  { name: 'Tirunelveli', region: 'Tamil Nadu · urban + rural registry', lat: 8.714, lng: 77.756, count: 3730, period: '2018–2019', scope: 'Defined urban and rural registry population, ages 18+. The count extends beyond the city and includes fatal events.', source: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10884975/' }
];

export const RecoveryGlobe = forwardRef<RecoveryGlobeHandle>((_, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeInstance = useRef<any>(null);
  const activeRef = useRef(false);
  const syncAnimationRef = useRef<(() => void) | null>(null);
  const requestRenderRef = useRef<(() => void) | null>(null);

  const [records, setRecords] = useState<any[]>([]);
  const [geo, setGeo] = useState<any>(null);

  const [layer, setLayer] = useState<'stroke' | 'incident' | 'rehab'>('stroke');
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [selectedCity, setSelectedCity] = useState<any>(cities[0]);
  const [isWorldMode, setIsWorldMode] = useState(true);
  const [isCityMode, setIsCityMode] = useState(false);
  const [zoomPhase, setZoomPhase] = useState(0);
  const isWorldModeRef = useRef(true);
  const isCityModeRef = useRef(false);
  const zoomPhaseRef = useRef(0);
  const wasZero = useRef(true);
  const wasCity = useRef(false);

  const [error, setError] = useState<string | null>(null);

  // Expose setProgress to GSAP Timeline
  useImperativeHandle(ref, () => ({
    setActive: (active: boolean) => {
      if (activeRef.current === active) return;
      activeRef.current = active;
      if (active) requestRenderRef.current?.();
      else syncAnimationRef.current?.();
    },
    setProgress: (p: number) => {
      updateCamera(p);
      requestRenderRef.current?.();

      const newWorld = p === 0;
      if (newWorld !== isWorldModeRef.current) {
        isWorldModeRef.current = newWorld;
        setIsWorldMode(newWorld);
      }

      const newCity = p > 0.64;
      if (newCity !== isCityModeRef.current) {
        isCityModeRef.current = newCity;
        setIsCityMode(newCity);
      }

      let phase = 0;
      if (p >= 0.65) phase = 2;
      else if (p >= 0.35) phase = 1;

      if (phase !== zoomPhaseRef.current) {
        zoomPhaseRef.current = phase;
        setZoomPhase(phase);
      }
    }
  }));

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const [dataRes, geoRes] = await Promise.all([
          fetch('/recovery-globe/data.json', { signal: controller.signal }),
          fetch('/recovery-globe/countries.json', { signal: controller.signal })
        ]);
        if (!dataRes.ok || !geoRes.ok) throw new Error();

        const data = await dataRes.json();
        const geoData = await geoRes.json();
        if (controller.signal.aborted) return;
        data.sort((a: any, b: any) => a.name.localeCompare(b.name));

        setRecords(data);
        setGeo(geoData);
        setSelectedCountry(data.find((d: any) => d.name === 'India'));
      } catch (e: any) {
        if (controller.signal.aborted) return;
        setError("Fetch error: " + e.message);
      }
    }
    load();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!containerRef.current || !records.length || !geo || globeInstance.current) return;
    const container = containerRef.current;

    try {
      const globe = new (Globe as any)(containerRef.current)
        .onGlobeReady(() => requestRenderRef.current?.())
        .backgroundColor('#00000000') // Transparent
        .globeImageUrl('/recovery-globe/earth.jpg')
        .bumpImageUrl('/recovery-globe/bump.png')
        .showAtmosphere(true)
        .atmosphereColor('#51a6b5')
        .atmosphereAltitude(0.14)
        .polygonsData(geo.features.filter((f: any) => f.properties.name !== 'Antarctica'))
        .polygonAltitude(0.002)
        .polygonSideColor(() => 'rgba(0,0,0,0)')
        .polygonLabel((f: any) => f.properties.name)
        .pointLat('lat')
        .pointLng('lng')
        .htmlLat('lat')
        .htmlLng('lng')
        .htmlAltitude(0.025)
        .htmlElement(() => document.createElement('div')); // Empty default

      const controls = globe.controls();
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableRotate = true;
      controls.autoRotate = false;
      controls.minDistance = 155;
      controls.maxDistance = 500;
      controls.autoRotateSpeed = 0.28;

      globe.pointOfView({ lat: 21, lng: 76, altitude: 2.15 });
      globe.renderer().setPixelRatio(Math.min(window.devicePixelRatio, 2));

      globeInstance.current = globe;

      const observer = new ResizeObserver(() => {
        const { clientWidth: width, clientHeight: height } = container;
        if (globe.width() !== width) globe.width(width);
        if (globe.height() !== height) globe.height(height);
        requestRenderRef.current?.();
      });
      observer.observe(container);

      // The pinned 3D sections overlap geometrically, so viewport intersection
      // cannot tell us when the globe is visible. The scene timeline owns that.
      let warmingUp = true;
      let running = true;
      let renderUntil = 0;
      let idleTimer: ReturnType<typeof setTimeout> | undefined;
      const syncAnimation = () => {
        const shouldRun = !document.hidden && (warmingUp || (activeRef.current && performance.now() < renderUntil));
        if (running === shouldRun) return;
        running = shouldRun;
        if (shouldRun) globe.resumeAnimation();
        else globe.pauseAnimation();
      };
      // Allow camera tweens (1100ms), geometry transitions and orbit damping
      // to settle before resting. Pointer and scene updates wake rendering.
      const requestRender = () => {
        renderUntil = performance.now() + 2000;
        clearTimeout(idleTimer);
        idleTimer = setTimeout(syncAnimation, 2050);
        syncAnimation();
      };
      syncAnimationRef.current = syncAnimation;
      requestRenderRef.current = requestRender;
      document.addEventListener('visibilitychange', requestRender);
      const pointerEvents = ['pointerdown', 'pointermove', 'pointerup', 'wheel'] as const;
      pointerEvents.forEach(event => container.addEventListener(event, requestRender, { passive: true }));
      controls.addEventListener('change', requestRender);
      syncAnimation();

      // Give WebGL exactly 1 second to compile its shaders and cache geometries before dismissing the loading screen
      const readyTimer = setTimeout(() => {
        warmingUp = false;
        syncAnimation();
        window.dispatchEvent(new Event('globeReady'));
      }, 1000);

      return () => {
        clearTimeout(readyTimer);
        clearTimeout(idleTimer);
        document.removeEventListener('visibilitychange', requestRender);
        pointerEvents.forEach(event => container.removeEventListener(event, requestRender));
        controls.removeEventListener('change', requestRender);
        syncAnimationRef.current = null;
        requestRenderRef.current = null;
        observer.disconnect();
        globe._destructor();
        globe.controls().dispose();
        globe.renderer().dispose();
        container.replaceChildren();
        globeInstance.current = null;
      };
    } catch (e: any) {
      setError("WebGL init error: " + e.message);
    }
  }, [records, geo]);

  useEffect(() => {
    requestRenderRef.current?.();
  }, [layer, selectedCountry, selectedCity, isWorldMode]);

  useEffect(() => {
    if (!globeInstance.current || !isWorldMode || !selectedCountry) return;

    const globe = globeInstance.current;
    globe.controls().enableRotate = true;
    globe.controls().autoRotate = false;

    const available = records.filter((d: any) => d[layer] != null);
    const primary = ['India', 'China', 'Japan', 'Australia', 'United States of America', 'Brazil', 'United Kingdom', 'Russia', 'South Africa', 'Nigeria', 'Indonesia', 'Canada'];
    const labels = available.filter((d: any) => primary.includes(d.name) || d.code === selectedCountry.code);

    globe
      .pointsData(available)
      .pointAltitude(0.008)
      .pointRadius((d: any) => d.code === selectedCountry.code ? 0.22 : 0.085)
      .pointColor(() => '#70ecd3')
      .pointLabel((d: any) => d.name + ': ' + compact(d[layer]))
      .onPointClick((d: any) => {
        setSelectedCountry(d);
        globe.pointOfView({ lat: d.lat, lng: d.lng, altitude: 2.1 }, 1100);
      })
      .polygonCapColor((f: any) => f.properties.code === selectedCountry.code ? 'rgba(77,216,195,0.16)' : 'rgba(0,0,0,0)')
      .polygonStrokeColor((f: any) => f.properties.code === selectedCountry.code ? '#77e6d1' : 'rgba(135,197,205,0.19)')
      .onPolygonClick((f: any) => {
        const d = records.find((r: any) => r.code === f.properties.code);
        if (d) {
          setSelectedCountry(d);
          globe.pointOfView({ lat: d.lat, lng: d.lng, altitude: 2.1 }, 1100);
        }
      })
      .htmlElement((d: any) => {
        if (d.count !== undefined) {
          const el = document.createElement('div');
          const isSelected = d.name === selectedCity?.name;
          el.className = `pointer-events-auto bg-[#09232ced] border ${isSelected ? 'border-[#bce2bf] bg-[#143f3b] shadow-[0_0_25px_#6ed7ad25]' : 'border-[#58c6b57a] shadow-[0_8px_24px_#0005]'} p-[7px_10px] rounded-[6px] text-left text-[#d7e8e6] min-w-[105px] cursor-pointer whitespace-nowrap relative translate-x-[14px] -translate-y-[10px] transition-colors`;

          el.innerHTML = `
            <div class="absolute -left-[18px] top-[23px] w-[7px] h-[7px] rounded-full border-2 ${isSelected ? 'bg-[#f5dca1] border-[#dcfff6] shadow-[0_0_14px_#60ffe3]' : 'bg-[#77e7d1] border-[#dcfff6] shadow-[0_0_14px_#60ffe3]'}"></div>
            <strong class="block text-[13px] font-medium">${d.name}</strong>
            <span class="block text-[#6fdbc7] text-[12px] mt-[3px]">${d.count} stroke cases</span>
            <small class="block text-[10px] text-[#829eaa] mt-[2px]">${d.period}</small>
          `;
          el.onclick = () => setSelectedCity(d);
          return el;
        }

        const el = document.createElement('button');
        const isSelected = d.code === selectedCountry?.code;
        el.className = `pointer-events-auto border rounded-[5px] px-[9px] py-[6px] whitespace-nowrap text-[10px] shadow-[0_3px_20px_#0008] cursor-pointer transition-colors hover:bg-[#11413e] hover:border-[#70ddcc] ${isSelected ? 'bg-[#11413e] border-[#70ddcc]' : 'bg-[#071b24f2] border-[#7ce4d44d] text-[#d5f3f1]'}`;
        el.type = 'button';

        const dot = document.createElement('span');
        dot.className = 'inline-block w-[5px] h-[5px] rounded-full bg-[#6de5d1] mr-[6px]';
        el.appendChild(dot);

        el.append(document.createTextNode(d.name === 'United States of America' ? 'United States' : d.name));

        const b = document.createElement('b');
        b.className = 'text-[#79e2d4] text-[13px] ml-[7px]';
        b.textContent = (layer === 'rehab' && d.name === 'India' ? '>' : '') + compact(d[layer]);
        el.appendChild(b);

        el.onclick = () => {
          setSelectedCountry(d);
          globe.pointOfView({ lat: d.lat, lng: d.lng, altitude: 2.1 }, 1100);
        };
        return el;
      });

    globe.htmlElementsData(labels);

  }, [layer, selectedCountry, records, isWorldMode]);

  const updateCamera = (p: number) => {
    if (!globeInstance.current) return;
    const globe = globeInstance.current;

    const isNowZero = p === 0;
    const isNowCity = p > 0.64;

    if (wasZero.current && !isNowZero) {
      // Just started zooming
      globe.controls().enableRotate = false;
      globe
        .polygonsData(geo.features.filter((f: any) => f.properties.code === 'IND'))
        .polygonCapColor(() => 'rgba(42,176,139,.065)')
        .polygonStrokeColor(() => '#9cddbc')
        .pointsData(cities)
        .pointRadius(0.055)
        .pointColor((d: any) => d.name === selectedCity.name ? '#f5dca1' : '#65e4cf')
        .onPointClick((d: any) => setSelectedCity(d));

      wasZero.current = false;
    } else if (!wasZero.current && isNowZero) {
      // Returned to world view
      globe.controls().enableRotate = true;
      globe.globeOffset([0, 0]);
      globe.polygonsData(geo.features.filter((f: any) => f.properties.name !== 'Antarctica'));
      globe.htmlElementsData(records.filter((d: any) => ['India', 'China', 'Japan', 'Australia', 'United States of America', 'Brazil', 'United Kingdom', 'Russia', 'South Africa', 'Nigeria', 'Indonesia', 'Canada'].includes(d.name) || d.code === selectedCountry?.code));

      wasZero.current = true;
    }

    if (!isNowZero) {
      const clamp = (x: number) => Math.max(0, Math.min(1, x));
      const ease = (x: number) => x * x * (3 - 2 * x);
      const z = ease(clamp(p / 0.78));
      const isMobile = window.innerWidth <= 700;

      globe.globeOffset([isMobile ? 0 : window.innerWidth * 0.12 * z, 0]);
      globe.pointOfView({
        lat: 21 + z,
        lng: 76 + 4 * z,
        altitude: 2.15 + (isMobile ? 0.76 - 2.15 : 0.42 - 2.15) * z
      }, 0);

      if (wasCity.current !== isNowCity) {
        globe.htmlElementsData(isNowCity ? cities : []);
        wasCity.current = isNowCity;
      }
    }
  };

  return (
    <div className="w-full h-full relative font-sans overflow-hidden bg-[#060d12]">

      <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-auto cursor-grab active:cursor-grabbing"></div>

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-50">
          <p className="text-white text-xl mb-4">3D view unavailable. Please check assets.</p>
          <p className="text-red-400 font-mono text-sm max-w-xl text-center break-words">{error}</p>
        </div>
      )}

      {/* WORLD EXPLORER UI */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isWorldMode ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-1/2 -translate-y-1/2 left-8 lg:left-16 max-w-[420px] pointer-events-auto flex flex-col gap-6">
          <div>
            <h1 className="text-5xl lg:text-6xl font-light text-white mb-4 leading-[1.1] tracking-tight">
              Recovery is a <br />
              <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#008B87] to-[#7ce4d4]">worldwide</span><br />
              human need.
            </h1>
            <p className="text-gray-300 text-lg font-light leading-relaxed">
              Behind every data point is a human life. Explore the global scale of stroke incidence and the monumental need for rehabilitation.
            </p>
          </div>

          <div className="bg-[#040f16]/90 border border-[#008B87]/30 rounded-[2rem] p-8 relative overflow-hidden group">
            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#7ce4d4] to-[#008B87] mb-2 relative z-10">
              {layer === 'stroke' ? '93.8M' : layer === 'incident' ? '11.9M' : '2.41B'}
            </div>
            <p className="text-gray-200 font-medium text-lg leading-snug relative z-10">
              {layer === 'rehab' ? 'People worldwide could benefit from rehabilitation' : metrics[layer] + ' worldwide'}
            </p>
          </div>

          <div className="space-y-3">
            {(['stroke', 'incident', 'rehab'] as const).map(l => (
              <button
                key={l}
                onClick={() => setLayer(l)}
                className={`block w-full text-left px-6 py-4 rounded-2xl border transition-all duration-300 ${layer === l ? 'bg-[#008B87]/20 border-[#008B87]/60 text-white' : 'bg-[#040f16]/80 border-white/5 text-gray-400 hover:bg-[#008B87]/10 hover:border-[#008B87]/30 hover:text-white'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-base tracking-wide">{l === 'stroke' ? 'Living with stroke' : l === 'incident' ? 'New stroke cases' : 'Rehabilitation needs'}</span>
                  {layer === l && <span className="w-2 h-2 rounded-full bg-[#7ce4d4]"></span>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedCountry && (
          <div className="absolute top-1/2 -translate-y-1/2 right-8 lg:right-16 w-[340px] bg-[#040f16]/90 border border-white/10 rounded-[2rem] p-8 pointer-events-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-[#008B87]"></span>
              <span className="text-xs font-bold text-[#008B87] uppercase tracking-[0.2em]">Country Spotlight</span>
            </div>

            <div className="relative mb-8">
              <select
                value={selectedCountry.code}
                onChange={e => {
                  const c = records.find(d => d.code === e.target.value);
                  if (c) {
                    setSelectedCountry(c);
                    if (globeInstance.current) {
                      globeInstance.current.pointOfView({ lat: c.lat, lng: c.lng, altitude: 2.1 }, 1100);
                    }
                  }
                }}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl p-4 appearance-none focus:outline-none focus:border-[#008B87]/50 transition-colors cursor-pointer text-lg font-medium"
              >
                {records.map(r => (
                  <option key={r.code} value={r.code} className="bg-[#040f16] text-white">{r.name}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                ▼
              </div>
            </div>

            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 mb-2">
              {selectedCountry[layer] == null ? 'Not available' : compact(selectedCountry[layer])}
            </div>
            <p className="text-[#008B87] text-sm font-medium uppercase tracking-wide">{metrics[layer]}</p>
          </div>
        )}
      </div>

      {/* INDIA JOURNEY UI */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${!isWorldMode ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-1/2 left-10 lg:left-16 -translate-y-1/2 max-w-md pointer-events-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#c38c25]"></span>
            <span className="text-xs font-bold text-[#c38c25] uppercase tracking-[0.2em]">SOUL3 / A CLOSER LOOK</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-light text-white leading-[1.1] mb-4">
            {zoomPhase === 0 ? <>One world.<br /><em className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#c38c25] to-[#f5dca1]">Closer to home.</em></> :
              zoomPhase === 1 ? <>Into <em className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#c38c25] to-[#f5dca1]">India.</em></> :
                <>Care starts<br /><em className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#c38c25] to-[#f5dca1]">closer to home.</em></>}
          </h2>
        </div>

        {/* City Panel */}
        <div className={`absolute top-1/2 right-8 lg:right-16 -translate-y-1/2 w-[380px] bg-[#040f16]/90 border border-[#c38c25]/30 rounded-[2rem] p-8 pointer-events-auto transition-all duration-1000 transform ${isCityMode ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-[#c38c25]"></span>
            <span className="text-xs font-bold text-[#c38c25] uppercase tracking-[0.2em]">LOCAL EVIDENCE / INDIA</span>
          </div>

          <div className="relative mb-8">
            <select
              value={selectedCity.name}
              onChange={e => setSelectedCity(cities.find(c => c.name === e.target.value) || cities[0])}
              className="w-full bg-white/5 border border-white/10 text-white rounded-xl p-4 appearance-none focus:outline-none focus:border-[#c38c25]/50 transition-colors cursor-pointer text-lg font-medium"
            >
              {cities.map(c => <option key={c.name} value={c.name} className="bg-[#040f16] text-white">{c.name}</option>)}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
              ▼
            </div>
          </div>

          <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 mb-2">{selectedCity.name}</h3>
          <p className="text-[#c38c25] text-sm font-medium uppercase tracking-wide mb-6">{selectedCity.region}</p>

          <div className="mb-6 pb-6 border-b border-white/10">
            <div className="text-4xl font-bold text-[#c38c25] mb-1">{selectedCity.count.toLocaleString('en-IN')}</div>
            <div className="text-gray-300 text-sm">stroke cases registered in <span className="font-semibold text-white">{selectedCity.period}</span></div>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed mb-4">{selectedCity.scope}</p>
          <a href={selectedCity.source} target="_blank" rel="noopener noreferrer" className="inline-block text-xs font-semibold text-white/60 hover:text-[#f5dca1] transition-colors border border-white/20 rounded-full px-4 py-2 hover:border-[#c38c25]/50">
            VIEW SOURCE
          </a>
        </div>
      </div>

    </div>
  );
});
