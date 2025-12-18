import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

/**
 * Building Model Component
 */
const BuildingModel = () => {
  const { scene } = useGLTF('/building.glb');
  
  return (
    <primitive 
      object={scene} 
      scale={0.65}          // SCALE: Increase to make building bigger (e.g., 1.5, 2), decrease to make smaller (e.g., 0.5)
      position={[0, -60, 0]}  // POSITION: [X, Y, Z]
                            // Y (middle number): INCREASE to move UP, DECREASE to move DOWN
                            // X (first number): move left/right
                            // Z (last number): move forward/back
    />
  );
};

/**
 * BuildingViewer - Manual controls for building position
 * 
 * TO ADJUST BUILDING HEIGHT: Change position Y value in BuildingModel (line 15)
 * TO ZOOM IN/OUT: Change camera position values below (line 30) - decrease numbers to zoom in, increase to zoom out
 * TO CHANGE VIEW ANGLE: Adjust camera position [X, Y, Z] below
 */
const BuildingViewer = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full h-full bg-gradient-to-b from-sky-200 to-white rounded-2xl overflow-hidden shadow-xl relative">
      <Canvas
        camera={{ 
          position: [300, 200, 300],  // CAMERA POSITION: [X, Y, Z]
                                   // DECREASE all numbers to ZOOM IN (e.g., [25, 15, 25])
                                   // INCREASE all numbers to ZOOM OUT (e.g., [100, 60, 100])
                                   // Y (middle): camera height - higher = view from above
          fov: 50                  // FIELD OF VIEW: Lower = zoom in (30), Higher = zoom out (70)
        }}
        onCreated={() => setIsLoading(false)}
      >
        <Suspense fallback={null}>
          {/* Simple lighting */}
          <ambientLight intensity={1} />
          <directionalLight position={[100, 100, 50]} intensity={1.5} />
          <directionalLight position={[-100, 50, -50]} intensity={0.5} />

          {/* Building Model */}
          <BuildingModel />

          {/* Camera Controls - Horizontal rotation only */}
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            minPolarAngle={Math.PI / 4}    // Minimum vertical angle
            maxPolarAngle={Math.PI / 2}    // Maximum vertical angle (keeps it horizontal-ish)
            minDistance={10}               // How close you can zoom in
            maxDistance={200}              // How far you can zoom out
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-10">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-accent-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm text-neutral-600">Loading Building Model...</p>
          </div>
        </div>
      )}

      {/* Controls Hint */}
      {!isLoading && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-20">
          <div className="glass-effect px-4 py-2 rounded-full shadow-lg">
            <p className="text-xs text-neutral-700 font-medium">
              🖱️ Drag to rotate • Scroll to zoom
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// Preload the model
useGLTF.preload('/building.glb');

export default BuildingViewer;
