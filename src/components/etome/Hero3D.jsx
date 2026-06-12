import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles, Stars, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ── Monitor display ─────────────────────────────────────── */
function Monitor({ position, rotationY, screenColor, glowColor, floatSpeed = 1.8 }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    // Subtle idle breathe on top of Float
    groupRef.current.rotation.y =
      rotationY + Math.sin(state.clock.elapsedTime * 0.5) * 0.035;
  });

  return (
    <Float speed={floatSpeed} floatIntensity={0.5} rotationIntensity={0.04}>
      <group ref={groupRef} position={position}>

        {/* Outer bezel */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.5, 2.3, 0.14]} />
          <meshPhysicalMaterial
            color="#0b1b3b"
            metalness={0.9}
            roughness={0.12}
            clearcoat={1}
            clearcoatRoughness={0.08}
            reflectivity={1}
          />
        </mesh>

        {/* Inner bezel rim (lighter edge) */}
        <mesh position={[0, 0, 0.071]}>
          <boxGeometry args={[3.3, 2.1, 0.01]} />
          <meshPhysicalMaterial color="#1e3a6e" metalness={0.7} roughness={0.2} />
        </mesh>

        {/* Screen glow surface */}
        <mesh position={[0, 0, 0.08]}>
          <planeGeometry args={[3.1, 1.95]} />
          <meshStandardMaterial
            color={screenColor}
            emissive={glowColor}
            emissiveIntensity={0.55}
            toneMapped={false}
          />
        </mesh>

        {/* Glassmorphism reflection layer */}
        <mesh position={[0, 0, 0.085]}>
          <planeGeometry args={[3.1, 1.95]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transmission={1}
            roughness={0.04}
            metalness={0}
            ior={1.45}
            transparent
            opacity={0.08}
          />
        </mesh>

        {/* Screen edge glow light */}
        <pointLight
          color={glowColor}
          intensity={2.5}
          distance={4.5}
          decay={2}
          position={[0, 0, 0.5]}
        />

        {/* Stand neck */}
        <mesh position={[0, -1.38, -0.05]}>
          <cylinderGeometry args={[0.07, 0.12, 0.55, 16]} />
          <meshPhysicalMaterial color="#0b1b3b" metalness={0.95} roughness={0.08} />
        </mesh>

        {/* Stand base */}
        <mesh position={[0, -1.72, -0.05]} receiveShadow>
          <cylinderGeometry args={[0.55, 0.65, 0.07, 32]} />
          <meshPhysicalMaterial color="#0b1b3b" metalness={0.95} roughness={0.08} />
        </mesh>
      </group>
    </Float>
  );
}

/* ── Glowing "+" connector with particles ─────────────────── */
function PlusConnector() {
  const plusRef = useRef();

  useFrame((state) => {
    if (!plusRef.current) return;
    const pulse = 0.88 + Math.sin(state.clock.elapsedTime * 2.2) * 0.12;
    plusRef.current.scale.setScalar(pulse);
    plusRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.6) * 0.15;
  });

  return (
    <group position={[0, 0.12, 0.1]}>
      {/* Vertical bar */}
      <group ref={plusRef}>
        <mesh>
          <boxGeometry args={[0.07, 0.55, 0.06]} />
          <meshStandardMaterial
            color="#60a5fa"
            emissive="#3b82f6"
            emissiveIntensity={3}
            toneMapped={false}
          />
        </mesh>
        {/* Horizontal bar */}
        <mesh>
          <boxGeometry args={[0.55, 0.07, 0.06]} />
          <meshStandardMaterial
            color="#60a5fa"
            emissive="#3b82f6"
            emissiveIntensity={3}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* Glow light from the connector */}
      <pointLight color="#60a5fa" intensity={4} distance={5} decay={2} />

      {/* Particle cloud */}
      <Sparkles
        count={55}
        scale={[4.5, 3, 1]}
        size={3}
        speed={0.35}
        opacity={0.65}
        color="#93c5fd"
      />
      <Sparkles
        count={25}
        scale={[3, 2, 1]}
        size={2}
        speed={0.5}
        opacity={0.45}
        color="#6ee7b7"
      />
    </group>
  );
}

/* ── Floating translucent orbs ───────────────────────────── */
function FloatingSpheres() {
  const data = useMemo(() => [
    { pos: [-5.8, 2.8, -2.5], r: 0.58, color: '#bfdbfe', speed: 1.1 },
    { pos: [5.5,  2.2, -3.2], r: 0.48, color: '#a7f3d0', speed: 0.85 },
    { pos: [-4.2, -1.8, -4], r: 0.72, color: '#ddd6fe', speed: 1.4 },
    { pos: [4.8,  -1.6, -2.5],r: 0.42, color: '#fce7f3', speed: 1.0 },
    { pos: [0.8,  3.2, -5],  r: 0.65, color: '#cffafe', speed: 0.75 },
    { pos: [-2.5, 3.5, -6],  r: 0.35, color: '#e0e7ff', speed: 1.3 },
  ], []);

  return (
    <>
      {data.map((s, i) => (
        <Float key={i} speed={s.speed} floatIntensity={0.6} rotationIntensity={0.15}>
          <mesh position={s.pos} castShadow>
            <sphereGeometry args={[s.r, 32, 32]} />
            <meshPhysicalMaterial
              color={s.color}
              transmission={0.88}
              roughness={0.04}
              metalness={0}
              ior={1.3}
              transparent
              opacity={0.65}
              thickness={0.5}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

/* ── Reflective ground plane ─────────────────────────────── */
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.1, 0]} receiveShadow>
      <planeGeometry args={[28, 20]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={512}
        mixBlur={0.9}
        mixStrength={0.4}
        roughness={1}
        depthScale={0.8}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#f0f4ff"
        metalness={0.2}
      />
    </mesh>
  );
}

/* ── Cinematic camera ────────────────────────────────────── */
function CameraRig() {
  const { camera } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    let tx, ty, tz;

    if (t < 1.8) {
      // Phase 1 — close on left monitor
      const p = t / 1.8;
      tx = THREE.MathUtils.lerp(-3.5, 0, p);
      ty = THREE.MathUtils.lerp(0.6, 0.4, p);
      tz = THREE.MathUtils.lerp(4.5, 7.5, p);
    } else {
      // Phase 2 — slow orbital drift
      const o = t - 1.8;
      tx = Math.sin(o * 0.12) * 1.8;
      ty = 0.4 + Math.sin(o * 0.09) * 0.4;
      tz = 7.5 + Math.cos(o * 0.07) * 0.6;
    }

    camera.position.x += (tx - camera.position.x) * 0.03;
    camera.position.y += (ty - camera.position.y) * 0.03;
    camera.position.z += (tz - camera.position.z) * 0.03;
    camera.lookAt(0, 0.1, 0);
  });

  return null;
}

/* ── Canvas export ───────────────────────────────────────── */
export default function Hero3D() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [-3.5, 0.6, 4.5], fov: 48 }}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
      style={{ width: '100%', height: '100%' }}
    >
      {/* Lighting rig */}
      <ambientLight intensity={0.45} color="#e8f0ff" />
      <directionalLight
        position={[6, 10, 6]}
        intensity={1.4}
        color="#ffffff"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      {/* Blue fill — left monitor area */}
      <pointLight position={[-5, 4, 4]} color="#60a5fa" intensity={2.2} distance={12} />
      {/* Green fill — right monitor area */}
      <pointLight position={[5, 4, 4]} color="#34d399" intensity={2.2} distance={12} />
      {/* Rim / back light */}
      <pointLight position={[0, -2, -4]} color="#1d4ed8" intensity={1.2} distance={10} />

      <CameraRig />

      {/* Left monitor — analytics dashboard */}
      <Monitor
        position={[-2.6, 0.15, 0]}
        rotationY={0.2}
        screenColor="#0f2857"
        glowColor="#2563eb"
        floatSpeed={1.6}
      />

      {/* Right monitor — eco smart board */}
      <Monitor
        position={[2.6, 0.15, 0]}
        rotationY={-0.2}
        screenColor="#022c22"
        glowColor="#059669"
        floatSpeed={2.0}
      />

      {/* Glowing "+" connector + sparkles */}
      <PlusConnector />

      {/* Background translucent orbs */}
      <FloatingSpheres />

      {/* Reflective ground */}
      <Ground />

      {/* Subtle background stars */}
      <Stars
        radius={35}
        depth={35}
        count={400}
        factor={1.2}
        fade
        speed={0.4}
      />
    </Canvas>
  );
}
