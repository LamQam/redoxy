import { useEffect, useState } from 'react';
import { supabase, Service, ServiceInquiry } from '../lib/supabase';
import {
  AlertTriangle,
  Droplet,
  Leaf,
  Wind,
  Settings,
  GitBranch,
  Shield,
  Compass,
  Wrench,
  Check,
  X,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const iconMap: Record<string, any> = {
  'alert-triangle': AlertTriangle,
  'droplet': Droplet,
  'leaf': Leaf,
  'wind': Wind,
  'settings': Settings,
  'git-branch': GitBranch,
  'shield': Shield,
  'compass': Compass,
  'wrench': Wrench,
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [inquiryStatus, setInquiryStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [inquiryError, setInquiryError] = useState('');
  const [formData, setFormData] = useState<Omit<ServiceInquiry, 'service_id' | 'status'>>({
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    project_details: '',
    urgency: 'medium'
  });

  const categories = ['All', 'Waste Treatment', 'Environmental', 'Industrial','Trading', 'Other'];

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      console.log('Fetching services from Supabase...');
      const { data, error, status } = await supabase
        .from('services')
        .select('*')
        .order('category', { ascending: true });

      console.log('Supabase response:', { status, data, error });
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      setServices(data || []);
      console.log('Services loaded:', data?.length || 0);
    } catch (error) {
      console.error('Error in fetchServices:', error);
      // You might want to set an error state to show to the user
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = selectedCategory === 'All'
    ? services
    : services.filter(service => service.category === selectedCategory);

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600">
            Comprehensive industrial and environmental engineering solutions tailored to your needs
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                selectedCategory === category
                  ? 'bg-primary-orange text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => {
              const IconComponent = iconMap[service.icon] || Wrench;
              return (
                <div
                  key={service.id}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md hover:shadow-xl transition p-8 border border-gray-100"
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

                  <div className="space-y-2">
                    {service.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      const element = document.getElementById('contact');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                  >
                    Request Quote
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
