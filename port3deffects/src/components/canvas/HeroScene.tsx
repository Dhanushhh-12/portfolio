import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Rotate3d, Sparkles } from '../ui/icons';

gsap.registerPlugin(ScrollTrigger);

interface HeroSceneProps {
  onInteractionStart?: () => void;
}

export const HeroScene: React.FC<HeroSceneProps> = ({ onInteractionStart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // SCENE & RENDERER SETUP
    const scene = new THREE.Scene();
    // Clean transparent background blending over white
    scene.fog = new THREE.FogExp2(0xffffff, 0.015);

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // ROOT 3D GROUP
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. CENTERPIECE: Generative Torus Knot & Icosahedron Cluster
    // Outer faceted geometric shell
    const outerGeo = new THREE.IcosahedronGeometry(2.3, 1);
    const outerMat = new THREE.MeshPhysicalMaterial({
      color: 0x00f2fe,
      emissive: 0x051a24,
      roughness: 0.15,
      metalness: 0.9,
      reflectivity: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    mainGroup.add(outerMesh);

    // Core solid sculpted torus knot
    const coreGeo = new THREE.TorusKnotGeometry(1.3, 0.42, 160, 32, 2, 3);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0a101d,
      roughness: 0.25,
      metalness: 0.85,
      emissive: 0x003d4d,
      emissiveIntensity: 0.3,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // Inner glowing core sphere
    const innerGeo = new THREE.SphereGeometry(0.7, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x00f5a0,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerMesh);

    // 2. ORBITAL GYROSCOPE RINGS
    const ringGeo1 = new THREE.RingGeometry(2.9, 2.94, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    const ringGeo2 = new THREE.RingGeometry(3.2, 3.23, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x4facfe,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    mainGroup.add(ring2);

    // 3. FLOATING AMBIENT PARTICLE FIELD
    const particleCount = 1400;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x00f2fe);
    const color2 = new THREE.Color(0x00f5a0);
    const color3 = new THREE.Color(0x4facfe);

    for (let i = 0; i < particleCount; i++) {
      const radius = 3.5 + Math.random() * 8.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      const mixed = Math.random() > 0.6 ? color2 : (Math.random() > 0.3 ? color1 : color3);
      particleColors[i * 3] = mixed.r;
      particleColors[i * 3 + 1] = mixed.g;
      particleColors[i * 3 + 2] = mixed.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.NormalBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 4. LIGHTING RIG
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const cyanPointLight = new THREE.PointLight(0x00f2fe, 8, 25);
    cyanPointLight.position.set(4, 5, 4);
    scene.add(cyanPointLight);

    const emeraldPointLight = new THREE.PointLight(0x00f5a0, 7, 25);
    emeraldPointLight.position.set(-5, -4, -2);
    scene.add(emeraldPointLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.2);
    rimLight.position.set(0, 8, -6);
    scene.add(rimLight);

    // 5. INTERACTION & ROTATION DAMPING STATE
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    const rotationVelocity = { x: 0.003, y: 0.005 };
    const mouseNormalized = { x: 0, y: 0 };
    const targetCameraOffset = { x: 0, y: 0 };

    // Mouse Drag Listeners
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      setIsInteracting(true);
      setHasInteracted(true);
      if (onInteractionStart) onInteractionStart();

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      // Mouse normalized for tilt
      const rect = container.getBoundingClientRect();
      mouseNormalized.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouseNormalized.y = -(((clientY - rect.top) / rect.height) * 2 - 1);

      targetCameraOffset.x = mouseNormalized.x * 0.4;
      targetCameraOffset.y = mouseNormalized.y * 0.3;

      if (!isDragging) return;

      const deltaX = clientX - previousMousePosition.x;
      const deltaY = clientY - previousMousePosition.y;

      rotationVelocity.y = deltaX * 0.005;
      rotationVelocity.x = deltaY * 0.005;

      mainGroup.rotation.y += rotationVelocity.y;
      mainGroup.rotation.x += rotationVelocity.x;

      previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    const domElement = canvas;
    domElement.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    domElement.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // 6. GSAP SCROLLTRIGGER PARALLAX & CAMERA DYNAMICS
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
      },
    });

    heroTl.to(camera.position, {
      z: 12.5,
      y: -2.5,
      ease: 'none',
    }, 0);

    heroTl.to(mainGroup.rotation, {
      z: Math.PI * 0.35,
      y: Math.PI * 1.2,
      ease: 'none',
    }, 0);

    heroTl.to(mainGroup.position, {
      y: 1.2,
      x: 1.5,
      ease: 'none',
    }, 0);

    heroTl.to(particles.rotation, {
      y: 0.8,
      ease: 'none',
    }, 0);

    // 7. RENDER LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Inertia decay & gentle baseline rotation
      if (!isDragging) {
        rotationVelocity.x *= 0.94;
        rotationVelocity.y *= 0.94;

        mainGroup.rotation.y += rotationVelocity.y + 0.0035;
        mainGroup.rotation.x += rotationVelocity.x + Math.sin(elapsedTime * 0.5) * 0.0008;
      }

      // Gyroscope counter rotations
      ring1.rotation.z = elapsedTime * 0.2;
      ring2.rotation.z = -elapsedTime * 0.15;
      outerMesh.rotation.y = -elapsedTime * 0.08;
      innerMesh.rotation.x = elapsedTime * 0.25;

      // Pulse inner light
      cyanPointLight.intensity = 7 + Math.sin(elapsedTime * 2.5) * 2;
      emeraldPointLight.intensity = 6 + Math.cos(elapsedTime * 2.0) * 1.5;

      // Particle subtle swirl
      particles.rotation.y = elapsedTime * 0.015;
      particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.05;

      // Camera gentle target follow
      camera.position.x += (targetCameraOffset.x - camera.position.x) * 0.05;
      camera.position.y += (targetCameraOffset.y - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // 8. RESIZE HANDLER
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      domElement.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      heroTl.kill();

      // Dispose Three.js resources
      outerGeo.dispose();
      outerMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [onInteractionStart]);

  return (
    <div ref={containerRef} className="relative w-full h-full cursor-grab active:cursor-grabbing select-none">
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Interactive Drag Hint Overlay */}
      <div 
        className={`absolute bottom-6 right-6 pointer-events-none transition-all duration-700 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-slate-200 text-xs text-slate-700 font-mono shadow-sm backdrop-blur-md ${
          hasInteracted ? 'opacity-40 hover:opacity-100' : 'opacity-90 animate-pulse-slow'
        }`}
      >
        <Rotate3d className={`w-3.5 h-3.5 text-[#0284C7] ${isInteracting ? 'animate-spin' : ''}`} />
        <span>360° Drag to Inspect</span>
        <Sparkles className="w-3 h-3 text-[#0EA5E9]" />
      </div>
    </div>
  );
};
