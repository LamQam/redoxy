import { Check, Star } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      name: 'Essential',
      price: 'Contact Us',
      description: 'Perfect for small-scale operations and initial consultations',
      features: [
        'Basic environmental assessment',
        'Compliance consulting',
        'Quarterly inspections',
        'Email support',
        'Standard response time',
        'Basic documentation'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: 'Contact Us',
      description: 'Comprehensive solutions for established industrial facilities',
      features: [
        'Full environmental management',
        'Monthly maintenance services',
        'Hazardous waste treatment',
        'Priority phone support',
        'Rapid emergency response',
        'Detailed reporting & analytics',
        'ISO compliance assistance',
        'Quarterly performance reviews'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Tailored solutions for large-scale industrial operations',
      features: [
        'Dedicated account manager',
        'Custom service packages',
        'Advanced waste treatment solutions',
        '24/7 emergency support',
        'Real-time monitoring systems',
        'Complete regulatory compliance',
        'Full ISO certification support',
        'Monthly strategy consultations',
        'Priority service scheduling',
        'Custom training programs'
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Flexible Pricing Plans
          </h2>
          <p className="text-xl text-gray-600">
            Choose the perfect plan for your industrial and environmental needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-8 relative ${
                plan.popular ? 'ring-2 ring-blue-600 scale-105 md:scale-110' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star size={14} className="fill-white" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-blue-600">{plan.price}</span>
                </div>
                <p className="text-gray-600 text-sm">{plan.description}</p>
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-gray-600 mb-6">
              Every industrial facility has unique requirements. Contact us to discuss a customized
              service package that perfectly matches your operational needs and budget.
            </p>
            <button
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Request Custom Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
