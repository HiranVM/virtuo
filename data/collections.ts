import { ProductCategory } from '@/types/showroom';

export interface CollectionCategoryInfo {
  id: ProductCategory;
  name: string;
  tagline: string;
  description: string;
  itemCount: number;
  featuredProductId: string;
  badge?: string;
}

export const COLLECTIONS_DATA: CollectionCategoryInfo[] = [
  {
    id: 'sofas',
    name: 'Curved & Modular Sofas',
    tagline: 'Sculptural Lounging',
    description: 'Deep profiles, organic flowing contours, and tailored tactile bouclé and full-grain leathers.',
    itemCount: 4,
    featuredProductId: 'virtuo-sofa-01',
    badge: 'Signature Collection',
  },
  {
    id: 'lounge-chairs',
    name: 'Lounge & Occasional Chairs',
    tagline: 'Ergonomic Artistry',
    description: 'Iconic swivel armchairs and handcrafted timber sling loungers designed for contemplative spaces.',
    itemCount: 6,
    featuredProductId: 'virtuo-chair-01',
    badge: 'Award Winner',
  },
  {
    id: 'dining-tables',
    name: 'Sculptural Dining Tables',
    tagline: 'Monolithic Architecture',
    description: 'Carved natural Italian marble slabs supported by architectural fluted pedestals and concealed steel cores.',
    itemCount: 3,
    featuredProductId: 'virtuo-dining-01',
  },
  {
    id: 'beds',
    name: 'Master Sanctuary Beds',
    tagline: 'Restorative Geometry',
    description: 'Cantilevered floating platform silhouettes with integrated acoustic headboards and nocturnal illumination.',
    itemCount: 2,
    featuredProductId: 'virtuo-bed-01',
    badge: 'New Release',
  },
  {
    id: 'storage',
    name: 'Credenzas & Consoles',
    tagline: 'Tactile Storage',
    description: 'Fluted tambour wood doors, bronze-framed reeded glass, and seamless touch-latch joinery.',
    itemCount: 4,
    featuredProductId: 'virtuo-storage-01',
  },
  {
    id: 'lighting',
    name: 'Architectural Lumina',
    tagline: 'Celestial Ambient Lighting',
    description: 'Kinetic brass armatures and mouth-blown Murano glass spheres casting warm 2700K pools of illumination.',
    itemCount: 5,
    featuredProductId: 'virtuo-light-01',
  },
  {
    id: 'accessories',
    name: 'Objects & Occasional Tables',
    tagline: 'Curated Accents',
    description: 'Intersecting marble and smoked oak coffee tables, hand-knotted wool textiles, and sculptural ceramic accents.',
    itemCount: 8,
    featuredProductId: 'virtuo-table-coffee',
  },
];

