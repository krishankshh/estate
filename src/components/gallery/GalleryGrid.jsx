import React, { useState } from 'react';
import Lightbox from './Lightbox';

/**
 * Enhanced gallery grid with category filters and lightbox
 */
const GalleryGrid = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Sample gallery images (replace with actual images)
  const images = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      title: 'Modern Living Room',
      category: 'interior'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      title: 'Luxury Kitchen',
      category: 'interior'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      title: 'Master Bedroom',
      category: 'interior'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800',
      title: 'Front Elevation',
      category: 'exterior'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      title: 'Garden View',
      category: 'exterior'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
      title: 'Swimming Pool',
      category: 'amenities'
    },
    {
      id: 7,
      url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
      title: 'Gym Facility',
      category: 'amenities'
    },
    {
      id: 8,
      url: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800',
      title: 'Balcony View',
      category: 'exterior'
    },
    {
      id: 9,
      url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800',
      title: 'Bathroom',
      category: 'interior'
    },
  ];

  const categories = [
    { id: 'all', name: 'All', icon: '🏠' },
    { id: 'interior', name: 'Interior', icon: '🛋️' },
    { id: 'exterior', name: 'Exterior', icon: '🏡' },
    { id: 'amenities', name: 'Amenities', icon: '🏊' },
  ];

  const filteredImages = activeCategory === 'all'
    ? images
    : images.filter(img => img.category === activeCategory);

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <div>
      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeCategory === category.id
                ? 'bg-accent-500 text-white shadow-lg scale-105'
                : 'bg-white text-neutral-700 hover:bg-neutral-50 shadow-md'
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image, index) => (
          <div
            key={image.id}
            onClick={() => openLightbox(index)}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            {/* Image */}
            <img
              src={image.url}
              alt={image.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-lg font-semibold mb-1">{image.title}</h3>
                <p className="text-sm text-neutral-200 capitalize">{image.category}</p>
              </div>
              
              {/* Zoom Icon */}
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-3 rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredImages.length === 0 && (
        <div className="text-center py-16">
          <p className="text-neutral-500 text-lg">No images in this category yet.</p>
        </div>
      )}

      {/* Lightbox */}
      <Lightbox
        images={filteredImages}
        currentIndex={lightboxIndex}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </div>
  );
};

export default GalleryGrid;
