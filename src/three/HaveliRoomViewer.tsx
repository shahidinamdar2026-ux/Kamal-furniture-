import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { WoodFinish } from '../types';
import {
  getMaterials,
  buildJhulaModel,
  buildDamchiyaModel,
  buildThroneChairModel,
  buildJaaliTableModel,
} from './furnitureModels';
import { Sparkles, Moon, Sun, Flame, RotateCcw } from 'lucide-react';

interface Props {
  className?: string;
}

export const HaveliRoomViewer: React.FC<Props> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeSetup, setActiveSetup] = useState<'darbar_baithak' | 'royal_jhula' | 'jaisalmer_sanctum'>('royal_jhula');
  const [ambientAtmosphere, setAmbientAtmosphere] = useState<'diwali_evening' | 'golden_hour' | 'midnight_palace'>('diwali_evening');

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const roomFurnitureGroupRef = useRef<THREE.Group | null>(null);
  const flameLightsRef = useRef<THREE.PointLight[]>([]);
  const animationFrameId = useRef<number>(0);

  // Mouse Orbit
  const isDragging = useRef<boolean>(false);
  const previousMouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const cameraSpherical = useRef<{ radius: number; theta: number; phi: number }>({
    radius: 7.2,
    theta: Math.PI / 4,
    phi: Math.PI / 2.7,
  });
  const targetSpherical = useRef<{ radius: number; theta: number; phi: number }>({
    radius: 7.2,
    theta: Math.PI / 4,
    phi: Math.PI / 2.7,
  });

  // Function to build furniture arrangement
  const populateFurniture = (setup: typeof activeSetup) => {
    if (!sceneRef.current) return;
    if (roomFurnitureGroupRef.current) {
      sceneRef.current.remove(roomFurnitureGroupRef.current);
    }

    const group = new THREE.Group();
    group.name = 'HaveliFurnitureArrangement';
    const matSheesham = getMaterials('sheesham', 'crimson_silk');
    const matTeak = getMaterials('teak', 'peacock_velvet');

    if (setup === 'royal_jhula') {
      const jhula = buildJhulaModel(matSheesham, false);
      jhula.position.set(0, -0.3, 0);
      group.add(jhula);

      // Flanking pair of brass planters / urns
      [-2.4, 2.4].forEach(px => {
        const urn = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.2, 0.7, 16), matSheesham.brass);
        urn.position.set(px, -1.8, 0);
        group.add(urn);

        // Potted banana leaf / foliage
        const leafGeo = new THREE.ConeGeometry(0.35, 0.9, 6);
        const leaf = new THREE.Mesh(leafGeo, new THREE.MeshStandardMaterial({ color: 0x1d472c, roughness: 0.8 }));
        leaf.position.set(px, -1.2, 0);
        group.add(leaf);
      });
    } else if (setup === 'darbar_baithak') {
      // Throne chair in center
      const throne = buildThroneChairModel(matSheesham, false);
      throne.position.set(0, -0.3, -1.2);
      group.add(throne);

      // Low Jaali Coffee Table in front
      const table = buildJaaliTableModel(matSheesham, false);
      table.position.set(0, -1.0, 0.8);
      group.add(table);

      // Flanking side baithak bolster cushions
      [-1.8, 1.8].forEach(bx => {
        const bolster = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 1.1, 16), matSheesham.fabric);
        bolster.rotation.x = Math.PI / 2;
        bolster.position.set(bx, -1.9, 0.5);
        group.add(bolster);
      });
    } else {
      // Jaisalmer Damchiya Chest against back wall
      const damchiya = buildDamchiyaModel(matTeak, false);
      damchiya.position.set(0, -0.7, -1.0);
      group.add(damchiya);

      // Table in foreground
      const table = buildJaaliTableModel(matSheesham, false);
      table.position.set(0, -1.0, 1.1);
      group.add(table);
    }

    roomFurnitureGroupRef.current = group;
    sceneRef.current.add(group);
  };

  // Re-populate when activeSetup changes
  useEffect(() => {
    populateFurniture(activeSetup);
  }, [activeSetup]);

  // Main Scene Setup
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    cameraRef.current = camera;
    camera.position.set(4, 3, 6);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    // AMBIENCE & LIGHTING
    const ambientLight = new THREE.AmbientLight(
      ambientAtmosphere === 'diwali_evening' ? 0xffaa55 : ambientAtmosphere === 'golden_hour' ? 0xffc488 : 0x446699,
      ambientAtmosphere === 'diwali_evening' ? 1.0 : ambientAtmosphere === 'golden_hour' ? 1.3 : 0.8
    );
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(
      ambientAtmosphere === 'diwali_evening' ? 0xff8833 : ambientAtmosphere === 'golden_hour' ? 0xffeedd : 0x7799cc,
      ambientAtmosphere === 'diwali_evening' ? 1.2 : ambientAtmosphere === 'golden_hour' ? 1.8 : 0.9
    );
    sunLight.position.set(5, 8, 4);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    // Flickering Diya Flame lights
    flameLightsRef.current = [];
    const diyaPositions = [
      [-2.8, -1.8, 1.8],
      [2.8, -1.8, 1.8],
      [-2.8, -1.8, -1.8],
      [2.8, -1.8, -1.8],
      [0, -1.8, 2.5]
    ];
    diyaPositions.forEach(([dx, dy, dz]) => {
      const diyaLight = new THREE.PointLight(0xff7711, 1.5, 4);
      diyaLight.position.set(dx, dy + 0.15, dz);
      scene.add(diyaLight);
      flameLightsRef.current.push(diyaLight);

      // Brass Diya Bowl mesh
      const diyaMat = new THREE.MeshStandardMaterial({ color: 0xd4a359, metalness: 0.8, roughness: 0.3 });
      const diyaMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.06, 0.08, 12), diyaMat);
      diyaMesh.position.set(dx, dy + 0.04, dz);
      scene.add(diyaMesh);

      // Glowing flame point
      const flameMat = new THREE.MeshBasicMaterial({ color: 0xffdd44 });
      const flameMesh = new THREE.Mesh(new THREE.ConeGeometry(0.025, 0.07, 8), flameMat);
      flameMesh.position.set(dx, dy + 0.1, dz);
      scene.add(flameMesh);
    });

    // ---------------------------------------------------------
    // ARCHITECTURAL HAVELI COURTYARD ENVIRONMENT
    // ---------------------------------------------------------

    // Checkerboard Indian Marble Floor
    const floorSize = 10;
    const floorGroup = new THREE.Group();
    const tileSize = 1.0;
    const marbleWhite = new THREE.MeshStandardMaterial({ color: 0xe8dfd2, roughness: 0.4, metalness: 0.05 });
    const marbleGreen = new THREE.MeshStandardMaterial({ color: 0x162c21, roughness: 0.35, metalness: 0.05 });

    for (let x = -floorSize / 2; x < floorSize / 2; x += tileSize) {
      for (let z = -floorSize / 2; z < floorSize / 2; z += tileSize) {
        const isWhite = (Math.floor(x) + Math.floor(z)) % 2 === 0;
        const tile = new THREE.Mesh(new THREE.BoxGeometry(tileSize, 0.1, tileSize), isWhite ? marbleWhite : marbleGreen);
        tile.position.set(x + tileSize / 2, -2.15, z + tileSize / 2);
        tile.receiveShadow = true;
        floorGroup.add(tile);
      }
    }
    scene.add(floorGroup);

    // Sandstone Haveli Walls & Pillars
    const sandstoneMat = new THREE.MeshStandardMaterial({ color: 0xb58a5c, roughness: 0.85, metalness: 0.05 });

    // Rear Haveli Colonnade Wall with Arched Windows
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(10, 5, 0.4), sandstoneMat);
    backWall.position.set(0, 0.5, -3.8);
    scene.add(backWall);

    // 4 Ornate Carved Pillars in Colonnade
    [-3.2, -1.1, 1.1, 3.2].forEach(px => {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 4.4, 16), sandstoneMat);
      col.position.set(px, 0.1, -3.4);
      col.castShadow = true;
      scene.add(col);

      // Cusped Arch Header
      const archHeader = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.25, 0.35), sandstoneMat);
      archHeader.position.set(px, 2.3, -3.4);
      scene.add(archHeader);
    });

    // Hanging Brass Jhumar / Moroccan Lantern from ceiling
    const jhumarMat = new THREE.MeshStandardMaterial({ color: 0xd4a359, metalness: 0.85, roughness: 0.25 });
    const lantern = new THREE.Mesh(new THREE.OctahedronGeometry(0.4, 0), jhumarMat);
    lantern.position.set(0, 2.1, 0);
    scene.add(lantern);

    // Hanging chain for lantern
    const chain = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 1.2, 8), jhumarMat);
    chain.position.set(0, 2.8, 0);
    scene.add(chain);

    // Warm glow from lantern
    const lanternLight = new THREE.PointLight(0xffbb66, 2.0, 7);
    lanternLight.position.set(0, 2.0, 0);
    scene.add(lanternLight);

    // Central Brass Urli Bowl with floating flower petals in foreground
    const urliMat = new THREE.MeshStandardMaterial({ color: 0xd4a359, metalness: 0.88, roughness: 0.3 });
    const urli = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.35, 0.18, 20), urliMat);
    urli.position.set(0, -2.0, 2.8);
    scene.add(urli);

    // Water surface inside urli
    const waterMat = new THREE.MeshStandardMaterial({ color: 0x1f4455, roughness: 0.1, metalness: 0.2 });
    const water = new THREE.Mesh(new THREE.CircleGeometry(0.46, 16), waterMat);
    water.rotation.x = -Math.PI / 2;
    water.position.set(0, -1.94, 2.8);
    scene.add(water);

    // Marigold floating flower petals
    for (let f = 0; f < 8; f++) {
      const fAngle = (f / 8) * Math.PI * 2;
      const fr = Math.random() * 0.3 + 0.08;
      const petal = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 6, 6),
        new THREE.MeshStandardMaterial({ color: f % 2 === 0 ? 0xff7700 : 0xffcc00, roughness: 0.7 })
      );
      petal.position.set(Math.cos(fAngle) * fr, -1.92, 2.8 + Math.sin(fAngle) * fr);
      scene.add(petal);
    }

    // Populate initial furniture
    populateFurniture(activeSetup);

    // RENDER & FLICKER LOOP
    let clock = new THREE.Clock();
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Flickering Diya Flame light intensity modulation
      flameLightsRef.current.forEach((light, i) => {
        light.intensity = 1.3 + Math.sin(elapsed * 12 + i * 2) * 0.35 + Math.cos(elapsed * 7) * 0.15;
      });

      // Smooth camera interpolation
      cameraSpherical.current.theta += (targetSpherical.current.theta - cameraSpherical.current.theta) * 0.06;
      cameraSpherical.current.phi += (targetSpherical.current.phi - cameraSpherical.current.phi) * 0.06;
      cameraSpherical.current.radius += (targetSpherical.current.radius - cameraSpherical.current.radius) * 0.06;

      cameraSpherical.current.phi = Math.max(0.3, Math.min(Math.PI / 2 - 0.08, cameraSpherical.current.phi));

      const sinPhi = Math.sin(cameraSpherical.current.phi);
      const cosPhi = Math.cos(cameraSpherical.current.phi);
      const sinTheta = Math.sin(cameraSpherical.current.theta);
      const cosTheta = Math.cos(cameraSpherical.current.theta);

      camera.position.x = cameraSpherical.current.radius * sinPhi * sinTheta;
      camera.position.y = cameraSpherical.current.radius * cosPhi;
      camera.position.z = cameraSpherical.current.radius * sinPhi * cosTheta;
      camera.lookAt(0, -0.2, 0);

      renderer.render(scene, camera);
    };

    animate();

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
  }, [ambientAtmosphere]);

  // Orbit Mouse Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    previousMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - previousMouse.current.x;
    const deltaY = e.clientY - previousMouse.current.y;

    targetSpherical.current.theta -= deltaX * 0.007;
    targetSpherical.current.phi -= deltaY * 0.007;
    previousMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    targetSpherical.current.radius += e.deltaY * 0.003;
    targetSpherical.current.radius = Math.max(4.5, Math.min(10.5, targetSpherical.current.radius));
  };

  const resetRoomCamera = () => {
    targetSpherical.current = {
      radius: 7.2,
      theta: Math.PI / 4,
      phi: Math.PI / 2.7,
    };
  };

  return (
    <div
      ref={containerRef}
      id="haveli-room-3d-scene"
      className={`relative w-full h-[540px] md:h-[620px] rounded-3xl overflow-hidden select-none touch-none border border-[#523925]/60 shadow-2xl bg-[#0d0906] ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onWheel={handleWheel}
    >
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />

      {/* Top Banner: Haveli Environment Mode */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-2 pointer-events-none">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18100b]/90 border border-[#4a3321] backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-[#d4a359]" />
          <span className="text-xs font-serif font-bold text-amber-200 uppercase tracking-wider">
            3D Haveli Courtyard Simulator
          </span>
        </div>
        <p className="text-xs text-stone-300 drop-shadow-md">
          Experience royal furniture in historic Mewari sandstone architecture.
        </p>
      </div>

      {/* Top Right: Atmosphere Switcher */}
      <div className="absolute top-6 right-6 z-10 flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#140e0a]/90 border border-[#4a3321] backdrop-blur-md">
        <button
          type="button"
          id="atm-diwali"
          onClick={() => setAmbientAtmosphere('diwali_evening')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            ambientAtmosphere === 'diwali_evening'
              ? 'bg-[#d4a359] text-[#1c120c] font-bold shadow'
              : 'text-stone-400 hover:text-white'
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-orange-500" />
          <span className="hidden sm:inline">Diwali Diyas</span>
        </button>

        <button
          type="button"
          id="atm-golden"
          onClick={() => setAmbientAtmosphere('golden_hour')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            ambientAtmosphere === 'golden_hour'
              ? 'bg-[#d4a359] text-[#1c120c] font-bold shadow'
              : 'text-stone-400 hover:text-white'
          }`}
        >
          <Sun className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Sunset Gold</span>
        </button>

        <button
          type="button"
          id="atm-midnight"
          onClick={() => setAmbientAtmosphere('midnight_palace')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            ambientAtmosphere === 'midnight_palace'
              ? 'bg-[#d4a359] text-[#1c120c] font-bold shadow'
              : 'text-stone-400 hover:text-white'
          }`}
        >
          <Moon className="w-3.5 h-3.5 text-blue-300" />
          <span className="hidden sm:inline">Palace Moon</span>
        </button>
      </div>

      {/* Bottom Center: Room Arrangement Switcher */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 p-2 rounded-2xl bg-[#140e0a]/95 border border-[#523925] backdrop-blur-md shadow-2xl">
        <span className="text-xs text-stone-400 px-2 font-display hidden md:inline">Room Scene:</span>
        <button
          type="button"
          id="scene-jhula"
          onClick={() => setActiveSetup('royal_jhula')}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            activeSetup === 'royal_jhula'
              ? 'bg-[#d4a359] text-[#1a110a] font-bold shadow'
              : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
          }`}
        >
          Maharaja Swing Courtyard
        </button>

        <button
          type="button"
          id="scene-darbar"
          onClick={() => setActiveSetup('darbar_baithak')}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            activeSetup === 'darbar_baithak'
              ? 'bg-[#d4a359] text-[#1a110a] font-bold shadow'
              : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
          }`}
        >
          Darbar Baithak (Throne & Table)
        </button>

        <button
          type="button"
          id="scene-jaisalmer"
          onClick={() => setActiveSetup('jaisalmer_sanctum')}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            activeSetup === 'jaisalmer_sanctum'
              ? 'bg-[#d4a359] text-[#1a110a] font-bold shadow'
              : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
          }`}
        >
          Jaisalmer Damchiya Sanctum
        </button>

        <button
          type="button"
          id="reset-room-cam"
          onClick={resetRoomCamera}
          className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800/50 rounded-lg transition-colors ml-1"
          title="Reset Room Camera"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
