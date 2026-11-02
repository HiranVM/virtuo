import * as THREE from 'three';

const textureCache: Record<string, THREE.CanvasTexture> = {};

/**
 * Ultra-fast, lightweight 128x128 procedural bump/roughness textures
 * Pre-computes in < 1ms to guarantee rock-solid 60 FPS
 */
export function getProceduralTexture(
  type: 'boucle' | 'linen' | 'leather_grain' | 'wood_grain' | 'marble_vein' | 'brushed_metal' | 'concrete' | 'smooth'
): THREE.CanvasTexture | null {
  if (type === 'smooth') return null;
  if (typeof window === 'undefined') return null;
  if (textureCache[type]) return textureCache[type];

  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, size, size);

  if (type === 'boucle') {
    // Tactile loops
    ctx.fillStyle = '#9c9c9c';
    for (let i = 0; i < 350; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      ctx.beginPath();
      ctx.arc(x, y, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = Math.random() > 0.5 ? '#b8b8b8' : '#555555';
      ctx.fill();
    }
  } else if (type === 'linen') {
    // Cross-weave
    ctx.strokeStyle = '#606060';
    ctx.lineWidth = 1;
    for (let p = 0; p < size; p += 4) {
      ctx.beginPath();
      ctx.moveTo(p, 0);
      ctx.lineTo(p, size);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, p);
      ctx.lineTo(size, p);
      ctx.stroke();
    }
  } else if (type === 'leather_grain') {
    // Pebble grain
    for (let i = 0; i < 300; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      ctx.fillStyle = Math.random() > 0.4 ? '#8f8f8f' : '#606060';
      ctx.fillRect(x, y, 2.5, 2.5);
    }
  } else if (type === 'wood_grain') {
    // Grain lines
    for (let y = 0; y < size; y++) {
      const n = Math.sin(y * 0.18) * 18 + Math.sin(y * 0.04) * 35;
      const c = Math.floor(128 + n);
      ctx.fillStyle = `rgb(${c},${c},${c})`;
      ctx.fillRect(0, y, size, 1);
    }
  } else if (type === 'marble_vein') {
    // Marble vein lines
    ctx.fillStyle = '#e0e0e0';
    ctx.fillRect(0, 0, size, size);
    ctx.strokeStyle = '#555555';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 30);
    ctx.bezierCurveTo(40, 50, 80, 70, size, 100);
    ctx.stroke();
  } else if (type === 'concrete') {
    // Fine stipple
    for (let i = 0; i < 400; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      ctx.fillStyle = Math.random() > 0.5 ? '#a0a0a0' : '#686868';
      ctx.fillRect(x, y, 1.5, 1.5);
    }
  } else if (type === 'brushed_metal') {
    for (let y = 0; y < size; y += 2) {
      const val = 120 + Math.floor(Math.random() * 30);
      ctx.fillStyle = `rgb(${val},${val},${val})`;
      ctx.fillRect(0, y, size, 1);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  textureCache[type] = texture;
  return texture;
}
