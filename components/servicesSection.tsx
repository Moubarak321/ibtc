import React from 'react';
import { BarChart3, Building2, ShoppingBag, MapPin } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: BarChart3,
      title: "Analyse des Affaires",
      description: "Stratégies personnalisées pour optimiser vos performances et accélérer votre croissance.",
      features: ["Audit complet", "Stratégie digitale", "Optimisation des processus"],
      slug : "/services/analyse-des-affaires"
    },
    {
      icon: Building2,
      title: "BTP & Construction",
      description: "Solutions complètes pour vos projets de construction et travaux publics.",
      features: ["Gestion de projet", "Études techniques", "Suivi de chantier"],
      slug : "/services/btp"
    },
    {
      icon: ShoppingBag,
      title: "Commerce Général",
      description: "Développement commercial et solutions e-commerce pour votre entreprise.",
      features: ["E-commerce", "Marketing digital", "Gestion des ventes"],
      slug : "/services/commerce-general"
    },
    {
      icon: MapPin,
      title: "Tourisme",
      description: "Services touristiques innovants pour valoriser votre destination.",
      features: ["Promotion touristique", "Événementiel", "Hébergement"],
      slug : "/services/tourisme"
    }
  ];

  return (
    <section id="servicesSection" className="py-20 bg-gray-50 ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nos <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une expertise multi-sectorielle pour répondre à tous vos besoins professionnels
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <service.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-500">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className="mt-6 text-blue-600 font-semibold hover:text-purple-600 transition-colors">
               
                <a href={service.slug} className="mt-6 text-blue-600 font-semibold hover:text-purple-600 transition-colors">
                 En savoir plus →
                </a>
              </button>
            </div>
          )
          
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;