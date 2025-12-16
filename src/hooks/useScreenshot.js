import { useCallback } from 'react';

/**
 * Hook for capturing screenshots of the 3D canvas
 * Takes a canvasRef instead of using useThree (since it's used outside Canvas)
 */
export const useScreenshot = (canvasRef) => {

  const captureScreenshot = useCallback(() => {
    try {
      if (!canvasRef?.current) {
        console.error('Canvas ref not available');
        return null;
      }
      
      // Get canvas and convert to data URL
      const canvas = canvasRef.current;
      const dataURL = canvas.toDataURL('image/png', 1.0);
      
      return dataURL;
    } catch (error) {
      console.error('Failed to capture screenshot:', error);
      return null;
    }
  }, [canvasRef]);

  const downloadScreenshot = useCallback((dataURL, filename = 'apartment-view.png') => {
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const shareToWhatsApp = useCallback((message = 'Check out this amazing apartment! 🏠✨') => {
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }, []);

  const copyToClipboard = useCallback(async (dataURL) => {
    try {
      // Convert data URL to blob
      const response = await fetch(dataURL);
      const blob = await response.blob();
      
      // Copy to clipboard
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      
      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return false;
    }
  }, []);

  return {
    captureScreenshot,
    downloadScreenshot,
    shareToWhatsApp,
    copyToClipboard
  };
};
