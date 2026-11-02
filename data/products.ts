import { FurnitureProduct, ShowroomZone } from '@/types/showroom';
import {
  UPHOLSTERY_MATERIALS,
  WOOD_FINISHES,
  METAL_ACCENTS,
  STONE_MATERIALS,
} from './materials';

export const SHOWROOM_ZONES: ShowroomZone[] = [
  {
    id: 'overview',
    name: 'Showroom Overview',
    tagline: 'Architectural Sanctuary',
    description: 'Explore the contiguous open-concept luxury pavilion showcasing the entire VIRTUO 2026 Collection.',
    camera: {
      position: [0, 8.5, 14.5],
      target: [0, 1.2, 0],
    },
    highlightProductIds: ['virtuo-sofa-01', 'virtuo-dining-01', 'virtuo-bed-01'],
  },
  {
    id: 'living',
    name: 'Living Room Pavilion',
    tagline: 'Curated Elegance & Tactile Comfort',
    description: 'Sculptural seating, hand-knotted textiles, and ambient lumina framed by expansive glass facades.',
    camera: {
      position: [-4, 3.2, 5.5],
      target: [-4, 0.9, 0],
    },
    highlightProductIds: [
      'virtuo-sofa-01',
      'virtuo-chair-01',
      'virtuo-table-coffee',
      'virtuo-lamp-01',
      'virtuo-storage-01',
    ],
  },
  {
    id: 'dining',
    name: 'Dining Sanctuary',
    tagline: 'Sculptural Stone & Celestial Illumination',
    description: 'Monolithic Calacatta marble anchor table illuminated by our suspended geometric chandelier.',
    camera: {
      position: [5.5, 3.6, 3.2],
      target: [5.5, 1.0, -2],
    },
    highlightProductIds: ['virtuo-dining-01', 'virtuo-light-01'],
  },
  {
    id: 'bedroom',
    name: 'Master Suite Retreat',
    tagline: 'Quiet Luxury & Restorative Geometry',
    description: 'A cantilevered floating platform bed with acoustic upholstered headboard and soft ambient cove glow.',
    camera: {
      position: [4, 3.0, 10.5],
      target: [4, 0.8, 6],
    },
    highlightProductIds: ['virtuo-bed-01', 'virtuo-chair-02'],
  },
];

export const PRODUCTS: FurnitureProduct[] = [
  {
    id: 'virtuo-sofa-01',
    name: 'Aethel Curved Sectional Sofa',
    subtitle: 'Sculptural Living Centrepiece',
    category: 'sofas',
    price: 30800,
    description: 'Continuous organic contours upholstered in high-density tactile fabric with a recessed architectural base.',
    longDescription:
      'The Aethel Sectional embodies contemporary European sculptural minimalism. Engineered with multi-density foam and ethically sourced feather fill, it delivers an uncompromising balance of posture support and deep lounge comfort.',
    dimensions: {
      width: 320,
      depth: 140,
      height: 78,
      seatHeight: 42,
    },
    zone: 'living',
    defaultPosition: [-4, 0, -0.8],
    defaultRotation: [0, 0, 0],
    cameraFocus: {
      position: [-4, 2.2, 3.2],
      target: [-4, 0.7, -0.8],
    },
    customizableParts: {
      upholstery: {
        label: 'Upholstery & Textiles',
        options: UPHOLSTERY_MATERIALS,
        defaultId: 'mat-boucle-ivory',
      },
      finish: {
        label: 'Recessed Plinth Base',
        options: WOOD_FINISHES,
        defaultId: 'wood-walnut',
      },
      accent: {
        label: 'Accent Hardware / Ferrules',
        options: METAL_ACCENTS,
        defaultId: 'metal-champagne-bronze',
      },
    },
    features: [
      'Handcrafted FSC-certified solid kiln-dried beech frame',
      'Dual-density high resilience foam core with goose feather blend',
      'Concealed magnetic module alignment system',
      'Stain-resistant nano-treated tactile textile coating',
    ],
    materialsSummary: 'Bouclé or Aniline Leather with American Walnut plinth',
    leadTime: '4 - 6 Weeks (Handcrafted in Milan)',
    designer: 'Studio Matteo Vanezza',
    featured: true,
  },
  {
    id: 'virtuo-chair-01',
    name: 'Elysian Swivel Lounge Chair',
    subtitle: 'Ergonomic Architectural Pod',
    category: 'lounge-chairs',
    price: 14200,
    description: 'An enveloping molded shell perched atop a silent 360-degree precision brushed brass swivel pedestal.',
    longDescription:
      'Inspired by mid-century automotive silhouettes, Elysian pairs a rigid fiber-reinforced composite shell with supple hand-stitched leather upholstery, accompanied by an integrated lumbar pillow.',
    dimensions: {
      width: 92,
      depth: 96,
      height: 84,
      seatHeight: 40,
    },
    zone: 'living',
    defaultPosition: [-1.2, 0, 0.9],
    defaultRotation: [0, -Math.PI * 0.7, 0],
    cameraFocus: {
      position: [-0.3, 1.8, 2.8],
      target: [-1.2, 0.75, 0.9],
    },
    customizableParts: {
      upholstery: {
        label: 'Shell & Cushion Finish',
        options: UPHOLSTERY_MATERIALS,
        defaultId: 'mat-leather-cognac',
      },
      accent: {
        label: 'Swivel Pedestal Metal',
        options: METAL_ACCENTS,
        defaultId: 'metal-champagne-bronze',
      },
    },
    features: [
      '360° silent precision bearing swivel mechanism',
      'Saddle-stitched seams using waxed linen cord',
      'Anatomically contoured lumbar support',
      'Weighted anti-tip weighted pedestal base',
    ],
    materialsSummary: 'Full-Grain Italian Leather & Brushed Metal',
    leadTime: '3 - 5 Weeks',
    designer: 'Helena Lindqvist',
    featured: true,
  },
  {
    id: 'virtuo-table-coffee',
    name: 'Monolith Dual-Tier Coffee Table',
    subtitle: 'Honed Marble & Smoked Oak',
    category: 'accessories',
    price: 10800,
    description: 'Intersecting volumes of honed Calacatta marble and cantilevered smoked oak with chamfered perimeter edging.',
    longDescription:
      'The Monolith Coffee Table celebrates material contrast. A solid block of carved natural stone nests harmoniously against an offset geometric wooden tier, forming an asymmetrical focal point for open living spaces.',
    dimensions: {
      width: 140,
      depth: 85,
      height: 38,
    },
    zone: 'living',
    defaultPosition: [-4, 0, 0.8],
    defaultRotation: [0, 0.1, 0],
    cameraFocus: {
      position: [-3.8, 1.7, 2.6],
      target: [-4, 0.38, 0.8],
    },
    customizableParts: {
      upholstery: {
        label: 'Primary Stone Slab',
        options: STONE_MATERIALS,
        defaultId: 'stone-calacatta',
      },
      finish: {
        label: 'Lower Wood Tier',
        options: WOOD_FINISHES,
        defaultId: 'wood-walnut',
      },
      accent: {
        label: 'Sub-frame Metal Trim',
        options: METAL_ACCENTS,
        defaultId: 'metal-champagne-bronze',
      },
    },
    features: [
      'Individually book-matched Italian marble slabs',
      'Hand-applied matte sealant impervious to wine and citrus acidity',
      'Concealed felt glides to safeguard delicate hardwood flooring',
    ],
    materialsSummary: 'Calacatta Vagli / Nero Marquina Marble & Solid Walnut',
    leadTime: '2 - 3 Weeks',
    designer: 'Studio Matteo Vanezza',
    featured: false,
  },
  {
    id: 'virtuo-lamp-01',
    name: 'Lumina Arc Floor Lamp',
    subtitle: 'Sculptural Balanced Luminaire',
    category: 'lighting',
    price: 8900,
    description: 'A soaring parabolic stem in brushed bronze counterbalanced by a solid marble monolithic base.',
    longDescription:
      'Engineered with aerospace-grade spun aluminum and solid brass counterweights, Lumina projects a warm 2700K downward pool of diffuse ambient light without requiring ceiling junction boxes.',
    dimensions: {
      width: 210,
      depth: 48,
      height: 225,
    },
    zone: 'living',
    defaultPosition: [-7.2, 0, -2.2],
    defaultRotation: [0, 0.8, 0],
    cameraFocus: {
      position: [-6.2, 2.4, -0.6],
      target: [-6.8, 1.6, -1.8],
    },
    customizableParts: {
      accent: {
        label: 'Stem & Shade Metal',
        options: METAL_ACCENTS,
        defaultId: 'metal-champagne-bronze',
      },
      finish: {
        label: 'Counterweight Stone Base',
        options: STONE_MATERIALS,
        defaultId: 'stone-nero-marquina',
      },
    },
    features: [
      'Touch-sensitive continuous capacitive dimming (10% - 100%)',
      'Warm-dim LED module (2200K - 3000K CRI 98)',
      'Dual-articulated pivoting lampshade head',
    ],
    materialsSummary: 'Brushed Bronze & Monolithic Stone Base',
    leadTime: 'Ready to Dispatch (3 - 5 Days)',
    designer: 'Kai Sorenson',
    featured: true,
  },
  {
    id: 'virtuo-storage-01',
    name: 'Vesper Fluted Credenza',
    subtitle: 'Architectural Media Console & Storage',
    category: 'storage',
    price: 19200,
    description: 'Precision-milled fluted tambour woodwork with push-to-open doors and bronze-framed reeded glass.',
    longDescription:
      'The Vesper Credenza provides sculptural storage. Crafted from sustainably harvested hardwoods, each flute is individually finished by hand before assembly on the continuous curved radius.',
    dimensions: {
      width: 240,
      depth: 50,
      height: 68,
    },
    zone: 'living',
    defaultPosition: [-4, 0, -5.2],
    defaultRotation: [0, 0, 0],
    cameraFocus: {
      position: [-4, 1.8, -3.2],
      target: [-4, 0.65, -5.2],
    },
    customizableParts: {
      finish: {
        label: 'Wood Veneer & Tambour',
        options: WOOD_FINISHES,
        defaultId: 'wood-smoked-oak',
      },
      accent: {
        label: 'Hardware & Base Trim',
        options: METAL_ACCENTS,
        defaultId: 'metal-champagne-bronze',
      },
    },
    features: [
      'Integrated rear acoustic cable management grommets',
      'Soft-close Austrian Blum undermount concealed drawer slides',
      'Adjustable internal tempered glass shelving',
    ],
    materialsSummary: 'Smoked Bog Oak & Brushed Satin Bronze',
    leadTime: '4 - 6 Weeks',
    designer: 'Studio Matteo Vanezza',
    featured: false,
  },
  {
    id: 'virtuo-dining-01',
    name: 'Solstice Marble Dining Table',
    subtitle: 'Fluted Pedestal Anchor Table',
    category: 'dining-tables',
    price: 36000,
    description: 'Beveled 10-seater oval dining top in honed Calacatta marble poised on dual sculptural fluted pedestals.',
    longDescription:
      'Designed to anchor the grandest architectural dining spaces, Solstice seats 10-12 guests with zero knee obstruction. The twin fluted pedestals conceal internal structural steel reinforcement to ensure absolute stability.',
    dimensions: {
      width: 280,
      depth: 120,
      height: 75,
    },
    zone: 'dining',
    defaultPosition: [5.5, 0, -2],
    defaultRotation: [0, 0, 0],
    cameraFocus: {
      position: [5.5, 2.4, 1.2],
      target: [5.5, 0.75, -2],
    },
    customizableParts: {
      upholstery: {
        label: 'Marble Tabletop Slab',
        options: STONE_MATERIALS,
        defaultId: 'stone-calacatta',
      },
      finish: {
        label: 'Fluted Pedestal Finish',
        options: WOOD_FINISHES,
        defaultId: 'wood-walnut',
      },
      accent: {
        label: 'Pedestal Base Ring Metal',
        options: METAL_ACCENTS,
        defaultId: 'metal-champagne-bronze',
      },
    },
    features: [
      'Sculpted reverse-knife edge perimeter chamfer',
      'Seats 10-12 comfortably with unobstructed legroom',
      'Structural steel under-chassis to eliminate deflection',
    ],
    materialsSummary: 'Italian Calacatta Vagli Marble & Solid Fluted Timber',
    leadTime: '6 - 8 Weeks',
    designer: 'Giulia & Marco Bellini',
    featured: true,
  },
  {
    id: 'virtuo-light-01',
    name: 'Constellation Geometric Chandelier',
    subtitle: 'Suspended Celestial Mobile',
    category: 'lighting',
    price: 16900,
    description: 'Interlocking aerospace brass arms suspending hand-blown mouth-blown acid-etched opal glass spheres.',
    longDescription:
      'Suspended like an astronomical kinetic installation above the Solstice dining table, Constellation emits an even, shadowless omnidirectional radiance through thick triplex opal glass diffusers.',
    dimensions: {
      width: 190,
      depth: 110,
      height: 95,
    },
    zone: 'dining',
    defaultPosition: [5.5, 2.6, -2],
    defaultRotation: [0, 0.4, 0],
    cameraFocus: {
      position: [5.5, 2.8, 0.2],
      target: [5.5, 2.6, -2],
    },
    customizableParts: {
      accent: {
        label: 'Armature Finish',
        options: METAL_ACCENTS,
        defaultId: 'metal-champagne-bronze',
      },
    },
    features: [
      'Triplex mouth-blown opal glass diffusers from Murano',
      'Field-adjustable aircraft cable suspension drop length (50cm - 300cm)',
      '0-10V, DALI, and TRIAC dimming compatibility',
    ],
    materialsSummary: 'Solid Machined Brass & Hand-Blown Murano Opal Glass',
    leadTime: '3 - 4 Weeks',
    designer: 'Helena Lindqvist',
    featured: true,
  },
  {
    id: 'virtuo-bed-01',
    name: 'Serenade Floating Platform Bed',
    subtitle: 'Cantilevered Master Suite Sanctuary',
    category: 'beds',
    price: 27900,
    description: 'Deep horizontal fluted padded headboard extending seamlessly into cantilevered floating bedside pedestals.',
    longDescription:
      'The Serenade Platform Bed floats seemingly unsupported above a hidden recessed shadow plinth. Concealed warm 2400K LED perimeter lighting washes softly across the floor, providing subtle nocturnal illumination.',
    dimensions: {
      width: 310,
      depth: 230,
      height: 105,
      seatHeight: 46,
    },
    zone: 'bedroom',
    defaultPosition: [4, 0, 6.2],
    defaultRotation: [0, Math.PI, 0],
    cameraFocus: {
      position: [4, 2.3, 3.2],
      target: [4, 0.75, 6.2],
    },
    customizableParts: {
      upholstery: {
        label: 'Headboard & Surround Fabric',
        options: UPHOLSTERY_MATERIALS,
        defaultId: 'mat-boucle-ivory',
      },
      finish: {
        label: 'Floating Nightstand Timber',
        options: WOOD_FINISHES,
        defaultId: 'wood-walnut',
      },
      accent: {
        label: 'Nightstand Accent Inlay',
        options: METAL_ACCENTS,
        defaultId: 'metal-champagne-bronze',
      },
    },
    features: [
      'Concealed floating underbed warm LED ambient mood lighting',
      'Dual wireless Qi charging pads embedded flush in nightstand veneer',
      'Ergonomic pitched headboard engineered for reading in bed',
    ],
    materialsSummary: 'Bouclé or Suede with American Walnut Bedside Consoles',
    leadTime: '5 - 7 Weeks',
    designer: 'Studio Matteo Vanezza',
    featured: true,
  },
  {
    id: 'virtuo-chair-02',
    name: 'Kyoto Minimalist Armchair',
    subtitle: 'Solid Ash & Tensioned Saddle Leather',
    category: 'lounge-chairs',
    price: 9700,
    description: 'Clean architectural joinery with precision mortise-and-tenon connections and suspended harness leather.',
    longDescription:
      'Rooted in traditional Japanese timber craftsmanship and Scandinavian minimalism, Kyoto achieves structural lightness with remarkable tensile strength and comfort.',
    dimensions: {
      width: 78,
      depth: 82,
      height: 76,
      seatHeight: 41,
    },
    zone: 'bedroom',
    defaultPosition: [0.6, 0, 6.2],
    defaultRotation: [0, -0.6, 0],
    cameraFocus: {
      position: [1.6, 1.8, 7.8],
      target: [0.6, 0.65, 6.2],
    },
    customizableParts: {
      upholstery: {
        label: 'Saddle Leather Sling',
        options: UPHOLSTERY_MATERIALS,
        defaultId: 'mat-leather-cognac',
      },
      finish: {
        label: 'Solid Hardwood Frame',
        options: WOOD_FINISHES,
        defaultId: 'wood-natural-ash',
      },
    },
    features: [
      'Traditional exposed Japanese through-tenon joint details',
      'Full 4mm vegetable-tanned bridle saddle leather sling',
      'Featherweight ergonomic balance',
    ],
    materialsSummary: 'Solid Nordic Bleached Ash & Bridle Leather',
    leadTime: '3 - 4 Weeks',
    designer: 'Kenji Takahashi',
    featured: false,
  },
];

