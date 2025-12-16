import { useState, useCallback } from 'react';

/**
 * Hook for managing measurement state
 * Simplified version that doesn't use Three.js hooks
 */
export const useMeasurement = () => {
  const [measurements, setMeasurements] = useState([]);
  const [currentPoints, setCurrentPoints] = useState([]);

  const addPoint = useCallback((point) => {
    setCurrentPoints(prev => {
      const newPoints = [...prev, point];
      
      // If we have two points, calculate distance and create measurement
      if (newPoints.length === 2) {
        const dx = newPoints[1].x - newPoints[0].x;
        const dy = newPoints[1].y - newPoints[0].y;
        const dz = newPoints[1].z - newPoints[0].z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        const midPoint = {
          x: (newPoints[0].x + newPoints[1].x) / 2,
          y: (newPoints[0].y + newPoints[1].y) / 2,
          z: (newPoints[0].z + newPoints[1].z) / 2
        };
        
        setMeasurements(prev => [...prev, {
          id: Date.now(),
          start: newPoints[0],
          end: newPoints[1],
          distance: distance,
          distanceFeet: distance * 3.28084, // Convert to feet
          distanceMeters: distance,
          midPoint: midPoint
        }]);
        
        return []; // Reset for next measurement
      }
      
      return newPoints;
    });
  }, []);

  const clearMeasurements = useCallback(() => {
    setMeasurements([]);
    setCurrentPoints([]);
  }, []);

  const removeLastMeasurement = useCallback(() => {
    setMeasurements(prev => prev.slice(0, -1));
    setCurrentPoints([]);
  }, []);

  return {
    measurements,
    currentPoints,
    addPoint,
    clearMeasurements,
    removeLastMeasurement
  };
};
