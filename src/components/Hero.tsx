import { ArrowRight, Shield, Clock, Award } from 'lucide-react';

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-24 pb-16 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Revolutionizing Industrial Engineering with{' '}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Cutting-Edge Innovations
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Welcome to REDOXY — pioneers in advanced hazardous waste treatment in Jubail, Saudi Arabia. From chemical oxidation to wastewater evaporation, we deliver sustainable solutions for a better tomorrow.          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={scrollToContact}
              className="bg-primary-orange text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 text-lg font-semibold shadow-lg hover:shadow-xl"
            >
              Get Started
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-primary-orange px-8 py-4 rounded-lg hover:bg-gray-50 transition border-2 border-primary-orange text-lg font-semibold"
            >
              View Services
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="text-blue-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Certified Excellence</h3>
              <p className="text-gray-600 text-sm">
                Triple ISO certification ensuring quality and safety
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="text-blue-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">
                Round-the-clock technical assistance and emergency response
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="text-blue-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Industry Leaders</h3>
              <p className="text-gray-600 text-sm">
                Trusted by 20+ industrial facilities across the region
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
