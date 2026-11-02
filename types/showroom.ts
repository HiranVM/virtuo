export type ProductCategory = 
  | 'sofas'
  | 'lounge-chairs'
  | 'dining-tables'
  | 'beds'
  | 'storage'
  | 'lighting'
  | 'accessories';

export type ShowroomZoneId = 'living' | 'dining' | 'bedroom' | 'overview';

export interface MaterialOption {
  id: string;
  name: string;
  type: 'fabric' | 'leather' | 'wood' | 'metal' | 'stone' | 'glass';
  color: string; // Hex code for swatch display and base fallback
  roughness: number;
  metalness: number;
  clearcoat?: number;
  bumpScale?: number;
  texturePattern?: 'boucle' | 'linen' | 'leather_grain' | 'wood_grain' | 'marble_vein' | 'brushed_metal' | 'smooth';
  additionalPrice?: number;
}

export interface ProductDimensions {
  width: number; // in cm
  depth: number; // in cm
  height: number; // in cm
  seatHeight?: number; // in cm
}

export interface ProductConfigState {
  upholsteryId?: string;
  finishId?: string;
  accentId?: string;
}

export interface FurnitureProduct {
  id: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  price: number;
  description: string;
  longDescription?: string;
  dimensions: ProductDimensions;
  zone: ShowroomZoneId;
  defaultPosition: [number, number, number];
  defaultRotation?: [number, number, number];
  cameraFocus: {
    target: [number, number, number];
    position: [number, number, number];
  };
  customizableParts: {
    upholstery?: {
      label: string;
      options: MaterialOption[];
      defaultId: string;
    };
    finish?: {
      label: string;
      options: MaterialOption[];
      defaultId: string;
    };
    accent?: {
      label: string;
      options: MaterialOption[];
      defaultId: string;
    };
  };
  features: string[];
  materialsSummary: string;
  leadTime: string;
  designer: string;
  featured?: boolean;
}

export interface ShowroomZone {
  id: ShowroomZoneId;
  name: string;
  tagline: string;
  description: string;
  camera: {
    position: [number, number, number];
    target: [number, number, number];
  };
  highlightProductIds: string[];
}

export type LightingMood = 'daylight' | 'golden_hour' | 'noir_evening';

