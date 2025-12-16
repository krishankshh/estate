import React from 'react';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Visual representation of measurements in 3D space
 */
const MeasurementLine = ({ measurement }) => {
  const { start, end, distance, distanceFeet, distanceMeters, midPoint } = measurement;

  return (
    <group>
      {/* Main line */}
      <Line
        points={[start, end]}
        color="#f0ab11"
        lineWidth={3}
      />
      
      {/* Start point marker */}
      <mesh position={start}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#f0ab11" />
      </mesh>
      
      {/* End point marker */}
      <mesh position={end}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#f0ab11" />
      </mesh>
      
      {/* Distance label (sprite) */}
      <sprite position={midPoint} scale={[2, 1, 1]}>
        <spriteMaterial color="#ffffff" />
      </sprite>
    </group>
  );
};

export default MeasurementLine;
