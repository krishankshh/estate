import React from 'react';
import { cameraPositions } from '../../three/cameraPositions';

/**
 * Room navigation UI component
 */
const RoomNavigation = ({ onRoomSelect, activeRoom }) => {
  const rooms = [
    { key: 'default', icon: '🏠', label: 'Overview' },
    { key: 'livingRoom', icon: '🛋️', label: 'Living Room' },
    { key: 'bedroom', icon: '🛏️', label: 'Bedroom' },
    { key: 'kitchen', icon: '🍳', label: 'Kitchen' },
    { key: 'balcony', icon: '🌿', label: 'Balcony' },
  ];

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
      <div className="glass-effect rounded-2xl shadow-lg p-2">
        <div className="flex items-center gap-2">
          {rooms.map((room) => (
            <button
              key={room.key}
              onClick={() => onRoomSelect(room.key)}
              className={`
                flex flex-col items-center justify-center px-4 py-3 rounded-xl
                transition-all duration-300 min-w-[80px]
                ${
                  activeRoom === room.key
                    ? 'bg-accent-500 text-white shadow-glow'
                    : 'bg-white/50 text-neutral-700 hover:bg-white hover:shadow-md'
                }
              `}
              title={room.label}
            >
              <span className="text-2xl mb-1">{room.icon}</span>
              <span className="text-xs font-medium whitespace-nowrap">{room.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Helper text */}
      <p className="text-center mt-4 text-sm text-neutral-600 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg">
        Click a room to explore • Drag to rotate • Scroll to zoom
      </p>
    </div>
  );
};

export default RoomNavigation;
