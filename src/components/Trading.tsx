import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Check, Droplet, Factory, Truck, Globe, Shield, Clock, Zap, Database } from 'lucide-react';

type TradingService = {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  icon: string;
};

const iconMap: Record<string, any> = {
  'droplet': Droplet,
  'factory': Factory,
  'truck': Truck,
  'globe': Globe,
  'shield': Shield,
  'clock': Clock,
  'zap': Zap,
  'database': Database,
};

export default function Trading() {
  const [tradingServices, setTradingServices] = useState<TradingService[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [error, setError] = useState<string | null>(null);

  const categories = ['All', 'Oil', 'Water', 'Logistics', 'Services'];

  useEffect(() => {
    fetchTradingServices();
  }, []);

  const fetchTradingServices = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('trading_services')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      
      // Ensure features is always an array
      const services = (data || []).map(service => ({
        ...service,
        features: Array.isArray(service.features) ? service.features : []
      }));
      
      setTradingServices(services);
    } catch (err) {
      console.error('Error fetching trading services:', err);
      setError('Failed to load trading services. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = selectedCategory === 'All'
    ? tradingServices
    : tradingServices.filter(service => service.category === selectedCategory);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="trading" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trading Solutions
          </h2>
          <p className="text-xl text-gray-600">
            Reliable trading and distribution services for oil, water, and related products
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading trading services...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">
            <p>{error}</p>
            <button
              onClick={fetchTradingServices}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Retry
            </button>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No trading services found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => {
              const IconComponent = iconMap[service.icon] || Droplet;
              return (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-8 border border-gray-100"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <IconComponent className="text-blue-600" size={32} />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={scrollToContact}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Inquire Now
                </button>
              </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}