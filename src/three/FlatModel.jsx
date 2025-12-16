import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Flat Model loaded from GLB file
 */
const FlatModel = () => {
  const groupRef = useRef();
  
  // Load the GLB model
  const { scene } = useGLTF('/apartment_floor_plan.glb');
  
  // Clone the scene to avoid issues with multiple instances
  const clonedScene = scene.clone();
  
  // Enable shadows on all meshes in the model
  clonedScene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      
      // Ensure materials are properly configured
      if (child.material) {
        child.material.side = THREE.FrontSide;
        child.material.needsUpdate = true;
      }
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} />
    </group>
  );
};

// Preload the model for better performance
useGLTF.preload('/apartment_floor_plan.glb');

export default FlatModel;
