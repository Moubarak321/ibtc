"use client";
import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, Store, Building2, TrendingUp, ShoppingCart, MapPin, Star, ArrowRight, Phone, Mail, CheckCircle, Users, Award, Globe } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

 useEffect(() => {
  const updateCartCount = () => {
    const cartData = JSON.parse(localStorage.getItem('marketplace-cart-data') || '{}');
    const total = Object.values(cartData).reduce((sum: number, item: any) => {
      return sum + (item.quantity || 1);
    }, 0);
    setCartCount(total);
  };

  updateCartCount(); // Initial load

  const interval = setInterval(updateCartCount, 1000); // check every second
  return () => clearInterval(interval);
}, []);




//   useEffect(() => {
//   const cartData = JSON.parse(localStorage.getItem('marketplace-cart-data') || '{}');
//   const total = Object.values(cartData).reduce((sum: number, item: any) => {
//     return sum + (item.quantity || 1);
//   }, 0);
//   setCartCount(total);
// }, []);




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
      color: "from-blue-500 to-cyan-500",
      slug: "/services/analyse-des-affaires"
    },
    {
      title: "BTP",
      icon: Building2,
      description: "Construction et travaux publics avec expertise et qualité garantie",
      color: "from-orange-500 to-amber-500",
      slug: "/services/btp"
    },
    {
      title: "Commerce Général",
      icon: Store,
      description: "Solutions commerciales complètes pour développer votre activité",
      color: "from-green-500 to-emerald-500",
      slug: "/services/commerce-general"
    },
    {
      title: "Tourisme",
      icon: MapPin,
      description: "Services touristiques innovants pour des expériences mémorables",
      color: "from-indigo-500 to-purple-500",
      slug: "/services/tourisme"
    },
    {
      title: "Boutique",
      icon: ShoppingCart,
      description: "Services touristiques innovants pour des expériences mémorables",
      color: "from-indigo-500 to-purple-500",
      slug: "/services/tourisme"
    }
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm transition-all duration-300 shadow-lg py-1">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent w-16 h-16">
            <a href="/">
              <img src="/images/Logo1.png" alt="Logo" className="w-full h-full object-contain" />
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors text-sm">
              Accueil
            </a>

            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-900 hover:text-blue-600 transition-colors text-sm">
                <span>Services</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100">
                <div className="py-2">
                  {services.map((service, index) => (
                    <a
                      key={index}
                      href={service.slug}
                      className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <service.icon className={`w-5 h-5 ${service.color.includes('blue') ? 'text-blue-600' :
                        service.color.includes('orange') ? 'text-amber-600' :
                          service.color.includes('green') ? 'text-emerald-600' :
                            'text-indigo-600'} mr-3`} />
                      <span className="text-gray-900 text-sm">{service.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <a href="/about" className="text-gray-700 hover:text-blue-600 transition-colors text-sm">
              À propos
            </a>
            <a href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors text-sm">
              Contact
            </a>

            <Link href="/marketplace">
              <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm">
                <Store className="w-4 h-4" />
                Boutique
              </button>
            </Link>

            <Link href="/cart">
              <button className="flex items-center gap-2  border border-color:bg-gradient-to-r from-blue-600 text-black px-4 py-2 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm bg-white">


                <div className="relative">
                  <ShoppingCart className="w-6 h-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span>Panier</span>

              </button>
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 mt-2">
            <div className="px-2 py-2 space-y-1">
              <a href="/" className="block py-2 px-2 text-gray-900 hover:bg-gray-50 rounded-md transition-colors text-sm">
                Accueil
              </a>
              <div className="py-1 px-2">
                <details className="group">
                  <summary className="flex justify-between items-center py-2 text-gray-900 cursor-pointer list-none text-sm">
                    <span>Services</span>
                    <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-100 pl-4">
                    {services.map((service, index) => (
                      <a
                        key={index}
                        href={service.slug}
                        className="block py-2 text-gray-600 hover:text-blue-600 transition-colors text-sm"
                      >
                        {service.title}
                      </a>
                    ))}
                  </div>
                </details>
              </div>
              <a href="about" className="block py-2 px-2 text-gray-900 hover:bg-gray-50 rounded-md transition-colors text-sm">
                À propos
              </a>
              <a href="contact" className="block py-2 px-2 text-gray-900 hover:bg-gray-50 rounded-md transition-colors text-sm">
                Contact
              </a>
              <Link href="/marketplace">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm">
                  Boutique
                </button>
              </Link>
              <Link href="/cart">
                <button className="flex items-center gap-2  border border-color:bg-gradient-to-r from-blue-600 text-black px-4 py-2 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm bg-white">
                  <ShoppingCart className="w-6 h-6 " />
                  Panier
                </button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;