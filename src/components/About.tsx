import { Target, Eye, Lightbulb, Globe } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About REDOXY
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your trusted partner in industrial engineering and environmental solutions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Target className="text-blue-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide innovative, sustainable, and reliable industrial engineering solutions that protect
                the environment while ensuring operational excellence. We are committed to delivering cutting-edge
                waste treatment and environmental services that meet the highest international standards.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Eye className="text-blue-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the leading provider of industrial and environmental engineering services in the Middle East,
                recognized for our technical excellence, innovation, and unwavering commitment to sustainability
                and safety. We aspire to set new industry benchmarks in every project we undertake.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose REDOXY?</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="text-blue-600" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Innovation First</h4>
                  <p className="text-gray-600">
                    We leverage cutting-edge technologies and methodologies to deliver superior results
                    that exceed industry standards.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="text-blue-600" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Global Standards</h4>
                  <p className="text-gray-600">
                    Triple ISO certification ensures we maintain the highest levels of quality,
                    environmental, and safety management.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="text-green-600 font-bold text-xl">24/7</div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Always Available</h4>
                  <p className="text-gray-600">
                    Our dedicated support team is available round-the-clock to handle emergencies
                    and ensure uninterrupted operations.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="text-green-600 font-bold text-xl">5+</div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Years of Excellence</h4>
                  <p className="text-gray-600">
                    Proven track record serving major industrial facilities across Saudi Arabia
                    and the wider Gulf region.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <p className="text-center text-gray-700 leading-relaxed">
                <span className="font-semibold">Located in Jubail, Saudi Arabia</span>, we serve the heart of the Kingdom's
                industrial sector with specialized expertise in hazardous waste treatment, environmental compliance,
                and industrial maintenance services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
