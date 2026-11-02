'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { useShowroomStore } from '@/store/showroomStore';
import { PRODUCTS, SHOWROOM_ZONES } from '@/data/products';

interface CameraControllerProps {
  allowWheelZoom?: boolean;
}

export const CameraController: React.FC<CameraControllerProps> = ({
  allowWheelZoom = true,
}) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();

  const activeZone = useShowroomStore((s) => s.activeZone);
  const viewMode = useShowroomStore((s) => s.viewMode);
  const selectedProductId = useShowroomStore((s) => s.selectedProductId);
  const cameraTriggerCount = useShowroomStore((s) => s.cameraTriggerCount);
  const zoomLevel = useShowroomStore((s) => s.zoomLevel);

  // Target camera position and lookAt point
  const targetCamPos = useRef(new THREE.Vector3(-2.2, 2.2, 4.8));
  const targetLookAt = useRef(new THREE.Vector3(-3.8, 1.1, -1.0));
  const isTransitioning = useRef(true);

  // Update target coordinates whenever zone, viewMode, or selected product changes
  useEffect(() => {
    isTransitioning.current = true;

    // 1. Isometric Cutaway Dollhouse Mode (Like Reference Image 3 & 5)
    if (viewMode === 'isometric') {
      targetCamPos.current.set(12 * zoomLevel, 14 * zoomLevel, 12 * zoomLevel);
      targetLookAt.current.set(0, 1.2, 0);
      return;
    }

    // 2. Focused on specific product
    if (selectedProductId) {
      const product = PRODUCTS.find((p) => p.id === selectedProductId);
      if (product) {
        targetCamPos.current.set(
          product.cameraFocus.position[0] * zoomLevel,
          product.cameraFocus.position[1],
          product.cameraFocus.position[2] * zoomLevel
        );
        targetLookAt.current.set(...product.cameraFocus.target);
        return;
      }
    }

    // 3. Eye-Level Architectural Zone Views (Like Reference Image 4)
    if (activeZone === 'living') {
      targetCamPos.current.set(-2.2 * zoomLevel, 2.2, 4.8 * zoomLevel);
      targetLookAt.current.set(-3.8, 1.1, -1.0);
    } else if (activeZone === 'dining') {
      targetCamPos.current.set(5.5 * zoomLevel, 2.8, 3.8 * zoomLevel);
      targetLookAt.current.set(5.5, 1.2, -2.0);
    } else if (activeZone === 'bedroom') {
      targetCamPos.current.set(4.0 * zoomLevel, 2.5, 10.5 * zoomLevel);
      targetLookAt.current.set(4.0, 1.0, 6.2);
    } else {
      targetCamPos.current.set(0, 7.5 * zoomLevel, 13.5 * zoomLevel);
      targetLookAt.current.set(0, 1.2, 0);
    }
  }, [activeZone, viewMode, selectedProductId, cameraTriggerCount, zoomLevel]);

  useFrame((_, delta) => {
    if (!controlsRef.current) return;

    if (isTransitioning.current) {
      // Smooth lerp camera position
      camera.position.x = THREE.MathUtils.damp(
        camera.position.x,
        targetCamPos.current.x,
        4.0,
        delta
      );
      camera.position.y = THREE.MathUtils.damp(
        camera.position.y,
        targetCamPos.current.y,
        4.0,
        delta
      );
      camera.position.z = THREE.MathUtils.damp(
        camera.position.z,
        targetCamPos.current.z,
        4.0,
        delta
      );

      // Smooth lerp controls target (lookAt)
      controlsRef.current.target.x = THREE.MathUtils.damp(
        controlsRef.current.target.x,
        targetLookAt.current.x,
        4.5,
        delta
      );
      controlsRef.current.target.y = THREE.MathUtils.damp(
        controlsRef.current.target.y,
        targetLookAt.current.y,
        4.5,
        delta
      );
      controlsRef.current.target.z = THREE.MathUtils.damp(
        controlsRef.current.target.z,
        targetLookAt.current.z,
        4.5,
        delta
      );

      controlsRef.current.update();

      const distPos = camera.position.distanceTo(targetCamPos.current);
      const distTarget = controlsRef.current.target.distanceTo(targetLookAt.current);
      if (distPos < 0.05 && distTarget < 0.05) {
        isTransitioning.current = false;
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableDamping
      dampingFactor={0.08}
      minDistance={1.5}
      maxDistance={24}
      maxPolarAngle={Math.PI / 2 - 0.03}
      enableZoom={allowWheelZoom}
      zoomSpeed={0.4}
      onStart={() => {
        isTransitioning.current = false;
      }}
    />
  );
};
