import API_CONFIG from '../config/api.js';

class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.baseURL;
    this.endpoints = API_CONFIG.endpoints;
  }

  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    const requestOptions = { ...defaultOptions, ...options };

    try {
      const response = await fetch(url, requestOptions);
      
      // Check if response is HTML (error page)
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('text/html')) {
        throw new Error('API endpoint not found or server error');
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async getApartments() {
    return this.makeRequest(this.endpoints.getApartments);
  }

  async getApartmentById(id) {
    return this.makeRequest(`${this.endpoints.getApartmentById}/${id}`);
  }

  async bookApartment(bookingData) {
    return this.makeRequest(this.endpoints.bookApartment, {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  async reportIssue(reportData) {
    return this.makeRequest(this.endpoints.reportIssue, {
      method: 'POST',
      body: JSON.stringify(reportData),
    });
  }

  async shortenUrl(urlData) {
    return this.makeRequest(this.endpoints.shortenUrl, {
      method: 'POST',
      body: JSON.stringify(urlData),
    });
  }
}

export default new ApiService(); 