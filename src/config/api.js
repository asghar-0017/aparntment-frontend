const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'https://aparntment-rental-frontend.vercel.app',
  endpoints: {
    getApartments: '/get-apparntment',
    getApartmentById: '/apartments',
    bookApartment: '/book',
    reportIssue: '/report',
    shortenUrl: '/shorten-url'
  }
};

export default API_CONFIG; 