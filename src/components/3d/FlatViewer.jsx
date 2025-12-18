import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import FlatModel from '../../three/FlatModel';
import RoomNavigation from './RoomNavigation';
import FirstPersonControls from './FirstPersonControls';
import MiniMap from './MiniMap';
import ScreenshotTool from './ScreenshotTool';
import FeatureToolbar from './FeatureToolbar';
import MeasurementTool from './MeasurementTool';
import LoadingSpinner from '../common/LoadingSpinner';
import { cameraPositions } from '../../three/cameraPositions';
import { useCameraTransition } from '../../hooks/useCameraTransition';
import { useWebGL } from '../../hooks/useWebGL';
import { useMeasurement } from '../../hooks/useMeasurement';

/**
 * Camera controller component for smooth transitions (Orbit mode only)
 */
const CameraController = ({ targetRoom }) => {
  const { camera } = useThree();
  const controlsRef = useRef();
  const { animateToPosition } = useCameraTransition(camera, controlsRef.current);

  useEffect(() => {
    if (targetRoom && controlsRef.current) {
      const roomData = cameraPositions[targetRoom];
      if (roomData) {
        animateToPosition(roomData.position, roomData.target);
      }
    }
  }, [targetRoom, animateToPosition]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      minDistance={5}
      maxDistance={30}
      maxPolarAngle={Math.PI / 2}
      enablePan={false}
    />
  );
};

/**
 * Auto-rotate component for initial showcase (Orbit mode only)
 */
const AutoRotate = ({ enabled }) => {
  const { camera } = useThree();
  const angleRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      angleRef.current += 0.002;
      const radius = 18;
      camera.position.x = radius * Math.sin(angleRef.current);
      camera.position.z = radius * Math.cos(angleRef.current);
      camera.lookAt(0, 0, 0);
    }, 16);

    return () => clearInterval(interval);
  }, [enabled, camera]);

  return null;
};

/**
 * Main 3D Flat Viewer Component
 * @param {boolean} firstPersonMode - Enable first-person walkthrough mode
 */
const FlatViewer = ({ firstPersonMode = false, hideInstructions = false }) => {
  const [activeRoom, setActiveRoom] = useState('default');
  const [isAutoRotate, setIsAutoRotate] = useState(!firstPersonMode);
  const [isLoading, setIsLoading] = useState(true);
  const [userPosition, setUserPosition] = useState({ x: 0, z: 8, rotation: 0 });
  const [showInstructions, setShowInstructions] = useState(firstPersonMode && !hideInstructions);
  const [isPointerLocked, setIsPointerLocked] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null); // null, 'measure', 'sunlight', 'hotspots'
  const isWebGLSupported = useWebGL();
  
  // Measurement tool state
  const {
    measurements,
    currentPoints,
    addPoint,
    clearMeasurements,
    removeLastMeasurement
  } = useMeasurement();

  // Track pointer lock state for FPP mode
  useEffect(() => {
    if (!firstPersonMode) return;

    const handlePointerLockChange = () => {
      const locked = document.pointerLockElement !== null;
      setIsPointerLocked(locked);
      
      // Show instructions overlay when unlocked
      if (!locked) {
        setShowInstructions(true);
      }
    };

    document.addEventListener('pointerlockchange', handlePointerLockChange);
    
    return () => {
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
    };
  }, [firstPersonMode]);

  // Stop auto-rotate after 5 seconds or when user interacts (orbit mode only)
  useEffect(() => {
    if (firstPersonMode) return;
    
    const timer = setTimeout(() => {
      setIsAutoRotate(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [firstPersonMode]);

  const handleRoomSelect = (roomKey) => {
    setIsAutoRotate(false);
    setActiveRoom(roomKey);
  };

  const handleInteractionStart = () => {
    setIsAutoRotate(false);
  };

  const handlePositionChange = (position) => {
    setUserPosition(position);
  };

  const handleStartWalkthrough = () => {
    setShowInstructions(false);
  };

  const handleFeatureToggle = (featureId) => {
    setActiveFeature(prev => prev === featureId ? null : featureId);
  };

  // Ref for canvas element (for screenshot tool)
  const canvasRef = useRef();

  // Fallback for non-WebGL browsers
  if (!isWebGLSupported) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-neutral-100 rounded-2xl">
        <div className="text-center p-8">
          <h3 className="text-xl font-semibold text-neutral-800 mb-2">
            3D View Not Available
          </h3>
          <p className="text-neutral-600 mb-4">
            Your browser doesn't support WebGL. Please use a modern browser to experience the 3D tour.
          </p>
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <img 
              src="https://placehold.co/300x200/f5f3ef/8d7f61?text=Living+Room" 
              alt="Living Room"
              className="rounded-lg"
            />
            <img 
              src="https://placehold.co/300x200/f5f3ef/8d7f61?text=Bedroom" 
              alt="Bedroom"
              className="rounded-lg"
            />
            <img 
              src="https://placehold.co/300x200/f5f3ef/8d7f61?text=Kitchen" 
              alt="Kitchen"
              className="rounded-lg"
            />
            <img 
              src="https://placehold.co/300x200/f5f3ef/8d7f61?text=Balcony" 
              alt="Balcony"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
      <Canvas
        ref={canvasRef}
        shadows
        onPointerDown={!firstPersonMode ? handleInteractionStart : undefined}
        onWheel={!firstPersonMode ? handleInteractionStart : undefined}
        gl={{ antialias: true, alpha: false }}
        onCreated={() => setIsLoading(false)}
      >
        {/* Camera */}
        <PerspectiveCamera
          makeDefault
          position={firstPersonMode ? [0, 1.6, 8] : [18, 12, 18]}
          fov={firstPersonMode ? 75 : 50}
        />

        {/* Enhanced Lighting Setup */}
        <ambientLight intensity={0.4} />
        
        {/* Main sun light */}
        <directionalLight
          position={[15, 25, 15]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-25}
          shadow-camera-right={25}
          shadow-camera-top={25}
          shadow-camera-bottom={-25}
        />
        
        {/* Fill lights for better material visibility */}
        <directionalLight position={[-10, 15, -10]} intensity={0.4} />
        <directionalLight position={[10, 10, -10]} intensity={0.3} />
        
        {/* Rim light for depth */}
        <directionalLight position={[0, 10, -20]} intensity={0.3} color="#FFF8DC" />
        
        {/* Point lights for room accents */}
        <pointLight position={[3, 3, 3]} intensity={0.5} distance={10} />
        <pointLight position={[-3, 3, 3]} intensity={0.5} distance={10} />
        <pointLight position={[3, 3, -3]} intensity={0.5} distance={10} />
        <pointLight position={[-3, 3, -3]} intensity={0.5} distance={10} />

        {/* 3D Model */}
        <Suspense fallback={null}>
          <FlatModel />
        </Suspense>

        {/* Controls - Either FPP or Orbit */}
        {firstPersonMode ? (
          <FirstPersonControls onPositionChange={handlePositionChange} />
        ) : (
          <>
            {!isAutoRotate && <CameraController targetRoom={activeRoom} />}
            {isAutoRotate && <AutoRotate enabled={isAutoRotate} />}
          </>
        )}

        {/* Environment */}
        <color attach="background" args={['#e8e4dc']} />
        <fog attach="fog" args={['#e8e4dc', 30, 50]} />
      </Canvas>

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 z-20">
          <LoadingSpinner message="Loading 3D Experience..." />
        </div>
      )}

      {/* First-Person Mode UI */}
      {firstPersonMode && !isLoading && !hideInstructions && (
        <>
          {/* Mini-map - positioned relative to this section */}
          <MiniMap userPosition={userPosition} />

          {/* Screenshot Tool */}
          <ScreenshotTool visible={true} canvasRef={canvasRef} />

          {/* Feature Toolbar (currently empty - for future features) */}
          <FeatureToolbar 
            activeFeature={activeFeature}
            onFeatureToggle={handleFeatureToggle}
          />

          {/* Instructions Overlay */}
          {showInstructions && (
            <div 
              id="instructions"
              className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-30 cursor-pointer"
              onClick={(e) => {
                setShowInstructions(false);
                // Request pointer lock directly on the canvas element
                setTimeout(() => {
                  const canvas = document.querySelector('canvas');
                  if (canvas) {
                    canvas.requestPointerLock();
                  }
                }, 100);
              }}
            >
              <div className="bg-white rounded-2xl p-8 max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-2xl font-bold mb-4 text-neutral-900">First-Person Walkthrough</h2>
                <div className="space-y-3 text-neutral-700">
                  <p className="flex items-center gap-3">
                    <span className="text-2xl">🖱️</span>
                    <span><strong>Click anywhere</strong> to start walking</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="text-2xl">⌨️</span>
                    <span><strong>W A S D</strong> or <strong>Arrow Keys</strong> to move</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="text-2xl">🖱️</span>
                    <span><strong>Mouse</strong> to look around</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="text-2xl">🗺️</span>
                    <span>Check the <strong>mini-map</strong> in top-left corner</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="text-2xl">⎋</span>
                    <span><strong>ESC</strong> to release cursor</span>
                  </p>
                </div>
                <button 
                  className="mt-6 w-full btn-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowInstructions(false);
                    setTimeout(() => {
                      const canvas = document.querySelector('canvas');
                      if (canvas) {
                        canvas.requestPointerLock();
                      }
                    }, 100);
                  }}
                >
                  Click to Start Walking
                </button>
              </div>
            </div>
          )}

          {/* Controls hint (when locked) */}
          {!showInstructions && isPointerLocked && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
              <div className="glass-effect rounded-xl px-6 py-3 shadow-lg">
                <p className="text-sm text-neutral-700 font-medium">
                  <span className="text-accent-500 font-bold">WASD</span> to move • 
                  <span className="text-accent-500 font-bold"> Mouse</span> to look • 
                  <span className="text-accent-500 font-bold"> ESC</span> to unlock
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {/* Orbit Mode - No room navigation (GLB model has different layout) */}
      {/* Room navigation disabled - use FPP mode below for guided tour */}
    </div>
  );
};

export default FlatViewer;
