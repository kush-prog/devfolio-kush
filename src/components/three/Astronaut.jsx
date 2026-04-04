import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useMediaQuery } from '../../hooks/useMediaQuery';

/* Procedural Astronaut built from Three.js primitives */
function AstronautBody({ scrollY }) {
  const group = useRef();
  const visorRef = useRef();

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    // Idle floating
    group.current.position.y = Math.sin(t * 0.5) * 0.3;
    group.current.rotation.z = Math.sin(t * 0.3) * 0.05;
    // Subtle look toward camera
    group.current.rotation.y = Math.sin(t * 0.2) * 0.15;
    
    // Visor reflection shimmer
    if (visorRef.current) {
      visorRef.current.material.emissiveIntensity = 0.3 + Math.sin(t * 2) * 0.1;
    }
  });

  return (
    <group ref={group} scale={0.8}>
      {/* Helmet */}
      <mesh position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.65, 32, 32]} />
        <meshStandardMaterial color="#e8e8e8" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Visor */}
      <mesh ref={visorRef} position={[0, 1.8, 0.4]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[0.45, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial 
          color="#1a1a3e"
          emissive="#3b82f6"
          emissiveIntensity={0.3}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Body / Torso */}
      <mesh position={[0, 0.6, 0]}>
        <capsuleGeometry args={[0.5, 0.8, 16, 32]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Chest light (accent) */}
      <mesh position={[0, 0.9, 0.45]}>
        <boxGeometry args={[0.2, 0.15, 0.05]} />
        <meshStandardMaterial 
          color="#7c3aed" 
          emissive="#7c3aed" 
          emissiveIntensity={0.8} 
        />
      </mesh>

      {/* Backpack */}
      <mesh position={[0, 0.7, -0.5]}>
        <boxGeometry args={[0.6, 0.8, 0.3, 2, 2, 2]} />
        <meshStandardMaterial color="#d4d4d4" roughness={0.5} metalness={0.2} />
      </mesh>
      
      {/* Backpack accent light */}
      <mesh position={[0, 0.9, -0.66]}>
        <boxGeometry args={[0.15, 0.15, 0.02]} />
        <meshStandardMaterial 
          color="#06b6d4" 
          emissive="#06b6d4" 
          emissiveIntensity={0.6} 
        />
      </mesh>

      {/* Left Arm */}
      <group position={[-0.65, 0.7, 0]} rotation={[0, 0, 0.4]}>
        <mesh>
          <capsuleGeometry args={[0.15, 0.6, 8, 16]} />
          <meshStandardMaterial color="#e8e8e8" roughness={0.4} />
        </mesh>
        {/* Glove */}
        <mesh position={[0, -0.5, 0]}>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshStandardMaterial color="#ccc" roughness={0.3} />
        </mesh>
      </group>

      {/* Right Arm - waving */}
      <group position={[0.65, 0.7, 0]} rotation={[0, 0, -0.8]}>
        <mesh>
          <capsuleGeometry args={[0.15, 0.6, 8, 16]} />
          <meshStandardMaterial color="#e8e8e8" roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.5, 0]}>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshStandardMaterial color="#ccc" roughness={0.3} />
        </mesh>
      </group>

      {/* Left Leg */}
      <group position={[-0.25, -0.4, 0]} rotation={[0.1, 0, 0.1]}>
        <mesh>
          <capsuleGeometry args={[0.16, 0.7, 8, 16]} />
          <meshStandardMaterial color="#e8e8e8" roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.55, 0.05]}>
          <boxGeometry args={[0.2, 0.12, 0.3]} />
          <meshStandardMaterial color="#bbb" roughness={0.5} />
        </mesh>
      </group>

      {/* Right Leg */}
      <group position={[0.25, -0.4, 0]} rotation={[-0.1, 0, -0.1]}>
        <mesh>
          <capsuleGeometry args={[0.16, 0.7, 8, 16]} />
          <meshStandardMaterial color="#e8e8e8" roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.55, 0.05]}>
          <boxGeometry args={[0.2, 0.12, 0.3]} />
          <meshStandardMaterial color="#bbb" roughness={0.5} />
        </mesh>
      </group>

      {/* Helmet rim accent */}
      <mesh position={[0, 1.35, 0]}>
        <torusGeometry args={[0.55, 0.04, 8, 32]} />
        <meshStandardMaterial 
          color="#7c3aed" 
          emissive="#7c3aed" 
          emissiveIntensity={0.4} 
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}

/* Floating decorative planet */
function MiniPlanet({ position, color, size = 0.3, speed = 1 }) {
  const ref = useRef();
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime() * speed;
      ref.current.rotation.y += 0.01;
      ref.current.position.y = position[1] + Math.sin(t) * 0.3;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <MeshDistortMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.2}
        roughness={0.5}
        metalness={0.3}
        distort={0.2}
        speed={2}
      />
    </mesh>
  );
}

/* Orbital ring */
function OrbitalRing({ radius = 3, color = '#7c3aed' }) {
  const ref = useRef();
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.PI / 3;
      ref.current.rotation.z += 0.002;
    }
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.015, 8, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  );
}

export default function Astronaut() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Canvas
      camera={{ position: [0, 0.5, 5], fov: 45 }}
      dpr={[1, isMobile ? 1.5 : 2]}
      style={{ width: '100%', height: '100%' }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#f8fafc" />
      <pointLight position={[-5, 3, 2]} intensity={0.5} color="#7c3aed" />
      <pointLight position={[2, -3, 4]} intensity={0.3} color="#3b82f6" />
      
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <AstronautBody />
      </Float>

      {!isMobile && (
        <>
          <MiniPlanet position={[-3, 1.5, -2]} color="#7c3aed" size={0.2} speed={0.8} />
          <MiniPlanet position={[3.5, -1, -3]} color="#3b82f6" size={0.35} speed={0.6} />
          <MiniPlanet position={[-2, -2, -1]} color="#06b6d4" size={0.15} speed={1.2} />
          <OrbitalRing radius={3.5} color="#7c3aed" />
          <OrbitalRing radius={4.2} color="#3b82f6" />
        </>
      )}
    </Canvas>
  );
}
