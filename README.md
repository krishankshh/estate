# Real Estate Developer Website with Interactive 3D Sample Flat

A modern, production-ready real estate developer website template featuring an **interactive 3D sample flat experience** built with React, Vite, Tailwind CSS, and Three.js.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18-blue)
![Three.js](https://img.shields.io/badge/Three.js-Latest-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan)

## 🎯 Key Features

### ✨ Interactive 3D Sample Flat (USP)
- **Room-wise Navigation**: Explore Living Room, Bedroom, Kitchen, and Balcony
- **Smooth Camera Transitions**: Cinematic movements between rooms
- **Auto-Rotate Showcase**: Automatic rotation on initial load
- **Orbit Controls**: User-friendly drag-to-rotate and scroll-to-zoom
- **WebGL Fallback**: Static images for browsers without WebGL support
- **Loading Progress**: Smooth loading experience with progress indicator

### 🏠 Complete Website
- **Homepage**: Hero section with embedded 3D viewer, stats, and features
- **About Us**: Company story, values, and leadership team
- **Projects**: Portfolio showcase with project cards
- **Floor Plans**: Filterable floor plan gallery with specifications
- **Contact**: Lead capture form with validation

### 🎨 Premium Design
- **Neutral Color Palette**: Beige, soft gray, and gold accents
- **Modern Typography**: Inter and Outfit Google Fonts
- **Glassmorphism Effects**: Backdrop blur and transparency
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: Micro-interactions and transitions

## 📁 Project Structure

```
/src
  /components
    /common           # Reusable UI components (Button, LoadingSpinner)
    /layout           # Header, Footer
    /3d               # 3D-specific components (FlatViewer, RoomNavigation)
  /pages              # Page components (HomePage, AboutPage, etc.)
  /three              # Three.js models and utilities (FlatModel, cameraPositions)
  /hooks              # Custom React hooks (useWebGL, useCameraTransition)
  /utils              # Helper functions
  main.jsx            # Entry point
  App.jsx             # Main app with routing
  index.css           # Global styles and Tailwind config
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or download this repository**
   ```bash
   cd real_estate_demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

> **Note**: This demo is optimized for development mode. The production build may require additional optimization for the Three.js bundle size. For deployment, consider using the development build or implementing code splitting for the 3D components.


## 🎮 Using the 3D Viewer

1. **Auto-Rotate**: The 3D flat automatically rotates on page load for 5 seconds
2. **Room Navigation**: Click any room button at the bottom to jump to that room
3. **Manual Controls**:
   - **Drag**: Rotate the view
   - **Scroll**: Zoom in/out
   - **Touch**: Mobile-friendly touch controls

### Available Rooms
- 🏠 **Overview**: Bird's-eye view of the entire flat
- 🛋️ **Living Room**: Sofa, coffee table, TV stand
- 🛏️ **Bedroom**: Bed, wardrobe, bedside table
- 🍳 **Kitchen**: Counters, island, refrigerator
- 🌿 **Balcony**: Glass railing, table, chair

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework |
| **Vite** | Build tool and dev server |
| **Tailwind CSS** | Utility-first styling |
| **Three.js** | 3D rendering engine |
| **@react-three/fiber** | React renderer for Three.js |
| **@react-three/drei** | Helper components for R3F |
| **React Router** | Client-side routing |

## 📦 Dependencies

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^7.1.1",
  "three": "^0.171.0",
  "@react-three/fiber": "^8.17.10",
  "@react-three/drei": "^9.117.3",
  "tailwindcss": "^3.4.17"
}
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color palette:
```js
colors: {
  primary: { ... },   // Neutral beige tones
  accent: { ... },    // Gold accents
  neutral: { ... }    // Grays
}
```

### 3D Model
Modify `src/three/FlatModel.jsx` to:
- Change room layouts
- Add/remove furniture
- Adjust materials and colors
- Replace with your own GLB/glTF models

### Camera Positions
Update `src/three/cameraPositions.js` to adjust camera angles for each room.

## 🚀 Converting to Production

This template is ready to be deployed or converted into a SaaS product:

1. **Add Backend**: Integrate with your API for form submissions
2. **CMS Integration**: Connect to a headless CMS for dynamic content
3. **Real Assets**: Replace procedural 3D model with actual GLB files
4. **Multi-Project**: Extend to support multiple properties
5. **Admin Dashboard**: Add content management capabilities

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

*Note: WebGL is required for 3D features. Fallback images are shown for unsupported browsers.*

## 🤝 Contributing

This is a template project. Feel free to fork, modify, and use it for your own real estate projects!

## 📄 License

MIT License - feel free to use this template for commercial projects.

## 🙏 Credits

- 3D rendering: [Three.js](https://threejs.org/)
- React Three Fiber: [@react-three/fiber](https://github.com/pmndrs/react-three-fiber)
- Icons: Emoji icons (universally supported)
- Images: [Unsplash](https://unsplash.com/) (placeholder images)

---

**Built with ❤️ for modern real estate marketing**

For questions or support, please open an issue or contact the development team.
