import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contact Us
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions or need assistance? We're here to help. Get in touch with our team.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">Email</h3>
                <p className="text-gray-600">support@shopper.com</p>
                <p className="text-gray-600">sales@shopper.com</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 text-lg">Phone</h3>
                <p className="text-gray-600">+(855) 12345678</p>
                <p className="text-gray-600">Mon-Fri: 9AM-6PM EST</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 text-lg">Address</h3>
                <p className="text-gray-600">123 Fashion Street</p>
                <p className="text-gray-600">New York, NY 10001</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 text-lg">Live Chat</h3>
                <p className="text-gray-600">Available 24/7</p>
                <p className="text-gray-600">Instant support</p>
              </div>
            </div>

            {/* Store Location - Clean Design */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 text-lg mb-4">Visit Our Store</h3>
              <div className="bg-gray-100 rounded-lg overflow-hidden h-64 shadow-inner">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.595366487923!2d-73.98784412426463!3d40.72517723929229!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1690000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Our Store Location - 123 Fashion Street, New York, NY"
                ></iframe>
              </div>
              
              {/* Store Hours */}
              <div className="mt-4 bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Store Hours</h4>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div>Monday - Friday:</div>
                  <div className="text-right">9:00 AM - 8:00 PM</div>
                  <div>Saturday:</div>
                  <div className="text-right">10:00 AM - 7:00 PM</div>
                  <div>Sunday:</div>
                  <div className="text-right">11:00 AM - 6:00 PM</div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 text-lg mb-4">Response Time</h3>
              <p className="text-gray-600">We typically respond within 2 hours during business hours and 24 hours on weekends.</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Subject</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What is this regarding?"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
                Send Message
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">What is your return policy?</h3>
              <p className="text-gray-600">We offer 30-day returns on all items in original condition with tags attached.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">Do you ship internationally?</h3>
              <p className="text-gray-600">Yes, we ship to over 50 countries worldwide with various shipping options.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">How can I track my order?</h3>
              <p className="text-gray-600">Tracking information is sent to your email once your order ships.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">Do you offer bulk discounts?</h3>
              <p className="text-gray-600">Yes, contact our sales team for custom pricing on bulk orders.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;