import React from 'react';
import Button from './Button';

/**
 * Demo Disclaimer Section Component
 * Showcases that this is a customizable demo by KMATS
 */
const DemoDisclaimer = () => {
  return (
    <section className="section-padding bg-neutral-100">
      <div className="container-custom">
        {/* Main Card */}
        <div className="relative rounded-3xl p-8 md:p-12 lg:p-16 glass-effect border-2 border-transparent bg-gradient-to-br from-accent-50 via-white to-accent-50 shadow-soft">
          {/* Decorative gradient border effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent-400 via-accent-500 to-accent-600 opacity-10 pointer-events-none"></div>
          
          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 bg-accent-500 text-white rounded-full text-sm font-semibold mb-4">
                ✨ Demo Showcase
              </div>
              <h2 className="heading-lg mb-4">This is a Customizable Demo</h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                This website demonstrates the capabilities of KMATS' real estate platform. 
                Every aspect can be customized to match your brand, requirements, and vision.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {/* Feature 1 */}
              <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-accent-400 to-accent-600 rounded-xl flex items-center justify-center text-2xl">
                  🎨
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Fully Customizable</h3>
                  <p className="text-neutral-600 text-sm">
                    Tailored to your brand identity, color schemes, and business requirements.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-accent-400 to-accent-600 rounded-xl flex items-center justify-center text-2xl">
                  ⚡
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Modern Technology</h3>
                  <p className="text-neutral-600 text-sm">
                    Built with cutting-edge web technologies for optimal performance and user experience.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-accent-400 to-accent-600 rounded-xl flex items-center justify-center text-2xl">
                  🔧
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">KMATS Exclusive</h3>
                  <p className="text-neutral-600 text-sm">
                    Custom solutions designed and developed exclusively by the KMATS team.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-accent-400 to-accent-600 rounded-xl flex items-center justify-center text-2xl">
                  🚀
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Ready to Deploy</h3>
                  <p className="text-neutral-600 text-sm">
                    Production-ready architecture with scalability and security built-in from the ground up.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <p className="text-neutral-700 mb-6 font-medium">
                Interested in a custom solution for your real estate business?
              </p>
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => window.open('https://kmats.in', '_blank')}
              >
                Contact KMATS for Customization
              </Button>
            </div>
          </div>
        </div>

        {/* Branding Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-neutral-500">
            Powered by <span className="font-semibold text-accent-600">KMATS</span> – Building Digital Excellence
          </p>
        </div>
      </div>
    </section>
  );
};

export default DemoDisclaimer;
