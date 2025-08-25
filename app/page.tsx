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

  // const services = [
  //   {
  //     title: "Analyse des Affaires",
  //     icon: TrendingUp,
  //     description: "Optimisation stratégique et analyse de performance pour votre croissance",
  //     color: "from-blue-500 to-cyan-500",
  //     details: ["Audit financier", "Stratégie de croissance", "Optimisation des processus"],
  //     bgPattern: "dots"
  //   },
  //   {
  //     title: "BTP",
  //     icon: Building2,
  //     description: "Construction et travaux publics avec expertise et qualité garantie",
  //     color: "from-orange-500 to-amber-500",
  //     details: ["Construction résidentielle", "Travaux publics", "Rénovation"],
  //     bgPattern: "lines"
  //   },
  //   {
  //     title: "Commerce Général",
  //     icon: ShoppingCart,
  //     description: "Solutions commerciales complètes pour développer votre activité",
  //     color: "from-green-500 to-emerald-500",
  //     details: ["Distribution", "Logistique", "Vente au détail"],
  //     bgPattern: "waves"
  //   },
  //   {
  //     title: "Tourisme",
  //     icon: MapPin,
  //     description: "Services touristiques innovants pour des expériences mémorables",
  //     color: "from-indigo-500 to-purple-500",
  //     details: ["Circuits touristiques", "Hébergement", "Événementiel"],
  //     bgPattern: "circles"
  //   }
  // ];

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

  // const stats = [
  //   { number: "500+", label: "Projets Réalisés", icon: Target },
  //   { number: "95%", label: "Satisfaction Client", icon: Star },
  //   { number: "10+", label: "Années d'Expérience", icon: Award },
  //   { number: "24/7", label: "Support Client", icon: Shield }
  // ];

  // const features = [
  //   { icon: Eye, title: "Vision", description: "Une approche innovante pour chaque projet" },
  //   { icon: Zap, title: "Rapidité", description: "Exécution efficace et dans les délais" },
  //   { icon: Shield, title: "Fiabilité", description: "Partenaire de confiance depuis 10 ans" },
  //   { icon: Target, title: "Précision", description: "Solutions sur mesure pour vos besoins" }
  // ];

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

