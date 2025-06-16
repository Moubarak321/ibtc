import React from 'react';
import { BarChart3, Building2, ShoppingBag, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

const ServicesSection = () => {
  const services = [
    {
      icon: BarChart3,
      title: "Analyse des Affaires",
      description: "Stratégies personnalisées pour optimiser vos performances et accélérer votre croissance.",
      features: ["Audit complet", "Stratégie digitale", "Optimisation des processus"],
      slug: "/services/analyse-des-affaires"
    },
    {
      icon: Building2,
      title: "BTP & Construction",
      description: "Solutions complètes pour vos projets de construction et travaux publics.",
      features: ["Gestion de projet", "Études techniques", "Suivi de chantier"],
      slug: "/services/btp"
    },
    {
      icon: ShoppingBag,
      title: "Commerce Général",
      description: "Développement commercial et solutions e-commerce pour votre entreprise.",
      features: ["E-commerce", "Marketing digital", "Gestion des ventes"],
      slug: "/services/commerce-general"
    },
    {
      icon: MapPin,
      title: "Tourisme",
      description: "Services touristiques innovants pour valoriser votre destination.",
      features: ["Promotion touristique", "Événementiel", "Hébergement"],
      slug: "/services/tourisme"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardItem = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <section id="servicesSection" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Nos <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une expertise multi-sectorielle pour répondre à tous vos besoins professionnels
            </p>
          </motion.div>
        </AnimatedSection>
        
        <AnimatedSection>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={cardItem}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
              >
                {/* Effet de fond animé au hover */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ opacity: 0 }}
                />
                
                <div className="relative z-10">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-500"
                    whileHover={{ scale: 1.1 }}
                  >
                    <service.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <motion.li 
                        key={featureIndex} 
                        className="flex items-center text-sm text-gray-500"
                        initial={{ x: -10, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 * featureIndex, duration: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                  
                  <motion.a
                    href={service.slug}
                    className="mt-6 inline-block text-blue-600 font-semibold hover:text-purple-600 transition-colors"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    En savoir plus →
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ServicesSection;