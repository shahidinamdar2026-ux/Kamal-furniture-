import { FurniturePiece, WoodFinish, FabricType, LightingMood } from '../types';

import imgMasterpieceDesk from '../assets/images/masterpiece_royal_desk_1789485815041.jpg';
import imgMasterpieceWardrobe from '../assets/images/masterpiece_haveli_wardrobe_1789485833223.jpg';
import imgMasterpieceGates from '../assets/images/masterpiece_fortress_gates_1789485850330.jpg';
import imgMasterpieceTables from '../assets/images/masterpiece_jaali_table_1789485867566.jpg';

export const WOOD_FINISHES: Record<WoodFinish, { name: string; hex: string; desc: string; grain: string }> = {
  sheesham: {
    name: 'Indian Rosewood (Sheesham)',
    hex: '#4a2511',
    desc: 'Dense, interlocking grain with golden-to-deep brown marbling from Rajasthan.',
    grain: 'Natural High Contrast'
  },
  teak: {
    name: 'CP Teak (Sagwan)',
    hex: '#784720',
    desc: 'High natural silica & oil content, weather-resistant, rich honey-amber luster.',
    grain: 'Straight Silky Grain'
  },
  rosewood: {
    name: 'Malabar Rosewood (Eetti)',
    hex: '#2b1408',
    desc: 'Imperial dark chocolate tone with purple undertones, historically reserved for royal thrones.',
    grain: 'Dense Regal Flow'
  },
  antique_walnut: {
    name: 'Kashmiri Walnut (Doon)',
    hex: '#3d2b1f',
    desc: 'Soft warm brown with velvet tactile feel, ideal for intricate micro-relief carving.',
    grain: 'Fine Subtle Grain'
  },
  bleached_sand: {
    name: 'Jaisalmer Sandal Patina',
    hex: '#a6825c',
    desc: 'Sun-bleached weathered finish inspired by the golden sandstone walls of Thar havelis.',
    grain: 'Distressed Matte'
  }
};

export const FABRICS: Record<FabricType, { name: string; hex: string; texture: string }> = {
  crimson_silk: {
    name: 'Royal Kumkum Crimson Silk',
    hex: '#82161b',
    texture: 'Benarasi Raw Silk with woven zari highlights'
  },
  peacock_velvet: {
    name: 'Mayur Peacock Velvet',
    hex: '#0d4a52',
    texture: 'Plush heritage cotton velvet with deep royal sheen'
  },
  marigold_brocade: {
    name: 'Genda Marigold Brocade',
    hex: '#c97d10',
    texture: 'Hand-loomed Chanderi brocade with floral butis'
  },
  emerald_velvet: {
    name: 'Panna Emerald Velvet',
    hex: '#14452f',
    texture: 'Heavy architectural velvet with antique finish'
  },
  raw_linen: {
    name: 'Khadi Raw Sandal Linen',
    hex: '#d5c4a1',
    texture: 'Handspun natural unbleached coarse khadi'
  }
};

export const LIGHTING_MOODS: Record<LightingMood, { name: string; bgClass: string; ambientColor: number; dirColor: number; intensity: number; description: string }> = {
  haveli_sunset: {
    name: 'Haveli Golden Sunset',
    bgClass: 'from-[#1a0f08] via-[#24130a] to-[#0f0906]',
    ambientColor: 0xffaa66,
    dirColor: 0xffd28a,
    intensity: 1.4,
    description: 'Warm, low-angle golden light filtering through carved sandstone jharokhas.'
  },
  royal_darbar: {
    name: 'Royal Darbar Candlelight',
    bgClass: 'from-[#210908] via-[#1a0808] to-[#0c0404]',
    ambientColor: 0xff9944,
    dirColor: 0xffcc77,
    intensity: 1.6,
    description: 'Dramatic chiaroscuro illuminated by brass jhumar chandeliers and clay diyas.'
  },
  morning_courtyard: {
    name: 'Udaipur Morning Courtyard',
    bgClass: 'from-[#111921] via-[#18212a] to-[#0d1319]',
    ambientColor: 0xddeeff,
    dirColor: 0xfffaed,
    intensity: 1.3,
    description: 'Crisp, diffused daylight bouncing off lime-plastered courtyard pillars.'
  },
  midnight_palace: {
    name: 'Palace Moonlit Terrace',
    bgClass: 'from-[#070b14] via-[#09101d] to-[#03050a]',
    ambientColor: 0x5577aa,
    dirColor: 0x88bbff,
    intensity: 1.1,
    description: 'Mystical silver moonlight highlighting hand-chiseled brass and polished dark timbers.'
  }
};

export const FURNITURE_PIECES: FurniturePiece[] = [
  {
    id: 'virasat-desk-01',
    name: 'Desk',
    hindiName: 'दीवान-ए-खास शाही डेस्क',
    tagline: 'Royal Diwan-e-Khaas executive writing desk with brass Tarkashi inlay & secret chambers',
    region: 'Saharanpur',
    category: 'Tables & Jharokhas',
    priceINR: 145000,
    dimensions: {
      width: 62,
      depth: 32,
      height: 31,
      weightKg: 78
    },
    woodSpecies: 'Grade-A Seasoned Sheesham & Teak Accents',
    craftTechnique: 'Chool-Salai Mortise Joinery, Brass Tarkashi Inlay & Hand-Turned Pilasters',
    artisanLineage: 'Master Anwar Ansari, Saharanpur Woodcraft Guild',
    historicalEra: 'Mughal Royal Diwan (circa 1830s)',
    description: 'An imperial writing desk crafted for sovereigns and chief scribes. Built from single-plank seasoned timber, it features dual tiered pedestal drawers, a central carved Mughal kneehole arch, brass corner brackets, hand-forged brass drawer ring pulls, and velvet writing inlay.',
    features: [
      '7 lockable soft-glide dovetail drawers with secret chambers',
      'Hand-inlaid brass Tarkashi geometric ribbons on drawer fascias',
      'Fluted corner pilasters with solid brass capital collars',
      'Waterproof beeswax and natural mustard oil seasoned finish'
    ],
    hotspots: [
      {
        title: 'Velvet Writing Mat',
        description: 'Plush crimson velvet inset bordered by continuous hand-beveled brass banding.',
        position: [0, 0.6, 0]
      },
      {
        title: 'Tiered Pedestal Drawers',
        description: 'Triple stacked drawers with solid sand-cast brass ring pulls and escutcheon keyplates.',
        position: [0.95, 0.1, 0.7]
      },
      {
        title: 'Turned Bun Feet with Brass Shoes',
        description: 'Chiseled from solid blocks of Sheesham with mirror-polished brass caps.',
        position: [-1.2, -0.45, 0.7]
      }
    ],
    modelKey: 'desk',
    defaultWood: 'sheesham',
    defaultFabric: 'crimson_silk',
    inStock: true,
    leadTimeWeeks: 4,
    image: imgMasterpieceDesk
  },
  {
    id: 'virasat-wardrobe-02',
    name: 'Wardrobe',
    hindiName: 'जोधपुर हवेली अलमारी',
    tagline: 'Grand two-door Haveli Almari with hand-pierced floral jaali screens & forged brass latch',
    region: 'Rajasthan',
    category: 'Chests & Storage',
    priceINR: 195000,
    dimensions: {
      width: 48,
      depth: 24,
      height: 80,
      weightKg: 110
    },
    woodSpecies: 'Heartwood CP Teak (Sagwan)',
    craftTechnique: 'Perforated Floral Jaali Carving & Hand-Forged Brass Hasp Hardware',
    artisanLineage: 'Suthar Woodcraft Collective, Jodhpur Heritage Guild',
    historicalEra: 'Marwar Haveli Grandeur (circa 1850s)',
    description: 'A regal two-door armoire standing over 6.5 feet tall. Handcrafted from seasoned CP Sagwan Teak, featuring pierced jaali fretwork that allows interior air circulation, stepped architectural cornice crown, antique brass flower studs, deep linen drawers, and an authentic brass drop-latch (kundi).',
    features: [
      'Double full-length doors with hand-carved floral jaali fretwork',
      'Stepped architectural cornice with three hand-turned brass finials',
      'Twin deep lower drawers for linens and royal textiles',
      'Forged brass drop-latch (kundi) with padlocking eyelet'
    ],
    hotspots: [
      {
        title: 'Stepped Cornice Crown',
        description: 'Multi-tiered architectural crown with carved acanthus molding and brass finials.',
        position: [0, 1.6, 0.5]
      },
      {
        title: 'Floral Jaali Door Panels',
        description: 'Hand-pierced lattice allowing natural air breathability for silk garments.',
        position: [-0.5, 0.5, 0.6]
      },
      {
        title: 'Hand-Forged Brass Kundi',
        description: 'Solid sand-cast brass latch and ring pull made by village blacksmiths.',
        position: [0, 0.4, 0.65]
      }
    ],
    modelKey: 'wardrobe',
    defaultWood: 'teak',
    inStock: true,
    leadTimeWeeks: 5,
    image: imgMasterpieceWardrobe
  },
  {
    id: 'virasat-gates-03',
    name: 'Gates',
    hindiName: 'शाही हवेली दरवाज़ा',
    tagline: 'Monumental hand-chiseled fortress gates with elephant-spike brass bosses & wicket khidki',
    region: 'Rajasthan',
    category: 'Chests & Storage',
    priceINR: 285000,
    dimensions: {
      width: 78,
      depth: 16,
      height: 96,
      weightKg: 160
    },
    woodSpecies: 'Reclaimed Century-Old Sheesham & Malabar Rosewood',
    craftTechnique: 'Deep Relief Mewari Arch Carving & Sand-Cast Brass Elephant-Spike Armor',
    artisanLineage: 'Master Ustaad Ramswaroop Sharma, 5th Generation Royal Carver',
    historicalEra: 'Mehrangarh Fort Portal Architecture (circa 1760s)',
    description: 'A monumental Indian palace gateway designed as a dramatic architectural entryway or room divider. Built from massive seasoned timber beams, reinforced by 4 heavy crossbands studded with conical elephant-deterrent brass spikes (gaj-kanta), carved Mewari cusped arch, massive ring knockers, and an integrated wicket door.',
    features: [
      '24 hand-cast solid brass conical elephant spikes (gaj-kanta)',
      'Massive 4-inch thick solid timber posts with carved bracket capitals',
      'Integrated functional wicket door (khidki) for pedestrian passage',
      'Twin hand-forged brass ring knockers with floral backplates'
    ],
    hotspots: [
      {
        title: 'Elephant Spikes (Gaj-Kanta)',
        description: 'Conical solid brass defensive bosses traditionally forged to deter war elephants.',
        position: [0.6, 0.35, 0.2]
      },
      {
        title: 'Cusped Mewari Arch',
        description: 'Scalloped arch lintel carved with sunburst medallions and temple finials.',
        position: [0, 2.0, 0]
      },
      {
        title: 'Brass Ring Knocker (Hath-Phool)',
        description: 'Massive resonant hand-forged brass ring knocker with lotus rosette plate.',
        position: [-0.6, 0, 0.2]
      }
    ],
    modelKey: 'gates',
    defaultWood: 'rosewood',
    inStock: true,
    leadTimeWeeks: 6,
    image: imgMasterpieceGates
  },
  {
    id: 'virasat-tables-04',
    name: 'Tables',
    hindiName: 'दरभंगा जाली बैठक मेज़',
    tagline: 'Octagonal imperial baithak & dining table with perforated floral jaali apron & crystal glass',
    region: 'Awadh',
    category: 'Tables & Jharokhas',
    priceINR: 112000,
    dimensions: {
      width: 52,
      depth: 52,
      height: 30,
      weightKg: 52
    },
    woodSpecies: 'Heartwood Sheesham & CP Sagwan Teak',
    craftTechnique: 'Pierced Awadhi Jali Lattice & Tarkashi Brass Rim Inlay',
    artisanLineage: 'Darbhanga Royal Baithak Woodcrafters',
    historicalEra: 'Awadh Courtyard Leisure (circa 1870s)',
    description: 'An octagonal royal table inspired by the summer baithaks of Awadh palaces. Hand-pierced geometric jaali lattice walls cast mesmerizing starburst shadows when interior candlelight shines through. Features an inlaid Tarkashi brass top ring and beveled crystal glass reveals an inner carved brass lotus mandala.',
    features: [
      'Continuous 8-sided pierced jaali screen wall with floral jharokha arches',
      'Beveled edge crystal glass top (12mm tempered architectural glass)',
      'Internal hand-etched brass lotus mandala medallion on bottom shelf',
      '8 turned bun feet with sand-cast brass floor shoe caps'
    ],
    hotspots: [
      {
        title: 'Perforated Jaali Lattice',
        description: 'Pierced star and floral geometric lattice chiseled completely by hand.',
        position: [0.5, 0, 0.5]
      },
      {
        title: 'Tarkashi Brass Ring',
        description: 'Continuous 2mm brass ribbon hammered into hand-carved channels.',
        position: [0, 0.38, 0.7]
      },
      {
        title: 'Turned Bun Base',
        description: 'Graceful rounded footings with solid brass shoe caps.',
        position: [-0.6, -0.35, 0.6]
      }
    ],
    modelKey: 'tables',
    defaultWood: 'antique_walnut',
    inStock: true,
    leadTimeWeeks: 3,
    image: imgMasterpieceTables
  }
];

export const CRAFT_TECHNIQUES = [
  {
    id: 'tarkashi',
    title: 'Tarkashi (तारकशी)',
    subtitle: 'Brass & Copper Wire Inlay',
    description: 'An agonizingly meticulous craft of Mainpuri and Jaipur where master artisans chisel 1mm deep hair-thin groves into dark Sheesham, then hammer continuous ribbons of pure brass wire flush into the timber.',
    heritage: 'Mughal Imperial Guilds (16th Century)',
    timeToComplete: '14 days per square foot',
    region: 'Rajasthan & Uttar Pradesh',
    iconName: 'Sparkles'
  },
  {
    id: 'jaali',
    title: 'Jaali Fretwork (जाली)',
    subtitle: 'Perforated Architectural Lace',
    description: 'Derived from palace screens designed to let desert breezes circulate while offering privacy (purdah). Artisans manually pierce dense hardwoods with hand-bow saws to create hypnotic geometric mandalas.',
    heritage: 'Fatehpur Sikri & Mewar Havelis',
    timeToComplete: '22 hours per panel',
    region: 'Saharanpur & Srinagar',
    iconName: 'Grid'
  },
  {
    id: 'chool_salai',
    title: 'Chool-Salai (चूल-सलाई)',
    subtitle: 'Ancient Mortise & Tenon Joinery',
    description: 'Zero metal screws or synthetic glue. The wooden interlocking joints expand and contract harmoniously with humidity and seasonal monsoon cycles, ensuring furniture lasts over 150 years without wobbling.',
    heritage: 'Vedic Sthapatya Veda Principles',
    timeToComplete: 'Generational longevity (100+ years)',
    region: 'All Heritage Clusters',
    iconName: 'Layers'
  },
  {
    id: 'mustard_oil',
    title: 'Tel-Rang Seasoning (तेल-रंग)',
    subtitle: '7-Stage Organic Curing',
    description: 'Timber is steeped in boiled linseed and cold-pressed mustard oil infused with neem bark to naturally repel termites, followed by hand-buffing with virgin beeswax and lac flakes for a silky satin patina.',
    heritage: 'Ayurvedic Botanical Wood Treatment',
    timeToComplete: '40 days natural curing',
    region: 'Jodhpur & Karaikudi',
    iconName: 'Droplet'
  }
];

export const ARTISAN_STORIES = [
  {
    name: 'Ustaad Ramswaroop Sharma',
    age: 68,
    lineage: '5th Generation Royal Wood Carver',
    location: 'Bhatiyani Chotta, Jodhpur',
    quote: 'When the chisel touches seasoned Sheesham, the wood speaks first. Our job is merely to remove the excess until the soul of Mewar reveals itself.',
    specialty: 'Jharokha Jhula Swings & Elephant Capitals',
    experienceYears: 52
  },
  {
    name: 'Master Craftsman Anwar Ansari',
    age: 57,
    lineage: '4th Generation Saharanpur Guild Member',
    location: 'Chilkana Road, Saharanpur',
    quote: 'A single throne chair requires 28 different steel chisels. If you hurry by even one millimeter, the balance of the arch is lost forever.',
    specialty: 'Filigree Darbar Chairs & Botanical Crests',
    experienceYears: 41
  },
  {
    name: 'Sthapati K. Muthukrishnan',
    age: 62,
    lineage: 'Traditional Temple Architect & Sculptor',
    location: 'Karaikudi, Chettinad, Tamil Nadu',
    quote: 'Our teak pieces are built under Aayadi Vastu proportions. A sacred sanctum is not just furniture; it is the spiritual anchor of the household.',
    specialty: 'Burma Teak Mandirs & Heavy Pillars',
    experienceYears: 46
  }
];

export const CLIENT_TESTIMONIALS = [
  {
    author: 'Sunita & Vikram Singhania',
    location: 'Worli Sea Face, Mumbai',
    piece: 'The Maharaja Jharokha Jhula in Sheesham',
    text: 'We placed the Kamal Furniture Jhula facing our Arabian Sea balcony. The gentle chime of the brass bells in the evening breeze brings an unbelievable sense of palace serenity to our contemporary apartment.',
    rating: 5,
    year: '2025'
  },
  {
    author: 'Dr. Kabir Oberoi',
    location: 'Defence Colony, New Delhi',
    piece: 'Kissa-e-Darbar Throne Chair & Baithak Table',
    text: 'The weight, the scent of mustard-oil treated timber, and the sharpness of the jaali carving is on par with pieces you see in Udaipur City Palace. True heirloom craftsmanship.',
    rating: 5,
    year: '2026'
  },
  {
    author: 'Ananya & Rohan Iyer',
    location: 'Indiranagar, Bengaluru',
    piece: 'Gopuram Teak Sanctum (Pooja Mandir)',
    text: 'Our pooja room now feels like a tranquil sanctuary. The 24 hand-cast bells have a pure, resonant tone that rings during our morning prayers. Truly grateful to the artisans.',
    rating: 5,
    year: '2025'
  }
];
