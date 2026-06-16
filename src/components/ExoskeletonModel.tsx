import { useState, useMemo } from 'react';
import { useGLTF, Environment, OrbitControls, Center, Html, OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';
import type { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: any;
  materials: any;
};

const InteractiveMesh = ({ name, geometry, material, position, rotation }: any) => {
  const [hovered, setHovered] = useState(false);

  const activeMaterial = useMemo(() => {
    const mat = material.clone() as THREE.MeshStandardMaterial;
    if (hovered) {
      mat.emissive = new THREE.Color('#00CFC8');
      mat.emissiveIntensity = 0.8;
      mat.color = new THREE.Color('#ffffff');
    }
    return mat;
  }, [material, hovered]);

  return (
    <mesh 
      geometry={geometry} 
      material={activeMaterial} 
      position={position} 
      rotation={rotation}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {hovered && (
        <Html center distanceFactor={8} zIndexRange={[100, 0]} className="pointer-events-none">
          <div className="bg-black/90 backdrop-blur-md border border-[#00CFC8]/60 text-[#00CFC8] px-3 py-1.5 rounded-md text-sm font-bold shadow-[0_0_15px_rgba(0,207,200,0.5)] whitespace-nowrap -translate-y-8">
            {name}
          </div>
        </Html>
      )}
    </mesh>
  );
};

export const ExoskeletonModel = (props: any) => {
  const { nodes, materials } = useGLTF('/models/Mark_-_1_Elbow_Exoskeleton_-GLB1.glb') as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <Center>
        <group>
          
      <OrthographicCamera makeDefault={false} far={3.133} near={1.828} position={[0.318, 0.622, -0.843]} rotation={[3.026, -0.217, 2.493]} />
      <group position={[0.684, 0.832, 1.327]} rotation={[-Math.PI, 0, -Math.PI]}>
        <InteractiveMesh name="Armor Plate" geometry={nodes['mesh_0']?.geometry} material={materials.defaultplastic}  />
        <InteractiveMesh name="Armor Plate" geometry={nodes['mesh_0_1']?.geometry} material={materials.defaultplastic}  />
      </group>
      <group position={[0.684, 0.832, 1.326]}>
        <InteractiveMesh name="Armor Plate" geometry={nodes['mesh_1']?.geometry} material={materials.defaultplastic}  />
        <InteractiveMesh name="Armor Plate" geometry={nodes['mesh_1_1']?.geometry} material={materials.defaultplastic}  />
        <InteractiveMesh name="Armor Plate" geometry={nodes['mesh_1_2']?.geometry} material={materials.defaultplastic}  />
      </group>
      <InteractiveMesh name="Actuator Link" geometry={nodes['Exo_Arm_Mark_1_-_Moving_Link-1']?.geometry} material={materials.defaultplastic} position={[0.683, 0.832, 1.328]} rotation={[0, 0, 2.103]}  />
      <InteractiveMesh name="Kinematic Hinge" geometry={nodes['Hinge-2']?.geometry} material={materials.defaultplastic} position={[0.72, 0.875, 1.329]} rotation={[-Math.PI / 2, 1.038, 0.414]}  />
      <InteractiveMesh name="Kinematic Hinge" geometry={nodes['Hinge-6']?.geometry} material={materials.defaultplastic} position={[0.612, 0.814, 1.321]} rotation={[-2.004, -1.571, 0]}  />
      <InteractiveMesh name="Kinematic Hinge" geometry={nodes['Hinge-5']?.geometry} material={materials.defaultplastic} position={[0.812, 0.886, 1.329]} rotation={[Math.PI / 2, -1.038, -2.728]}  />
      <InteractiveMesh name="Kinematic Hinge" geometry={nodes['Hinge-3']?.geometry} material={materials.defaultplastic} position={[0.765, 0.902, 1.329]} rotation={[-Math.PI / 2, 1.038, 0.414]}  />
      <InteractiveMesh name="Kinematic Hinge" geometry={nodes['Hinge-7']?.geometry} material={materials.defaultplastic} position={[0.567, 0.814, 1.321]} rotation={[-2.004, -1.571, 0]}  />
      <InteractiveMesh name="Kinematic Hinge" geometry={nodes['Hinge-9']?.geometry} material={materials.defaultplastic} position={[0.534, 0.851, 1.321]} rotation={[-1.137, 1.571, 0]}  />
      <InteractiveMesh name="Kinematic Hinge" geometry={nodes['Hinge-4']?.geometry} material={materials.defaultplastic} position={[0.767, 0.86, 1.329]} rotation={[Math.PI / 2, -1.038, -2.728]}  />
      <InteractiveMesh name="Kinematic Hinge" geometry={nodes['Hinge-8']?.geometry} material={materials.defaultplastic} position={[0.579, 0.851, 1.321]} rotation={[-1.137, 1.571, 0]}  />
      <InteractiveMesh name="Titanium Bolt" geometry={nodes['M3_Allen_Bolt-1']?.geometry} material={materials.defaultplastic} position={[0.696, 0.826, 1.339]} rotation={[-Math.PI, 0, -1.629]}  />
      <InteractiveMesh name="Titanium Bolt" geometry={nodes['M6_Bolt-8']?.geometry} material={materials.defaultplastic} position={[0.771, 0.923, 1.341]} rotation={[-2.287, -0.418, 2.97]}  />
      <InteractiveMesh name="Titanium Bolt" geometry={nodes['M6_Bolt-12']?.geometry} material={materials.defaultplastic} position={[0.618, 0.832, 1.321]} rotation={[Math.PI, 0, Math.PI]}  />
      <InteractiveMesh name="Titanium Bolt" geometry={nodes['M6_Bolt-15']?.geometry} material={materials.defaultplastic} position={[0.573, 0.832, 1.321]} rotation={[Math.PI, 0, Math.PI]}  />
      <InteractiveMesh name="Titanium Bolt" geometry={nodes['M6_Bolt-13']?.geometry} material={materials.defaultplastic} position={[0.603, 0.832, 1.321]} rotation={[Math.PI, 0, Math.PI]}  />
      <InteractiveMesh name="Titanium Bolt" geometry={nodes['M6_Bolt-14']?.geometry} material={materials.defaultplastic} position={[0.588, 0.832, 1.321]} rotation={[Math.PI, 0, Math.PI]}  />
      <InteractiveMesh name="Titanium Bolt" geometry={nodes['M6_Bolt-17']?.geometry} material={materials.defaultplastic} position={[0.543, 0.832, 1.321]} rotation={[Math.PI, 0, Math.PI]}  />
      <InteractiveMesh name="Titanium Bolt" geometry={nodes['M6_Bolt-16']?.geometry} material={materials.defaultplastic} position={[0.558, 0.832, 1.321]} rotation={[Math.PI, 0, Math.PI]}  />
      <InteractiveMesh name="Titanium Bolt" geometry={nodes['M6_Bolt-18']?.geometry} material={materials.defaultplastic} position={[0.528, 0.832, 1.321]} rotation={[Math.PI, 0, Math.PI]}  />
      <InteractiveMesh name="Titanium Bolt" geometry={nodes['M6_Bolt-9']?.geometry} material={materials.defaultplastic} position={[0.726, 0.896, 1.341]} rotation={[-2.287, -0.418, -0.507]}  />
      <group position={[0.472, 0.832, 1.374]} rotation={[-Math.PI / 2, Math.PI / 2, 0]}>
        <InteractiveMesh name="Armor Plate" geometry={nodes['mesh_21']?.geometry} material={materials.defaultplastic}  />
        <InteractiveMesh name="Armor Plate" geometry={nodes['mesh_21_1']?.geometry} material={materials.defaultplastic}  />
        <InteractiveMesh name="Armor Plate" geometry={nodes['mesh_21_2']?.geometry} material={materials.defaultplastic}  />
        <InteractiveMesh name="Armor Plate" geometry={nodes['mesh_21_3']?.geometry} material={materials.defaultplastic}  />
      </group>
      <group position={[0.846, 0.928, 1.381]} rotation={[Math.PI / 2, -1.038, -Math.PI]}>
        <InteractiveMesh name="Armor Plate" geometry={nodes['mesh_22']?.geometry} material={materials.defaultplastic}  />
        <InteractiveMesh name="Armor Plate" geometry={nodes['mesh_22_1']?.geometry} material={materials.defaultplastic}  />
        <InteractiveMesh name="Armor Plate" geometry={nodes['mesh_22_2']?.geometry} material={materials.defaultplastic}  />
        <InteractiveMesh name="Armor Plate" geometry={nodes['mesh_22_3']?.geometry} material={materials.defaultplastic}  />
      </group>
      <InteractiveMesh name="Titanium Bolt" geometry={nodes['M6_Bolt-2']?.geometry} material={materials.defaultplastic} position={[0.772, 0.884, 1.33]} rotation={[Math.PI, 0, 2.609]}  />
      <InteractiveMesh name="Titanium Bolt" geometry={nodes['M6_Bolt-1']?.geometry} material={materials.defaultplastic} position={[0.798, 0.9, 1.33]} rotation={[Math.PI, 0, 2.609]}  />
      <InteractiveMesh name="Titanium Bolt" geometry={nodes['M6_Bolt-4']?.geometry} material={materials.defaultplastic} position={[0.746, 0.869, 1.33]} rotation={[Math.PI, 0, 2.609]}  />
      <InteractiveMesh name="Titanium Bolt" geometry={nodes['M6_Bolt-3']?.geometry} material={materials.defaultplastic} position={[0.759, 0.877, 1.33]} rotation={[Math.PI, 0, 2.609]}  />
      <InteractiveMesh name="Titanium Bolt" geometry={nodes['M6_Bolt-5']?.geometry} material={materials.defaultplastic} position={[0.733, 0.861, 1.33]} rotation={[Math.PI, 0, 2.609]}  />
      <InteractiveMesh name="Titanium Bolt" geometry={nodes['M6_Bolt-6']?.geometry} material={materials.defaultplastic} position={[0.785, 0.892, 1.33]} rotation={[Math.PI, 0, 2.609]}  />
      <InteractiveMesh name="Titanium Bolt" geometry={nodes['M6_Bolt-7']?.geometry} material={materials.defaultplastic} position={[0.721, 0.854, 1.33]} rotation={[Math.PI, 0, 2.609]}  />
      <InteractiveMesh name="Titanium Bolt" geometry={nodes['M6_Bolt-11']?.geometry} material={materials.defaultplastic} position={[0.806, 0.865, 1.341]} rotation={[2.287, 0.418, 2.634]}  />
      <InteractiveMesh name="Titanium Bolt" geometry={nodes['M6_Bolt-10']?.geometry} material={materials.defaultplastic} position={[0.76, 0.838, 1.341]} rotation={[2.287, 0.418, -0.172]}  />
      <InteractiveMesh name="Titanium Bolt" geometry={nodes['M6_Bolt-22']?.geometry} material={materials.defaultplastic} position={[0.55, 0.799, 1.333]} rotation={[2.194, 0, -0.292]}  />
      <InteractiveMesh name="Titanium Bolt" geometry={nodes['M6_Bolt-21']?.geometry} material={materials.defaultplastic} position={[0.596, 0.799, 1.333]} rotation={[2.194, 0, -2.849]}  />
      <InteractiveMesh name="Titanium Bolt" geometry={nodes['M6_Bolt-20']?.geometry} material={materials.defaultplastic} position={[0.55, 0.866, 1.333]} rotation={[-2.194, 0, 0.292]}  />
      <InteractiveMesh name="Titanium Bolt" geometry={nodes['M6_Bolt-19']?.geometry} material={materials.defaultplastic} position={[0.596, 0.866, 1.333]} rotation={[-2.194, 0, 2.849]}  />
      <InteractiveMesh name="Titanium Bolt" geometry={nodes['M3_Bolt-1']?.geometry} material={materials.defaultplastic} position={[0.684, 0.807, 1.329]} rotation={[Math.PI, 0, 2.616]}  />
      <InteractiveMesh name="Titanium Bolt" geometry={nodes['M3_Allen_Bolt-2']?.geometry} material={materials.defaultplastic} position={[0.672, 0.825, 1.339]} rotation={[Math.PI, 0, 0.466]}  />
      <InteractiveMesh name="Titanium Bolt" geometry={nodes['M3_Bolt-6']?.geometry} material={materials.defaultplastic} position={[0.662, 0.82, 1.329]} rotation={[-Math.PI, 0, -2.62]}  />
      <InteractiveMesh name="Titanium Bolt" geometry={nodes['M3_Bolt-3']?.geometry} material={materials.defaultplastic} position={[0.706, 0.845, 1.329]} rotation={[Math.PI, 0, 0.521]}  />
      <InteractiveMesh name="Titanium Bolt" geometry={nodes['M3_Bolt-2']?.geometry} material={materials.defaultplastic} position={[0.706, 0.82, 1.329]} rotation={[Math.PI, 0, 1.569]}  />
      <InteractiveMesh name="Titanium Bolt" geometry={nodes['M3_Bolt-5']?.geometry} material={materials.defaultplastic} position={[0.662, 0.845, 1.329]} rotation={[-Math.PI, 0, -1.573]}  />
      <InteractiveMesh name="Titanium Bolt" geometry={nodes['M3_Bolt-4']?.geometry} material={materials.defaultplastic} position={[0.684, 0.857, 1.329]} rotation={[-Math.PI, 0, -0.526]}  />
      <InteractiveMesh name="Titanium Bolt" geometry={nodes['M3_Allen_Bolt-3']?.geometry} material={materials.defaultplastic} position={[0.684, 0.846, 1.339]} rotation={[Math.PI, 0, 2.56]}  />
    
        </group>
      </Center>

      {/* Cinematic Lighting Setup */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#F4B942" castShadow />
      <directionalLight position={[-10, 5, -5]} intensity={1} color="#00CFC8" />
      
      {/* HDRI reflections */}
      <Environment preset="city" />
      
      <OrbitControls enableZoom={false} enablePan={false} makeDefault />
    </group>
  );
};

useGLTF.preload('/models/Mark_-_1_Elbow_Exoskeleton_-GLB1.glb');
