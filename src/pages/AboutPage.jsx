import React from 'react';

/**
 * About page
 */
const AboutPage = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-neutral-50 to-primary-50">
        <div className="container-custom text-center">
          <h1 className="heading-xl mb-6">About HavenEstate</h1>
          <p className="text-body max-w-3xl mx-auto">
            For over two decades, we've been transforming skylines and creating homes 
            that families cherish for generations.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-md mb-6">Our Story</h2>
              <div className="space-y-4 text-body">
                <p>
                  Founded in 2000, HavenEstate began with a simple vision: to build homes 
                  that embody quality, comfort, and sustainability. What started as a small 
                  team of passionate architects and engineers has grown into one of the 
                  region's most trusted real estate developers.
                </p>
                <p>
                  Today, we've delivered over 50 prestigious projects, housing more than 
                  2,000 happy families. Our commitment to excellence, innovation, and 
                  customer satisfaction remains unwavering.
                </p>
                <p>
                  We believe in creating not just buildings, but thriving communities 
                  where people can live, work, and make memories that last a lifetime.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop"
                alt="Modern building"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <h2 className="heading-md text-center mb-12">Our Core Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">💎</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality</h3>
              <p className="text-neutral-600 text-sm">
                No compromises on materials, design, or construction standards.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🤝</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Trust</h3>
              <p className="text-neutral-600 text-sm">
                Transparent communication and honest relationships with our clients.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🌱</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Sustainability</h3>
              <p className="text-neutral-600 text-sm">
                Eco-friendly practices and green building certifications.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">💡</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Innovation</h3>
              <p className="text-neutral-600 text-sm">
                Embracing technology like 3D tours to enhance customer experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="heading-md text-center mb-12">Leadership Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team member 1 */}
            <div className="text-center">
              <div className="w-32 h-32 bg-neutral-200 rounded-full mx-auto mb-4 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop"
                  alt="CEO"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">John Anderson</h3>
              <p className="text-accent-500 font-medium">Chief Executive Officer</p>
              <p className="text-neutral-600 text-sm mt-2">
                25+ years in real estate development
              </p>
            </div>

            {/* Team member 2 */}
            <div className="text-center">
              <div className="w-32 h-32 bg-neutral-200 rounded-full mx-auto mb-4 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop"
                  alt="COO"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">Sarah Mitchell</h3>
              <p className="text-accent-500 font-medium">Chief Operating Officer</p>
              <p className="text-neutral-600 text-sm mt-2">
                Expert in project management and operations
              </p>
            </div>

            {/* Team member 3 */}
            <div className="text-center">
              <div className="w-32 h-32 bg-neutral-200 rounded-full mx-auto mb-4 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop"
                  alt="Chief Architect"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">David Chen</h3>
              <p className="text-accent-500 font-medium">Chief Architect</p>
              <p className="text-neutral-600 text-sm mt-2">
                Award-winning architect and urban planner
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
