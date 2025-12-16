import React, { useState } from 'react';
import { useScreenshot } from '../../hooks/useScreenshot';

/**
 * Screenshot tool component with preview and share options
 * Takes canvasRef as prop since it's rendered outside Canvas
 */
const ScreenshotTool = ({ visible = true, canvasRef }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [screenshot, setScreenshot] = useState(null);
  const [copied, setCopied] = useState(false);
  
  const { 
    captureScreenshot, 
    downloadScreenshot, 
    shareToWhatsApp, 
    copyToClipboard 
  } = useScreenshot(canvasRef);

  const handleCapture = () => {
    const dataURL = captureScreenshot();
    if (dataURL) {
      setScreenshot(dataURL);
      setShowPreview(true);
    }
  };

  const handleDownload = () => {
    if (screenshot) {
      const timestamp = new Date().toISOString().slice(0, 10);
      downloadScreenshot(screenshot, `apartment-${timestamp}.png`);
    }
  };

  const handleShare = () => {
    shareToWhatsApp('Check out this stunning apartment! Take a virtual tour: [Your Website URL]');
  };

  const handleCopy = async () => {
    if (screenshot) {
      const success = await copyToClipboard(screenshot);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const handleClose = () => {
    setShowPreview(false);
    setScreenshot(null);
  };

  if (!visible) return null;

  return (
    <>
      {/* Capture Button */}
      <button
        onClick={handleCapture}
        className="absolute top-4 right-4 z-40 bg-white/90 backdrop-blur-sm hover:bg-white text-neutral-800 p-3 rounded-xl shadow-lg transition-all hover:scale-105 group"
        title="Take Screenshot"
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" 
          />
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" 
          />
        </svg>
        <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-neutral-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Take Screenshot
        </span>
      </button>

      {/* Preview Modal */}
      {showPreview && screenshot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-200">
              <h3 className="text-lg font-semibold text-neutral-900">Screenshot Preview</h3>
              <button
                onClick={handleClose}
                className="text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Image */}
            <div className="p-4 max-h-[60vh] overflow-auto">
              <img 
                src={screenshot} 
                alt="Screenshot preview" 
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 p-4 border-t border-neutral-200 bg-neutral-50">
              {/* Download */}
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </button>

              {/* WhatsApp Share */}
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Share on WhatsApp
              </button>

              {/* Copy to Clipboard */}
              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  copied 
                    ? 'bg-green-500 text-white' 
                    : 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300'
                }`}
              >
                {copied ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ScreenshotTool;
