import { useEffect, useState } from 'react';
import { supabase, Testimonial } from '../lib/supabase';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_featured', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={18}
        className={index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Client Testimonials
          </h2>
          <p className="text-xl text-gray-600">
            Trusted by industry leaders across Saudi Arabia and the Gulf region
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md hover:shadow-xl transition p-8 border border-gray-100 relative"
              >
                <div className="absolute top-6 right-6 opacity-10">
                  <Quote size={48} className="text-blue-600" />
                </div>

                <div className="flex gap-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed italic relative z-10">
                  "{testimonial.content}"
                </p>

                <div className="border-t border-gray-200 pt-4">
                  <p className="font-semibold text-gray-900 mb-1">
                    {testimonial.client_name}
                  </p>
                  <p className="text-sm text-gray-600">{testimonial.position}</p>
                  <p className="text-sm text-blue-600 font-medium mt-1">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <div className="inline-block bg-blue-50 rounded-2xl p-8 border border-blue-100">
            <p className="text-gray-700 text-lg mb-4">
              Join satisfied clients who trust REDOXY for their industrial and environmental needs
            </p>
            <button
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-primary-orange text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Become a Client
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
