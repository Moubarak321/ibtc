"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, Building2, TrendingUp, ShoppingCart, MapPin, Star, ArrowRight, Phone, Mail, CheckCircle, Users, Award, Globe } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  

useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className={`text-xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                MultiServices Pro
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className={`hover:text-blue-600 transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                Accueil
              </a>
              <div className="relative group">
                <button className={`flex items-center space-x-1 hover:text-blue-600 transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                  <span>Services</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="py-2">
                    {services.map((service, index) => (
                      <a key={index} href={`#service-${index}`} className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
                        <service.icon className="w-5 h-5 text-blue-600 mr-3" />
                        <span className="text-gray-900">{service.title}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <a href="about" className={`hover:text-blue-600 transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                À propos
              </a>
              <a href="contact" className={`hover:text-blue-600 transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                Contact
              </a>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all">
                Devis Gratuit
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden ${isScrolled ? 'text-gray-900' : 'text-white'}`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-2">
              <a href="/" className="block py-2 text-gray-900">Accueil</a>
              <div className="py-2">
                <span className="text-gray-900 font-medium">Services</span>
                <div className="ml-4 mt-2 space-y-2">
                  {services.map((service, index) => (
                    <a key={index} href={`#service-${index}`} className="block py-1 text-gray-600">
                      {service.title}
                    </a>
                  ))}
                </div>
              </div>
              <a href="about" className="block py-2 text-gray-900">À propos</a>
              <a href="contact" className="block py-2 text-gray-900">Contact</a>
            </div>
          </div>
        )}

        
      </nav>
  )
}