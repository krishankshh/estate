import React from 'react';

/**
 * Mini-map showing accurate top-down floor plan with user position
 */
const MiniMap = ({ userPosition = { x: 0, z: 0, rotation: 0, bounds: null } }) => {
  // Map dimensions
  const mapSize = 180;
  
  // Use bounds if available
  const bounds = userPosition.bounds || {
    min: { x: -12, z: -12 },
    max: { x: 12, z: 12 },
    size: { x: 24, z: 24 }
  };
  
  // Convert 3D coordinates to 2D map coordinates
  const getUserMapPosition = () => {
    const rangeX = bounds.max.x - bounds.min.x;
    const rangeZ = bounds.max.z - bounds.min.z;
    
    const x = ((userPosition.x - bounds.min.x) / rangeX) * mapSize;
    const y = ((userPosition.z - bounds.min.z) / rangeZ) * mapSize;
    
    return { x, y };
  };

  const userMapPos = getUserMapPosition();

  return (
    <div className="absolute top-4 left-4 z-50">
      <div 
        className="bg-black/50 backdrop-blur-md rounded-xl p-2 border border-white/30 shadow-2xl"
        style={{ width: mapSize + 20, height: mapSize + 20 }}
      >
        <svg width={mapSize} height={mapSize} className="mx-auto">
          {/* Background */}
          <rect width={mapSize} height={mapSize} fill="#1a1a1a" rx="8" />
          
          {/* Outer boundary */}
          <rect x={15} y={15} width={150} height={150} fill="none" stroke="#888" strokeWidth="4" />
          
          {/* Reading the floor plan correctly from the image: */}
          
          {/* Top Row - Left to Right */}
          
          {/* Top-Left: Bedroom with attached bathroom (reddish carpet area) */}
          <rect x={15} y={15} width={50} height={50} fill="#8B4513" fillOpacity="0.35" stroke="#555" strokeWidth="1.5" />
          <text x={40} y={43} fontSize="8" fill="#fff" textAnchor="middle" fontWeight="bold">BR1</text>
          
          {/* Top-Center: Living/Dining area (large central beige space) */}
          <rect x={65} y={15} width={60} height={70} fill="#D4C5B0" fillOpacity="0.35" stroke="#555" strokeWidth="1.5" />
          <text x={95} y={53} fontSize="9" fill="#fff" textAnchor="middle" fontWeight="bold">Living</text>
          
          {/* Top-Right & extending down: Master Bedroom (yellow/golden area on right) */}
          <rect x={125} y={15} width={40} height={60} fill="#DAA520" fillOpacity="0.35" stroke="#555" strokeWidth="1.5" />
          <text x={145} y={48} fontSize="8" fill="#fff" textAnchor="middle" fontWeight="bold">Master</text>
          
          {/* Middle-Left: Another small room/bedroom */}
          <rect x={15} y={65} width={50} height={45} fill="#A0826D" fillOpacity="0.35" stroke="#555" strokeWidth="1.5" />
          <text x={40} y={90} fontSize="8" fill="#fff" textAnchor="middle" fontWeight="bold">BR2</text>
          
          {/* Bottom-Left: Kitchen (visible counter/kitchen area) */}
          <rect x={15} y={110} width={50} height={55} fill="#E8DCC8" fillOpacity="0.35" stroke="#555" strokeWidth="1.5" />
          <text x={40} y={140} fontSize="8" fill="#fff" textAnchor="middle" fontWeight="bold">Kitchen</text>
          
          {/* Bottom-Center: Dining/Passage */}
          <rect x={65} y={85} width={60} height={80} fill="#C9B896" fillOpacity="0.3" stroke="#555" strokeWidth="1.5" />
          <text x={95} y={128} fontSize="8" fill="#fff" textAnchor="middle" fontWeight="bold">Dining</text>
          
          {/* Right side: Two Balconies (white tiled areas extending out) */}
          <rect x={165} y={15} width={15} height={30} fill="#B8B8B8" fillOpacity="0.4" stroke="#555" strokeWidth="1.5" />
          <text x={172} y={33} fontSize="6" fill="#fff" textAnchor="middle">Bal1</text>
          
          <rect x={165} y={135} width={15} height={30} fill="#B8B8B8" fillOpacity="0.4" stroke="#555" strokeWidth="1.5" />
          <text x={172} y={153} fontSize="6" fill="#fff" textAnchor="middle">Bal2</text>
          
          {/* Interior walls (key divisions visible in floor plan) */}
          <line x1={65} y1={15} x2={65} y2={85} stroke="#666" strokeWidth="2.5" />
          <line x1={125} y1={15} x2={125} y2={75} stroke="#666" strokeWidth="2.5" />
          <line x1={15} y1={65} x2={65} y2={65} stroke="#666" strokeWidth="2" />
          <line x1={15} y1={110} x2={125} y2={110} stroke="#666" strokeWidth="2" />
          <line x1={65} y1={85} x2={125} y2={85} stroke="#666" strokeWidth="2" />
          <line x1={125} y1={75} x2={165} y2={75} stroke="#666" strokeWidth="2" />
          
          {/* Grid overlay for reference */}
          <g stroke="#2a2a2a" strokeWidth="0.5" opacity="0.5">
            {[...Array(6)].map((_, i) => {
              const pos = 15 + (i * 30);
              return (
                <g key={i}>
                  <line x1={pos} y1={15} x2={pos} y2={165} />
                  <line x1={15} y1={pos} x2={165} y2={pos} />
                </g>
              );
            })}
          </g>

          {/* User position indicator */}
          <g transform={`translate(${userMapPos.x}, ${userMapPos.y})`}>
            {/* Glow effect */}
            <circle cx={0} cy={0} r={7} fill="#f0ab11" opacity="0.4" />
            {/* Main circle */}
            <circle cx={0} cy={0} r={4.5} fill="#f0ab11" stroke="#fff" strokeWidth="2.5" />
            {/* Direction arrow */}
            <line
              x1={0}
              y1={0}
              x2={0}
              y2={-12}
              stroke="#fff"
              strokeWidth="3"
              strokeLinecap="round"
              transform={`rotate(${(userPosition.rotation * 180) / Math.PI})`}
            />
          </g>
        </svg>
        
        {/* Label */}
        <div className="text-center mt-1">
          <span className="text-white text-xs font-semibold">Floor Plan</span>
        </div>
      </div>
    </div>
  );
};

export default MiniMap;
