import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMediaQuery } from '../../hooks/useMediaQuery';

function Stars({ count = 2000 }) {
  const mesh = useRef();
  
  const [positions, sizes, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
      sizes[i] = Math.random() * 2 + 0.5;
      
      const colorChoice = Math.random();
      if (colorChoice > 0.8) {
        colors[i * 3] = 0.49; colors[i * 3 + 1] = 0.23; colors[i * 3 + 2] = 0.93;
      } else if (colorChoice > 0.6) {
        colors[i * 3] = 0.23; colors[i * 3 + 1] = 0.51; colors[i * 3 + 2] = 0.96;
      } else {
        colors[i * 3] = 0.97; colors[i * 3 + 1] = 0.98; colors[i * 3 + 2] = 0.99;
      }
    }
    return [positions, sizes, colors];
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.0001;
      mesh.current.rotation.y += 0.0002;
      const time = state.clock.getElapsedTime();
      const sizeAttr = mesh.current.geometry.attributes.size;
      for (let i = 0; i < count; i++) {
        sizeAttr.array[i] = sizes[i] * (0.8 + 0.2 * Math.sin(time * 0.5 + i));
      }
      sizeAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function ShootingStar() {
  const ref = useRef();
  const speed = useMemo(() => Math.random() * 0.5 + 0.3, []);
  const startPos = useMemo(() => ({
    x: (Math.random() - 0.5) * 60,
    y: Math.random() * 30 + 10,
    z: (Math.random() - 0.5) * 40
  }), []);

  useFrame((state) => {
    if (ref.current) {
      const time = (state.clock.getElapsedTime() * speed) % 4;
      if (time < 2) {
        ref.current.visible = true;
        ref.current.position.x = startPos.x + time * 15;
        ref.current.position.y = startPos.y - time * 10;
        ref.current.position.z = startPos.z;
        ref.current.material.opacity = Math.max(0, 1 - time / 2);
      } else {
        ref.current.visible = false;
      }
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#f8fafc" transparent opacity={1} />
    </mesh>
  );
}

function NebulaCloud({ position, color, scale = 1 }) {
  const ref = useRef();
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z += 0.001;
      ref.current.position.y += Math.sin(state.clock.getElapsedTime() * 0.2) * 0.002;
    }
  });

  return (
    <sprite ref={ref} position={position} scale={[15 * scale, 15 * scale, 1]}>
      <spriteMaterial
        color={color}
        transparent
        opacity={0.04}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </sprite>
  );
}

export default function Starfield() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const starCount = isMobile ? 800 : 2000;

  return (
    <div className="stars-container">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        dpr={[1, isMobile ? 1.5 : 2]}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
      >
        <Stars count={starCount} />
        {!isMobile && (
          <>
            <ShootingStar />
            <ShootingStar />
            <ShootingStar />
            <NebulaCloud position={[-15, 10, -20]} color="#7c3aed" scale={1.5} />
            <NebulaCloud position={[20, -5, -25]} color="#3b82f6" scale={1.2} />
            <NebulaCloud position={[0, -15, -30]} color="#06b6d4" scale={1} />
          </>
        )}
      </Canvas>
    </div>
  );
}
