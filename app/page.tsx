"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X, Building2, TrendingUp, ShoppingCart, MapPin, Star, ArrowRight, Phone, Mail, CheckCircle, Users, Award, Globe, Eye, Zap, Shield, Target, MousePointer, Sparkles } from 'lucide-react';
import HeroSection from '@/components/heroSection';
import ServicesSection from '@/components/servicesSection';
import AboutSection from '@/components/aboutSection';
import ProjectsGallery from '@/components/projectsGallery';
import TestimonialsCarousel from '@/components/testimonialsCarousel';
import ContactSection from '@/components/contactSection';

const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeService, setActiveService] = useState<number | null>(null);
  const [visibleElements, setVisibleElements] = useState(new Set());
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
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
      color: "from-blue-500 to-cyan-500",
      details: ["Audit financier", "Stratégie de croissance", "Optimisation des processus"],
      bgPattern: "dots"
    },
    {
      title: "BTP",
      icon: Building2,
      description: "Construction et travaux publics avec expertise et qualité garantie",
      color: "from-orange-500 to-amber-500",
      details: ["Construction résidentielle", "Travaux publics", "Rénovation"],
      bgPattern: "lines"
    },
    {
      title: "Commerce Général",
      icon: ShoppingCart,
      description: "Solutions commerciales complètes pour développer votre activité",
      color: "from-green-500 to-emerald-500",
      details: ["Distribution", "Logistique", "Vente au détail"],
      bgPattern: "waves"
    },
    {
      title: "Tourisme",
      icon: MapPin,
      description: "Services touristiques innovants pour des expériences mémorables",
      color: "from-indigo-500 to-purple-500",
      details: ["Circuits touristiques", "Hébergement", "Événementiel"],
      bgPattern: "circles"
    }
  ];

  const testimonials = [
    {
      name: "Marie Dubois",
      company: "TechStart SAS",
      text: "Leur expertise en analyse des affaires a transformé notre entreprise. Résultats exceptionnels !",
      rating: 5,
      avatar: "MD"
    },
    {
      name: "Jean Martin",
      company: "Construction Plus",
      text: "Travaux BTP de qualité supérieure. Respect des délais et budget maîtrisé.",
      rating: 5,
      avatar: "JM"
    },
    {
      name: "Sophie Laurent",
      company: "Voyage & Co",
      text: "Partenaire de confiance pour nos projets touristiques. Service impeccable.",
      rating: 5,
      avatar: "SL"
    }
  ];

  const stats = [
    { number: "500+", label: "Projets Réalisés", icon: Target },
    { number: "95%", label: "Satisfaction Client", icon: Star },
    { number: "10+", label: "Années d'Expérience", icon: Award },
    { number: "24/7", label: "Support Client", icon: Shield }
  ];

  const features = [
    { icon: Eye, title: "Vision", description: "Une approche innovante pour chaque projet" },
    { icon: Zap, title: "Rapidité", description: "Exécution efficace et dans les délais" },
    { icon: Shield, title: "Fiabilité", description: "Partenaire de confiance depuis 10 ans" },
    { icon: Target, title: "Précision", description: "Solutions sur mesure pour vos besoins" }
  ];

  return (
    // <div className="min-h-screen bg-white text-gray-800 overflow-x-hidden">
      <div className="min-h-screen bg-white">
      {/* <Header /> */}
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ProjectsGallery />
      <TestimonialsCarousel />
      <ContactSection />
    </div>
    // </div>
  );
};

export default HomePage;


// "use client";
// import React, { useState, useEffect } from 'react';
// import { ChevronDown, Menu, X, Building2, TrendingUp, ShoppingCart, MapPin, Star, ArrowRight, Phone, Mail, CheckCircle, Users, Award, Globe } from 'lucide-react';

// const HomePage = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Auto-rotate testimonials
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   const services = [
//     {
//       title: "Analyse des Affaires",
//       icon: TrendingUp,
//       description: "Optimisation stratégique et analyse de performance pour votre croissance",
//       color: "from-blue-500 to-cyan-500"
//     },
//     {
//       title: "BTP",
//       icon: Building2,
//       description: "Construction et travaux publics avec expertise et qualité garantie",
//       color: "from-orange-500 to-red-500"
//     },
//     {
//       title: "Commerce Général",
//       icon: ShoppingCart,
//       description: "Solutions commerciales complètes pour développer votre activité",
//       color: "from-green-500 to-emerald-500"
//     },
//     {
//       title: "Tourisme",
//       icon: MapPin,
//       description: "Services touristiques innovants pour des expériences mémorables",
//       color: "from-purple-500 to-pink-500"
//     }
//   ];

//   const testimonials = [
//     {
//       name: "Marie Dubois",
//       company: "TechStart SAS",
//       text: "Leur expertise en analyse des affaires a transformé notre entreprise. Résultats exceptionnels !",
//       rating: 5
//     },
//     {
//       name: "Jean Martin",
//       company: "Construction Plus",
//       text: "Travaux BTP de qualité supérieure. Respect des délais et budget maîtrisé.",
//       rating: 5
//     },
//     {
//       name: "Sophie Laurent",
//       company: "Voyage & Co",
//       text: "Partenaire de confiance pour nos projets touristiques. Service impeccable.",
//       rating: 5
//     }
//   ];

//   const stats = [
//     { number: "500+", label: "Projets Réalisés" },
//     { number: "95%", label: "Satisfaction Client" },
//     { number: "10+", label: "Années d'Expérience" },
//     { number: "24/7", label: "Support Client" }
//   ];

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Navigation */}
      

//       {/* Hero Section */}
//       <section id="accueil" className="relative h-screen flex items-center justify-center overflow-hidden">
//         {/* Animated Background */}
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
//           <div className="absolute inset-0 bg-black/40"></div>
//           {/* Floating Elements */}
//           <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
//           <div className="absolute bottom-40 right-20 w-48 h-48 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
//           <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-cyan-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>
//         </div>

//         <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
//           <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
//             Solutions
//             <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Multi-Services</span>
//           </h1>
//           <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-fade-in delay-300">
//             Votre partenaire de confiance pour tous vos projets professionnels
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-500">
//             <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
//               Découvrir nos Services
//             </button>
//             <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
//               Nous Contacter
//             </button>
//           </div>
//         </div>

//         {/* Scroll Indicator */}
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
//           <ChevronDown className="w-8 h-8 text-white" />
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {stats.map((stat, index) => (
//               <div key={index} className="text-center group hover:scale-110 transition-transform duration-300">
//                 <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{stat.number}</div>
//                 <div className="text-gray-600 font-medium">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Services Section */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//               Nos <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Services</span>
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Une gamme complète de services professionnels adaptés à vos besoins spécifiques
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {services.map((service, index) => (
//               <div key={index} className="group relative">
//                 <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
//                   <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
//                     <service.icon className="w-8 h-8 text-white" />
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
//                   <p className="text-gray-600 mb-6">{service.description}</p>
//                   <button className="flex items-center text-blue-600 font-semibold hover:text-purple-600 transition-colors">
//                     En savoir plus
//                     <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* About Section */}
//       <section id="apropos" className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//                 Pourquoi nous <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">choisir ?</span>
//               </h2>
//               <p className="text-lg text-gray-600 mb-8">
//                 Avec plus de 10 ans d'expérience, nous sommes votre partenaire de confiance pour tous vos projets professionnels. Notre expertise multisectorielle nous permet d'offrir des solutions complètes et innovantes.
//               </p>
//               <div className="space-y-4">
//                 {[
//                   "Expertise reconnue dans tous nos domaines",
//                   "Équipe de professionnels qualifiés",
//                   "Solutions personnalisées et innovantes",
//                   "Support client 24/7"
//                 ].map((item, index) => (
//                   <div key={index} className="flex items-center">
//                     <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
//                     <span className="text-gray-700">{item}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="relative">
//               <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
//                 <div className="grid grid-cols-2 gap-6">
//                   <div className="text-center">
//                     <Users className="w-12 h-12 mx-auto mb-4" />
//                     <div className="text-2xl font-bold">500+</div>
//                     <div className="text-blue-100">Clients Satisfaits</div>
//                   </div>
//                   <div className="text-center">
//                     <Award className="w-12 h-12 mx-auto mb-4" />
//                     <div className="text-2xl font-bold">15+</div>
//                     <div className="text-blue-100">Prix Remportés</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-20 bg-white">
//         <div className="max-w-4xl mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//               Ce que disent nos <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">clients</span>
//             </h2>
//           </div>

//           <div className="relative">
//             <div className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center">
//               <div className="flex justify-center mb-6">
//                 {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
//                   <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
//                 ))}
//               </div>
//               <blockquote className="text-xl md:text-2xl text-gray-700 mb-6 italic">
//                 "{testimonials[currentTestimonial].text}"
//               </blockquote>
//               <div>
//                 <div className="font-bold text-gray-900">{testimonials[currentTestimonial].name}</div>
//                 <div className="text-gray-600">{testimonials[currentTestimonial].company}</div>
//               </div>
//             </div>

//             {/* Testimonial Navigation */}
//             <div className="flex justify-center mt-8 space-x-2">
//               {testimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentTestimonial(index)}
//                   className={`w-3 h-3 rounded-full transition-colors ${
//                     index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//             Prêt à démarrer votre projet ?
//           </h2>
//           <p className="text-xl text-blue-100 mb-8">
//             Contactez-nous dès aujourd'hui pour un devis gratuit et personnalisé
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
//               Obtenir un Devis
//             </button>
//             <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
//               <Phone className="w-5 h-5 inline mr-2" />
//               Nous Appeler
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
      

//       <style jsx>{`
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         .animate-fade-in {
//           animation: fade-in 0.8s ease-out forwards;
//         }
        
//         .delay-300 {
//           animation-delay: 0.3s;
//         }
        
//         .delay-500 {
//           animation-delay: 0.5s;
//         }
        
//         .delay-1000 {
//           animation-delay: 1s;
//         }
        
//         .delay-2000 {
//           animation-delay: 2s;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default HomePage;












//  claude noir 


// "use client";
// import React, { useState, useEffect, useRef } from 'react';
// import { ChevronDown, Menu, X, Building2, TrendingUp, ShoppingCart, MapPin, Star, ArrowRight, Phone, Mail, CheckCircle, Users, Award, Globe, Eye, Zap, Shield, Target, MousePointer, Sparkles } from 'lucide-react';

// const HomePage = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [activeService, setActiveService] = useState<number | null>(null);
//   const [visibleElements, setVisibleElements] = useState(new Set());
//   const heroRef = useRef(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };

//     window.addEventListener('scroll', handleScroll);
//     window.addEventListener('mousemove', handleMouseMove);
    
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   // Intersection Observer for scroll animations
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setVisibleElements(prev => new Set(prev).add(entry.target.id));
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     document.querySelectorAll('[data-animate]').forEach((el) => {
//       observer.observe(el);
//     });

//     return () => observer.disconnect();
//   }, []);

//   // Auto-rotate testimonials
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   const services = [
//     {
//       title: "Analyse des Affaires",
//       icon: TrendingUp,
//       description: "Optimisation stratégique et analyse de performance pour votre croissance",
//       color: "from-blue-500 to-cyan-500",
//       details: ["Audit financier", "Stratégie de croissance", "Optimisation des processus"],
//       bgPattern: "dots"
//     },
//     {
//       title: "BTP",
//       icon: Building2,
//       description: "Construction et travaux publics avec expertise et qualité garantie",
//       color: "from-orange-500 to-red-500",
//       details: ["Construction résidentielle", "Travaux publics", "Rénovation"],
//       bgPattern: "lines"
//     },
//     {
//       title: "Commerce Général",
//       icon: ShoppingCart,
//       description: "Solutions commerciales complètes pour développer votre activité",
//       color: "from-green-500 to-emerald-500",
//       details: ["Distribution", "Logistique", "Vente au détail"],
//       bgPattern: "waves"
//     },
//     {
//       title: "Tourisme",
//       icon: MapPin,
//       description: "Services touristiques innovants pour des expériences mémorables",
//       color: "from-purple-500 to-pink-500",
//       details: ["Circuits touristiques", "Hébergement", "Événementiel"],
//       bgPattern: "circles"
//     }
//   ];

//   const testimonials = [
//     {
//       name: "Marie Dubois",
//       company: "TechStart SAS",
//       text: "Leur expertise en analyse des affaires a transformé notre entreprise. Résultats exceptionnels !",
//       rating: 5,
//       avatar: "MD"
//     },
//     {
//       name: "Jean Martin",
//       company: "Construction Plus",
//       text: "Travaux BTP de qualité supérieure. Respect des délais et budget maîtrisé.",
//       rating: 5,
//       avatar: "JM"
//     },
//     {
//       name: "Sophie Laurent",
//       company: "Voyage & Co",
//       text: "Partenaire de confiance pour nos projets touristiques. Service impeccable.",
//       rating: 5,
//       avatar: "SL"
//     }
//   ];

//   const stats = [
//     { number: "500+", label: "Projets Réalisés", icon: Target },
//     { number: "95%", label: "Satisfaction Client", icon: Star },
//     { number: "10+", label: "Années d'Expérience", icon: Award },
//     { number: "24/7", label: "Support Client", icon: Shield }
//   ];

//   const features = [
//     { icon: Eye, title: "Vision", description: "Une approche innovante pour chaque projet" },
//     { icon: Zap, title: "Rapidité", description: "Exécution efficace et dans les délais" },
//     { icon: Shield, title: "Fiabilité", description: "Partenaire de confiance depuis 10 ans" },
//     { icon: Target, title: "Précision", description: "Solutions sur mesure pour vos besoins" }
//   ];

//   return (
//     <div className="min-h-screen bg-black text-white overflow-x-hidden">
//       {/* Custom Cursor */}
//       <div 
//         className="fixed w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-150 ease-out"
//         style={{
//           left: `${mousePosition.x - 12}px`,
//           top: `${mousePosition.y - 12}px`,
//           transform: activeService ? 'scale(2)' : 'scale(1)'
//         }}
//       />

//       {/* Hero Section */}
//       <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
//         {/* Animated Background */}
//         <div className="absolute inset-0">
//           <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-indigo-900/50"></div>
          
//           {/* Floating Geometric Shapes */}
//           <div className="absolute inset-0">
//             {[...Array(20)].map((_, i) => (
//               <div
//                 key={i}
//                 className={`absolute w-2 h-2 bg-blue-500/30 rounded-full animate-pulse`}
//                 style={{
//                   left: `${Math.random() * 100}%`,
//                   top: `${Math.random() * 100}%`,
//                   animationDelay: `${Math.random() * 3}s`,
//                   animationDuration: `${2 + Math.random() * 3}s`
//                 }}
//               />
//             ))}
//           </div>

//           {/* Interactive Gradient Orbs */}
//           <div 
//             className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl transition-all duration-1000 ease-out"
//             style={{
//               left: `${mousePosition.x / 20}px`,
//               top: `${mousePosition.y / 20}px`,
//             }}
//           />
//           <div 
//             className="absolute w-64 h-64 bg-purple-500/20 rounded-full blur-3xl transition-all duration-1000 ease-out"
//             style={{
//               right: `${mousePosition.x / 30}px`,
//               bottom: `${mousePosition.y / 30}px`,
//             }}
//           />
//         </div>

//         <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
//           <div className="space-y-8">
//             <h1 className="text-6xl md:text-8xl font-bold leading-tight">
//               <span className="block overflow-hidden">
//                 <span className="inline-block animate-slide-up">Solutions</span>
//               </span>
//               <span className="block overflow-hidden">
//                 <span className="inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-slide-up delay-200">
//                   Multi-Services
//                 </span>
//               </span>
//             </h1>
            
//             <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto animate-fade-in delay-400">
//               Votre partenaire de confiance pour tous vos projets professionnels. 
//               Innovation, expertise et excellence à votre service.
//             </p>
            
//             <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in delay-600">
//               <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-semibold overflow-hidden transition-all duration-300 hover:scale-105">
//                 <span className="relative z-10">Découvrir nos Services</span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
//               </button>
//               <button className="group border-2 border-white text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-black transition-all duration-300 hover:scale-105">
//                 <span className="flex items-center">
//                   Nous Contacter
//                   <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Scroll Indicator */}
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
//           <div className="flex flex-col items-center space-y-2 animate-bounce">
//             <span className="text-sm text-gray-400">Découvrez plus</span>
//             <ChevronDown className="w-6 h-6 text-white" />
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 relative">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="grid md:grid-cols-4 gap-8">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 data-animate
//                 id={`feature-${index}`}
//                 className={`text-center group cursor-pointer transition-all duration-700 ${
//                   visibleElements.has(`feature-${index}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//                 }`}
//                 style={{ transitionDelay: `${index * 0.1}s` }}
//               >
//                 <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
//                   <feature.icon className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
//                 <p className="text-gray-400">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-20 bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {stats.map((stat, index) => (
//               <div
//                 key={index}
//                 data-animate
//                 id={`stat-${index}`}
//                 className={`text-center group cursor-pointer transition-all duration-700 ${
//                   visibleElements.has(`stat-${index}`) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
//                 }`}
//                 style={{ transitionDelay: `${index * 0.2}s` }}
//               >
//                 <div className="relative">
//                   <stat.icon className="w-12 h-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
//                   <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
//                     {stat.number}
//                   </div>
//                   <div className="text-gray-300 font-medium">{stat.label}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Services Section */}
//       <section className="py-32 relative">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-20">
//             <h2 
//               data-animate
//               id="services-title"
//               className={`text-5xl md:text-7xl font-bold mb-6 transition-all duration-1000 ${
//                 visibleElements.has('services-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//               }`}
//             >
//               Nos <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Services</span>
//             </h2>
//             <p 
//               data-animate
//               id="services-desc"
//               className={`text-xl text-gray-400 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
//                 visibleElements.has('services-desc') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//               }`}
//             >
//               Une gamme complète de services professionnels adaptés à vos besoins spécifiques
//             </p>
//           </div>

//           <div className="grid lg:grid-cols-2 gap-8">
//             {services.map((service, index) => (
//               <div
//                 key={index}
//                 data-animate
//                 id={`service-${index}`}
//                 className={`group relative transition-all duration-700 ${
//                   visibleElements.has(`service-${index}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
//                 }`}
//                 style={{ transitionDelay: `${index * 0.2}s` }}
//                 onMouseEnter={() => setActiveService(index)}
//                 onMouseLeave={() => setActiveService(null)}
//               >
//                 <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 h-full overflow-hidden border border-gray-800 group-hover:border-blue-500/50 transition-all duration-500">
//                   {/* Background Pattern */}
//                   <div className="absolute inset-0 opacity-5">
//                     {service.bgPattern === 'dots' && (
//                       <div className="absolute inset-0" style={{
//                         backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
//                         backgroundSize: '20px 20px'
//                       }} />
//                     )}
//                     {service.bgPattern === 'lines' && (
//                       <div className="absolute inset-0" style={{
//                         backgroundImage: 'repeating-linear-gradient(45deg, white 0px, white 1px, transparent 1px, transparent 20px)',
//                       }} />
//                     )}
//                   </div>

//                   <div className="relative z-10">
//                     <div className={`w-20 h-20 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
//                       <service.icon className="w-10 h-10 text-white" />
//                     </div>
                    
//                     <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors duration-300">
//                       {service.title}
//                     </h3>
                    
//                     <p className="text-gray-400 mb-6 leading-relaxed">
//                       {service.description}
//                     </p>
                    
//                     <div className="space-y-2 mb-8">
//                       {service.details.map((detail, idx) => (
//                         <div key={idx} className="flex items-center text-sm text-gray-500">
//                           <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
//                           {detail}
//                         </div>
//                       ))}
//                     </div>
                    
//                     <button className="flex items-center text-blue-400 font-semibold hover:text-purple-400 transition-colors group-hover:translate-x-2 transform duration-300">
//                       En savoir plus
//                       <ArrowRight className="w-4 h-4 ml-2" />
//                     </button>
//                   </div>

//                   {/* Hover Effect */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* About Section */}
//       <section className="py-32 bg-gradient-to-br from-blue-900/10 to-purple-900/10">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             <div>
//               <h2 
//                 data-animate
//                 id="about-title"
//                 className={`text-4xl md:text-6xl font-bold mb-8 transition-all duration-1000 ${
//                   visibleElements.has('about-title') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
//                 }`}
//               >
//                 Pourquoi nous <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">choisir ?</span>
//               </h2>
//               <p 
//                 data-animate
//                 id="about-desc"
//                 className={`text-lg text-gray-400 mb-8 leading-relaxed transition-all duration-1000 delay-200 ${
//                   visibleElements.has('about-desc') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
//                 }`}
//               >
//                 Avec plus de 10 ans d'expérience, nous sommes votre partenaire de confiance pour tous vos projets professionnels. Notre expertise multisectorielle nous permet d'offrir des solutions complètes et innovantes.
//               </p>
//               <div className="space-y-4">
//                 {[
//                   "Expertise reconnue dans tous nos domaines",
//                   "Équipe de professionnels qualifiés",
//                   "Solutions personnalisées et innovantes",
//                   "Support client 24/7"
//                 ].map((item, index) => (
//                   <div 
//                     key={index}
//                     data-animate
//                     id={`about-item-${index}`}
//                     className={`flex items-center transition-all duration-700 ${
//                       visibleElements.has(`about-item-${index}`) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
//                     }`}
//                     style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
//                   >
//                     <CheckCircle className="w-6 h-6 text-green-400 mr-4 flex-shrink-0" />
//                     <span className="text-gray-300">{item}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             <div 
//               data-animate
//               id="about-card"
//               className={`relative transition-all duration-1000 ${
//                 visibleElements.has('about-card') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
//               }`}
//             >
//               <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 relative overflow-hidden">
//                 <div className="absolute inset-0 bg-black/20"></div>
//                 <div className="relative z-10">
//                   <div className="grid grid-cols-2 gap-8">
//                     <div className="text-center">
//                       <Users className="w-16 h-16 mx-auto mb-4 text-white" />
//                       <div className="text-3xl font-bold text-white">500+</div>
//                       <div className="text-blue-100">Clients Satisfaits</div>
//                     </div>
//                     <div className="text-center">
//                       <Award className="w-16 h-16 mx-auto mb-4 text-white" />
//                       <div className="text-3xl font-bold text-white">15+</div>
//                       <div className="text-blue-100">Prix Remportés</div>
//                     </div>
//                   </div>
//                 </div>
//                 {/* Decorative Elements */}
//                 <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
//                 <div className="absolute bottom-4 left-4 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-32">
//         <div className="max-w-5xl mx-auto px-4">
//           <div className="text-center mb-20">
//             <h2 
//               data-animate
//               id="testimonials-title"
//               className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-1000 ${
//                 visibleElements.has('testimonials-title') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
//               }`}
//             >
//               Ce que disent nos <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">clients</span>
//             </h2>
//           </div>

//           <div className="relative">
//             <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 md:p-16 border border-gray-800 relative overflow-hidden">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
              
//               <div className="relative z-10 text-center">
//                 <div className="flex justify-center mb-8">
//                   <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl font-bold">
//                     {testimonials[currentTestimonial].avatar}
//                   </div>
//                 </div>
                
//                 <div className="flex justify-center mb-6">
//                   {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
//                     <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
//                   ))}
//                 </div>
                
//                 <blockquote className="text-xl md:text-2xl text-gray-300 mb-8 italic leading-relaxed">
//                   "{testimonials[currentTestimonial].text}"
//                 </blockquote>
                
//                 <div>
//                   <div className="font-bold text-white text-lg">{testimonials[currentTestimonial].name}</div>
//                   <div className="text-blue-400">{testimonials[currentTestimonial].company}</div>
//                 </div>
//               </div>
//             </div>

//             {/* Testimonial Navigation */}
//             <div className="flex justify-center mt-8 space-x-3">
//               {testimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentTestimonial(index)}
//                   className={`w-4 h-4 rounded-full transition-all duration-300 ${
//                     index === currentTestimonial 
//                       ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125' 
//                       : 'bg-gray-600 hover:bg-gray-500'
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-32 relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
//         <div className="absolute inset-0 bg-black/50"></div>
        
//         <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
//           <h2 
//             data-animate
//             id="cta-title"
//             className={`text-4xl md:text-6xl font-bold text-white mb-8 transition-all duration-1000 ${
//               visibleElements.has('cta-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//             }`}
//           >
//             Prêt à démarrer votre projet ?
//           </h2>
//           <p 
//             data-animate
//             id="cta-desc"
//             className={`text-xl text-blue-100 mb-12 transition-all duration-1000 delay-300 ${
//               visibleElements.has('cta-desc') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//             }`}
//           >
//             Contactez-nous dès aujourd'hui pour un devis gratuit et personnalisé
//           </p>
//           <div 
//             data-animate
//             id="cta-buttons"
//             className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1000 delay-500 ${
//               visibleElements.has('cta-buttons') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//             }`}
//           >
//             <button className="group bg-white text-blue-600 px-10 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
//               <span className="relative z-10 group-hover:text-white transition-colors duration-300">Obtenir un Devis</span>
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
//             </button>
//             <button className="group border-2 border-white text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105">
//               <span className="flex items-center">
//                 <Phone className="w-5 h-5 mr-2" />
//                 Nous Appeler
//               </span>
//             </button>
//           </div>
//         </div>

//         {/* Decorative Elements */}
//         <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
//       </section>

//       {/* Footer */}
//       <footer className="py-20 bg-black border-t border-gray-800">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="grid md:grid-cols-4 gap-12">
//             <div className="md:col-span-2">
//               <div className="flex items-center space-x-3 mb-6">
//                 <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
//                   <Sparkles className="w-6 h-6 text-white" />
//                 </div>
//                 <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//                   MultiServices
//                 </span>
//               </div>
//               <p className="text-gray-400 mb-6 leading-relaxed">
//                 Votre partenaire de confiance pour tous vos projets professionnels. 
//                 Innovation, expertise et excellence depuis plus de 10 ans.
//               </p>
//               <div className="flex space-x-4">
//                 {[Globe, Mail, Phone].map((Icon, index) => (
//                   <button
//                     key={index}
//                     className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all duration-300 hover:scale-110"
//                   >
//                     <Icon className="w-5 h-5 text-gray-400 hover:text-white" />
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h3 className="text-lg font-bold text-white mb-6">Services</h3>
//               <div className="space-y-3">
//                 {services.map((service, index) => (
//                   <button
//                     key={index}
//                     className="block text-gray-400 hover:text-blue-400 transition-colors duration-300"
//                   >
//                     {service.title}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h3 className="text-lg font-bold text-white mb-6">Contact</h3>
//               <div className="space-y-4">
//                 <div className="flex items-center space-x-3">
//                   <Mail className="w-5 h-5 text-blue-400" />
//                   <span className="text-gray-400">contact@multiservices.com</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <Phone className="w-5 h-5 text-blue-400" />
//                   <span className="text-gray-400">+229 XX XX XX XX</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <MapPin className="w-5 h-5 text-blue-400" />
//                   <span className="text-gray-400">Cotonou, Bénin</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="border-t border-gray-800 mt-12 pt-8">
//             <div className="flex flex-col md:flex-row justify-between items-center">
//               <p className="text-gray-400 text-sm">
//                 © 2025 MultiServices. Tous droits réservés.
//               </p>
//               <div className="flex space-x-6 mt-4 md:mt-0">
//                 <button className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300">
//                   Politique de confidentialité
//                 </button>
//                 <button className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300">
//                   Conditions d'utilisation
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>

//       {/* Custom Styles */}
//       <style jsx>{`
//         @keyframes slide-up {
//           from {
//             opacity: 0;
//             transform: translateY(100px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes float {
//           0%, 100% {
//             transform: translateY(0px);
//           }
//           50% {
//             transform: translateY(-20px);
//           }
//         }

//         @keyframes glow {
//           0%, 100% {
//             box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
//           }
//           50% {
//             box-shadow: 0 0 40px rgba(147, 51, 234, 0.5);
//           }
//         }
        
//         .animate-slide-up {
//           animation: slide-up 1s ease-out forwards;
//         }
        
//         .animate-fade-in {
//           animation: fade-in 0.8s ease-out forwards;
//         }

//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }

//         .animate-glow {
//           animation: glow 3s ease-in-out infinite;
//         }
        
//         .delay-200 {
//           animation-delay: 0.2s;
//         }
        
//         .delay-300 {
//           animation-delay: 0.3s;
//         }
        
//         .delay-400 {
//           animation-delay: 0.4s;
//         }

//         .delay-500 {
//           animation-delay: 0.5s;
//         }
        
//         .delay-600 {
//           animation-delay: 0.6s;
//         }

//         .delay-1000 {
//           animation-delay: 1s;
//         }

//         /* Custom scrollbar */
//         ::-webkit-scrollbar {
//           width: 8px;
//         }

//         ::-webkit-scrollbar-track {
//           background: #1a1a1a;
//         }

//         ::-webkit-scrollbar-thumb {
//           background: linear-gradient(180deg, #3b82f6, #8b5cf6);
//           border-radius: 4px;
//         }

//         ::-webkit-scrollbar-thumb:hover {
//           background: linear-gradient(180deg, #2563eb, #7c3aed);
//         }

//         /* Smooth scroll behavior */
//         html {
//           scroll-behavior: smooth;
//         }

//         /* Hide scrollbar for cleaner look */
//         body {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }

//         /* Gradient text animation */
//         @keyframes gradient-shift {
//           0% {
//             background-position: 0% 50%;
//           }
//           50% {
//             background-position: 100% 50%;
//           }
//           100% {
//             background-position: 0% 50%;
//           }
//         }

//         .animate-gradient {
//           background-size: 200% 200%;
//           animation: gradient-shift 4s ease infinite;
//         }

//         /* Particle effects */
//         @keyframes particle-float {
//           0% {
//             transform: translateY(100vh) translateX(0px);
//             opacity: 0;
//           }
//           10% {
//             opacity: 1;
//           }
//           90% {
//             opacity: 1;
//           }
//           100% {
//             transform: translateY(-100px) translateX(100px);
//             opacity: 0;
//           }
//         }

//         .particle {
//           animation: particle-float 15s linear infinite;
//         }

//         /* Interactive hover states */
//         .interactive-card {
//           transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         .interactive-card:hover {
//           transform: translateY(-8px) scale(1.02);
//           box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25),
//                       0 0 0 1px rgba(59, 130, 246, 0.3);
//         }

//         /* Glass morphism effect */
//         .glass {
//           background: rgba(255, 255, 255, 0.05);
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//         }

//         /* Neon glow effect */
//         .neon-glow {
//           box-shadow: 
//             0 0 5px currentColor,
//             0 0 10px currentColor,
//             0 0 15px currentColor,
//             0 0 20px currentColor;
//         }

//         /* Magnetic button effect */
//         .magnetic-btn {
//           transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         .magnetic-btn:hover {
//           transform: translateY(-2px);
//         }

//         /* Ripple effect */
//         @keyframes ripple {
//           0% {
//             transform: scale(0);
//             opacity: 1;
//           }
//           100% {
//             transform: scale(4);
//             opacity: 0;
//           }
//         }

//         .ripple {
//           position: absolute;
//           border-radius: 50%;
//           background: rgba(59, 130, 246, 0.6);
//           transform: scale(0);
//           animation: ripple 0.6s linear;
//           pointer-events: none;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default HomePage;
































