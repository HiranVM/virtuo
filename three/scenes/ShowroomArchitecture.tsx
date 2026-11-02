'use client';

import React from 'react';
import * as THREE from 'three';
import { useShowroomStore } from '@/store/showroomStore';
import { ROOM_CONFIGURABLE_ITEMS, SurfaceOption } from '@/data/roomSurfaces';
import { getProceduralTexture } from '../materials/ProceduralTextures';

export const ShowroomArchitecture: React.FC = () => {
  const isWireframe = useShowroomStore((s) => s.isWireframe);
  const viewMode = useShowroomStore((s) => s.viewMode);
  const roomSelections = useShowroomStore((s) => s.roomSelections);

  // Helper to resolve chosen surface material
  const getSelectedOption = (itemId: string): SurfaceOption => {
    const item = ROOM_CONFIGURABLE_ITEMS.find((i) => i.id === itemId);
    const selectedId = roomSelections[itemId] || item?.defaultOptionId;
    return (
      item?.options.find((o) => o.id === selectedId) ||
      item?.options[0] || {
        id: 'fallback',
        name: 'Default',
        color: '#606060',
        roughness: 0.6,
        metalness: 0.05,
        texturePattern: 'smooth',
      }
    );
  };

  const wallMainOpt = getSelectedOption('wall-main');
  const wallAccentOpt = getSelectedOption('wall-accent');
  const floorOpt = getSelectedOption('floor');
  const carpetOpt = getSelectedOption('carpet');

  const wallMainBump = getProceduralTexture(wallMainOpt.texturePattern);
  const floorBump = getProceduralTexture(floorOpt.texturePattern);
  const carpetBump = getProceduralTexture(carpetOpt.texturePattern);

  const isIsometric = viewMode === 'isometric';

  return (
    <group name="ShowroomArchitecture">
      {/* ================= FLOOR ================= */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.01, 0]}
        receiveShadow
      >
        <planeGeometry args={[28, 28]} />
        <meshStandardMaterial
          color={floorOpt.color}
          roughness={floorOpt.roughness}
          metalness={floorOpt.metalness}
          bumpMap={floorBump || undefined}
          bumpScale={floorBump ? 0.02 : 0}
          wireframe={isWireframe}
        />
      </mesh>

      {/* Living Zone Carpet / Wool Rug (Configurable #4) */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-3.8, 0.008, 0.2]}
        receiveShadow
      >
        <planeGeometry args={[7.2, 5.6]} />
        <meshStandardMaterial
          color={carpetOpt.color}
          roughness={carpetOpt.roughness}
          metalness={carpetOpt.metalness}
          bumpMap={carpetBump || undefined}
          bumpScale={carpetBump ? 0.03 : 0}
          wireframe={isWireframe}
        />
      </mesh>

      {/* Rug Edge Overlock Border */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-3.8, 0.009, 0.2]}
      >
        <ringGeometry args={[2.7, 2.73, 32]} />
        <meshBasicMaterial color="#c5a880" transparent opacity={0.6} />
      </mesh>

      {/* ================= BACK WALL (Main Wall #1 & Accent Fireplace #2) ================= */}
      {/* Main Concrete / Plaster Wall Left (X = -7 to +1) */}
      <group position={[-3.8, 2.4, -7.0]}>
        <mesh receiveShadow>
          <boxGeometry args={[11.5, 4.8, 0.4]} />
          <meshStandardMaterial
            color={wallMainOpt.color}
            roughness={wallMainOpt.roughness}
            metalness={wallMainOpt.metalness}
            bumpMap={wallMainBump || undefined}
            bumpScale={wallMainBump ? 0.02 : 0}
            wireframe={isWireframe}
          />
        </mesh>

        {/* Linear LED Warm Cove Light Strip along ceiling edge (Like Image 4!) */}
        <mesh position={[0, 2.35, 0.22]}>
          <planeGeometry args={[11.3, 0.06]} />
          <meshBasicMaterial color="#ffe3b0" />
        </mesh>
        <pointLight
          position={[0, 2.1, 0.3]}
          intensity={0.9}
          color="#ffe8c7"
          distance={5}
          decay={2}
        />
      </group>

      {/* Accent Fireplace & Hearth Wall Right (X = 1 to 10) (Like Image 4!) */}
      <group position={[5.2, 2.4, -7.0]}>
        {/* Accent Wall Body */}
        <mesh receiveShadow>
          <boxGeometry args={[6.5, 4.8, 0.42]} />
          <meshStandardMaterial
            color={wallAccentOpt.color}
            roughness={wallAccentOpt.roughness}
            metalness={wallAccentOpt.metalness}
            wireframe={isWireframe}
          />
        </mesh>

        {/* Modern Fireplace Recess Hearth */}
        <group position={[0.4, -1.1, 0.23]}>
          {/* Fireplace Dark Cavity */}
          <mesh receiveShadow>
            <boxGeometry args={[2.8, 1.1, 0.35]} />
            <meshStandardMaterial color="#0c0d10" roughness={0.95} />
          </mesh>

          {/* Warm Glowing Fire Hearth Glass & Flame Emissive Ribbon */}
          <mesh position={[0, -0.25, 0.12]}>
            <planeGeometry args={[2.2, 0.3]} />
            <meshBasicMaterial color="#ff7b29" />
          </mesh>
          <mesh position={[0, -0.2, 0.14]}>
            <planeGeometry args={[1.8, 0.2]} />
            <meshBasicMaterial color="#ffc459" />
          </mesh>

          {/* Fireplace Warm Point Light */}
          <pointLight
            position={[0, -0.1, 0.35]}
            color="#ff9944"
            intensity={1.8}
            distance={4.5}
            decay={2}
          />
        </group>

        {/* Architectural Firewood Stack Alcove */}
        <group position={[2.5, 0, 0.23]}>
          <mesh>
            <boxGeometry args={[0.9, 3.8, 0.3]} />
            <meshStandardMaterial color="#141418" roughness={0.9} />
          </mesh>
          {/* Stylized stacked birch log textures */}
          {Array.from({ length: 9 }).map((_, idx) => (
            <mesh
              key={`log-${idx}`}
              position={[0, -1.6 + idx * 0.4, 0.14]}
              rotation={[0, 0, Math.PI / 2]}
            >
              <cylinderGeometry args={[0.15, 0.15, 0.75, 12]} />
              <meshStandardMaterial color="#7a5c43" roughness={0.8} />
            </mesh>
          ))}
        </group>
      </group>

      {/* ================= CEILING & COVE (Hidden in Isometric Dollhouse mode) ================= */}
      {!isIsometric && (
        <group position={[0, 4.8, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <planeGeometry args={[28, 28]} />
            <meshStandardMaterial color="#16171c" roughness={0.7} />
          </mesh>

          {/* Recessed Architectural Black Track Lighting Rails */}
          {[-4, 2].map((x, i) => (
            <mesh key={`track-${i}`} position={[x, -0.05, 0]}>
              <boxGeometry args={[0.12, 0.08, 14]} />
              <meshStandardMaterial color="#0b0b0e" roughness={0.4} metalness={0.8} />
            </mesh>
          ))}
        </group>
      )}

      {/* ================= RIGHT WALL: FLOOR-TO-CEILING GLASS FAÇADE ================= */}
      <group position={[9.5, 2.4, 0]}>
        <mesh>
          <boxGeometry args={[0.04, 4.8, 14]} />
          <meshPhysicalMaterial
            color="#99b5cc"
            roughness={0.05}
            transmission={0.88}
            transparent
            opacity={0.35}
          />
        </mesh>
        {/* Steel Mullions */}
        {[-6, 0, 6].map((z, idx) => (
          <mesh key={`glass-mullion-${idx}`} position={[0, 0, z]}>
            <boxGeometry args={[0.12, 4.8, 0.08]} />
            <meshStandardMaterial color="#151619" roughness={0.5} metalness={0.8} />
          </mesh>
        ))}
      </group>

      {/* ================= ARCHITECTURAL TRAVERTINE CREDENZA / PLINTH ================= */}
      <group position={[0.8, 0.45, -2]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.35, 0.9, 4.6]} />
          <meshStandardMaterial color="#2c2a30" roughness={0.6} metalness={0.05} />
        </mesh>
        {/* Warm Under-edge LED Strip */}
        <mesh position={[0.176, 0.05, 0]}>
          <planeGeometry args={[0.02, 4.4]} />
          <meshBasicMaterial color="#ffe3b0" />
        </mesh>
      </group>
    </group>
  );
};
