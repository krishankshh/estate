import React, { useState } from 'react';

/**
 * Measurement tool UI component
 * Note: Click detection happens inside Canvas via MeasurementClickHandler
 */
const MeasurementTool = ({ visible = false, onClose, measurements = [], currentPoints = [], onClear, onUndo }) => {
  const [unit, setUnit] = useState('meters'); // 'meters' or 'feet'

  if (!visible) return null;

  return (
    <>
      {/* UI Overlay */}
      <div className="absolute top-20 right-4 z-40">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4 w-72">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-neutral-900 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
              Measurement Tool
            </h3>
            <button
              onClick={onClose}
              className="text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Instructions */}
          <div className="mb-4 p-3 bg-accent-50 rounded-lg text-sm">
            <p className="text-neutral-700">
              <strong>{currentPoints.length === 0 ? 'Click' : 'Click again'}</strong> on any surface to {currentPoints.length === 0 ? 'start' : 'complete'} measuring
            </p>
          </div>

          {/* Unit Toggle */}
          <div className="mb-4">
            <label className="text-xs text-neutral-600 block mb-2">Display Unit</label>
            <div className="flex gap-2">
              <button
                onClick={() => setUnit('meters')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  unit === 'meters'
                    ? 'bg-accent-500 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                Meters
              </button>
              <button
                onClick={() => setUnit('feet')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  unit === 'feet'
                    ? 'bg-accent-500 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                Feet
              </button>
            </div>
          </div>

          {/* Measurements List */}
          <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
            {measurements.length === 0 ? (
              <p className="text-sm text-neutral-500 text-center py-4">No measurements yet</p>
            ) : (
              measurements.map((measurement, index) => (
                <div key={measurement.id} className="p-3 bg-neutral-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-600">Measurement {index + 1}</span>
                    <span className="text-lg font-bold text-accent-500">
                      {unit === 'meters'
                        ? `${measurement.distanceMeters.toFixed(2)} m`
                        : `${measurement.distanceFeet.toFixed(2)} ft`
                      }
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {measurements.length > 0 && (
              <>
                <button
                  onClick={onUndo}
                  className="flex-1 py-2 px-3 bg-neutral-200 text-neutral-700 rounded-lg text-sm font-medium hover:bg-neutral-300 transition-colors"
                >
                  Undo Last
                </button>
                <button
                  onClick={onClear}
                  className="flex-1 py-2 px-3 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                >
                  Clear All
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MeasurementTool;
