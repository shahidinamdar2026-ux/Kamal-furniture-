import { WoodFinish } from '../types';

import imgSwingIndoor from '../assets/images/swing_indoor_bench_1789485232209.jpg';
import imgSwingGarden from '../assets/images/swing_garden_bench_1789485248608.jpg';
import imgTeapoyGlass from '../assets/images/teapoy_glass_top_1789485263265.jpg';
import imgTeapoyTeak from '../assets/images/teapoy_teak_modern_1789485278381.jpg';
import imgSofaThree from '../assets/images/sofa_timber_three_1789485293041.jpg';
import imgSofaLoveseat from '../assets/images/sofa_teak_loveseat_1789485307695.jpg';
import imgBedPoster from '../assets/images/bed_wooden_poster_1789485320927.jpg';
import imgBedStorage from '../assets/images/bed_storage_frame_1789485334857.jpg';
import imgTableDining from '../assets/images/table_dining_solid_1789485349485.jpg';
import imgTableConsole from '../assets/images/table_console_hall_1789485366920.jpg';
import imgMirrorFloor from '../assets/images/mirror_floor_arch_1789485382675.jpg';
import imgMirrorVanity from '../assets/images/mirror_wall_vanity_1789485397765.jpg';

export interface ReadyFurnitureItem {
  id: string;
  category: 'teapoy' | 'sofa' | 'bed' | 'swings' | 'tables' | 'mirror';
  categoryName: string;
  name: string;
  tagline: string;
  priceINR: number;
  image: string;
  dimensions: {
    width: number;
    depth: number;
    height: number;
    weightKg: number;
  };
  woodSpecies: string;
  finishOptions: WoodFinish[];
  dispatchDays: number;
  inStock: boolean;
  features: string[];
}

export interface ReadyCategoryConfig {
  id: 'teapoy' | 'sofa' | 'bed' | 'swings' | 'tables' | 'mirror';
  name: string;
  tagline: string;
  count: number;
  image: string;
}

export const READY_CATEGORIES: ReadyCategoryConfig[] = [
  { id: 'teapoy', name: 'Teapoy', tagline: 'Tea & coffee companions with glass & wood decks', count: 2, image: imgTeapoyGlass },
  { id: 'sofa', name: 'Sofa', tagline: 'Solid timber frame lounge seating & cushioned sofas', count: 2, image: imgSofaThree },
  { id: 'bed', name: 'Bed', tagline: 'King-size platform & hydraulic storage frames', count: 2, image: imgBedPoster },
  { id: 'swings', name: 'Swings', tagline: 'Ceiling suspended benches & garden stands with brass fittings', count: 2, image: imgSwingIndoor },
  { id: 'tables', name: 'Tables', tagline: '6-seater dining & slim entryway console tables', count: 2, image: imgTableDining },
  { id: 'mirror', name: 'Mirror', tagline: 'Full-length floor dressers & arched wall vanities', count: 2, image: imgMirrorFloor }
];

export const READYMADE_FURNITURE: ReadyFurnitureItem[] = [
  // 1. TEAPOY
  {
    id: 'rf-teapoy-01',
    category: 'teapoy',
    categoryName: 'Teapoy',
    name: 'Aristo Glass-Top Sheesham Teapoy',
    tagline: 'Dual-tier tea table with tempered glass top and lower storage deck',
    priceINR: 14500,
    dimensions: { width: 36, depth: 22, height: 18, weightKg: 16 },
    woodSpecies: 'Grade-A Seasoned Sheesham Wood',
    finishOptions: ['sheesham', 'teak', 'antique_walnut'],
    dispatchDays: 2,
    inStock: true,
    image: imgTeapoyGlass,
    features: [
      '10mm scratch-resistant toughened glass top',
      'Slotted lower storage deck for books & periodicals',
      'Precision-rounded child-safe corners',
      'Pre-assembled solid frame structure'
    ]
  },
  {
    id: 'rf-teapoy-02',
    category: 'teapoy',
    categoryName: 'Teapoy',
    name: 'Sleek Sagwan Teak Teapoy',
    tagline: 'Contemporary minimalist low tea table with brushed brass leg ferrules',
    priceINR: 16800,
    dimensions: { width: 40, depth: 24, height: 16, weightKg: 18 },
    woodSpecies: 'CP Sagwan Teak',
    finishOptions: ['teak', 'rosewood', 'antique_walnut'],
    dispatchDays: 3,
    inStock: true,
    image: imgTeapoyTeak,
    features: [
      'Chamfered edge top profile',
      'Brushed brass shoe ferrules on all 4 legs',
      'Moisture-resistant matte polyurethane coat',
      'Compact space-saving living room companion'
    ]
  },

  // 2. SOFA
  {
    id: 'rf-sofa-01',
    category: 'sofa',
    categoryName: 'Sofa',
    name: 'Nawab 3-Seater Solid Timber Sofa',
    tagline: 'Deep-seated ergonomic wooden frame sofa with plush high-density cushioning',
    priceINR: 48500,
    dimensions: { width: 76, depth: 34, height: 32, weightKg: 52 },
    woodSpecies: 'Solid Sheesham Hardwood',
    finishOptions: ['sheesham', 'teak', 'rosewood'],
    dispatchDays: 4,
    inStock: true,
    image: imgSofaThree,
    features: [
      '32-density cold cure foam cushions',
      'Water-repellent textured weave fabric',
      'Reinforced corner block solid frame',
      'Removable zippered cushion covers'
    ]
  },
  {
    id: 'rf-sofa-02',
    category: 'sofa',
    categoryName: 'Sofa',
    name: 'Pavilion Solid Teak 2-Seater Sofa',
    tagline: 'Mid-century clean silhouette loveseat with slatted wooden backrest',
    priceINR: 36500,
    dimensions: { width: 56, depth: 32, height: 31, weightKg: 38 },
    woodSpecies: 'Grade-A Sagwan Teak',
    finishOptions: ['teak', 'antique_walnut'],
    dispatchDays: 3,
    inStock: true,
    image: imgSofaLoveseat,
    features: [
      'Clean slatted backrest ventilation',
      'Neutral oatmeal linen upholstery',
      'Kiln-dried termite-resistant timber',
      'Quick-attach assembly kit included'
    ]
  },

  // 3. BED
  {
    id: 'rf-bed-01',
    category: 'bed',
    categoryName: 'Bed',
    name: 'Grandeur King-Size Poster Bed',
    tagline: 'Architectural 4-poster solid wood platform bed with headboard paneling',
    priceINR: 58000,
    dimensions: { width: 76, depth: 84, height: 72, weightKg: 85 },
    woodSpecies: 'Seasoned Solid Sheesham',
    finishOptions: ['sheesham', 'rosewood', 'antique_walnut'],
    dispatchDays: 5,
    inStock: true,
    image: imgBedPoster,
    features: [
      'Full solid wood mattress slat support system',
      'Heavy-duty steel corner brackets',
      'Accommodates standard king mattress (72x78 in)',
      'Pre-tested noise-free joint construction'
    ]
  },
  {
    id: 'rf-bed-02',
    category: 'bed',
    categoryName: 'Bed',
    name: 'Vanguard Hydraulic Storage King Bed',
    tagline: 'Effortless gas-lift storage bed with acoustic padded geometric headboard',
    priceINR: 64500,
    dimensions: { width: 75, depth: 82, height: 44, weightKg: 95 },
    woodSpecies: 'Engineered Solid Teak Structure',
    finishOptions: ['teak', 'sheesham'],
    dispatchDays: 4,
    inStock: true,
    image: imgBedStorage,
    features: [
      'German gas-lift hydraulic pistons (120kg rated)',
      '900-liter partitioned dust-free storage space',
      'Cushioned ergonomic backrest',
      'Easy-lift woven fabric strap'
    ]
  },

  // 4. SWINGS
  {
    id: 'rf-swings-01',
    category: 'swings',
    categoryName: 'Swings',
    name: 'Rajwada Ceiling-Mounted Indoor Swing',
    tagline: 'Readymade suspended wooden swing bench with polished brass hanging chain links',
    priceINR: 38500,
    dimensions: { width: 54, depth: 26, height: 24, weightKg: 34 },
    woodSpecies: 'CP Sagwan Teak & Solid Brass Chains',
    finishOptions: ['teak', 'sheesham', 'rosewood'],
    dispatchDays: 3,
    inStock: true,
    image: imgSwingIndoor,
    features: [
      'Heavy-gauge brass chains tested to 350kg load',
      'Includes ceiling mounting brass anchor hooks',
      'Weather-resistant polyurethane sealant',
      'Comfort bolster cushion included'
    ]
  },
  {
    id: 'rf-swings-02',
    category: 'swings',
    categoryName: 'Swings',
    name: 'Heritage Stand-Mounted Garden Swing',
    tagline: 'Self-standing A-frame outdoor and courtyard swing bench with canopy mounts',
    priceINR: 52000,
    dimensions: { width: 68, depth: 42, height: 74, weightKg: 62 },
    woodSpecies: 'Weatherproof Treated Teak Timber',
    finishOptions: ['teak', 'antique_walnut'],
    dispatchDays: 5,
    inStock: true,
    image: imgSwingGarden,
    features: [
      'Stable wide triangular base profile',
      'UV and moisture resistant exterior finish',
      'Bearing-mounted smooth noiseless pivot points',
      'Two-seater wide contoured seat'
    ]
  },

  // 5. TABLES
  {
    id: 'rf-tables-01',
    category: 'tables',
    categoryName: 'Tables',
    name: 'Sovereign 6-Seater Solid Dining Table',
    tagline: 'Substantial solid timber dining table with rounded bullnose edges',
    priceINR: 42500,
    dimensions: { width: 72, depth: 36, height: 30, weightKg: 58 },
    woodSpecies: 'Seasoned Solid Sheesham',
    finishOptions: ['sheesham', 'teak', 'antique_walnut'],
    dispatchDays: 3,
    inStock: true,
    image: imgTableDining,
    features: [
      'Solid 35mm thick timber tabletop',
      'Tapered pillar legs with floor-leveling glides',
      'Stain-resistant protective clear-coat',
      'Comfortably seats 6 adults'
    ]
  },
  {
    id: 'rf-tables-02',
    category: 'tables',
    categoryName: 'Tables',
    name: 'Avenue Dual-Drawer Hallway Console Table',
    tagline: 'Slim architectural foyer console table with soft-close drawers',
    priceINR: 21500,
    dimensions: { width: 48, depth: 16, height: 32, weightKg: 24 },
    woodSpecies: 'Solid Teak with Brass Hardware',
    finishOptions: ['teak', 'rosewood'],
    dispatchDays: 2,
    inStock: true,
    image: imgTableConsole,
    features: [
      'Narrow 16-inch depth ideal for foyers and corridors',
      '2 smooth telescopic ball-bearing drawers',
      'Brushed brass bar handles',
      'Bottom display storage shelf'
    ]
  },

  // 6. MIRROR
  {
    id: 'rf-mirror-01',
    category: 'mirror',
    categoryName: 'Mirror',
    name: 'Jharokha Arch Full-Length Mirror',
    tagline: 'Standing dressing mirror with architectural arch crown in solid wood',
    priceINR: 18500,
    dimensions: { width: 30, depth: 4, height: 72, weightKg: 26 },
    woodSpecies: 'Solid Sheesham Hardwood',
    finishOptions: ['sheesham', 'teak', 'rosewood', 'antique_walnut'],
    dispatchDays: 2,
    inStock: true,
    image: imgMirrorFloor,
    features: [
      '5mm distortion-free silver-backed HD float glass',
      'Shatter-proof protective backing film',
      'Can be wall-mounted or leaned against wall',
      'Molded architectural arch silhouette'
    ]
  },
  {
    id: 'rf-mirror-02',
    category: 'mirror',
    categoryName: 'Mirror',
    name: 'Mehrab Wall Vanity Accent Mirror',
    tagline: 'Wall-mounted geometric arch vanity mirror with integrated utility ledge',
    priceINR: 12800,
    dimensions: { width: 24, depth: 5, height: 36, weightKg: 14 },
    woodSpecies: 'CP Sagwan Teak',
    finishOptions: ['teak', 'antique_walnut'],
    dispatchDays: 2,
    inStock: true,
    image: imgMirrorVanity,
    features: [
      'Integrated 4-inch deep perfume & cosmetic ledge',
      'Dual heavy-duty keyhole mounting brackets',
      'Water-resistant bathroom & dressing room polish',
      'Beveled glass perimeter'
    ]
  }
];
