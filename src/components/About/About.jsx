import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About SHOPPER
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 leading-relaxed">
            Founded in 2020, SHOPPER has been at the forefront of bringing quality fashion 
            to customers worldwide. We believe that everyone deserves to express their 
            unique style with confidence and comfort.
          </p>
        </div>

        {/* Story Section */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                What started as a small boutique has grown into a trusted destination for 
                fashion enthusiasts. Our journey began with a simple mission: to make 
                high-quality clothing accessible to everyone.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we serve thousands of customers across the globe, offering 
                carefully curated collections that blend style, comfort, and affordability.
              </p>
            </div>
            <div className="h-80 rounded-lg overflow-hidden shadow-lg">
              <img 
                src='https://i.pinimg.com/1200x/87/45/f0/8745f0504cc610d1646c2cf443fe8847.jpg' 
                alt="Fashion collection"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality</h3>
              <p className="text-gray-600">
                We source the finest materials and maintain strict quality control 
                to ensure every product meets our high standards.
              </p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer First</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We're committed to providing 
                exceptional service and support.
              </p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600">
                We continuously evolve with fashion trends while staying true to 
                our core values and commitment to excellence.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50,000+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">100+</div>
              <div className="text-gray-600">Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">3</div>
              <div className="text-gray-600">Years</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>

        {/* Commitment Section */}
        <div className="text-center bg-gray-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Commitment</h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto mb-8">
            We're dedicated to creating a shopping experience that's seamless, enjoyable, 
            and trustworthy. From our product selection to customer service, every aspect 
            of SHOPPER is designed with you in mind.
          </p>
          <Link to={'/contact'}>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
                Contact Our Team
            </button>
          </Link>

        </div>

      </div>
    </div>
  );
};

export default About;