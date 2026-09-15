import * as THREE from 'three';
import { WoodFinish, FabricType } from '../types';
import { WOOD_FINISHES, FABRICS } from '../data/furnitureData';

// Cache generated procedural textures so they don't rebuild every frame
const textureCache: Record<string, THREE.CanvasTexture> = {};

export function createProceduralWoodTexture(finishKey: WoodFinish): THREE.CanvasTexture {
  const cacheKey = `wood_${finishKey}`;
  if (textureCache[cacheKey]) {
    return textureCache[cacheKey];
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    const fallback = new THREE.CanvasTexture(canvas);
    return fallback;
  }

  const finish = WOOD_FINISHES[finishKey] || WOOD_FINISHES.sheesham;
  const baseColor = finish.hex;

  // Fill base wood tone
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, 512, 512);

  // Draw natural organic wood grains
  const numGrains = finishKey === 'sheesham' ? 60 : 45;
  for (let i = 0; i < numGrains; i++) {
    const y = Math.random() * 512;
    const alpha = Math.random() * 0.25 + 0.05;
    const isDark = Math.random() > 0.4;
    ctx.strokeStyle = isDark ? `rgba(15, 8, 4, ${alpha})` : `rgba(255, 210, 150, ${alpha * 0.7})`;
    ctx.lineWidth = Math.random() * 8 + 2;
    ctx.beginPath();
    ctx.moveTo(0, y);
    
    // Wave curvature for authentic timber grain
    const cp1x = 130 + Math.random() * 60;
    const cp1y = y + (Math.random() - 0.5) * 40;
    const cp2x = 350 + Math.random() * 60;
    const cp2y = y + (Math.random() - 0.5) * 40;
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, 512, y + (Math.random() - 0.5) * 25);
    ctx.stroke();
  }

  // Draw subtle wood pore flecks
  ctx.fillStyle = 'rgba(0,0,0,0.08)';
  for (let p = 0; p < 800; p++) {
    const px = Math.random() * 512;
    const py = Math.random() * 512;
    ctx.fillRect(px, py, Math.random() * 2 + 1, Math.random() * 4 + 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  textureCache[cacheKey] = texture;
  return texture;
}

export function createProceduralFabricTexture(fabricKey: FabricType): THREE.CanvasTexture {
  const cacheKey = `fabric_${fabricKey}`;
  if (textureCache[cacheKey]) {
    return textureCache[cacheKey];
  }

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const fabric = FABRICS[fabricKey] || FABRICS.crimson_silk;

  if (ctx) {
    ctx.fillStyle = fabric.hex;
    ctx.fillRect(0, 0, 256, 256);

    // Subtle weave pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < 256; x += 4) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 256);
      ctx.stroke();
    }
    for (let y = 0; y < 256; y += 4) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(256, y);
      ctx.stroke();
    }

    // Velvet sheen highlights
    ctx.fillStyle = 'rgba(255, 220, 180, 0.06)';
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 256, Math.random() * 256, Math.random() * 30 + 10, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  textureCache[cacheKey] = texture;
  return texture;
}

export function getMaterials(wood: WoodFinish, fabric: FabricType = 'crimson_silk') {
  const woodTexture = createProceduralWoodTexture(wood);
  const fabricTexture = createProceduralFabricTexture(fabric);

  const woodMaterial = new THREE.MeshStandardMaterial({
    map: woodTexture,
    roughness: 0.35,
    metalness: 0.05,
    color: 0xffffff,
  });

  const carvedWoodMaterial = new THREE.MeshStandardMaterial({
    map: woodTexture,
    roughness: 0.5,
    metalness: 0.08,
    color: 0xe0c8b0,
  });

  const brassMaterial = new THREE.MeshStandardMaterial({
    color: 0xd4a359,
    roughness: 0.28,
    metalness: 0.88,
  });

  const antiqueBrassMaterial = new THREE.MeshStandardMaterial({
    color: 0x9e7336,
    roughness: 0.45,
    metalness: 0.8,
  });

  const fabricMaterial = new THREE.MeshStandardMaterial({
    map: fabricTexture,
    roughness: 0.65,
    metalness: 0.1,
    color: 0xffffff,
  });

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transmission: 0.9,
    opacity: 1,
    transparent: true,
    roughness: 0.05,
    ior: 1.5,
    thickness: 0.5,
  });

  return {
    wood: woodMaterial,
    carvedWood: carvedWoodMaterial,
    brass: brassMaterial,
    antiqueBrass: antiqueBrassMaterial,
    fabric: fabricMaterial,
    glass: glassMaterial,
  };
}

// --------------------------------------------------------------------------
// 1. THE MAHARAJA JHAROKHA JHULA (SWING)
// --------------------------------------------------------------------------
export function buildJhulaModel(
  materials: ReturnType<typeof getMaterials>,
  exploded = false,
  swingGroupRef?: { current: THREE.Group | null }
): THREE.Group {
  const root = new THREE.Group();
  root.name = 'JhulaModel';

  const expOffset = exploded ? 0.7 : 0;

  // Fixed Standing Frame (Pillars + Arch)
  const frameGroup = new THREE.Group();
  frameGroup.name = 'FrameGroup';
  root.add(frameGroup);

  // Left & Right Base Plinths
  const plinthGeo = new THREE.BoxGeometry(0.5, 0.25, 1.2);
  const leftPlinth = new THREE.Mesh(plinthGeo, materials.wood);
  leftPlinth.position.set(-1.8, -1.8, 0);
  leftPlinth.castShadow = true;
  leftPlinth.receiveShadow = true;
  frameGroup.add(leftPlinth);

  const rightPlinth = leftPlinth.clone();
  rightPlinth.position.x = 1.8;
  frameGroup.add(rightPlinth);

  // Turned Pillars (Balusters)
  const pillarHeight = 3.6;
  const pillarGeo = new THREE.CylinderGeometry(0.12, 0.15, pillarHeight, 16);
  const leftPillar = new THREE.Mesh(pillarGeo, materials.carvedWood);
  leftPillar.position.set(-1.8, 0.1, 0);
  leftPillar.castShadow = true;
  frameGroup.add(leftPillar);

  const rightPillar = leftPillar.clone();
  rightPillar.position.x = 1.8;
  frameGroup.add(rightPillar);

  // Brass Ring collars on pillars
  for (let py = -1.2; py <= 1.4; py += 0.8) {
    const ringGeo = new THREE.TorusGeometry(0.14, 0.02, 8, 20);
    const lRing = new THREE.Mesh(ringGeo, materials.brass);
    lRing.rotation.x = Math.PI / 2;
    lRing.position.set(-1.8, py, 0);
    frameGroup.add(lRing);

    const rRing = lRing.clone();
    rRing.position.x = 1.8;
    frameGroup.add(rRing);
  }

  // Top Crossbeam
  const beamGeo = new THREE.BoxGeometry(4.2, 0.28, 0.4);
  const topBeam = new THREE.Mesh(beamGeo, materials.wood);
  topBeam.position.set(0, 1.9 + expOffset, 0);
  topBeam.castShadow = true;
  frameGroup.add(topBeam);

  // Ornate Jharokha Arch Crest
  const archGroup = new THREE.Group();
  archGroup.position.set(0, 2.1 + expOffset * 1.5, 0);
  const crestGeo = new THREE.ConeGeometry(0.3, 0.6, 6);
  const centerSpire = new THREE.Mesh(crestGeo, materials.brass);
  centerSpire.position.y = 0.4;
  archGroup.add(centerSpire);

  // Traditional multi-foil scalloped arch trim
  for (let i = -3; i <= 3; i++) {
    const archFoilGeo = new THREE.TorusGeometry(0.24, 0.05, 8, 16, Math.PI);
    const foil = new THREE.Mesh(archFoilGeo, materials.carvedWood);
    foil.position.set(i * 0.45, 0.05, 0);
    foil.rotation.z = Math.PI;
    archGroup.add(foil);

    // Mini brass finial above each foil
    const finialGeo = new THREE.SphereGeometry(0.04, 12, 12);
    const finial = new THREE.Mesh(finialGeo, materials.brass);
    finial.position.set(i * 0.45, 0.3, 0);
    archGroup.add(finial);
  }
  frameGroup.add(archGroup);

  // SWINGING BENCH GROUP (can animate swaying!)
  const swingGroup = new THREE.Group();
  swingGroup.name = 'SwingBenchGroup';
  swingGroup.position.set(0, 1.8, 0); // Origin at beam for realistic physics pendular rotation
  if (swingGroupRef) {
    swingGroupRef.current = swingGroup;
  }
  root.add(swingGroup);

  // Brass Chains (Left & Right pairs)
  const chainLength = 2.4;
  const createChain = (xPos: number, zPos: number) => {
    const chainSubGroup = new THREE.Group();
    chainSubGroup.position.set(xPos, 0, zPos);
    const linkCount = 14;
    for (let k = 0; k < linkCount; k++) {
      const linkGeo = new THREE.TorusGeometry(0.045, 0.012, 8, 12);
      const link = new THREE.Mesh(linkGeo, materials.brass);
      link.position.y = -k * 0.17;
      link.rotation.y = k % 2 === 0 ? 0 : Math.PI / 2;
      chainSubGroup.add(link);
    }
    // Brass peacock motif ornament in middle of chain
    const peacockMotif = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.15, 8), materials.antiqueBrass);
    peacockMotif.position.y = -1.2;
    chainSubGroup.add(peacockMotif);

    // Chime bell at bottom
    const bellGeo = new THREE.ConeGeometry(0.06, 0.1, 10);
    const bell = new THREE.Mesh(bellGeo, materials.brass);
    bell.rotation.x = Math.PI;
    bell.position.y = -chainLength + 0.05;
    chainSubGroup.add(bell);

    return chainSubGroup;
  };

  swingGroup.add(createChain(-1.3, -0.2));
  swingGroup.add(createChain(-1.3, 0.2));
  swingGroup.add(createChain(1.3, -0.2));
  swingGroup.add(createChain(1.3, 0.2));

  // The Swing Plank / Seat Bench
  const benchGroup = new THREE.Group();
  benchGroup.position.set(0, -chainLength - expOffset * 0.4, 0);
  swingGroup.add(benchGroup);

  // Carved Solid Sheesham Base Plank
  const plankGeo = new THREE.BoxGeometry(2.8, 0.12, 0.9);
  const plank = new THREE.Mesh(plankGeo, materials.wood);
  plank.castShadow = true;
  benchGroup.add(plank);

  // Carved Apron / Skirt beneath bench
  const apronGeo = new THREE.BoxGeometry(2.8, 0.14, 0.86);
  const apron = new THREE.Mesh(apronGeo, materials.carvedWood);
  apron.position.y = -0.12;
  benchGroup.add(apron);

  // Brass corner angle protectors
  [[-1.4, -0.45], [1.4, -0.45], [-1.4, 0.45], [1.4, 0.45]].forEach(([cx, cz]) => {
    const cornerGeo = new THREE.BoxGeometry(0.12, 0.14, 0.12);
    const corner = new THREE.Mesh(cornerGeo, materials.brass);
    corner.position.set(cx, 0, cz);
    benchGroup.add(corner);
  });

  // Carved Backrest on Bench
  const backrestGroup = new THREE.Group();
  backrestGroup.position.set(0, 0.35 + expOffset * 0.4, -0.38);
  const backFrame = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.55, 0.08), materials.wood);
  backrestGroup.add(backFrame);

  // Jaali spindles on backrest
  for (let s = -1.1; s <= 1.1; s += 0.22) {
    const spindle = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.025, 0.45, 8), materials.carvedWood);
    spindle.position.set(s, 0, 0);
    backrestGroup.add(spindle);
  }
  benchGroup.add(backrestGroup);

  // Velvet Seat Cushion
  const cushionGeo = new THREE.BoxGeometry(2.6, 0.14, 0.76);
  const cushion = new THREE.Mesh(cushionGeo, materials.fabric);
  cushion.position.set(0, 0.12 + expOffset * 0.3, 0);
  cushion.castShadow = true;
  benchGroup.add(cushion);

  // Button tufting marks on cushion
  for (let bx = -1.0; bx <= 1.0; bx += 0.4) {
    for (let bz = -0.25; bz <= 0.25; bz += 0.25) {
      const button = new THREE.Mesh(new THREE.SphereGeometry(0.02, 8, 8), materials.antiqueBrass);
      button.position.set(bx, 0.2 + expOffset * 0.3, bz);
      benchGroup.add(button);
    }
  }

  // Cylindrical Bolsters (L & R arm cushions)
  const bolsterGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.72, 16);
  const leftBolster = new THREE.Mesh(bolsterGeo, materials.fabric);
  leftBolster.rotation.x = Math.PI / 2;
  leftBolster.position.set(-1.15, 0.26 + expOffset * 0.5, 0);
  benchGroup.add(leftBolster);

  const rightBolster = leftBolster.clone();
  rightBolster.position.x = 1.15;
  benchGroup.add(rightBolster);

  // Gold tassels on bolster ends
  [-1.15, 1.15].forEach(bx => {
    [-0.36, 0.36].forEach(bz => {
      const tassel = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.1, 8), materials.brass);
      tassel.rotation.x = bz > 0 ? Math.PI / 2 : -Math.PI / 2;
      tassel.position.set(bx, 0.26 + expOffset * 0.5, bz);
      benchGroup.add(tassel);
    });
  });

  return root;
}

// --------------------------------------------------------------------------
// 2. THE JAISALMER DAMCHIYA CHEST
// --------------------------------------------------------------------------
export function buildDamchiyaModel(
  materials: ReturnType<typeof getMaterials>,
  exploded = false
): THREE.Group {
  const root = new THREE.Group();
  root.name = 'DamchiyaModel';
  const exp = exploded ? 0.6 : 0;

  // Main Chest Body
  const bodyGeo = new THREE.BoxGeometry(2.4, 1.4, 1.1);
  const body = new THREE.Mesh(bodyGeo, materials.wood);
  body.position.y = 0.2;
  body.castShadow = true;
  root.add(body);

  // Stepped Plinth Base & Arched Legs
  const legPositions = [
    [-1.05, -0.65, 0.45],
    [1.05, -0.65, 0.45],
    [-1.05, -0.65, -0.45],
    [1.05, -0.65, -0.45]
  ];
  legPositions.forEach(([lx, ly, lz]) => {
    const legGeo = new THREE.BoxGeometry(0.24, 0.5, 0.24);
    const leg = new THREE.Mesh(legGeo, materials.carvedWood);
    leg.position.set(lx, ly, lz);
    root.add(leg);

    // Brass foot cap
    const capGeo = new THREE.BoxGeometry(0.25, 0.08, 0.25);
    const cap = new THREE.Mesh(capGeo, materials.brass);
    cap.position.set(lx, ly - 0.22, lz);
    root.add(cap);
  });

  // Traditional Horse Head / Corbel Carved Brackets on Top Left & Right
  const bracketPositions = [
    [-1.25, 0.7, 0.58],
    [1.25, 0.7, 0.58],
    [-1.25, 0.7, -0.58],
    [1.25, 0.7, -0.58]
  ];
  bracketPositions.forEach(([bx, by, bz]) => {
    const bracketGeo = new THREE.CylinderGeometry(0.12, 0.06, 0.4, 8);
    const bracket = new THREE.Mesh(bracketGeo, materials.carvedWood);
    bracket.position.set(bx, by, bz);
    bracket.rotation.z = bx < 0 ? Math.PI / 4 : -Math.PI / 4;
    root.add(bracket);
  });

  // Hinged Top Lid (Explodes upward)
  const lidGeo = new THREE.BoxGeometry(2.5, 0.12, 1.2);
  const lid = new THREE.Mesh(lidGeo, materials.wood);
  lid.position.set(0, 0.96 + exp, 0);
  lid.castShadow = true;
  root.add(lid);

  // Ornate Brass Straps & Repoussé Medallions across the front
  // Vertical brass straps
  [-0.8, -0.2, 0.4, 1.0].forEach(sx => {
    const strapGeo = new THREE.BoxGeometry(0.08, 1.2, 0.02);
    const strap = new THREE.Mesh(strapGeo, materials.brass);
    strap.position.set(sx, 0.2, 0.56 + (exploded ? 0.3 : 0));
    root.add(strap);

    // Dome rivets along straps
    [-0.4, 0, 0.4].forEach(ry => {
      const rivet = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 8), materials.brass);
      rivet.position.set(sx, 0.2 + ry, 0.58 + (exploded ? 0.3 : 0));
      root.add(rivet);
    });
  });

  // Central Twin Door Panels
  const doorGeo = new THREE.BoxGeometry(0.48, 0.7, 0.05);
  const leftDoor = new THREE.Mesh(doorGeo, materials.carvedWood);
  leftDoor.position.set(-0.28, 0.1, 0.58 + (exploded ? 0.4 : 0));
  root.add(leftDoor);

  const rightDoor = leftDoor.clone();
  rightDoor.position.x = 0.28;
  root.add(rightDoor);

  // Brass Ring Pulls
  [-0.15, 0.15].forEach(rx => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.015, 8, 16), materials.brass);
    ring.position.set(rx, 0.1, 0.62 + (exploded ? 0.4 : 0));
    root.add(ring);
  });

  // Side Floral Carved Medallions
  [-1.21, 1.21].forEach(mx => {
    const medallion = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.03, 12), materials.brass);
    medallion.rotation.z = Math.PI / 2;
    medallion.position.set(mx, 0.3, 0);
    root.add(medallion);
  });

  return root;
}

// --------------------------------------------------------------------------
// 3. THE KISSA-E-DARBAR THRONE CHAIR
// --------------------------------------------------------------------------
export function buildThroneChairModel(
  materials: ReturnType<typeof getMaterials>,
  exploded = false
): THREE.Group {
  const root = new THREE.Group();
  root.name = 'ThroneChairModel';
  const exp = exploded ? 0.6 : 0;

  // Chair Seat Base
  const seatGeo = new THREE.BoxGeometry(1.4, 0.18, 1.3);
  const seatBase = new THREE.Mesh(seatGeo, materials.wood);
  seatBase.position.y = -0.2;
  seatBase.castShadow = true;
  root.add(seatBase);

  // Velvet Cushion on top of seat
  const seatCushionGeo = new THREE.BoxGeometry(1.32, 0.16, 1.22);
  const seatCushion = new THREE.Mesh(seatCushionGeo, materials.fabric);
  seatCushion.position.set(0, -0.05 + exp * 0.4, 0);
  root.add(seatCushion);

  // Antique Brass Nailhead Trim around seat perimeter
  for (let nx = -0.62; nx <= 0.62; nx += 0.12) {
    const nailFront = new THREE.Mesh(new THREE.SphereGeometry(0.015, 8, 8), materials.brass);
    nailFront.position.set(nx, -0.15, 0.66);
    root.add(nailFront);
  }

  // Front Cabriole Legs (Carved curved posture)
  [[-0.6, -0.85, 0.55], [0.6, -0.85, 0.55]].forEach(([lx, ly, lz]) => {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.05, 0.9, 12), materials.carvedWood);
    leg.position.set(lx, ly, lz);
    root.add(leg);

    // Carved Lion Paw / Acanthus Foot
    const paw = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), materials.carvedWood);
    paw.position.set(lx, ly - 0.45, lz + 0.04);
    root.add(paw);
  });

  // Rear Legs
  [[-0.6, -0.85, -0.55], [0.6, -0.85, -0.55]].forEach(([lx, ly, lz]) => {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.9, 12), materials.wood);
    leg.position.set(lx, ly, lz);
    root.add(leg);
  });

  // Tall Regal Backrest
  const backrestGroup = new THREE.Group();
  backrestGroup.position.set(0, 0.8 + exp, -0.58 - exp * 0.5);
  root.add(backrestGroup);

  // Outer carved arch frame
  const backFrameGeo = new THREE.BoxGeometry(1.36, 1.7, 0.12);
  const backFrame = new THREE.Mesh(backFrameGeo, materials.wood);
  backrestGroup.add(backFrame);

  // Upholstered Velvet Inner Back Panel (Diamond tufted)
  const innerBackGeo = new THREE.BoxGeometry(1.1, 1.3, 0.14);
  const innerBack = new THREE.Mesh(innerBackGeo, materials.fabric);
  innerBack.position.set(0, 0, 0.02);
  backrestGroup.add(innerBack);

  // Button tufting on backrest
  for (let ty = -0.4; ty <= 0.4; ty += 0.25) {
    for (let tx = -0.35; tx <= 0.35; tx += 0.25) {
      const btn = new THREE.Mesh(new THREE.SphereGeometry(0.02, 8, 8), materials.antiqueBrass);
      btn.position.set(tx, ty, 0.1);
      backrestGroup.add(btn);
    }
  }

  // Carved Floral Crown Crest
  const crestGeo = new THREE.ConeGeometry(0.24, 0.45, 8);
  const crest = new THREE.Mesh(crestGeo, materials.carvedWood);
  crest.position.set(0, 1.05, 0);
  backrestGroup.add(crest);

  // Left & Right Carved Armrests
  [[-0.72, 1], [0.72, -1]].forEach(([ax, dir]) => {
    const armGeo = new THREE.BoxGeometry(0.14, 0.08, 1.0);
    const arm = new THREE.Mesh(armGeo, materials.carvedWood);
    arm.position.set(ax + (dir > 0 ? -exp * 0.5 : exp * 0.5), 0.25, 0);
    root.add(arm);

    // Carved Lion Head scroll terminal
    const terminal = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 10), materials.brass);
    terminal.position.set(ax + (dir > 0 ? -exp * 0.5 : exp * 0.5), 0.28, 0.55);
    root.add(terminal);

    // Arm support pillar
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.4, 8), materials.carvedWood);
    post.position.set(ax + (dir > 0 ? -exp * 0.5 : exp * 0.5), 0.05, 0.45);
    root.add(post);
  });

  return root;
}

// --------------------------------------------------------------------------
// 4. THE GOPURAM TEAK MANDIR (POOJA SANCTUM)
// --------------------------------------------------------------------------
export function buildMandirModel(
  materials: ReturnType<typeof getMaterials>,
  exploded = false
): THREE.Group {
  const root = new THREE.Group();
  root.name = 'MandirModel';
  const exp = exploded ? 0.7 : 0;

  // Base Cabinet with Carved Drawers
  const baseGeo = new THREE.BoxGeometry(2.0, 0.7, 1.2);
  const base = new THREE.Mesh(baseGeo, materials.wood);
  base.position.y = -0.9;
  base.castShadow = true;
  root.add(base);

  // Twin drawer pulls
  [-0.5, 0.5].forEach(dx => {
    const pull = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.015, 8, 16), materials.brass);
    pull.position.set(dx, -0.9, 0.62);
    root.add(pull);
  });

  // Pull-Out Bhog Tray (Slides forward in exploded mode)
  const trayGeo = new THREE.BoxGeometry(1.7, 0.06, 0.9);
  const tray = new THREE.Mesh(trayGeo, materials.carvedWood);
  tray.position.set(0, -0.52, 0.15 + exp * 0.8);
  root.add(tray);

  const trayHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.3, 8), materials.brass);
  trayHandle.rotation.z = Math.PI / 2;
  trayHandle.position.set(0, -0.52, 0.62 + exp * 0.8);
  root.add(trayHandle);

  // Sanctum Altar Platform
  const altarGeo = new THREE.BoxGeometry(1.9, 0.1, 1.1);
  const altar = new THREE.Mesh(altarGeo, materials.wood);
  altar.position.y = -0.44;
  root.add(altar);

  // 4 Turned Carved Pillars
  const pillarHeight = 1.6;
  const pCoords = [
    [-0.85, 0.45],
    [0.85, 0.45],
    [-0.85, -0.45],
    [0.85, -0.45]
  ];
  pCoords.forEach(([px, pz]) => {
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, pillarHeight, 16), materials.carvedWood);
    p.position.set(px, 0.36, pz);
    p.castShadow = true;
    root.add(p);
  });

  // Perforated Jaali Folding Doors with miniature bells
  const doorGeo = new THREE.BoxGeometry(0.7, 1.4, 0.04);
  const leftDoor = new THREE.Mesh(doorGeo, materials.wood);
  leftDoor.position.set(-0.45 - exp * 0.5, 0.36, 0.52 + exp * 0.3);
  root.add(leftDoor);

  const rightDoor = leftDoor.clone();
  rightDoor.position.x = 0.45 + exp * 0.5;
  root.add(rightDoor);

  // Miniature brass bells hanging on doors
  [-0.6, -0.3, 0.3, 0.6].forEach(bx => {
    [-0.1, 0.3, 0.7].forEach(by => {
      const bell = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.06, 8), materials.brass);
      bell.rotation.x = Math.PI;
      bell.position.set(bx, by, 0.56 + (exploded ? 0.4 : 0));
      root.add(bell);
    });
  });

  // Gopuram Tiered Dravidian Shikhara Roof (Explodes upward)
  const roofGroup = new THREE.Group();
  roofGroup.position.set(0, 1.25 + exp * 1.2, 0);
  root.add(roofGroup);

  // Tier 1
  const t1 = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.22, 1.3), materials.wood);
  roofGroup.add(t1);

  // Tier 2
  const t2 = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.24, 1.0), materials.carvedWood);
  t2.position.y = 0.22;
  roofGroup.add(t2);

  // Tier 3
  const t3 = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.22, 0.7), materials.carvedWood);
  t3.position.y = 0.44;
  roofGroup.add(t3);

  // 3 Brass Kalash Pinnacle Finials
  [-0.5, 0, 0.5].forEach(kx => {
    const kalash = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.1, 0.35, 12), materials.brass);
    kalash.position.set(kx, 0.72, 0);
    roofGroup.add(kalash);

    const kOrb = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 12), materials.brass);
    kOrb.position.set(kx, 0.92, 0);
    roofGroup.add(kOrb);
  });

  return root;
}

// --------------------------------------------------------------------------
// 5. THE DARBHANGA JAALI COFFEE TABLE
// --------------------------------------------------------------------------
export function buildJaaliTableModel(
  materials: ReturnType<typeof getMaterials>,
  exploded = false
): THREE.Group {
  const root = new THREE.Group();
  root.name = 'JaaliTableModel';
  const exp = exploded ? 0.7 : 0;

  // Octagonal Wooden Base
  const baseGeo = new THREE.CylinderGeometry(1.4, 1.5, 0.12, 8);
  const base = new THREE.Mesh(baseGeo, materials.wood);
  base.position.y = -0.6;
  base.castShadow = true;
  root.add(base);

  // 8 Turned Bun Feet
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const fx = Math.cos(angle) * 1.3;
    const fz = Math.sin(angle) * 1.3;
    const foot = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 10), materials.carvedWood);
    foot.position.set(fx, -0.72, fz);
    root.add(foot);

    const brassShoe = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.05, 10), materials.brass);
    brassShoe.position.set(fx, -0.8, fz);
    root.add(brassShoe);
  }

  // Pierced Jaali Lattice Screen Wall (Octagonal drum)
  const jaaliWallGeo = new THREE.CylinderGeometry(1.3, 1.3, 0.8, 8, 1, true);
  const jaaliWall = new THREE.Mesh(jaaliWallGeo, materials.carvedWood);
  jaaliWall.position.y = -0.15;
  root.add(jaaliWall);

  // Tarkashi Brass Ring Trim around top rim
  const brassRingGeo = new THREE.TorusGeometry(1.35, 0.03, 8, 32);
  const brassRing = new THREE.Mesh(brassRingGeo, materials.brass);
  brassRing.rotation.x = Math.PI / 2;
  brassRing.position.y = 0.26;
  root.add(brassRing);

  // Top Octagonal Wooden Frame
  const frameGeo = new THREE.CylinderGeometry(1.4, 1.35, 0.1, 8);
  const topFrame = new THREE.Mesh(frameGeo, materials.wood);
  topFrame.position.y = 0.28 + exp * 0.4;
  root.add(topFrame);

  // Clear Beveled Crystal Glass Top (Lifts up in exploded mode)
  const glassGeo = new THREE.CylinderGeometry(1.48, 1.48, 0.05, 16);
  const glass = new THREE.Mesh(glassGeo, materials.glass);
  glass.position.y = 0.36 + exp * 1.1;
  root.add(glass);

  // Internal Decorative Lotus Mandala Plate (Visible through glass!)
  const mandalaGeo = new THREE.CircleGeometry(0.7, 16);
  const mandala = new THREE.Mesh(mandalaGeo, materials.brass);
  mandala.rotation.x = -Math.PI / 2;
  mandala.position.y = -0.52;
  root.add(mandala);

  return root;
}

export const buildTablesModel = buildJaaliTableModel;

// --------------------------------------------------------------------------
// 6. THE ROYAL DIWAN-E-KHAAS WRITING DESK
// --------------------------------------------------------------------------
export function buildDeskModel(
  materials: ReturnType<typeof getMaterials>,
  exploded = false
): THREE.Group {
  const root = new THREE.Group();
  root.name = 'DeskModel';
  const exp = exploded ? 0.65 : 0;

  // Desktop Main Solid Slab
  const topGeo = new THREE.BoxGeometry(2.8, 0.1, 1.6);
  const topMesh = new THREE.Mesh(topGeo, materials.wood);
  topMesh.position.y = 0.5 + exp * 0.85;
  topMesh.castShadow = true;
  root.add(topMesh);

  // Desktop Writing Mat / Blotter Inset
  const blotterGeo = new THREE.BoxGeometry(1.6, 0.015, 1.1);
  const blotter = new THREE.Mesh(blotterGeo, materials.fabric);
  blotter.position.set(0, 0.555 + exp * 0.85, 0);
  root.add(blotter);

  // Brass Corner Plates on Desktop
  const cornerGeo = new THREE.BoxGeometry(0.18, 0.11, 0.18);
  [
    [-1.38, 0.5, -0.78],
    [1.38, 0.5, -0.78],
    [-1.38, 0.5, 0.78],
    [1.38, 0.5, 0.78],
  ].forEach(([cx, cy, cz]) => {
    const cMesh = new THREE.Mesh(cornerGeo, materials.brass);
    cMesh.position.set(cx, cy + exp * 0.85, cz);
    root.add(cMesh);
  });

  // Central Drawer below desktop
  const centerDrawerGeo = new THREE.BoxGeometry(1.0, 0.16, 1.4);
  const centerDrawer = new THREE.Mesh(centerDrawerGeo, materials.carvedWood);
  centerDrawer.position.set(0, 0.36 + exp * 0.4, exp * 0.6);
  root.add(centerDrawer);

  // Center Drawer Brass Ring Pull
  const centerPull = new THREE.Mesh(new THREE.TorusGeometry(0.04, 0.01, 8, 16), materials.brass);
  centerPull.position.set(0, 0.36 + exp * 0.4, 0.72 + exp * 0.6);
  root.add(centerPull);

  // Carved Mughal Kneehole Arch Beam behind center
  const archBeamGeo = new THREE.BoxGeometry(1.04, 0.25, 0.08);
  const archBeam = new THREE.Mesh(archBeamGeo, materials.carvedWood);
  archBeam.position.set(0, 0.15, -0.6);
  root.add(archBeam);

  // Left & Right Pedestals
  [-0.95, 0.95].forEach((pedX, idx) => {
    const pedSign = idx === 0 ? -1 : 1;
    const pedGroup = new THREE.Group();
    pedGroup.position.x = pedX + pedSign * exp * 0.5;

    // Pedestal Carcass Outer Box
    const pedBox = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.82, 1.48), materials.wood);
    pedBox.position.set(0, 0.02, 0);
    pedGroup.add(pedBox);

    // 3 Tiered Drawers per pedestal
    [-0.24, 0.03, 0.29].forEach((drawY, dIdx) => {
      const drawerFront = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.21, 0.03), materials.carvedWood);
      drawerFront.position.set(0, drawY, 0.75 + (dIdx + 1) * exp * 0.25);
      pedGroup.add(drawerFront);

      // Brass Ring Handles on each drawer
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.035, 0.01, 8, 16), materials.brass);
      ring.position.set(0, drawY, 0.77 + (dIdx + 1) * exp * 0.25);
      pedGroup.add(ring);

      // Brass escutcheon keyhole plate
      const esc = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.005, 8), materials.brass);
      esc.rotation.x = Math.PI / 2;
      esc.position.set(0, drawY + 0.05, 0.77 + (dIdx + 1) * exp * 0.25);
      pedGroup.add(esc);
    });

    // Fluted Outer Column Corner Details
    [-0.38, 0.38].forEach((colZ) => {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.85, 12), materials.carvedWood);
      col.position.set(pedSign * 0.38, 0.02, colZ);
      pedGroup.add(col);

      // Brass collar
      const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.04, 12), materials.brass);
      collar.position.set(pedSign * 0.38, 0.42, colZ);
      pedGroup.add(collar);
    });

    // Base Plinth & Turned Bun Feet
    const basePlinth = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.08, 1.52), materials.carvedWood);
    basePlinth.position.y = -0.42;
    pedGroup.add(basePlinth);

    // 4 Bun Feet
    [
      [-0.32, -0.65],
      [0.32, -0.65],
      [-0.32, 0.65],
      [0.32, 0.65],
    ].forEach(([fx, fz]) => {
      const foot = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 10), materials.carvedWood);
      foot.position.set(fx, -0.48, fz);
      pedGroup.add(foot);

      const brassCap = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.03, 10), materials.brass);
      brassCap.position.set(fx, -0.52, fz);
      pedGroup.add(brassCap);
    });

    root.add(pedGroup);
  });

  return root;
}

// --------------------------------------------------------------------------
// 7. THE JODHPUR HAVELI ARMOIRE / WARDROBE
// --------------------------------------------------------------------------
export function buildWardrobeModel(
  materials: ReturnType<typeof getMaterials>,
  exploded = false
): THREE.Group {
  const root = new THREE.Group();
  root.name = 'WardrobeModel';
  const exp = exploded ? 0.65 : 0;

  // Main Cabinet Carcass
  const carcass = new THREE.Mesh(new THREE.BoxGeometry(2.0, 2.4, 1.1), materials.wood);
  carcass.position.y = 0.2;
  root.add(carcass);

  // Fluted Corner Pilasters
  [
    [-1.02, -0.54],
    [1.02, -0.54],
    [-1.02, 0.54],
    [1.02, 0.54],
  ].forEach(([px, pz]) => {
    const pilaster = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.44, 0.1), materials.carvedWood);
    pilaster.position.set(px, 0.2, pz);
    root.add(pilaster);
  });

  // Top Architectural Stepped Cornice Crown (Elevates in exploded)
  const crownGroup = new THREE.Group();
  crownGroup.position.y = 1.45 + exp * 0.9;

  const cTier1 = new THREE.Mesh(new THREE.BoxGeometry(2.16, 0.1, 1.24), materials.carvedWood);
  cTier1.position.y = 0;
  crownGroup.add(cTier1);

  const cTier2 = new THREE.Mesh(new THREE.BoxGeometry(2.26, 0.08, 1.34), materials.wood);
  cTier2.position.y = 0.08;
  crownGroup.add(cTier2);

  // Central Carved Crest Medallion on Crown
  const crest = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.06, 16), materials.carvedWood);
  crest.rotation.x = Math.PI / 2;
  crest.position.set(0, 0.2, 0.66);
  crownGroup.add(crest);

  // Brass Finials on Crown (Center & Corners)
  [-1.0, 0, 1.0].forEach((fx) => {
    const finial = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.06, 0.2, 10), materials.brass);
    finial.position.set(fx, 0.22, 0.58);
    crownGroup.add(finial);

    const fOrb = new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 10), materials.brass);
    fOrb.position.set(fx, 0.33, 0.58);
    crownGroup.add(fOrb);
  });
  root.add(crownGroup);

  // Double Carved Doors with Jaali Perforated Screen Insets
  [-0.47, 0.47].forEach((doorX, idx) => {
    const doorSign = idx === 0 ? -1 : 1;
    const doorGroup = new THREE.Group();
    // Door hinges at outer edges
    const hingeX = doorSign * 0.95;
    doorGroup.position.set(hingeX, 0.45, 0.56);

    // Exploded swing rotation
    if (exploded) {
      doorGroup.rotation.y = -doorSign * 0.75;
      doorGroup.position.z += 0.25;
    }

    const relX = -doorSign * 0.46;
    const frame = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.5, 0.05), materials.wood);
    frame.position.set(relX, 0, 0);
    doorGroup.add(frame);

    // Pierced Jaali Screen Panel
    const jaali = new THREE.Mesh(new THREE.BoxGeometry(0.72, 1.3, 0.03), materials.carvedWood);
    jaali.position.set(relX, 0, 0.015);
    doorGroup.add(jaali);

    // Brass Flower Rivet Studs around door frame
    [-0.32, 0.32].forEach((rx) => {
      [-0.55, 0, 0.55].forEach((ry) => {
        const stud = new THREE.Mesh(new THREE.SphereGeometry(0.022, 8, 8), materials.brass);
        stud.position.set(relX + rx, ry, 0.035);
        doorGroup.add(stud);
      });
    });

    root.add(doorGroup);
  });

  // Central Brass Hasp & Locking Latch (Kundi)
  const hasp = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.35, 0.03), materials.brass);
  hasp.position.set(0, 0.45, 0.6 + exp * 0.4);
  root.add(hasp);

  const latchRing = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.012, 8, 16), materials.brass);
  latchRing.position.set(0, 0.4, 0.62 + exp * 0.4);
  root.add(latchRing);

  // Lower Tier: 2 Wide Pull-out Drawers
  [-0.48, 0.48].forEach((drawX, idx) => {
    const drawerGroup = new THREE.Group();
    drawerGroup.position.set(drawX, -0.65, 0.56 + (idx + 1) * exp * 0.4);

    const drawFront = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.35, 0.04), materials.carvedWood);
    drawerGroup.add(drawFront);

    // Brass Drop Handles
    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.04, 0.01, 8, 16), materials.brass);
    handle.position.set(0, 0, 0.03);
    drawerGroup.add(handle);

    root.add(drawerGroup);
  });

  // Base Plinth & 4 Heavy Carved Feet
  const basePlinth = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.12, 1.18), materials.carvedWood);
  basePlinth.position.y = -0.92;
  root.add(basePlinth);

  [
    [-0.88, -0.46],
    [0.88, -0.46],
    [-0.88, 0.46],
    [0.88, 0.46],
  ].forEach(([fx, fz]) => {
    const foot = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 10), materials.carvedWood);
    foot.position.set(fx, -1.02, fz);
    root.add(foot);

    const bCap = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.04, 10), materials.brass);
    bCap.position.set(fx, -1.08, fz);
    root.add(bCap);
  });

  return root;
}

// --------------------------------------------------------------------------
// 8. THE MEHRANGARH PALACE GATES / HAVELI SHAHI DARWAZA
// --------------------------------------------------------------------------
export function buildGatesModel(
  materials: ReturnType<typeof getMaterials>,
  exploded = false
): THREE.Group {
  const root = new THREE.Group();
  root.name = 'GatesModel';
  const exp = exploded ? 0.75 : 0;

  // Massive Outer Architectural Gateway Frame
  const frameGroup = new THREE.Group();

  // Left & Right Massive Posts
  [-1.35, 1.35].forEach((postX, idx) => {
    const postSign = idx === 0 ? -1 : 1;
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3.2, 0.45), materials.carvedWood);
    post.position.set(postX + postSign * exp * 0.4, 0.2, 0);
    post.castShadow = true;
    frameGroup.add(post);

    // Carved capital bracket at top of post
    const capital = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.2, 0.52), materials.wood);
    capital.position.set(postX + postSign * exp * 0.4, 1.75, 0);
    frameGroup.add(capital);

    // Heavy Brass Base Plate
    const basePlate = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.1, 0.5), materials.brass);
    basePlate.position.set(postX + postSign * exp * 0.4, -1.35, 0);
    frameGroup.add(basePlate);
  });

  // Top Lintel with Cusped Mewari Arch Crest (Lifts up in exploded)
  const lintelGroup = new THREE.Group();
  lintelGroup.position.y = 1.8 + exp * 0.85;

  const mainBeam = new THREE.Mesh(new THREE.BoxGeometry(3.1, 0.35, 0.48), materials.wood);
  lintelGroup.add(mainBeam);

  // Ornate Cusped Arch Crown above beam
  const archCrown = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.45, 0.12), materials.carvedWood);
  archCrown.position.set(0, 0.35, 0);
  lintelGroup.add(archCrown);

  // Central Brass Sun Crest / Mandala
  const sunCrest = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.05, 16), materials.brass);
  sunCrest.rotation.x = Math.PI / 2;
  sunCrest.position.set(0, 0.4, 0.1);
  lintelGroup.add(sunCrest);

  // 3 Brass Pinnacle Finials on arch top
  [-0.9, 0, 0.9].forEach((fx) => {
    const finial = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.06, 0.25, 10), materials.brass);
    finial.position.set(fx, 0.65, 0);
    lintelGroup.add(finial);
  });

  frameGroup.add(lintelGroup);
  root.add(frameGroup);

  // Two Massive Gate Leaves (Left & Right Door Leaves)
  [-0.6, 0.6].forEach((leafX, idx) => {
    const leafSign = idx === 0 ? -1 : 1;
    const leafGroup = new THREE.Group();
    // Hinged near the posts: -1.2 for left, +1.2 for right
    const hingeX = leafSign * 1.2;
    leafGroup.position.set(hingeX, 0.15, 0);

    // Exploded swing outward on hinges
    if (exploded) {
      leafGroup.rotation.y = -leafSign * 0.65;
      leafGroup.position.z += 0.3;
    }

    const relX = -leafSign * 0.58;

    // Gate Leaf Solid Thick Timber Core
    const leafCore = new THREE.Mesh(new THREE.BoxGeometry(1.16, 2.7, 0.14), materials.wood);
    leafCore.position.set(relX, 0, 0);
    leafCore.castShadow = true;
    leafGroup.add(leafCore);

    // 4 Horizontal Heavy Reinforcing Bands across each gate
    [-0.95, -0.35, 0.35, 0.95].forEach((bandY) => {
      const band = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.14, 0.18), materials.carvedWood);
      band.position.set(relX, bandY, 0);
      leafGroup.add(band);

      // Conical Brass Elephant-Deterrent Spikes / Bosses (Gaj-Kanta) along each band
      [-0.4, 0, 0.4].forEach((spikeX) => {
        const spike = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.14, 10), materials.brass);
        spike.rotation.x = Math.PI / 2;
        spike.position.set(relX + spikeX, bandY, 0.16);
        leafGroup.add(spike);

        // Brass base washer
        const washer = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.015, 12), materials.brass);
        washer.rotation.x = Math.PI / 2;
        washer.position.set(relX + spikeX, bandY, 0.095);
        leafGroup.add(washer);
      });
    });

    // Heavy Forged Brass Ring Knocker (Hath-Phool)
    const knockerPlate = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.03, 16), materials.brass);
    knockerPlate.rotation.x = Math.PI / 2;
    knockerPlate.position.set(relX + leafSign * 0.2, 0, 0.11);
    leafGroup.add(knockerPlate);

    const knockerRing = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.02, 12, 24), materials.brass);
    knockerRing.position.set(relX + leafSign * 0.2, -0.06, 0.15);
    leafGroup.add(knockerRing);

    // In right gate (idx === 1): integrated smaller wicket door (Khidki) with arch frame
    if (idx === 1) {
      const wicketFrame = new THREE.Mesh(new THREE.BoxGeometry(0.68, 1.2, 0.04), materials.carvedWood);
      wicketFrame.position.set(relX, -0.5, 0.08);
      leafGroup.add(wicketFrame);

      const wicketHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.12, 8), materials.brass);
      wicketHandle.position.set(relX - 0.22, -0.5, 0.12);
      leafGroup.add(wicketHandle);
    }

    root.add(leafGroup);
  });

  // Central Vertical Locking Bar & Clasp (Shahi Kundi)
  const centerLockBar = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.8, 0.06), materials.brass);
  centerLockBar.position.set(0, 0.15, 0.13 + exp * 0.4);
  root.add(centerLockBar);

  return root;
}

