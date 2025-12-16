import React from 'react';
import GalleryGrid from '../components/gallery/GalleryGrid';

const GalleryPage = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-accent-50 to-neutral-50">
        <div className="container-custom text-center">
          <h1 className="heading-xl mb-4">Gallery</h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Explore our stunning properties through beautiful imagery. From elegant interiors 
            to impressive exteriors and world-class amenities.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <GalleryGrid />
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-neutral-900 text-white">
        <div className="container-custom text-center">
          <h2 className="heading-lg mb-4">Ready to See More?</h2>
          <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
            Schedule a personal tour and experience these spaces in person. Our team is ready to show you around.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/contact" className="btn-primary">
              Schedule a Visit
            </a>
            <a href="#3d-tour" className="btn-secondary bg-white text-neutral-900 hover:bg-neutral-100">
              Try 3D Walkthrough
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
