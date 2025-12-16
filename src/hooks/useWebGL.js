import { useState, useEffect } from 'react';

/**
 * Custom hook to detect WebGL support
 * Returns true if WebGL is supported, false otherwise
 */
export const useWebGL = () => {
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setIsWebGLSupported(!!gl);
    } catch (e) {
      setIsWebGLSupported(false);
    }
  }, []);

  return isWebGLSupported;
};
