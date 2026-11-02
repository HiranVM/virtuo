import { useMemo } from 'react';
import * as THREE from 'three';
import { MaterialOption } from '@/types/showroom';
import { getProceduralTexture } from './ProceduralTextures';

/**
 * Returns Three.js material props for a given MaterialOption
 */
export function useMaterialProps(option?: MaterialOption, isWireframe = false) {
  return useMemo(() => {
    if (!option) {
      return {
        color: '#e0ded8',
        roughness: 0.5,
        metalness: 0.1,
        wireframe: isWireframe,
      };
    }

    const bumpMap = option.texturePattern
      ? getProceduralTexture(option.texturePattern)
      : null;

    return {
      color: option.color,
      roughness: option.roughness ?? 0.5,
      metalness: option.metalness ?? 0.05,
      clearcoat: option.clearcoat ?? (option.type === 'leather' ? 0.2 : 0),
      clearcoatRoughness: 0.25,
      bumpMap: bumpMap || undefined,
      bumpScale: bumpMap ? (option.bumpScale ?? 0.015) : 0,
      wireframe: isWireframe,
    };
  }, [option, isWireframe]);
}

