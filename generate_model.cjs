const fs = require('fs');
const content = fs.readFileSync('Mark_-_1_Elbow_Exoskeleton_-GLB1.tsx', 'utf-8');

// We want to replace <mesh ... /> with <InteractiveMesh name="X" ... />
let newContent = content.replace(/<mesh\s+geometry=\{nodes(?:\[\'|\.)([^\]\'\.]+)(?:\'\])?\.geometry\}\s+(.*?)\/>/g, (match, nodeName, rest) => {
  let cleanName = nodeName.replace(/_|-/g, ' ').replace(/\d+/g, '').trim();
  if (cleanName === 'mesh' || cleanName === '') cleanName = 'Armor Plate';
  if (cleanName.includes('Bolt')) cleanName = 'Titanium Bolt';
  if (cleanName.includes('Hinge')) cleanName = 'Kinematic Hinge';
  if (cleanName.includes('Moving Link')) cleanName = 'Actuator Link';
  
  return `<InteractiveMesh name="${cleanName}" geometry={nodes['${nodeName}']?.geometry || nodes.${nodeName}?.geometry} ${rest} />`;
});

// We also need to extract the JSX tree. It starts at <group {...props} dispose={null}>
const jsxStart = newContent.indexOf('<group {...props} dispose={null}>');
const jsxEnd = newContent.indexOf('</group>\n  )\n}');
const jsxTree = newContent.substring(jsxStart + '<group {...props} dispose={null}>'.length, jsxEnd);

// Now build the final ExoskeletonModel.tsx
const finalComponent = `import React, { useState, useMemo } from 'react';
import { useGLTF, Environment, OrbitControls, Center, Html } from '@react-three/drei';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

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
          ${jsxTree}
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
`;

fs.writeFileSync('src/components/ExoskeletonModel.tsx', finalComponent);
console.log('Successfully generated interactive ExoskeletonModel.tsx');
