import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { FurniturePiece, WoodFinish, FabricType, LightingMood } from '../types';
import { LIGHTING_MOODS, WOOD_FINISHES, FABRICS } from '../data/furnitureData';
import {
  getMaterials,
  buildJhulaModel,
  buildDamchiyaModel,
  buildThroneChairModel,
  buildMandirModel,
  buildJaaliTableModel,
  buildDeskModel,
  buildWardrobeModel,
  buildGatesModel,
  buildTablesModel,
} from './furnitureModels';
import { Maximize2, RotateCcw, Play, Pause, Layers, Sparkles, Compass } from 'lucide-react';

interface Props {
  piece: FurniturePiece;
  wood: WoodFinish;
  fabric?: FabricType;
  lightingMood: LightingMood;
  isHero?: boolean;
  className?: string;
  onHotspotSelect?: (hotspot: { title: string; description: string }) => void;
}

export const ThreeFurnitureViewer: React.FC<Props> = ({
  piece,
  wood,
  fabric = 'crimson_silk',
  lightingMood,
  isHero = false,
  className = '',
  onHotspotSelect,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // UI state
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [exploded, setExploded] = useState<boolean>(false);
  const [activeHotspotIndex, setActiveHotspotIndex] = useState<number | null>(null);
  const [swingPhysicsActive, setSwingPhysicsActive] = useState<boolean>(true);
  const [hotspotScreenPositions, setHotspotScreenPositions] = useState<{ x: number; y: number; visible: boolean }[]>([]);

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const swingGroupRef = useRef<THREE.Group | null>(null);
  const lightsRef = useRef<{ ambient: THREE.AmbientLight; dir: THREE.DirectionalLight; fill: THREE.PointLight } | null>(null);
  const animationFrameId = useRef<number>(0);

  // Mouse / Orbit controls state
  const isDragging = useRef<boolean>(false);
  const previousMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const activeTouchPoints = useRef<Map<number, { x: number; y: number }>>(new Map());
  const initialPinchDistance = useRef<number | null>(null);
  const initialPinchRadius = useRef<number>(4.8);

  const cameraSpherical = useRef<{ radius: number; theta: number; phi: number }>({
    radius: isHero ? 4.8 : 4.4,
    theta: Math.PI / 4,
    phi: Math.PI / 2.6,
  });
  const targetSpherical = useRef<{ radius: number; theta: number; phi: number }>({
    radius: isHero ? 4.8 : 4.4,
    theta: Math.PI / 4,
    phi: Math.PI / 2.6,
  });

  // Rebuild the 3D model
  const rebuildModel = useCallback((targetExploded: boolean) => {
    if (!sceneRef.current) return;

    if (modelGroupRef.current) {
      sceneRef.current.remove(modelGroupRef.current);
      // Clean up geometries and materials if necessary
      modelGroupRef.current.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.geometry?.dispose();
        }
      });
    }

    const targetFabric: FabricType = (fabric || 'crimson_silk') as FabricType;
    const materials = getMaterials(wood, targetFabric);
    let newModel: THREE.Group;

    switch (piece.modelKey) {
      case 'desk':
        newModel = buildDeskModel(materials, targetExploded);
        break;
      case 'wardrobe':
        newModel = buildWardrobeModel(materials, targetExploded);
        break;
      case 'gates':
        newModel = buildGatesModel(materials, targetExploded);
        break;
      case 'tables':
      case 'jaali_table':
        newModel = buildTablesModel(materials, targetExploded);
        break;
      case 'jhula':
        newModel = buildJhulaModel(materials, targetExploded, swingGroupRef);
        break;
      case 'damchiya':
        newModel = buildDamchiyaModel(materials, targetExploded);
        break;
      case 'throne_chair':
        newModel = buildThroneChairModel(materials, targetExploded);
        break;
      case 'mandir':
        newModel = buildMandirModel(materials, targetExploded);
        break;
      default:
        newModel = buildDeskModel(materials, targetExploded);
    }

    modelGroupRef.current = newModel;
    sceneRef.current.add(newModel);
  }, [wood, fabric, piece.modelKey]);

  // Update lighting when mood changes
  useEffect(() => {
    if (!lightsRef.current) return;
    const moodConfig = LIGHTING_MOODS[lightingMood];
    lightsRef.current.ambient.color.setHex(moodConfig.ambientColor);
    lightsRef.current.ambient.intensity = moodConfig.intensity * 0.7;
    lightsRef.current.dir.color.setHex(moodConfig.dirColor);
    lightsRef.current.dir.intensity = moodConfig.intensity;
  }, [lightingMood]);

  // Rebuild when wood, fabric, or piece changes
  useEffect(() => {
    rebuildModel(exploded);
  }, [rebuildModel, exploded]);

  // Main Scene Setup
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // SCENE
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // CAMERA
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    cameraRef.current = camera;
    camera.position.set(3, 2, 4);
    camera.lookAt(0, 0, 0);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    // LIGHTS
    const moodConfig = LIGHTING_MOODS[lightingMood];
    const ambientLight = new THREE.AmbientLight(moodConfig.ambientColor, moodConfig.intensity * 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(moodConfig.dirColor, moodConfig.intensity);
    dirLight.position.set(4, 7, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 20;
    dirLight.shadow.camera.left = -3;
    dirLight.shadow.camera.right = 3;
    dirLight.shadow.camera.top = 3;
    dirLight.shadow.camera.bottom = -3;
    dirLight.shadow.bias = -0.001;
    scene.add(dirLight);

    const fillLight = new THREE.PointLight(0xffddaa, 0.8, 10);
    fillLight.position.set(-3, 2, -2);
    scene.add(fillLight);

    lightsRef.current = { ambient: ambientLight, dir: dirLight, fill: fillLight };

    // LUXURY INDIAN FLOOR: Warm Rajasthani Jodhpur Sandstone Pedestal with Shadow Catcher
    const floorGeo = new THREE.CylinderGeometry(2.8, 3.1, 0.1, 32);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x1f1812,
      roughness: 0.8,
      metalness: 0.1,
    });
    const pedestal = new THREE.Mesh(floorGeo, floorMat);
    pedestal.position.y = -1.9;
    pedestal.receiveShadow = true;
    scene.add(pedestal);

    // Decorative brass inlay ring on pedestal
    const ringGeo = new THREE.RingGeometry(2.5, 2.54, 48);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0xc89d54, roughness: 0.3, metalness: 0.8 });
    const decRing = new THREE.Mesh(ringGeo, ringMat);
    decRing.rotation.x = -Math.PI / 2;
    decRing.position.y = -1.84;
    scene.add(decRing);

    // Floating gold dust motes / sparkles
    const particleCount = 40;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount * 3; p += 3) {
      particlePos[p] = (Math.random() - 0.5) * 6;
      particlePos[p + 1] = (Math.random() - 0.5) * 4;
      particlePos[p + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xdfb168,
      size: 0.035,
      transparent: true,
      opacity: 0.5,
    });
    const dustParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(dustParticles);

    // BUILD INITIAL MODEL
    rebuildModel(false);

    // ANIMATION & RENDER LOOP
    let clock = new THREE.Clock();
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Swing Physics: Gentle rhythmic pendulum sway
      if (swingGroupRef.current && swingPhysicsActive && piece.modelKey === 'jhula') {
        const swayAngle = Math.sin(elapsedTime * 1.5) * 0.08;
        swingGroupRef.current.rotation.x = swayAngle;
      }

      // Smooth camera interpolation
      if (autoRotate && !isDragging.current) {
        targetSpherical.current.theta += 0.005;
      }

      // Damped spherical coordinates to cartesian position
      cameraSpherical.current.theta += (targetSpherical.current.theta - cameraSpherical.current.theta) * 0.08;
      cameraSpherical.current.phi += (targetSpherical.current.phi - cameraSpherical.current.phi) * 0.08;
      cameraSpherical.current.radius += (targetSpherical.current.radius - cameraSpherical.current.radius) * 0.08;

      // Restrict phi to avoid flipping
      cameraSpherical.current.phi = Math.max(0.2, Math.min(Math.PI / 2 - 0.05, cameraSpherical.current.phi));

      const sinPhi = Math.sin(cameraSpherical.current.phi);
      const cosPhi = Math.cos(cameraSpherical.current.phi);
      const sinTheta = Math.sin(cameraSpherical.current.theta);
      const cosTheta = Math.cos(cameraSpherical.current.theta);

      camera.position.x = cameraSpherical.current.radius * sinPhi * sinTheta;
      camera.position.y = cameraSpherical.current.radius * cosPhi;
      camera.position.z = cameraSpherical.current.radius * sinPhi * cosTheta;
      camera.lookAt(0, 0, 0);

      // Dust floating motion
      dustParticles.rotation.y = elapsedTime * 0.02;

      // Project hotspots to 2D screen coordinates
      if (piece.hotspots && piece.hotspots.length > 0 && containerRef.current) {
        const cWidth = containerRef.current.clientWidth;
        const cHeight = containerRef.current.clientHeight;

        const screenCoords = piece.hotspots.map((hs) => {
          const worldPos = new THREE.Vector3(...hs.position);
          worldPos.project(camera);

          // Check if hotspot is facing camera
          const isVisible = worldPos.z < 1;
          const sx = (worldPos.x * 0.5 + 0.5) * cWidth;
          const sy = (-(worldPos.y * 0.5) + 0.5) * cHeight;
          return { x: sx, y: sy, visible: isVisible };
        });
        setHotspotScreenPositions(screenCoords);
      }

      renderer.render(scene, camera);
    };

    animate();

    // RESIZE OBSERVER
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      resizeObserver.disconnect();
      renderer.dispose();
    };
  }, [rebuildModel, autoRotate, swingPhysicsActive, piece.modelKey, lightingMood, isHero]);

  // Pointer / Touch Interaction Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    activeTouchPoints.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (activeTouchPoints.current.size === 1) {
      isDragging.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    } else if (activeTouchPoints.current.size === 2) {
      // Begin pinch
      isDragging.current = false;
      const points = Array.from(activeTouchPoints.current.values()) as Array<{ x: number; y: number }>;
      if (points.length >= 2) {
        const dist = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
        initialPinchDistance.current = dist;
        initialPinchRadius.current = targetSpherical.current.radius;
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!activeTouchPoints.current.has(e.pointerId)) return;
    activeTouchPoints.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (activeTouchPoints.current.size === 2 && initialPinchDistance.current) {
      // 2-finger pinch zoom on mobile & tablet
      const points = Array.from(activeTouchPoints.current.values()) as Array<{ x: number; y: number }>;
      if (points.length >= 2) {
        const currentDist = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
        const ratio = currentDist / initialPinchDistance.current;
        targetSpherical.current.radius = Math.max(2.4, Math.min(7.5, initialPinchRadius.current / ratio));
      }
      return;
    }

    if (isDragging.current && activeTouchPoints.current.size === 1) {
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      targetSpherical.current.theta -= deltaX * 0.007;
      targetSpherical.current.phi -= deltaY * 0.007;
      targetSpherical.current.phi = Math.max(0.2, Math.min(Math.PI / 2 - 0.05, targetSpherical.current.phi));

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    activeTouchPoints.current.delete(e.pointerId);
    if (activeTouchPoints.current.size === 0) {
      isDragging.current = false;
      initialPinchDistance.current = null;
    } else if (activeTouchPoints.current.size === 1) {
      // Switch back to single finger drag
      const remainingPoints = Array.from(activeTouchPoints.current.values()) as Array<{ x: number; y: number }>;
      if (remainingPoints.length > 0) {
        previousMousePosition.current = { x: remainingPoints[0].x, y: remainingPoints[0].y };
      }
      isDragging.current = true;
      initialPinchDistance.current = null;
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    targetSpherical.current.radius += e.deltaY * 0.003;
    targetSpherical.current.radius = Math.max(2.6, Math.min(7.5, targetSpherical.current.radius));
  };

  const resetCamera = () => {
    targetSpherical.current = {
      radius: isHero ? 4.8 : 4.4,
      theta: Math.PI / 4,
      phi: Math.PI / 2.6,
    };
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const containerWidth = containerRef.current?.clientWidth || 500;

  return (
    <div
      ref={containerRef}
      id="three-furniture-canvas-container"
      className={`relative w-full h-full overflow-hidden select-none touch-none rounded-2xl bg-radial from-[#1e150f]/80 to-[#0c0805]/95 border border-[#443021]/50 shadow-2xl backdrop-blur-sm ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onWheel={handleWheel}
    >
      {/* Three.js Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />

      {/* Floating 3D Hotspot Buttons with Indian Gold Lotus Motifs */}
      {!exploded &&
        piece.hotspots &&
        piece.hotspots.map((hs, idx) => {
          const pos = hotspotScreenPositions[idx];
          if (!pos || !pos.visible) return null;
          const isActive = activeHotspotIndex === idx;
          const isRightHalf = pos.x > containerWidth * 0.55;

          return (
            <div
              key={idx}
              className="absolute z-20 pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200"
              style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
            >
              <button
                type="button"
                id={`hotspot-btn-${idx}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveHotspotIndex(isActive ? null : idx);
                  if (onHotspotSelect) {
                    onHotspotSelect(hs);
                  }
                }}
                className={`relative group flex items-center justify-center w-7 h-7 rounded-full border transition-all duration-300 ${
                  isActive
                    ? 'bg-[#d4a359] text-[#1c120c] border-white scale-110 shadow-[0_0_15px_rgba(212,163,89,0.8)]'
                    : 'bg-[#18110b]/90 text-[#f5d99b] border-[#d4a359]/70 hover:scale-110 hover:border-[#ffd98a] shadow-lg'
                }`}
                aria-label={hs.title}
              >
                <span className="text-[11px] font-bold font-display leading-none">{idx + 1}</span>
                <span className="absolute -inset-1 rounded-full border border-[#d4a359]/40 animate-ping opacity-60" />
              </button>

              {/* Hotspot Popover Tooltip - bounds safe for mobile and desktop */}
              {isActive && (
                <div
                  className={`absolute -top-3 w-52 sm:w-60 p-3 rounded-xl bg-[#1a110a]/95 border border-[#d4a359]/50 shadow-2xl backdrop-blur-md z-30 animate-in fade-in zoom-in-95 duration-200 pointer-events-auto ${
                    isRightHalf ? 'right-8' : 'left-8'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-mono tracking-wider uppercase text-[#d4a359]">
                      Detail {idx + 1} of {piece.hotspots.length}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveHotspotIndex(null);
                      }}
                      className="text-stone-400 hover:text-white text-xs px-1"
                    >
                      ✕
                    </button>
                  </div>
                  <h4 className="text-xs font-serif font-bold text-amber-100 mb-1">{hs.title}</h4>
                  <p className="text-[11px] text-stone-300 leading-relaxed">{hs.description}</p>
                </div>
              )}
            </div>
          );
        })}

      {/* Top Left: 3D Overlay Badge */}
      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 pointer-events-none flex flex-col gap-1 max-w-[60%] sm:max-w-none">
        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#1c130d]/85 border border-[#443021] backdrop-blur-md shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="text-[10px] sm:text-[11px] font-medium tracking-wide uppercase text-amber-200/90 font-display truncate">
            Interactive 3D Viewport
          </span>
        </div>
        <span className="text-[9px] sm:text-[10px] text-stone-400 pl-1.5 hidden xs:inline">
          Drag to orbit • Pinch or scroll to zoom
        </span>
      </div>

      {/* Top Right: Wood & Fabric Active Spec Pill */}
      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 pointer-events-none flex flex-col items-end gap-1">
        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#18100b]/85 border border-[#523925] backdrop-blur-md text-[10px] sm:text-[11px]">
          <span
            className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full border border-amber-300/40 shadow-inner shrink-0"
            style={{ backgroundColor: WOOD_FINISHES[wood]?.hex }}
          />
          <span className="text-stone-200 font-medium">{WOOD_FINISHES[wood]?.name.split(' ')[0]}</span>
          {piece.defaultFabric && (
            <>
              <span className="text-stone-500">•</span>
              <span
                className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full border border-amber-300/40 shadow-inner shrink-0"
                style={{ backgroundColor: FABRICS[fabric]?.hex }}
              />
              <span className="text-stone-200 font-medium hidden xs:inline">{FABRICS[fabric]?.name.split(' ')[0]}</span>
            </>
          )}
        </div>
      </div>

      {/* Bottom Floating Control Bar */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-2xl bg-[#140e0a]/92 border border-[#4a3321]/80 backdrop-blur-md shadow-2xl max-w-[94%] sm:max-w-none">
        {/* Auto-Rotate Toggle */}
        <button
          type="button"
          id="btn-toggle-autorotate"
          onClick={() => setAutoRotate(!autoRotate)}
          className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-medium transition-all shrink-0 ${
            autoRotate
              ? 'bg-[#d4a359] text-[#1c120c] font-semibold shadow'
              : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
          }`}
          title={autoRotate ? 'Pause 360° Rotation' : 'Start 360° Rotation'}
        >
          {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span className="hidden xs:inline sm:inline">360°</span>
        </button>

        {/* Exploded Anatomy Toggle */}
        <button
          type="button"
          id="btn-toggle-exploded"
          onClick={() => {
            const next = !exploded;
            setExploded(next);
            rebuildModel(next);
          }}
          className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-medium transition-all shrink-0 ${
            exploded
              ? 'bg-[#d4a359] text-[#1c120c] font-semibold shadow'
              : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
          }`}
          title="Inspect Internal Joinery & Exploded Layers"
        >
          <Layers className="w-3.5 h-3.5" />
          <span className="hidden xs:inline sm:inline">Exploded</span>
        </button>

        {/* Swing Physics Toggle (For Jhula) */}
        {piece.modelKey === 'jhula' && (
          <button
            type="button"
            id="btn-toggle-swing"
            onClick={() => setSwingPhysicsActive(!swingPhysicsActive)}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-medium transition-all shrink-0 ${
              swingPhysicsActive
                ? 'bg-amber-900/60 text-amber-200 border border-amber-600/40'
                : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
            }`}
            title="Toggle authentic pendulum sway"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden xs:inline sm:inline">Sway</span>
          </button>
        )}

        <div className="w-[1px] h-3.5 sm:h-4 bg-stone-700 mx-0.5 sm:mx-1 shrink-0" />

        {/* Reset Camera View */}
        <button
          type="button"
          id="btn-reset-camera"
          onClick={resetCamera}
          className="p-1 sm:p-1.5 rounded-xl text-stone-300 hover:text-white hover:bg-stone-800/60 transition-colors shrink-0"
          title="Reset Camera View"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Fullscreen Toggle */}
        <button
          type="button"
          id="btn-fullscreen-3d"
          onClick={toggleFullscreen}
          className="p-1 sm:p-1.5 rounded-xl text-stone-300 hover:text-white hover:bg-stone-800/60 transition-colors shrink-0"
          title="Toggle Fullscreen"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
