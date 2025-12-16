// Predefined camera positions for each room - optimized for detailed viewing
export const cameraPositions = {
  default: {
    position: [18, 12, 18],
    target: [0, 0, 0],
    name: 'Overview'
  },
  livingRoom: {
    position: [6, 5, 9],
    target: [3, 1, 3],
    name: 'Living Room'
  },
  bedroom: {
    position: [-6, 5, 9],
    target: [-3, 1.5, 3],
    name: 'Bedroom'
  },
  kitchen: {
    position: [6, 5, -9],
    target: [3, 1.5, -3],
    name: 'Kitchen'
  },
  balcony: {
    position: [-6, 4, -9],
    target: [-3, 1, -3],
    name: 'Balcony'
  }
};

export const getRoomPosition = (roomKey) => {
  return cameraPositions[roomKey] || cameraPositions.default;
};
