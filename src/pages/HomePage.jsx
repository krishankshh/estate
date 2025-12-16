import React from 'react';
import FlatViewer from '../components/3d/FlatViewer';
import Button from '../components/common/Button';
import EMICalculator from '../components/tools/EMICalculator';
import WhatsAppButton from '../components/common/WhatsAppButton';
import DemoDisclaimer from '../components/common/DemoDisclaimer';

/**
 * Home page with hero section and 3D viewer
 */
const HomePage = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with 3D Viewer */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6 fade-in">
              <h1 className="heading-xl text-neutral-900">
                Explore Your Future Home in{' '}
                <span className="text-accent-500">3D</span>
                <br />
                <span className="text-neutral-700">— Before You Visit</span>
              </h1>
              
              <p className="text-body max-w-xl">
                Experience luxury living like never before. Navigate through our interactive 
                3D virtual tours and visualize every detail of your dream home from the 
                comfort of your current one.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => scrollToSection('3d-tour')}
                >
                  Start 3D Tour
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => window.location.href = '/contact'}
                >
                  Book Site Visit
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-neutral-200">
                <div>
                  <div className="text-3xl font-bold text-accent-500">50+</div>
                  <div className="text-sm text-neutral-600">Projects Delivered</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent-500">2000+</div>
                  <div className="text-sm text-neutral-600">Happy Families</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent-500">98%</div>
                  <div className="text-sm text-neutral-600">Satisfaction Rate</div>
                </div>
              </div>
            </div>

            {/* Right: 3D Viewer Preview */}
            <div className="relative fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="aspect-square lg:aspect-auto lg:h-[600px]">
                <FlatViewer />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-neutral-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* Full-Width 3D Experience Section */}
      <section id="3d-tour" className="section-padding bg-neutral-900 text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Walk Through Your Future Home</h2>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              Take control and explore the flat in first-person view. Use WASD to walk through 
              each room and experience the space like you're actually there.
            </p>
          </div>

          {/* Full-width 3D Viewer with FPP */}
          <div className="w-full h-[70vh] max-h-[800px]">
            <FlatViewer firstPersonMode={true} />
          </div>
        </div>
      </section>

      {/* EMI Calculator Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Calculate Your EMI</h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Plan your dream home purchase with our interactive EMI calculator. 
              Get instant estimates for your monthly payments.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <EMICalculator />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Why Choose HavenEstate?</h2>
            <p className="text-body max-w-2xl mx-auto">
              We're not just building homes, we're crafting experiences and creating 
              communities where memories are made.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-8 rounded-2xl glass-effect hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🏗️</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
              <p className="text-neutral-600">
                Built with the finest materials and attention to every detail, ensuring 
                lasting value and comfort.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-8 rounded-2xl glass-effect hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Prime Locations</h3>
              <p className="text-neutral-600">
                Strategically located properties with easy access to schools, hospitals, 
                and entertainment hubs.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-8 rounded-2xl glass-effect hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Modern Amenities</h3>
              <p className="text-neutral-600">
                State-of-the-art facilities including gym, pool, clubhouse, and 24/7 
                security for your peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Disclaimer Section */}
      <DemoDisclaimer />

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-accent-500 to-accent-600 text-white">
        <div className="container-custom text-center">
          <h2 className="heading-lg mb-6">Ready to Find Your Dream Home?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Schedule a site visit or talk to our expert consultants to learn more about 
            our premium properties.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => window.location.href = '/contact'}
            >
              Contact Us Today
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.location.href = '/floor-plans'}
              className="border-white text-white hover:bg-white hover:text-accent-500"
            >
              View Floor Plans
            </Button>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <WhatsAppButton 
        phoneNumber="919876543210"
        message="Hi, I'm interested in your premium properties. I'd love to schedule a visit!"
      />
    </div>
  );
};

export default HomePage;
