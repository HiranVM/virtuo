'use client';

import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useShowroomStore } from '@/store/showroomStore';
import { PRODUCTS } from '@/data/products';
import {
  UPHOLSTERY_MATERIALS,
  WOOD_FINISHES,
  METAL_ACCENTS,
  STONE_MATERIALS,
} from '@/data/materials';
import { useMaterialProps } from '../materials/ShowroomMaterials';

interface FurnitureWrapperProps {
  productId: string;
  children: (props: {
    upholsteryProps: ReturnType<typeof useMaterialProps>;
    finishProps: ReturnType<typeof useMaterialProps>;
    accentProps: ReturnType<typeof useMaterialProps>;
    isSelected: boolean;
    isHovered: boolean;
  }) => React.ReactNode;
}

const FurnitureWrapper: React.FC<FurnitureWrapperProps> = ({
  productId,
  children,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const selectedProductId = useShowroomStore((s) => s.selectedProductId);
  const selectProduct = useShowroomStore((s) => s.selectProduct);
  const isWireframe = useShowroomStore((s) => s.isWireframe);
  const customizations = useShowroomStore((s) => s.productCustomizations[productId]);

  const product = PRODUCTS.find((p) => p.id === productId);
  const isSelected = selectedProductId === productId;

  // Resolve current active material options
  const roomSelections = useShowroomStore((s) => s.roomSelections);

  // Check if there is an active room surface selection override (e.g., from Image 4 configurator)
  const roomSofaOverride = productId === 'virtuo-sofa-01' && roomSelections['sofa']
    ? UPHOLSTERY_MATERIALS.find((m) => m.id === roomSelections['sofa']) ||
      (roomSelections['sofa'] === 'sofa-cognac-leather' ? UPHOLSTERY_MATERIALS.find(m => m.id === 'mat-leather-cognac') : undefined)
    : undefined;

  const roomTableOverride = productId === 'virtuo-table-coffee' && roomSelections['table']
    ? STONE_MATERIALS.find((m) => m.id === roomSelections['table']) ||
      (roomSelections['table'] === 'table-smoked-oak' ? WOOD_FINISHES.find(m => m.id === 'wood-smoked-oak') : undefined)
    : undefined;

  const upholsteryOpt =
    roomSofaOverride ||
    roomTableOverride ||
    UPHOLSTERY_MATERIALS.find((m) => m.id === customizations?.upholsteryId) ||
    STONE_MATERIALS.find((m) => m.id === customizations?.upholsteryId) ||
    product?.customizableParts.upholstery?.options[0];

  const finishOpt =
    WOOD_FINISHES.find((m) => m.id === customizations?.finishId) ||
    STONE_MATERIALS.find((m) => m.id === customizations?.finishId) ||
    product?.customizableParts.finish?.options[0];

  const accentOpt =
    METAL_ACCENTS.find((m) => m.id === customizations?.accentId) ||
    product?.customizableParts.accent?.options[0];

  const upholsteryProps = useMaterialProps(upholsteryOpt, isWireframe);
  const finishProps = useMaterialProps(finishOpt, isWireframe);
  const accentProps = useMaterialProps(accentOpt, isWireframe);

  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Gentle floating highlight effect if selected
    if (isSelected) {
      groupRef.current.position.y = THREE.MathUtils.damp(
        groupRef.current.position.y,
        0.03,
        4,
        delta
      );
    } else {
      groupRef.current.position.y = THREE.MathUtils.damp(
        groupRef.current.position.y,
        0,
        4,
        delta
      );
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        setIsHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setIsHovered(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        selectProduct(productId);
      }}
    >
      {children({
        upholsteryProps,
        finishProps,
        accentProps,
        isSelected,
        isHovered,
      })}

      {/* Luxury Selection Plinth Ring when highlighted */}
      {isSelected && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.008, 0]}>
          <ringGeometry args={[1.6, 1.68, 64]} />
          <meshBasicMaterial color="#c5a880" transparent opacity={0.8} />
        </mesh>
      )}
    </group>
  );
};

/* ================= 1. AETHEL CURVED SECTIONAL SOFA ================= */
export const AethelSofa: React.FC = () => {
  return (
    <group position={[-4, 0, -0.8]}>
      <FurnitureWrapper productId="virtuo-sofa-01">
        {({ upholsteryProps, finishProps, accentProps }) => (
          <group name="AethelSofaMesh">
            {/* Recessed Architectural Plinth Base */}
            <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
              <boxGeometry args={[3.0, 0.16, 1.3]} />
              <meshStandardMaterial {...finishProps} />
            </mesh>

            {/* Recessed Champagne Bronze Shadow Base Ring */}
            <mesh position={[0, 0.02, 0]} castShadow>
              <boxGeometry args={[3.02, 0.04, 1.32]} />
              <meshStandardMaterial {...accentProps} />
            </mesh>

            {/* Main Long Seat Cushion */}
            <mesh position={[-0.45, 0.32, 0]} castShadow receiveShadow>
              <boxGeometry args={[2.0, 0.34, 1.2]} />
              <meshPhysicalMaterial {...upholsteryProps} />
            </mesh>

            {/* Chaise Curved Corner Cushion */}
            <mesh position={[0.9, 0.32, 0.2]} castShadow receiveShadow>
              <boxGeometry args={[1.1, 0.34, 1.6]} />
              <meshPhysicalMaterial {...upholsteryProps} />
            </mesh>

            {/* Main Backrest with Curved Edge */}
            <mesh position={[-0.45, 0.62, -0.45]} castShadow receiveShadow>
              <boxGeometry args={[2.0, 0.44, 0.32]} />
              <meshPhysicalMaterial {...upholsteryProps} />
            </mesh>

            {/* Chaise Return Backrest */}
            <mesh position={[1.3, 0.62, 0.2]} castShadow receiveShadow>
              <boxGeometry args={[0.3, 0.44, 1.6]} />
              <meshPhysicalMaterial {...upholsteryProps} />
            </mesh>

            {/* Left Armrest */}
            <mesh position={[-1.5, 0.52, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.28, 0.36, 1.2]} />
              <meshPhysicalMaterial {...upholsteryProps} />
            </mesh>

            {/* Luxury Accent Throw Cushions */}
            <mesh position={[-0.8, 0.52, -0.22]} rotation={[0.2, 0.1, -0.1]} castShadow>
              <boxGeometry args={[0.45, 0.38, 0.16]} />
              <meshPhysicalMaterial
                color="#c5a880"
                roughness={0.7}
                metalness={0.05}
              />
            </mesh>
            <mesh position={[-0.1, 0.52, -0.25]} rotation={[0.15, -0.2, 0.05]} castShadow>
              <boxGeometry args={[0.42, 0.36, 0.14]} />
              <meshPhysicalMaterial
                color="#504840"
                roughness={0.8}
                metalness={0.02}
              />
            </mesh>
          </group>
        )}
      </FurnitureWrapper>
    </group>
  );
};

/* ================= 2. ELYSIAN SWIVEL LOUNGE CHAIR ================= */
export const ElysianLoungeChair: React.FC = () => {
  return (
    <group position={[-1.2, 0, 0.9]} rotation={[0, -Math.PI * 0.7, 0]}>
      <FurnitureWrapper productId="virtuo-chair-01">
        {({ upholsteryProps, accentProps }) => (
          <group name="ElysianChairMesh">
            {/* Precision 4-Star Brushed Brass Pedestal */}
            <mesh position={[0, 0.03, 0]} castShadow>
              <cylinderGeometry args={[0.38, 0.42, 0.06, 32]} />
              <meshStandardMaterial {...accentProps} />
            </mesh>
            {/* Central Pedestal Stem */}
            <mesh position={[0, 0.18, 0]} castShadow>
              <cylinderGeometry args={[0.045, 0.045, 0.24, 16]} />
              <meshStandardMaterial {...accentProps} />
            </mesh>

            {/* Sculpted Outer Shell */}
            <group position={[0, 0.58, 0]}>
              {/* Outer Shell Cup */}
              <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
                <sphereGeometry args={[0.55, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
                <meshStandardMaterial color="#1a1a1f" roughness={0.3} metalness={0.1} />
              </mesh>

              {/* Plush Interior Deep Seat Cushion */}
              <mesh position={[0, 0.02, 0.05]} castShadow receiveShadow>
                <cylinderGeometry args={[0.44, 0.4, 0.18, 32]} />
                <meshPhysicalMaterial {...upholsteryProps} />
              </mesh>

              {/* High Curved Ergonomic Backrest */}
              <mesh position={[0, 0.38, -0.24]} rotation={[-0.2, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.74, 0.65, 0.16]} />
                <meshPhysicalMaterial {...upholsteryProps} />
              </mesh>

              {/* Lumbar Roll Cushion */}
              <mesh position={[0, 0.16, -0.16]} rotation={[0, 0, Math.PI / 2]} castShadow>
                <cylinderGeometry args={[0.08, 0.08, 0.55, 24]} />
                <meshPhysicalMaterial {...upholsteryProps} />
              </mesh>
            </group>
          </group>
        )}
      </FurnitureWrapper>
    </group>
  );
};

/* ================= 3. MONOLITH DUAL-TIER COFFEE TABLE ================= */
export const MonolithCoffeeTable: React.FC = () => {
  return (
    <group position={[-4, 0, 0.8]} rotation={[0, 0.1, 0]}>
      <FurnitureWrapper productId="virtuo-table-coffee">
        {({ upholsteryProps: stoneProps, finishProps: woodProps, accentProps }) => (
          <group name="MonolithCoffeeTableMesh">
            {/* Lower Wood Tier Block */}
            <mesh position={[-0.35, 0.14, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.9, 0.24, 0.7]} />
              <meshStandardMaterial {...woodProps} />
            </mesh>

            {/* Upper Honed Marble Top Slab with Chamfer */}
            <mesh position={[0.3, 0.28, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.05, 0.12, 0.8]} />
              <meshPhysicalMaterial {...stoneProps} />
            </mesh>

            {/* Recessed Metal Trim & Cantilever Support */}
            <mesh position={[0.3, 0.11, 0]} castShadow>
              <boxGeometry args={[0.85, 0.22, 0.6]} />
              <meshStandardMaterial {...accentProps} />
            </mesh>

            {/* Minimalist Art Book & Sculptural Vessel */}
            <group position={[0.35, 0.35, -0.1]}>
              {/* Art Book */}
              <mesh castShadow>
                <boxGeometry args={[0.26, 0.03, 0.34]} />
                <meshStandardMaterial color="#1f1e24" roughness={0.6} />
              </mesh>
              {/* Ceramic vessel */}
              <mesh position={[0.2, 0.08, 0.15]} castShadow>
                <cylinderGeometry args={[0.06, 0.04, 0.16, 24]} />
                <meshStandardMaterial color="#c5a880" roughness={0.3} metalness={0.6} />
              </mesh>
            </group>
          </group>
        )}
      </FurnitureWrapper>
    </group>
  );
};

/* ================= 4. LUMINA ARC FLOOR LAMP ================= */
export const LuminaFloorLamp: React.FC = () => {
  return (
    <group position={[-7.2, 0, -2.2]} rotation={[0, 0.8, 0]}>
      <FurnitureWrapper productId="virtuo-lamp-01">
        {({ finishProps: stoneProps, accentProps }) => (
          <group name="LuminaFloorLampMesh">
            {/* Monolithic Stone Counterweight Base */}
            <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.36, 0.36, 0.36]} />
              <meshPhysicalMaterial {...stoneProps} />
            </mesh>

            {/* Sweeping Arc Stem in Brushed Bronze */}
            <mesh position={[0.2, 1.2, 0]} rotation={[0, 0, -0.15]} castShadow>
              <cylinderGeometry args={[0.02, 0.02, 1.8, 16]} />
              <meshStandardMaterial {...accentProps} />
            </mesh>
            <mesh position={[0.65, 2.05, 0]} rotation={[0, 0, -0.65]} castShadow>
              <cylinderGeometry args={[0.018, 0.018, 1.2, 16]} />
              <meshStandardMaterial {...accentProps} />
            </mesh>
            <mesh position={[1.4, 2.25, 0]} rotation={[0, 0, -1.35]} castShadow>
              <cylinderGeometry args={[0.016, 0.016, 1.0, 16]} />
              <meshStandardMaterial {...accentProps} />
            </mesh>

            {/* Pendant Lamp Hood / Diffuser */}
            <group position={[1.85, 1.8, 0]}>
              <mesh rotation={[Math.PI, 0, 0]} castShadow>
                <sphereGeometry args={[0.24, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
                <meshStandardMaterial {...accentProps} />
              </mesh>
              {/* Warm Emissive Diffuser Lens */}
              <mesh position={[0, -0.01, 0]}>
                <circleGeometry args={[0.22, 32]} />
                <meshBasicMaterial color="#fff3db" />
              </mesh>
              {/* Spot / Point Light emanating downward */}
              <pointLight
                color="#ffe1ad"
                intensity={1.2}
                distance={5}
                decay={2}
                castShadow
              />
            </group>
          </group>
        )}
      </FurnitureWrapper>
    </group>
  );
};

/* ================= 5. VESPER FLUTED CREDENZA ================= */
export const VesperCredenza: React.FC = () => {
  return (
    <group position={[-4, 0, -5.2]}>
      <FurnitureWrapper productId="virtuo-storage-01">
        {({ finishProps: woodProps, accentProps }) => (
          <group name="VesperCredenzaMesh">
            {/* Recessed Plinth Base */}
            <mesh position={[0, 0.08, 0]} castShadow>
              <boxGeometry args={[2.2, 0.16, 0.44]} />
              <meshStandardMaterial {...accentProps} />
            </mesh>

            {/* Main Cabinet Body */}
            <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
              <boxGeometry args={[2.4, 0.56, 0.5]} />
              <meshStandardMaterial {...woodProps} />
            </mesh>

            {/* Tambour Fluted Door Facade Details */}
            {[-0.9, -0.3, 0.3, 0.9].map((x, i) => (
              <group key={`door-${i}`} position={[x, 0.42, 0.252]}>
                <mesh castShadow>
                  <boxGeometry args={[0.56, 0.54, 0.01]} />
                  <meshStandardMaterial {...woodProps} />
                </mesh>
                {/* Minimalist Bronze Pull Tab */}
                <mesh position={[0, 0.12, 0.015]}>
                  <boxGeometry args={[0.02, 0.1, 0.01]} />
                  <meshStandardMaterial {...accentProps} />
                </mesh>
              </group>
            ))}

            {/* Curated Sculptural Decor Objects on Top */}
            <mesh position={[-0.7, 0.8, 0]} castShadow>
              <cylinderGeometry args={[0.08, 0.12, 0.24, 24]} />
              <meshStandardMaterial color="#888078" roughness={0.8} />
            </mesh>
            <mesh position={[0.7, 0.78, 0]} castShadow>
              <sphereGeometry args={[0.1, 24, 24]} />
              <meshStandardMaterial color="#c5a880" metalness={0.9} roughness={0.2} />
            </mesh>
          </group>
        )}
      </FurnitureWrapper>
    </group>
  );
};

/* ================= 6. SOLSTICE CALACATTA MARBLE DINING TABLE & CHAIRS ================= */
export const SolsticeDiningTable: React.FC = () => {
  return (
    <group position={[5.5, 0, -2]}>
      <FurnitureWrapper productId="virtuo-dining-01">
        {({ upholsteryProps: marbleProps, finishProps: woodProps, accentProps }) => (
          <group name="SolsticeDiningTableMesh">
            {/* Dual Fluted Pedestal Bases */}
            {[-0.8, 0.8].map((x, i) => (
              <group key={`pedestal-${i}`} position={[x, 0, 0]}>
                {/* Fluted Column Pedestal */}
                <mesh position={[0, 0.36, 0]} castShadow receiveShadow>
                  <cylinderGeometry args={[0.26, 0.32, 0.72, 32]} />
                  <meshStandardMaterial {...woodProps} />
                </mesh>
                {/* Bronze Collar Rings top and bottom */}
                <mesh position={[0, 0.03, 0]}>
                  <cylinderGeometry args={[0.34, 0.35, 0.06, 32]} />
                  <meshStandardMaterial {...accentProps} />
                </mesh>
                <mesh position={[0, 0.7, 0]}>
                  <cylinderGeometry args={[0.28, 0.28, 0.04, 32]} />
                  <meshStandardMaterial {...accentProps} />
                </mesh>
              </group>
            ))}

            {/* Monolithic Beveled Oval Marble Top */}
            <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
              <boxGeometry args={[2.7, 0.07, 1.2]} />
              <meshPhysicalMaterial {...marbleProps} />
            </mesh>

            {/* Minimalist Dining Chairs Arranged Elegantly Around Table */}
            {[-0.8, 0, 0.8].map((x, i) => (
              <React.Fragment key={`chair-row-${i}`}>
                {/* Chair Side A */}
                <group position={[x, 0, 0.85]} rotation={[0, 0, 0]}>
                  <mesh position={[0, 0.22, 0]} castShadow>
                    <cylinderGeometry args={[0.02, 0.02, 0.44, 12]} />
                    <meshStandardMaterial {...accentProps} />
                  </mesh>
                  <mesh position={[0, 0.44, 0]} castShadow>
                    <boxGeometry args={[0.48, 0.08, 0.46]} />
                    <meshPhysicalMaterial color="#302e2b" roughness={0.7} />
                  </mesh>
                  <mesh position={[0, 0.68, 0.2]} castShadow>
                    <boxGeometry args={[0.46, 0.4, 0.06]} />
                    <meshPhysicalMaterial color="#302e2b" roughness={0.7} />
                  </mesh>
                </group>

                {/* Chair Side B */}
                <group position={[x, 0, -0.85]} rotation={[0, Math.PI, 0]}>
                  <mesh position={[0, 0.22, 0]} castShadow>
                    <cylinderGeometry args={[0.02, 0.02, 0.44, 12]} />
                    <meshStandardMaterial {...accentProps} />
                  </mesh>
                  <mesh position={[0, 0.44, 0]} castShadow>
                    <boxGeometry args={[0.48, 0.08, 0.46]} />
                    <meshPhysicalMaterial color="#302e2b" roughness={0.7} />
                  </mesh>
                  <mesh position={[0, 0.68, 0.2]} castShadow>
                    <boxGeometry args={[0.46, 0.4, 0.06]} />
                    <meshPhysicalMaterial color="#302e2b" roughness={0.7} />
                  </mesh>
                </group>
              </React.Fragment>
            ))}

            {/* Curated Table Setting Centerpiece */}
            <group position={[0, 0.78, 0]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.08, 0.06, 0.22, 24]} />
                <meshPhysicalMaterial color="#d4c7b8" roughness={0.4} />
              </mesh>
              <mesh position={[0, 0.18, 0]}>
                <sphereGeometry args={[0.04, 12, 12]} />
                <meshStandardMaterial color="#8a7356" />
              </mesh>
            </group>
          </group>
        )}
      </FurnitureWrapper>
    </group>
  );
};

/* ================= 7. CONSTELLATION GEOMETRIC CHANDELIER ================= */
export const ConstellationChandelier: React.FC = () => {
  return (
    <group position={[5.5, 2.6, -2]} rotation={[0, 0.4, 0]}>
      <FurnitureWrapper productId="virtuo-light-01">
        {({ accentProps }) => (
          <group name="ConstellationChandelierMesh">
            {/* Ceiling Canopy and Drop Rod */}
            <mesh position={[0, 1.4, 0]}>
              <cylinderGeometry args={[0.12, 0.12, 0.04, 24]} />
              <meshStandardMaterial {...accentProps} />
            </mesh>
            <mesh position={[0, 0.7, 0]}>
              <cylinderGeometry args={[0.012, 0.012, 1.4, 12]} />
              <meshStandardMaterial {...accentProps} />
            </mesh>

            {/* Central Geometric Hub */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial {...accentProps} />
            </mesh>

            {/* Horizontal Brass Arms */}
            <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.015, 0.015, 1.8, 16]} />
              <meshStandardMaterial {...accentProps} />
            </mesh>
            <mesh position={[0, 0.1, 0]} rotation={[0.4, 0, 1.2]}>
              <cylinderGeometry args={[0.015, 0.015, 1.4, 16]} />
              <meshStandardMaterial {...accentProps} />
            </mesh>

            {/* Mouth-Blown Frosted Opal Glass Spheres with Soft Light */}
            {[-0.9, 0.9, -0.4, 0.5].map((x, idx) => (
              <group
                key={`globe-${idx}`}
                position={[
                  x,
                  Math.sin(idx * 1.5) * 0.18,
                  Math.cos(idx * 1.5) * 0.4,
                ]}
              >
                <mesh>
                  <sphereGeometry args={[0.15, 24, 24]} />
                  <meshPhysicalMaterial
                    color="#fff8ed"
                    emissive="#ffe9c7"
                    emissiveIntensity={0.8}
                    roughness={0.2}
                    transmission={0.6}
                  />
                </mesh>
                <pointLight
                  color="#ffe2b5"
                  intensity={0.6}
                  distance={4}
                  decay={2}
                />
              </group>
            ))}
          </group>
        )}
      </FurnitureWrapper>
    </group>
  );
};

/* ================= 8. SERENADE FLOATING PLATFORM BED ================= */
export const SerenadeBed: React.FC = () => {
  return (
    <group position={[4, 0, 6.2]} rotation={[0, Math.PI, 0]}>
      <FurnitureWrapper productId="virtuo-bed-01">
        {({ upholsteryProps, finishProps: woodProps, accentProps }) => (
          <group name="SerenadeBedMesh">
            {/* Recessed Hidden Under-Bed Plinth */}
            <mesh position={[0, 0.12, 0.1]} castShadow>
              <boxGeometry args={[2.0, 0.24, 2.0]} />
              <meshStandardMaterial color="#0d0d12" roughness={0.8} />
            </mesh>

            {/* Underbed Nocturnal LED Glow Strip */}
            <mesh position={[0, 0.02, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[2.2, 2.2]} />
              <meshBasicMaterial color="#ffeed1" />
            </mesh>
            <pointLight
              position={[0, 0.1, 0.1]}
              color="#ffdfa0"
              intensity={0.8}
              distance={3.5}
            />

            {/* Wide Architectural Headboard Wall */}
            <mesh position={[0, 0.65, -1.05]} castShadow receiveShadow>
              <boxGeometry args={[3.2, 0.9, 0.18]} />
              <meshPhysicalMaterial {...upholsteryProps} />
            </mesh>

            {/* Cantilevered Walnut Nightstands Left & Right */}
            {[-1.25, 1.25].map((x, i) => (
              <group key={`nightstand-${i}`} position={[x, 0.35, -0.75]}>
                <mesh castShadow receiveShadow>
                  <boxGeometry args={[0.55, 0.2, 0.42]} />
                  <meshStandardMaterial {...woodProps} />
                </mesh>
                {/* Bronze Trim Edge */}
                <mesh position={[0, 0.101, 0]}>
                  <boxGeometry args={[0.55, 0.01, 0.42]} />
                  <meshStandardMaterial {...accentProps} />
                </mesh>
                {/* Bedside Ambient Reading Luminaire */}
                <mesh position={[0, 0.3, 0]} castShadow>
                  <cylinderGeometry args={[0.06, 0.06, 0.2, 16]} />
                  <meshPhysicalMaterial
                    color="#fff6e8"
                    emissive="#ffeed0"
                    emissiveIntensity={0.6}
                  />
                </mesh>
              </group>
            ))}

            {/* Main Mattress Volume */}
            <mesh position={[0, 0.38, 0.05]} castShadow receiveShadow>
              <boxGeometry args={[1.9, 0.28, 2.1]} />
              <meshPhysicalMaterial color="#f0ede6" roughness={0.9} />
            </mesh>

            {/* Folded Luxury Linen Duvet */}
            <mesh position={[0, 0.44, 0.3]} castShadow receiveShadow>
              <boxGeometry args={[1.92, 0.18, 1.5]} />
              <meshPhysicalMaterial color="#554f49" roughness={0.85} />
            </mesh>

            {/* Pillows (Dual Stacked) */}
            {[-0.5, 0.5].map((x, idx) => (
              <group key={`pillow-${idx}`} position={[x, 0.58, -0.68]}>
                <mesh rotation={[0.2, 0, 0]} castShadow>
                  <boxGeometry args={[0.65, 0.16, 0.45]} />
                  <meshPhysicalMaterial color="#ded9d0" roughness={0.9} />
                </mesh>
              </group>
            ))}
          </group>
        )}
      </FurnitureWrapper>
    </group>
  );
};

/* ================= 9. KYOTO MINIMALIST ARMCHAIR ================= */
export const KyotoArmchair: React.FC = () => {
  return (
    <group position={[0.6, 0, 6.2]} rotation={[0, -0.6, 0]}>
      <FurnitureWrapper productId="virtuo-chair-02">
        {({ upholsteryProps: leatherProps, finishProps: woodProps }) => (
          <group name="KyotoArmchairMesh">
            {/* Solid Timber Minimalist Legs */}
            {[-0.32, 0.32].map((x, ix) => (
              <React.Fragment key={`legs-${ix}`}>
                <mesh position={[x, 0.25, 0.3]} castShadow>
                  <cylinderGeometry args={[0.025, 0.025, 0.5, 12]} />
                  <meshStandardMaterial {...woodProps} />
                </mesh>
                <mesh position={[x, 0.35, -0.3]} rotation={[-0.1, 0, 0]} castShadow>
                  <cylinderGeometry args={[0.025, 0.025, 0.72, 12]} />
                  <meshStandardMaterial {...woodProps} />
                </mesh>
              </React.Fragment>
            ))}

            {/* Timber Armrests */}
            {[-0.32, 0.32].map((x, ix) => (
              <mesh key={`arm-${ix}`} position={[x, 0.5, 0]} castShadow>
                <boxGeometry args={[0.05, 0.03, 0.65]} />
                <meshStandardMaterial {...woodProps} />
              </mesh>
            ))}

            {/* Tensioned Saddle Leather Sling Seat */}
            <mesh position={[0, 0.36, 0]} rotation={[0.08, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.56, 0.04, 0.54]} />
              <meshPhysicalMaterial {...leatherProps} />
            </mesh>

            {/* Tensioned Saddle Leather Backrest */}
            <mesh position={[0, 0.6, -0.28]} rotation={[-0.2, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.56, 0.38, 0.04]} />
              <meshPhysicalMaterial {...leatherProps} />
            </mesh>
          </group>
        )}
      </FurnitureWrapper>
    </group>
  );
};

