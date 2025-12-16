/**
 * WhatsApp helper utilities
 */

/**
 * Generate WhatsApp URL with pre-filled message
 */
export const generateWhatsAppURL = (phoneNumber, message) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

/**
 * Property-specific message templates
 */
export const messageTemplates = {
  general: (propertyName = 'your properties') => 
    `Hi, I'm interested in ${propertyName}. Please share more details.`,
  
  siteVisit: (propertyName, date = '') => 
    `Hi, I'd like to schedule a site visit for ${propertyName}${date ? ` on ${date}` : ''}. Please confirm availability.`,
  
  pricing: (propertyName) =>
    `Hi, I need detailed pricing information for ${propertyName}. Please share the complete price list.`,
  
  brochure: (propertyName) =>
    `Hi, please send me the brochure for ${propertyName}.`,
  
  emiQuery: (propertyName, emi) =>
    `Hi, I calculated an EMI of ₹${emi.toLocaleString('en-IN')} for ${propertyName}. Can you help me with the loan process?`,
  
  comparison: (properties) =>
    `Hi, I'm comparing ${properties.join(', ')}. Can you help me understand the key differences?`
};

/**
 * Open WhatsApp with message
 */
export const openWhatsApp = (phoneNumber, message) => {
  const url = generateWhatsAppURL(phoneNumber, message);
  window.open(url, '_blank');
  
  // Track in localStorage
  trackWhatsAppClick();
};

/**
 * Track WhatsApp clicks
 */
export const trackWhatsAppClick = () => {
  try {
    const clicks = JSON.parse(localStorage.getItem('whatsapp_clicks') || '0');
    localStorage.setItem('whatsapp_clicks', JSON.stringify(clicks + 1));
    localStorage.setItem('last_whatsapp_click', new Date().toISOString());
  } catch (error) {
    console.error('Failed to track WhatsApp click:', error);
  }
};

/**
 * Get WhatsApp click statistics
 */
export const getWhatsAppStats = () => {
  try {
    return {
      totalClicks: JSON.parse(localStorage.getItem('whatsapp_clicks') || '0'),
      lastClick: localStorage.getItem('last_whatsapp_click')
    };
  } catch (error) {
    return { totalClicks: 0, lastClick: null };
  }
};
