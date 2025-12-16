/**
 * Feature toolbar for toggling 3D tools
 */
const FeatureToolbar = ({ activeFeature, onFeatureToggle }) => {
  const features = [
    // Measurement tool disabled for now - needs Canvas integration
    // {
    //   id: 'measure',
    //   name: 'Measure',
    //   icon: (...),
    //   tooltip: 'Measure distances'
    // },
    
    // Future features - placeholders
    // Sunlight, Hotspots, etc. can be added here
  ];

  // Return null if no features enabled
  if (features.length === 0) return null;

  return (
    <div className="absolute top-4 right-20 z-40">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-2 flex gap-2">
        {features.map(feature => (
          <button
            key={feature.id}
            onClick={() => onFeatureToggle(feature.id)}
            className={`p-3 rounded-lg transition-all hover:scale-105 group relative ${
              activeFeature === feature.id
                ? 'bg-accent-500 text-white shadow-md'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
            title={feature.tooltip}
          >
            {feature.icon}
            
            {/* Tooltip */}
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-neutral-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {feature.tooltip}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeatureToolbar;
