import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I book an apartment through Homehubstay?",
      answer: "Booking an apartment is simple! Browse our available properties, select your preferred dates, and click the 'Book Now' button. You'll be guided through our secure booking process where you can review details and complete your reservation."
    },
    {
      question: "What documents do I need to rent an apartment?",
      answer: "Typically, you'll need a valid government ID, proof of income (pay stubs or bank statements), and references from previous landlords. Some properties may require additional documentation. We'll guide you through the specific requirements for your chosen property."
    },
    {
      question: "Can I cancel my booking?",
      answer: "Yes, you can cancel your booking according to our cancellation policy. Most bookings can be cancelled up to 24 hours before check-in for a full refund. Please review the specific cancellation terms for your chosen property."
    },
    {
      question: "Are utilities included in the rent?",
      answer: "Utility inclusion varies by property. Some apartments include basic utilities like water and electricity, while others may require you to set up your own accounts. All utility details are clearly listed in each property's description."
    },
    {
      question: "How do I contact customer support?",
      answer: "Our customer support team is available 24/7. You can reach us via WhatsApp at +923041513361, email at Sheerazahmed801@yahoo.com, or through our contact form. We're here to help with any questions or concerns!"
    },
    {
      question: "What happens if there's an issue with my apartment?",
      answer: "If you encounter any issues during your stay, please contact us immediately. We have a dedicated maintenance team that responds quickly to resolve problems. Your comfort and satisfaction are our top priorities."
    },
    {
      question: "Do you offer long-term rentals?",
      answer: "Yes! We offer both short-term and long-term rental options. Whether you need a place for a few days or several months, we have flexible arrangements to suit your needs. Contact us to discuss your specific requirements."
    },
    {
      question: "Are pets allowed in the apartments?",
      answer: "Pet policies vary by property. Some apartments are pet-friendly, while others may have restrictions. Please check the property details or contact us to confirm the pet policy for your chosen apartment."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#b79264] to-[#a67d47] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Find answers to common questions about renting with Homehubstay
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 last:border-b-0">
              <button
                className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-semibold text-gray-800 pr-4">
                  {faq.question}
                </h3>
                <svg
                  className={`w-6 h-6 text-[#b79264] transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-8 pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? Our team is here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/923041513361"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Chat on WhatsApp
            </a>
            <a
              href="mailto:Sheerazahmed801@yahoo.com"
              className="bg-[#b79264] hover:bg-[#a67d47] text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send Email
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-[#b79264] rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Browse Properties</h3>
            <p className="text-gray-600 text-sm">
              Explore our collection of carefully curated apartments
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-[#b79264] rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Need Help?</h3>
            <p className="text-gray-600 text-sm">
              Our support team is available 24/7 to assist you
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-[#b79264] rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Quick Response</h3>
            <p className="text-gray-600 text-sm">
              Get instant answers to your questions via WhatsApp
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 