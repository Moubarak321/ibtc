"use client";

import React, { useState, useEffect } from 'react';
import { 
  Phone, Mail, MapPin, Clock, Send, CheckCircle, 
  MessageSquare, Globe, Star, ArrowRight, Zap,
  Shield, Heart, Users, Award, Building2, Calendar,
  Headphones, ChevronRight, Instagram, Facebook,
  Twitter, Linkedin, Youtube, Smartphone, Video
} from 'lucide-react';
import ContactForm from '@/components/ui/ContactForm';
import Map from '@/components/ui/Map';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function ContactPage() {
  const [activeContact, setActiveContact] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const contactMethods = [
    {
      icon: Phone,
      title: "Appelez-nous",
      subtitle: "Disponible 24h/7j",
      info: "+229 01 94 50 78 44",
      color: "from-blue-500 to-cyan-500",
      action: "Appeler maintenant"
    },
    {
      icon: Mail,
      title: "Écrivez-nous",
      subtitle: "Réponse sous 2h",
      info: "businesscompanyha@gmail.com",
      color: "from-purple-500 to-pink-500",
      action: "Envoyer un email"
    },
    {
      icon: MessageSquare,
      title: "Chat en direct",
      subtitle: "Support instantané",
      info: "Disponible maintenant",
      color: "from-green-500 to-emerald-500",
      action: "Démarrer le chat"
    },
    {
      icon: Video,
      title: "Visioconférence",
      subtitle: "Rendez-vous virtuel",
      info: "Sur rendez-vous",
      color: "from-orange-500 to-red-500",
      action: "Planifier un appel"
    }
  ];

  const offices = [
    {
      city: "Cotonou (Siège)",
      address: "Zogbohoue, Cotonou",
      phone: "+229 01 94 50 78 44",
      email: "businesscompanyha@gmail.com",
      hours: "Lun-Ven: 8h-18h, Sam: 8h-13h",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop"
    },
    {
      city: "Abidjan (Antenne)",
      address: "Plateau, Abidjan",
      phone: "+225 XX XX XX XX",
      email: "abidjan@multiservices.com",
      hours: "Lun-Ven: 8h-17h",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop"
    }
  ];

  const testimonials = [
    {
      name: "Marie Kouassi",
      company: "DirectriceCEO Innov Corp",
      text: "Service client exceptionnel ! L'équipe répond rapidement et avec professionnalisme.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Jean Baptiste",
      company: "Fondateur StartUp BJ",
      text: "Communication fluide et solutions adaptées. Je recommande vivement !",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Aisha Traoré",
      company: "Manager Tech Solutions",
      text: "Réactivité impressionnante et accompagnement personnalisé de qualité.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const socialLinks = [
    { icon: Facebook, name: "Facebook", url: "#", color: "hover:text-blue-600" },
    { icon: Twitter, name: "Twitter", url: "#", color: "hover:text-sky-500" },
    { icon: Linkedin, name: "LinkedIn", url: "#", color: "hover:text-blue-700" },
    { icon: Instagram, name: "Instagram", url: "#", color: "hover:text-pink-600" },
    { icon: Youtube, name: "YouTube", url: "#", color: "hover:text-red-600" }
  ];

  const stats = [
    { number: "2h", label: "Temps de réponse moyen", icon: Clock },
    { number: "98%", label: "Satisfaction client", icon: Heart },
    { number: "24/7", label: "Support disponible", icon: Headphones },
    { number: "500+", label: "Clients accompagnés", icon: Users }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Gradient Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
          <div className="absolute inset-0 bg-black/40"></div>
          {/* Floating Elements */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-40 right-20 w-48 h-48 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-cyan-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
              <MessageSquare className="w-5 h-5 text-blue-300 mr-2" />
              <span className="text-white text-sm font-medium">Support disponible 24h/7j</span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Contactez
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent block sm:inline"> Nos Experts</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Une équipe dédiée pour transformer vos idées en succès. 
            <span className="text-blue-300 font-semibold">Réponse garantie sous 2h</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
              <Phone className="w-5 h-5 mr-2" />
              Appeler maintenant
            </button>
            <button className="border-2 border-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
              <Calendar className="w-5 h-5 mr-2" />
              Planifier un rendez-vous
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/20 transition-all">
                <stat.icon className="w-8 h-8 text-blue-300 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.number}</div>
                <div className="text-blue-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Comment Nous <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Contacter</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choisissez le moyen de communication qui vous convient le mieux. Notre équipe est prête à vous accompagner.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => setActiveContact(index)}
              >
                <div className="p-8 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <method.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-gray-600 mb-3">{method.subtitle}</p>
                  <p className={`font-semibold bg-gradient-to-r ${method.color} bg-clip-text text-transparent mb-4`}>
                    {method.info}
                  </p>
                  <button className="text-blue-600 hover:text-purple-600 transition-colors font-medium flex items-center justify-center mx-auto">
                    {method.action}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <AnimatedSection className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Info */}
            <div>
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Parlons de Votre <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projet</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Nous sommes là pour répondre à vos questions et vous accompagner dans vos projets.
                  Notre équipe d'experts est disponible pour discuter de vos besoins et vous proposer des solutions sur mesure.
                </p>

                {/* Features */}
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: CheckCircle, text: "Consultation gratuite" },
                    { icon: Zap, text: "Réponse rapide" },
                    { icon: Shield, text: "Confidentialité garantie" },
                    { icon: Award, text: "Expertise reconnue" }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <feature.icon className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Office Locations */}
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Nos Bureaux</h3>
                {offices.map((office, index) => (
                  <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 hover:shadow-lg transition-all">
                    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                      <img 
                        src={office.image} 
                        alt={office.city}
                        className="w-full md:w-24 h-32 md:h-24 object-cover rounded-xl"
                      />
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{office.city}</h4>
                        <div className="space-y-2 text-gray-600">
                          <div className="flex items-start">
                            <MapPin className="w-4 h-4 mr-2 mt-1 text-blue-600 flex-shrink-0" />
                            <span>{office.address}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-2 text-green-600" />
                            <span>{office.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 mr-2 text-purple-600" />
                            <span>{office.email}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-orange-600" />
                            <span>{office.hours}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div className="mt-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Suivez-nous</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className={`w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 ${social.color} transition-all hover:scale-110`}
                      title={social.name}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Envoyez-nous un message</h3>
                  <p className="text-gray-600">Nous vous répondrons dans les plus brefs délais</p>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            Ce Que Disent Nos Clients
          </h2>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <div className="relative">
              <div className="flex justify-center mb-6">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <blockquote className="text-xl text-white mb-6 italic">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              
              <div className="flex items-center justify-center">
                <img 
                  src={testimonials[currentTestimonial].image} 
                  alt={testimonials[currentTestimonial].name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div className="text-left">
                  <div className="font-semibold text-white">{testimonials[currentTestimonial].name}</div>
                  <div className="text-blue-200 text-sm">{testimonials[currentTestimonial].company}</div>
                </div>
              </div>
            </div>
            
            {/* Testimonial indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Trouvez-Nous <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Facilement</span>
            </h2>
            <p className="text-lg text-gray-600">Notre bureau principal à Cotonou, Zogbohoue</p>
          </div>
          
          <div className="rounded-2xl overflow-hidden shadow-xl h-[500px] relative">
            <Map />
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 max-w-sm">
              <h4 className="font-bold text-gray-900 mb-2">MultiServices Pro</h4>
              <p className="text-gray-600 text-sm mb-2">Zogbohoue, Cotonou</p>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-1" />
                +229 01 94 50 78 44
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Prêt à Démarrer Votre Projet ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Ne laissez pas vos idées en attente. Contactez-nous dès aujourd'hui pour une consultation gratuite.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
              <Phone className="w-5 h-5 mr-2" />
              Appeler maintenant
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Démarrer le chat
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; }
        }
      `}</style>
    </main>
  );
}