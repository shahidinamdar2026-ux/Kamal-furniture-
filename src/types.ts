export type WoodFinish = 'sheesham' | 'teak' | 'rosewood' | 'antique_walnut' | 'bleached_sand';
export type FabricType = 'crimson_silk' | 'peacock_velvet' | 'marigold_brocade' | 'emerald_velvet' | 'raw_linen';
export type LightingMood = 'haveli_sunset' | 'royal_darbar' | 'morning_courtyard' | 'midnight_palace';

export interface FurniturePiece {
  id: string;
  name: string;
  hindiName: string;
  tagline: string;
  region: 'Rajasthan' | 'Saharanpur' | 'Chettinad' | 'Kashmir' | 'Kerala' | 'Awadh';
  category: 'Swings (Jhula)' | 'Seating (Baithak)' | 'Chests & Storage' | 'Mandir & Sanctum' | 'Tables & Jharokhas';
  priceINR: number;
  dimensions: {
    width: number; // inches
    depth: number;
    height: number;
    weightKg: number;
  };
  woodSpecies: string;
  craftTechnique: string;
  artisanLineage: string;
  description: string;
  historicalEra: string;
  features: string[];
  hotspots: {
    title: string;
    description: string;
    position: [number, number, number];
  }[];
  modelKey: 'desk' | 'wardrobe' | 'gates' | 'tables' | 'jhula' | 'damchiya' | 'throne_chair' | 'mandir' | 'jaali_table';
  defaultWood: WoodFinish;
  defaultFabric?: FabricType;
  inStock: boolean;
  leadTimeWeeks: number;
  image?: string;
}

export interface BespokeConfig {
  furnitureType: string;
  wood: WoodFinish;
  widthInches: number;
  depthInches: number;
  heightInches: number;
  fabric: FabricType;
  brassWork: 'hand_hammered' | 'antique_patina' | 'pure_mirror_brass' | 'brass_inlay';
  customPlaqueText: string;
  notes: string;
}

export interface CartItem {
  piece: FurniturePiece;
  selectedWood: WoodFinish;
  selectedFabric?: FabricType;
  quantity: number;
  customNotes?: string;
}

export type LegalPageType = 'privacy' | 'terms' | 'cookies';
