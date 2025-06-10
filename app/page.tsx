// "use client";

// import Hero from '@/components/sections/Hero';
// import AboutPreview from '@/components/sections/AboutPreview';
// import Services from '@/components/sections/Services';
// import ProjectsGallery from '@/components/sections/ProjectsGallery';
// import Testimonials from '@/components/sections/Testimonials';
// import ContactSection from '@/components/sections/ContactSection';

// export default function Home() {
//   return (
//     <main className="min-h-screen">
//       <Hero />
//       <AboutPreview />
//       <Services />
//       <ProjectsGallery />
//       <Testimonials />
//       <ContactSection />
//     </main>
//   )
// }

"use client";
import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, Building2, TrendingUp, ShoppingCart, MapPin, Star, ArrowRight, Phone, Mail, CheckCircle, Users, Award, Globe } from 'lucide-react';

const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const services = [
    {
      title: "Analyse des Affaires",
      icon: TrendingUp,
      description: "Optimisation stratégique et analyse de performance pour votre croissance",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "BTP",
      icon: Building2,
      description: "Construction et travaux publics avec expertise et qualité garantie",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Commerce Général",
      icon: ShoppingCart,
      description: "Solutions commerciales complètes pour développer votre activité",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Tourisme",
      icon: MapPin,
      description: "Services touristiques innovants pour des expériences mémorables",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const testimonials = [
    {
      name: "Marie Dubois",
      company: "TechStart SAS",
      text: "Leur expertise en analyse des affaires a transformé notre entreprise. Résultats exceptionnels !",
      rating: 5
    },
    {
      name: "Jean Martin",
      company: "Construction Plus",
      text: "Travaux BTP de qualité supérieure. Respect des délais et budget maîtrisé.",
      rating: 5
    },
    {
      name: "Sophie Laurent",
      company: "Voyage & Co",
      text: "Partenaire de confiance pour nos projets touristiques. Service impeccable.",
      rating: 5
    }
  ];

  const stats = [
    { number: "500+", label: "Projets Réalisés" },
    { number: "95%", label: "Satisfaction Client" },
    { number: "10+", label: "Années d'Expérience" },
    { number: "24/7", label: "Support Client" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      

      {/* Hero Section */}
      <section id="accueil" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
          <div className="absolute inset-0 bg-black/40"></div>
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-40 right-20 w-48 h-48 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-cyan-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Solutions
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Multi-Services</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-fade-in delay-300">
            Votre partenaire de confiance pour tous vos projets professionnels
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-500">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              Découvrir nos Services
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
              Nous Contacter
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover:scale-110 transition-transform duration-300">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Nos <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une gamme complète de services professionnels adaptés à vos besoins spécifiques
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <button className="flex items-center text-blue-600 font-semibold hover:text-purple-600 transition-colors">
                    En savoir plus
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="apropos" className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Pourquoi nous <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">choisir ?</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Avec plus de 10 ans d'expérience, nous sommes votre partenaire de confiance pour tous vos projets professionnels. Notre expertise multisectorielle nous permet d'offrir des solutions complètes et innovantes.
              </p>
              <div className="space-y-4">
                {[
                  "Expertise reconnue dans tous nos domaines",
                  "Équipe de professionnels qualifiés",
                  "Solutions personnalisées et innovantes",
                  "Support client 24/7"
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <Users className="w-12 h-12 mx-auto mb-4" />
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-blue-100">Clients Satisfaits</div>
                  </div>
                  <div className="text-center">
                    <Award className="w-12 h-12 mx-auto mb-4" />
                    <div className="text-2xl font-bold">15+</div>
                    <div className="text-blue-100">Prix Remportés</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ce que disent nos <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">clients</span>
            </h2>
          </div>

          <div className="relative">
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center">
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl text-gray-700 mb-6 italic">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              <div>
                <div className="font-bold text-gray-900">{testimonials[currentTestimonial].name}</div>
                <div className="text-gray-600">{testimonials[currentTestimonial].company}</div>
              </div>
            </div>

            {/* Testimonial Navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Contactez-nous dès aujourd'hui pour un devis gratuit et personnalisé
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              Obtenir un Devis
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
              <Phone className="w-5 h-5 inline mr-2" />
              Nous Appeler
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default HomePage;