import React, { useRef, useEffect, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';

/**
 * First-person controls with WASD movement and collision detection
 * Automatically adapts to the loaded GLB model
 */
const FirstPersonControls = ({ onPositionChange }) => {
  const { camera, gl, scene } = useThree();
  const controlsRef = useRef();
  const [modelBounds, setModelBounds] = useState(null);
  
  // Movement state
  const moveState = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());

  // Calculate model bounds on mount - with delay to ensure GLB is loaded
  useEffect(() => {
    const detectBounds = () => {
      const box = new THREE.Box3();
      let meshCount = 0;
      
      // Find all meshes in the scene and calculate bounds
      scene.traverse((child) => {
        if (child.isMesh) {
          meshCount++;
          const meshBox = new THREE.Box3().setFromObject(child);
          box.union(meshBox);
        }
      });

      if (!box.isEmpty() && meshCount > 0) {
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);
        
        setModelBounds({
          min: box.min,
          max: box.max,
          size: size,
          center: center
        });

        // Set camera to a good starting position based on model bounds
        // Use model's min Y (floor) + eye level height
        const floorY = box.min.y;
        const eyeHeight = 1.7; // Average eye level
        
        camera.position.set(
          center.x,
          floorY + eyeHeight, // Start at floor + eye height
          box.max.z - (size.z * 0.3) // Start 30% from the front
        );
        
        console.log('✅ Model bounds detected:', {
          meshCount: meshCount,
          min: { x: box.min.x.toFixed(2), y: box.min.y.toFixed(2), z: box.min.z.toFixed(2) },
          max: { x: box.max.x.toFixed(2), y: box.max.y.toFixed(2), z: box.max.z.toFixed(2) },
          size: { x: size.x.toFixed(2), y: size.y.toFixed(2), z: size.z.toFixed(2) },
          center: { x: center.x.toFixed(2), y: center.y.toFixed(2), z: center.z.toFixed(2) },
          floorY: floorY.toFixed(2),
          cameraY: (floorY + eyeHeight).toFixed(2)
        });
      } else {
        console.warn('⚠️ No meshes found yet, retrying...');
        // Retry after a short delay
        setTimeout(detectBounds, 500);
      }
    };

    // Wait a bit for GLB to load
    const timer = setTimeout(detectBounds, 1000);
    
    return () => clearTimeout(timer);
  }, [scene, camera]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
          moveState.current.forward = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          moveState.current.backward = true;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          moveState.current.left = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          moveState.current.right = true;
          break;
      }
    };

    const handleKeyUp = (event) => {
      switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
          moveState.current.forward = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          moveState.current.backward = false;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          moveState.current.left = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          moveState.current.right = false;
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Check collision using raycasting
  const checkCollision = (position, direction, distance = 0.5) => {
    if (!modelBounds) return false;

    const raycaster = new THREE.Raycaster(position, direction, 0, distance);
    const intersects = raycaster.intersectObjects(scene.children, true);
    
    // Filter out non-mesh objects
    const meshIntersects = intersects.filter(hit => hit.object.isMesh);
    
    return meshIntersects.length > 0;
  };

  // Movement and collision detection
  useFrame((state, delta) => {
    if (!controlsRef.current?.isLocked || !modelBounds) return;

    const speed = 1.5; // Reduced from 2.5 for slower, more realistic walking
    const dampingFactor = 8.0;
    const collisionDistance = 0.8; // Distance to check for walls

    // Calculate movement direction
    direction.current.set(0, 0, 0);

    if (moveState.current.forward) direction.current.z -= 1;
    if (moveState.current.backward) direction.current.z += 1;
    if (moveState.current.left) direction.current.x -= 1;
    if (moveState.current.right) direction.current.x += 1;

    // Normalize diagonal movement
    if (direction.current.length() > 0) {
      direction.current.normalize();
    }

    // Apply camera rotation to direction
    const euler = new THREE.Euler(0, 0, 0, 'YXZ');
    euler.setFromQuaternion(camera.quaternion);
    euler.x = 0; // Keep movement horizontal
    euler.z = 0;

    const rotationMatrix = new THREE.Matrix4();
    rotationMatrix.makeRotationFromEuler(euler);
    direction.current.applyMatrix4(rotationMatrix);

    // Apply velocity
    velocity.current.x -= velocity.current.x * dampingFactor * delta;
    velocity.current.z -= velocity.current.z * dampingFactor * delta;

    velocity.current.x += direction.current.x * speed * delta;
    velocity.current.z += direction.current.z * speed * delta;

    // Calculate new position
    const newPosition = camera.position.clone();
    const moveVector = new THREE.Vector3(velocity.current.x, 0, velocity.current.z);

    // Check for collisions in movement direction
    const moveDirection = moveVector.clone().normalize();
    const hasCollision = checkCollision(camera.position, moveDirection, collisionDistance);

    if (!hasCollision) {
      newPosition.x += velocity.current.x;
      newPosition.z += velocity.current.z;
    } else {
      // Try sliding along walls
      const xDir = new THREE.Vector3(velocity.current.x, 0, 0).normalize();
      const zDir = new THREE.Vector3(0, 0, velocity.current.z).normalize();
      
      if (!checkCollision(camera.position, xDir, collisionDistance)) {
        newPosition.x += velocity.current.x;
      }
      
      if (!checkCollision(camera.position, zDir, collisionDistance)) {
        newPosition.z += velocity.current.z;
      }
    }

    // Clamp to model bounds with buffer
    const buffer = 0.5;
    newPosition.x = THREE.MathUtils.clamp(
      newPosition.x,
      modelBounds.min.x + buffer,
      modelBounds.max.x - buffer
    );
    newPosition.z = THREE.MathUtils.clamp(
      newPosition.z,
      modelBounds.min.z + buffer,
      modelBounds.max.z - buffer
    );

    // Keep Y at floor + eye height (don't let it change)
    const floorY = modelBounds.min.y;
    const eyeHeight = 1.7;
    newPosition.y = floorY + eyeHeight;

    // Apply position
    camera.position.copy(newPosition);

    // Notify parent component of position change for mini-map
    if (onPositionChange) {
      onPositionChange({
        x: camera.position.x - modelBounds.center.x,
        z: camera.position.z - modelBounds.center.z,
        rotation: euler.y,
        bounds: modelBounds
      });
    }
  });

  return (
    <PointerLockControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      selector="#instructions"
    />
  );
};

export default FirstPersonControls;
