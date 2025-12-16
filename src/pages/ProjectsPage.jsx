import React from 'react';
import Button from '../components/common/Button';

/**
 * Projects page
 */
const ProjectsPage = () => {
  const projects = [
    {
      id: 1,
      name: 'Skyline Residences',
      location: 'Downtown District',
      status: 'Completed',
      units: 120,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      description: 'Luxury high-rise apartments with panoramic city views.',
    },
    {
      id: 2,
      name: 'Green Valley Estates',
      location: 'Suburban Hills',
      status: 'Ongoing',
      units: 85,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
      description: 'Eco-friendly villas surrounded by lush greenery.',
    },
    {
      id: 3,
      name: 'Marina Bay Towers',
      location: 'Waterfront',
      status: 'Completed',
      units: 200,
      image: 'https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=800&h=600&fit=crop',
      description: 'Prestigious waterfront living with world-class amenities.',
    },
    {
      id: 4,
      name: 'Heritage Gardens',
      location: 'Old Town',
      status: 'Completed',
      units: 60,
      image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop',
      description: 'Classic architecture meets modern comfort.',
    },
    {
      id: 5,
      name: 'Tech Park Apartments',
      location: 'IT Corridor',
      status: 'Ongoing',
      units: 150,
      image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&h=600&fit=crop',
      description: 'Smart homes for the digital generation.',
    },
    {
      id: 6,
      name: 'Sunset Horizon',
      location: 'Coastal Avenue',
      status: 'Planning',
      units: 95,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
      description: 'Beachfront luxury condominiums - Coming Soon.',
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-neutral-50 to-primary-50">
        <div className="container-custom text-center">
          <h1 className="heading-xl mb-6">Our Projects</h1>
          <p className="text-body max-w-3xl mx-auto">
            Discover our portfolio of exceptional residential developments across prime 
            locations. Each project is a testament to our commitment to quality and innovation.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group rounded-2xl overflow-hidden shadow-soft hover:shadow-2xl transition-all duration-300 bg-white"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        project.status === 'Completed'
                          ? 'bg-green-500 text-white'
                          : project.status === 'Ongoing'
                          ? 'bg-accent-500 text-white'
                          : 'bg-neutral-500 text-white'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-neutral-900">
                    {project.name}
                  </h3>
                  <p className="text-sm text-accent-500 font-medium mb-3">
                    📍 {project.location}
                  </p>
                  <p className="text-neutral-600 text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                    <span className="text-sm text-neutral-600">
                      <strong>{project.units}</strong> Units
                    </span>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-neutral-900 text-white">
        <div className="container-custom text-center">
          <h2 className="heading-lg mb-6">Interested in Our Projects?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Get in touch with our sales team to learn more about availability, pricing, 
            and payment plans.
          </p>
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => window.location.href = '/contact'}
          >
            Contact Sales Team
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
