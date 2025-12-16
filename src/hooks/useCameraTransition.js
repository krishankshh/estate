import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

/**
 * Custom hook for smooth camera transitions
 * @param {Object} camera - Three.js camera
 * @param {Object} controls - Camera controls (OrbitControls)
 */
export const useCameraTransition = (camera, controls) => {
  const transitionRef = useRef({
    isAnimating: false,
    targetPosition: new THREE.Vector3(),
    targetLookAt: new THREE.Vector3(),
    duration: 1.5,
    elapsed: 0,
    startPosition: new THREE.Vector3(),
    startLookAt: new THREE.Vector3(),
  });

  useFrame((state, delta) => {
    const transition = transitionRef.current;
    
    if (!transition.isAnimating) return;

    transition.elapsed += delta;
    const progress = Math.min(transition.elapsed / transition.duration, 1);
    
    // Smooth easing function
    const eased = 1 - Math.pow(1 - progress, 3);

    // Interpolate camera position
    camera.position.lerpVectors(
      transition.startPosition,
      transition.targetPosition,
      eased
    );

    // Interpolate look-at target
    const currentLookAt = new THREE.Vector3().lerpVectors(
      transition.startLookAt,
      transition.targetLookAt,
      eased
    );

    if (controls) {
      controls.target.copy(currentLookAt);
      controls.update();
    }

    // End animation
    if (progress >= 1) {
      transition.isAnimating = false;
      transition.elapsed = 0;
    }
  });

  const animateToPosition = (targetPos, targetLookAt) => {
    const transition = transitionRef.current;
    
    transition.startPosition.copy(camera.position);
    transition.targetPosition.set(...targetPos);
    transition.targetLookAt.set(...targetLookAt);
    
    if (controls) {
      transition.startLookAt.copy(controls.target);
    }
    
    transition.elapsed = 0;
    transition.isAnimating = true;
  };

  return { animateToPosition };
};
