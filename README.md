# VIRTUO — Premium Interactive 3D Virtual Showroom

An interactive, luxury virtual showroom and product customization experience built with **Next.js 14**, **React Three Fiber (R3F)**, **Three.js**, **@react-three/drei**, **Tailwind CSS**, and **Zustand**.

---

## 🏛️ Project Overview

**VIRTUO** reimagines the luxury furniture buying experience as an immersive, continuous architectural 3D spatial experience inspired by Apple product configurators, high-end automotive configurators, and modern European architectural pavilions.

Customers can navigate across multi-room contiguous interior zones, examine furniture from any angle, customize upholstery, timber, stone, and metal finishes in real time, and generate bespoke trade quotations.

---

## 🚀 Key Features

### 1. Interactive 3D Showroom (`/showroom`)
- **Contiguous Spatial Architecture**:
  - **Living Room Pavilion**: Aethel curved sectional sofa, Elysian swivel lounge chair, Monolith coffee table, Lumina arc floor lamp, Vesper fluted credenza, hand-knotted wool area rug.
  - **Dining Sanctuary**: Solstice Calacatta marble oval dining table, sculptural dining chairs, Constellation geometric chandelier, modernist abstract art wall.
  - **Master Suite Retreat**: Serenade floating platform bed with acoustic upholstered headboard, integrated under-bed nocturnal LED glow, cantilevered walnut nightstands, Kyoto minimalist armchair.
- **Architectural Lighting Presets**:
  - **Daylight**: Crisp natural sunlight streaming through double-height floor-to-ceiling glass curtain facade.
  - **Golden Hour**: Warm amber sunset illumination with dramatic long architectural shadow casting.
  - **Noir Evening**: Sophisticated gallery mood with interior cove washes, chandelier glow, and nocturnal underbed light strips.
- **Interactive Camera Navigation**:
  - Orbit, pan, zoom with smooth damping.
  - Floor boundary clamping (`maxPolarAngle`) preventing camera dipping beneath the floor.
  - Smooth lerping camera transitions when switching zones or focusing on selected items.
  - View reset button and Fullscreen toggle.
  - CAD Wireframe inspection mode toggle.
  - 3D pulsing beacons / hotspots positioned dynamically above interactive items.

### 2. Real-Time Material & Color Configurator
- Instant real-time WebGL material updating:
  - **Upholstery & Fabrics**: Alabaster Bouclé, Nordic Charcoal Bouclé, Belgian Sand Linen, Emerald Moss Velvet, Sienna Clay Velvet.
  - **Full-Grain Leathers**: Tuscan Cognac Aniline Leather, Nero Full-Grain Leather, Saddle Cream Nappa Leather.
  - **Woods & Veneers**: American Walnut, Smoked Bog Oak, Nordic Bleached Ash, Espresso Black Ash.
  - **Metals & Hardware**: Champagne Satin Bronze, Matte Obsidian Black, Warm Brushed Brass, Mirror Polished Chrome.
  - **Natural Stones**: Calacatta Vagli White Marble, Nero Marquina Black Marble, Roman Silver Travertine.
- Procedural PBR bump and roughness maps generated dynamically via HTML5 Canvas (Voronoi leather grain, bouclé knobby loops, linen weave, timber grain, marble veins).
- Dynamic price updating based on material add-ons.
- "Reset to Default" configuration option.

### 3. Product Collections & Catalog (`/collections`)
- Category filtering: Sofas, Lounge Chairs, Dining Tables, Beds, Storage, Lighting, Accessories.
- Instant search filter and sorting (Price, Name, Featured).
- "View in 3D Showroom" direct jump from any catalog card into the 3D pavilion with auto-focused camera.
- Quick order and wishlist actions.

### 4. 360° Studio Turntable (`/products/[id]`)
- Isolated high-detail studio inspection turntable with auto-rotation.
- Interactive material customizer.
- Scale & dimensions analysis (Width, Depth, Height).
- Handcrafted atelier features and lead times.

### 5. E-Commerce & Trade Procurement
- Persistent Shopping Cart with configured material summaries.
- Saved Masterpiece Wishlist.
- Formal Architectural Quotation Dossier Generator with confetti confirmation.
- Prepared for seamless backend Node.js API & MongoDB database integration.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 14** (App Router) | High-performance React framework, routing, and SSG |
| **React Three Fiber (R3F)** | Declarative 3D scene graph within React |
| **Three.js** | WebGL 3D rendering engine, PBR shaders, dynamic lighting |
| **@react-three/drei** | OrbitControls, Html overlays, Canvas helpers |
| **Tailwind CSS** | Minimalist luxury UI styling, glassmorphism, responsive design |
| **Zustand** | Showroom spatial state & persistent shopping cart store |
| **Lucide Icons** | Clean minimalist iconography |
| **Canvas Confetti** | Delightful interaction feedback on quotation submission |

---

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout with Navbar, Cart, Wishlist & Modals
│   ├── page.tsx                # Luxury Landing Page with 3D Hero Preview
│   ├── globals.css             # Global Tailwind and luxury scrollbars
│   ├── showroom/
│   │   └── page.tsx            # Fullscreen Interactive 3D Showroom
│   ├── collections/
│   │   └── page.tsx            # Architectural Catalog with Filters & Search
│   └── products/
│       └── [id]/
│           └── page.tsx        # Server Component pre-rendering 360° Studio
├── components/
│   ├── cart/
│   │   ├── CartDrawer.tsx      # Cart slide-over with configured materials
│   │   └── WishlistDrawer.tsx  # Saved items drawer
│   ├── configurator/
│   │   └── MaterialSelector.tsx# Real-time swatches for 3D meshes
│   ├── home/
│   │   └── Hero3DPreview.tsx   # R3F Interactive Landing Page Scene
│   ├── layout/
│   │   └── Footer.tsx          # Architectural Atelier Footer
│   ├── navigation/
│   │   ├── Navbar.tsx          # Top glass navigation bar
│   │   └── ShowroomControls.tsx# Floating zone, camera & lighting controls
│   ├── product/
│   │   └── ProductDetailClient.tsx # Client 360° Studio turntable page
│   ├── quotation/
│   │   └── QuotationModal.tsx  # Bespoke Trade Quotation Dossier
│   └── showroom/
│       └── ProductInfoDrawer.tsx # Floating product glass drawer
├── data/
│   ├── materials.ts            # Physical material definitions & PBR values
│   ├── products.ts             # Products data & 3D showroom coordinates
│   └── collections.ts          # Category definitions & descriptions
├── store/
│   ├── showroomStore.ts        # Zone, camera, lighting, and product customization store
│   └── cartStore.ts            # Persistent shopping cart and wishlist
├── three/
│   ├── controls/
│   │   └── CameraController.tsx# Smooth damping OrbitControls & focus lerp
│   ├── interactions/
│   │   └── ProductHotspot.tsx  # Floating 3D beacons with Html overlays
│   ├── materials/
│   │   ├── ProceduralTextures.ts # Dynamic Canvas procedural bump & roughness maps
│   │   └── ShowroomMaterials.tsx # Material factory for Three.js meshes
│   ├── models/
│   │   └── FurnitureModels.tsx # Hand-crafted luxury furniture 3D geometries
│   └── scenes/
│       ├── ShowroomArchitecture.tsx # Pavilion walls, glass facade, cove beams, rug
│       ├── ShowroomScene.tsx        # Main 3D Showroom scene with dynamic lighting
│       └── SingleProductStudio.tsx  # Studio turntable inspection canvas
├── types/
│   └── showroom.ts             # TypeScript interfaces for products & materials
├── tailwind.config.js          # Custom luxury color palette & shadows
└── next.config.mjs             # Next.js configuration transpiling Three.js
```

---

## 🏃 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Production Build**:
   ```bash
   npm run build
   npm start
   ```

