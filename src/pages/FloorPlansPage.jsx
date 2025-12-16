import React, { useState } from 'react';
import Button from '../components/common/Button';

/**
 * Floor Plans page
 */
const FloorPlansPage = () => {
  const [selectedType, setSelectedType] = useState('all');

  const floorPlans = [
    {
      id: 1,
      type: '1BHK',
      area: '650 sq.ft',
      bedrooms: 1,
      bathrooms: 1,
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
    },
    {
      id: 2,
      type: '2BHK',
      area: '950 sq.ft',
      bedrooms: 2,
      bathrooms: 2,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    },
    {
      id: 3,
      type: '2BHK',
      area: '1100 sq.ft',
      bedrooms: 2,
      bathrooms: 2,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    },
    {
      id: 4,
      type: '3BHK',
      area: '1450 sq.ft',
      bedrooms: 3,
      bathrooms: 3,
      image: 'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&h=600&fit=crop',
    },
    {
      id: 5,
      type: '3BHK',
      area: '1650 sq.ft',
      bedrooms: 3,
      bathrooms: 3,
      image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop',
    },
    {
      id: 6,
      type: '4BHK',
      area: '2200 sq.ft',
      bedrooms: 4,
      bathrooms: 4,
      image: 'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&h=600&fit=crop',
    },
  ];

  const types = ['all', '1BHK', '2BHK', '3BHK', '4BHK'];

  const filteredPlans =
    selectedType === 'all'
      ? floorPlans
      : floorPlans.filter((plan) => plan.type === selectedType);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-neutral-50 to-primary-50">
        <div className="container-custom text-center">
          <h1 className="heading-xl mb-6">Floor Plans</h1>
          <p className="text-body max-w-3xl mx-auto">
            Browse our thoughtfully designed floor plans. Each layout is optimized for 
            space, natural light, and modern living.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedType === type
                    ? 'bg-accent-500 text-white shadow-md'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100 shadow-sm'
                }`}
              >
                {type === 'all' ? 'All Plans' : type}
              </button>
            ))}
          </div>

          {/* Floor Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlans.map((plan) => (
              <div
                key={plan.id}
                className="group rounded-2xl overflow-hidden shadow-soft hover:shadow-2xl transition-all duration-300 bg-white"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-neutral-100">
                  <img
                    src={plan.image}
                    alt={`${plan.type} Floor Plan`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-accent-500 text-white rounded-full text-sm font-semibold">
                      {plan.type}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-4 text-neutral-900">
                    {plan.type} Apartment
                  </h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-600">Area</span>
                      <span className="font-semibold text-neutral-900">{plan.area}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-600">Bedrooms</span>
                      <span className="font-semibold text-neutral-900">
                        {plan.bedrooms} 🛏️
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-600">Bathrooms</span>
                      <span className="font-semibold text-neutral-900">
                        {plan.bathrooms} 🚿
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="primary" size="sm" className="flex-1">
                      Download PDF
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      3D Tour
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <h2 className="heading-md text-center mb-12">Standard Specifications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h4 className="font-semibold mb-2">Flooring</h4>
              <p className="text-neutral-600 text-sm">
                Premium vitrified tiles in living areas, anti-skid tiles in bathrooms
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h4 className="font-semibold mb-2">Kitchen</h4>
              <p className="text-neutral-600 text-sm">
                Modular kitchen with granite countertop and stainless steel sink
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h4 className="font-semibold mb-2">Bathroom</h4>
              <p className="text-neutral-600 text-sm">
                Premium sanitary fittings and hot & cold water supply
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h4 className="font-semibold mb-2">Electrical</h4>
              <p className="text-neutral-600 text-sm">
                Concealed copper wiring with modular switches
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h4 className="font-semibold mb-2">Doors & Windows</h4>
              <p className="text-neutral-600 text-sm">
                Hardwood doors with premium finish, UPVC windows
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h4 className="font-semibold mb-2">Painting</h4>
              <p className="text-neutral-600 text-sm">
                Premium acrylic emulsion with smooth finish
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FloorPlansPage;
