import React, { useState, useEffect } from 'react';

/**
 * Smart Contact Form with auto-save to localStorage
 */
const ContactForm = ({ onSubmit, propertyName = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyInterest: propertyName,
    preferredContact: 'phone',
    message: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Auto-save to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('contact_form_draft');
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (error) {
        console.error('Failed to load saved form data:', error);
      }
    }
  }, []);

  // Save on every change
  useEffect(() => {
    if (!submitted) {
      localStorage.setItem('contact_form_draft', JSON.stringify(formData));
    }
  }, [formData, submitted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save to submissions history
    const submissions = JSON.parse(localStorage.getItem('form_submissions') || '[]');
    const submission = {
      ...formData,
      timestamp: new Date().toISOString(),
      id: Date.now()
    };
    submissions.push(submission);
    localStorage.setItem('form_submissions', JSON.stringify(submissions));
    
    // Clear draft
    localStorage.removeItem('contact_form_draft');
    
    setSubmitted(true);
    if (onSubmit) onSubmit(formData);
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-neutral-900 mb-2">Thank You!</h3>
        <p className="text-neutral-600 mb-6">
          We've saved your inquiry. Our team will contact you soon via {formData.preferredContact}.
        </p>
        
        <div className="bg-neutral-50 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm font-semibold text-neutral-700 mb-2">Your Details:</p>
          <p className="text-sm text-neutral-600">Name: {formData.name}</p>
          <p className="text-sm text-neutral-600">Email: {formData.email}</p>
          <p className="text-sm text-neutral-600">Phone: {formData.phone}</p>
          {formData.propertyInterest && (
            <p className="text-sm text-neutral-600">Property: {formData.propertyInterest}</p>
          )}
        </div>
        
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: '',
              email: '',
              phone: '',
              propertyInterest: propertyName,
              preferredContact: 'phone',
              message: ''
            });
            setCurrentStep(1);
          }}
          className="btn-secondary"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-xl">
      <h3 className="text-2xl font-bold text-neutral-900 mb-6">Get in Touch</h3>
      
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              currentStep >= step
                ? 'bg-accent-500 text-white'
                : 'bg-neutral-200 text-neutral-500'
            }`}>
              {step}
            </div>
            {step < 3 && (
              <div className={`h-1 flex-1 mx-2 ${
                currentStep > step ? 'bg-accent-500' : 'bg-neutral-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Personal Info */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none"
              placeholder="10-digit mobile number"
            />
          </div>

          <button
            type="button"
            onClick={nextStep}
            disabled={!formData.name || !formData.email || !formData.phone}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next Step →
          </button>
          
          <p className="text-xs text-neutral-500 text-center">
            💾 Your progress is auto-saved
          </p>
        </div>
      )}

      {/* Step 2: Property Interest */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Property Interest
            </label>
            <select
              name="propertyInterest"
              value={formData.propertyInterest}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none"
            >
              <option value="">Select a property</option>
              <option value="Skyline Towers A">Skyline Towers A - 2 BHK</option>
              <option value="Skyline Towers B">Skyline Towers B - 3 BHK</option>
              <option value="Garden Heights">Garden Heights - 3 BHK</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Preferred Contact Method
            </label>
            <div className="grid grid-cols-3 gap-4">
              {['phone', 'email', 'whatsapp'].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, preferredContact: method }))}
                  className={`py-3 px-4 rounded-lg text-sm font-medium capitalize transition-colors ${
                    formData.preferredContact === method
                      ? 'bg-accent-500 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={prevStep}
              className="flex-1 btn-secondary"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="flex-1 btn-primary"
            >
              Next Step →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Message & Submit */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Additional Message (Optional)
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none resize-none"
              placeholder="Any specific requirements or questions..."
            />
          </div>

          <div className="bg-accent-50 rounded-lg p-4">
            <p className="text-sm text-accent-900 font-semibold mb-2">Review Your Details:</p>
            <p className="text-sm text-neutral-700">📍 {formData.name}</p>
            <p className="text-sm text-neutral-700">📧 {formData.email}</p>
            <p className="text-sm text-neutral-700">📞 {formData.phone}</p>
            {formData.propertyInterest && (
              <p className="text-sm text-neutral-700">🏠 {formData.propertyInterest}</p>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={prevStep}
              className="flex-1 btn-secondary"
            >
              ← Back
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary"
            >
              Submit Inquiry ✓
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
