import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MoreAbout = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: "500+", label: "Happy Guests", icon: "🏠" },
    { number: "50+", label: "Premium Properties", icon: "⭐" },
    { number: "24/7", label: "Support Available", icon: "🛎️" },
    { number: "98%", label: "Satisfaction Rate", icon: "💯" }
  ];

  const features = [
    {
      icon: "🎯",
      title: "Curated Selection",
      description: "Every property is handpicked to ensure the highest quality and comfort for our guests."
    },
    {
      icon: "🔒",
      title: "Secure Booking",
      description: "Your safety and security are our top priorities with verified properties and secure payments."
    },
    {
      icon: "🌟",
      title: "Premium Experience",
      description: "From luxury amenities to personalized service, we deliver exceptional experiences."
    },
    {
      icon: "📱",
      title: "Easy Booking",
      description: "Simple, fast, and user-friendly booking process that takes just minutes to complete."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Business Traveler",
      content: "Homehubstay made my business trips so much more comfortable. The apartments are always clean and well-maintained.",
      rating: 5
    },
    {
      name: "Ahmed Hassan",
      role: "Family Vacation",
      content: "Perfect for our family vacation! The kids loved the amenities and we enjoyed the spacious living areas.",
      rating: 5
    },
    {
      name: "Maria Garcia",
      role: "Long-term Renter",
      content: "I've been staying with Homehubstay for 6 months now. The service is consistently excellent and the properties are beautiful.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className={`relative bg-gradient-to-r from-[#b79264] via-[#a67d47] to-[#8b6b3a] text-white py-20 overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="mb-8 animate-fade-in">
            <img 
              src="https://res.cloudinary.com/dwul2hfvj/image/upload/v1754079184/nisaiczumni7wpxc3idd.jpg" 
              alt="Homehubstay Logo" 
              className="w-20 h-20 rounded-full mx-auto mb-6 shadow-lg animate-bounce"
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-slide-up">
            Discover
            <span className="block text-yellow-300">Homehubstay</span>
          </h1>
          
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-yellow-100 animate-slide-up-delay">
            Where luxury meets comfort, and every stay becomes a memorable experience
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up-delay-2">
            <Link
              to="/apartments"
              className="bg-white text-[#b79264] px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Explore Properties
            </Link>
            <a
              href="https://wa.me/923041513361"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[#b79264] transition-all duration-300 transform hover:scale-105"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-all duration-300"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-[#b79264] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Why Choose <span className="text-[#b79264]">Homehubstay</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another rental platform. We're your trusted partner in creating unforgettable stays.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-5xl mb-6 text-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#b79264] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Our Guests Say
            </h2>
            <p className="text-xl text-yellow-100 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our satisfied guests have to say about their experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-300 text-xl">⭐</span>
                  ))}
                </div>
                <p className="text-lg mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-bold text-lg">{testimonial.name}</div>
                  <div className="text-yellow-100">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Experience <span className="text-[#b79264]">Homehubstay</span>?
          </h2>
          
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of satisfied guests who have discovered their perfect home away from home.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/apartments"
              className="bg-[#b79264] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#a67d47] transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Your Journey
            </Link>
            <a
              href="https://wa.me/923041513361"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-[#b79264] text-[#b79264] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#b79264] hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MoreAbout; 