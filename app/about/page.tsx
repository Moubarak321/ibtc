"use client";
import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, Menu, X, Building2, TrendingUp, ShoppingCart, MapPin, 
  Star, ArrowRight, Phone, Mail, CheckCircle, Users, Award, Globe,
  Target, Eye, Heart, Lightbulb, Quote, Calendar, Briefcase,
  Shield, Zap, Handshake, Trophy, Play, ArrowDown, UserCheck,
  ChevronLeft, ChevronRight, Clock, MessageSquare
} from 'lucide-react';
import Link from 'next/link';

const AboutPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPartner, setCurrentPartner] = useState(0);
  const [activeTab, setActiveTab] = useState('vision');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate partners
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPartner((prev) => (prev + 1) % partners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const services = [
    { title: "Analyse des Affaires", icon: TrendingUp },
    { title: "BTP", icon: Building2 },
    { title: "Commerce Général", icon: ShoppingCart },
    { title: "Tourisme", icon: MapPin }
  ];

  const coreValues = [
    {
      icon: Shield,
      title: "Intégrité",
      description: "Nous agissons avec transparence et honnêteté dans toutes nos relations d'affaires",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Excellence",
      description: "Nous visons l'excellence dans chaque projet en dépassant les attentes de nos clients",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Handshake,
      title: "Partenariat",
      description: "Nous construisons des relations durables basées sur la confiance mutuelle",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Nous adoptons les dernières technologies pour des solutions innovantes",
      color: "from-orange-500 to-red-500"
    }
  ];

  const timeline = [
    {
      year: "2014",
      title: "Création de l'entreprise",
      description: "Fondation de MultiServices Pro avec une vision claire d'excellence",
      icon: Briefcase
    },
    {
      year: "2017",
      title: "Expansion des services",
      description: "Diversification vers le BTP et le commerce général",
      icon: Building2
    },
    {
      year: "2020",
      title: "Certification qualité",
      description: "Obtention des certifications ISO pour nos processus",
      icon: Award
    },
    {
      year: "2023",
      title: "Leadership régional",
      description: "Reconnaissance comme leader dans notre secteur d'activité",
      icon: Trophy
    }
  ];

  const team = [
    {
      name: "Dr. Amadou KONE",
      position: "Président Directeur Général",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      description: "Visionnaire avec 15+ ans d'expérience dans le développement d'entreprises multi-sectorielles.",
      linkedin: "#"
    },
    {
      name: "Sarah DJOSSOU",
      position: "Directrice Générale Adjointe",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      description: "Experte en stratégie d'entreprise et développement commercial international.",
      linkedin: "#"
    },
    {
      name: "Michel TOGO",
      position: "Directeur Technique",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      description: "Ingénieur spécialisé en BTP avec une expertise reconnue en gestion de projets complexes.",
      linkedin: "#"
    },
    {
      name: "Fatou BARRY",
      position: "Directrice Marketing",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      description: "Stratège marketing avec une passion pour l'innovation et l'expérience client.",
      linkedin: "#"
    }
  ];

  const partners = [
    {
      name: "TechnoFutur SA",
      sector: "Technologies",
      logo: "🔧",
      description: "Partenaire technologique pour l'innovation digitale"
    },
    {
      name: "BuildCorp International",
      sector: "Construction",
      logo: "🏗️",
      description: "Collaboration sur les grands projets BTP"
    },
    {
      name: "Commerce Plus Group",
      sector: "Distribution",
      logo: "📦",
      description: "Réseau de distribution et logistique"
    },
    {
      name: "Tourism Excellence",
      sector: "Tourisme",
      logo: "✈️",
      description: "Partenaire pour les projets touristiques"
    },
    {
      name: "Finance & Advisory",
      sector: "Finance",
      logo: "💼",
      description: "Conseil financier et investissements"
    }
  ];

  const achievements = [
    { icon: Users, number: "500+", label: "Clients Satisfaits", color: "text-blue-600" },
    { icon: Trophy, number: "15+", label: "Prix Remportés", color: "text-purple-600" },
    { icon: Globe, number: "25+", label: "Projets Internationaux", color: "text-green-600" },
    { icon: UserCheck, number: "98%", label: "Taux de Fidélisation", color: "text-orange-600" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Version responsive améliorée */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
          <div className="absolute inset-0 bg-black/50"></div>
          {/* Animated Elements - Optimisés pour mobile */}
          <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-16 sm:w-32 h-16 sm:h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 sm:bottom-40 right-10 sm:right-20 w-24 sm:w-48 h-24 sm:h-48 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 sm:left-1/3 w-12 sm:w-24 h-12 sm:h-24 bg-cyan-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 animate-fade-in leading-tight">
            À Propos de
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent block sm:inline"> Nous</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-6 sm:mb-8 animate-fade-in delay-300 px-4">
            Découvrez notre histoire, nos valeurs et notre vision pour l'avenir
          </p>
          <div className="flex justify-center animate-fade-in delay-500">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center">
              <ArrowDown className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
              <span className="hidden sm:inline">Découvrir Notre Histoire</span>
              <span className="sm:hidden">Notre Histoire</span>
            </button>
          </div>
        </div>

        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
        </div>
      </section>

      {/* Company Overview - Version responsive améliorée */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Notre <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Histoire</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
                Fondée en 2014, MultiServices Pro est née d'une vision audacieuse : devenir le partenaire de référence pour les entreprises cherchant des solutions complètes et innovantes dans plusieurs secteurs d'activité.
              </p>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
                Au fil des années, nous avons développé une expertise reconnue dans l'analyse des affaires, le BTP, le commerce général et le tourisme, permettant à nos clients de bénéficier d'un accompagnement global et personnalisé.
              </p>
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center p-3 sm:p-4 rounded-xl bg-gray-50 hover:shadow-lg transition-all">
                    <achievement.icon className={`w-6 sm:w-8 h-6 sm:h-8 mx-auto mb-2 ${achievement.color}`} />
                    <div className={`text-xl sm:text-2xl font-bold ${achievement.color}`}>{achievement.number}</div>
                    <div className="text-gray-600 text-xs sm:text-sm">{achievement.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 sm:p-8">
                <div className="flex justify-center mb-4">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-300 rounded-xl flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Logo BTIC</span>
                  </div>
                </div>
                <blockquote className="text-base sm:text-lg text-gray-700 italic text-center">
                  "L'excellence n'est pas un acte, mais une habitude. Nous nous efforçons chaque jour de dépasser les attentes de nos clients."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Tabs - Version responsive améliorée */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Nos <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Fondamentaux</span>
            </h2>
          </div>

          {/* Tab Navigation - Version mobile optimisée */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="bg-white rounded-full p-1 sm:p-2 shadow-lg w-full sm:w-auto max-w-md sm:max-w-none overflow-hidden">
              <div className="flex">
                {[
                  { id: 'vision', label: 'Vision', icon: Eye},
                  { id: 'mission', label: 'Mission', icon: Target},
                  { id: 'values', label: 'Valeurs', icon: Heart }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 sm:flex-none px-3 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all flex items-center justify-center space-x-1 sm:space-x-2 text-sm sm:text-base
                      ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <tab.icon className="w-4 sm:w-5 h-4 sm:h-5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden text-xs">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Content - Version responsive */}
          <div className="max-w-4xl mx-auto">
            {activeTab === 'mission' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 shadow-lg animate-fade-in">
                <div className="text-center mb-6 sm:mb-8">
                  <Target className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-3 sm:mb-4 text-blue-600" />
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Notre Mission</h3>
                </div>
                <p className="text-base sm:text-lg text-gray-600 text-center mb-6 sm:mb-8">
                  Accompagner nos clients dans leur réussite en leur offrant des solutions multi-services innovantes, personnalisées et de haute qualité, tout en contribuant au développement économique et social de notre région.
                </p>
                <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <CheckCircle className="w-6 sm:w-8 h-6 sm:h-8 mx-auto mb-2 text-blue-600" />
                    <h4 className="font-semibold text-gray-900 mb-2">Excellence</h4>
                    <p className="text-gray-600 text-sm">Qualité irréprochable dans tous nos services</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <Users className="w-6 sm:w-8 h-6 sm:h-8 mx-auto mb-2 text-purple-600" />
                    <h4 className="font-semibold text-gray-900 mb-2">Proximité</h4>
                    <p className="text-gray-600 text-sm">Relation client personnalisée et durable</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <Lightbulb className="w-6 sm:w-8 h-6 sm:h-8 mx-auto mb-2 text-green-600" />
                    <h4 className="font-semibold text-gray-900 mb-2">Innovation</h4>
                    <p className="text-gray-600 text-sm">Solutions créatives et avant-gardistes</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'vision' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 shadow-lg animate-fade-in">
                <div className="text-center mb-6 sm:mb-8">
                  <Eye className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-3 sm:mb-4 text-purple-600" />
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Notre Vision</h3>
                </div>
                <p className="text-base sm:text-lg text-gray-600 text-center mb-6 sm:mb-8">
                  Devenir le leader régional des services intégrés, reconnu pour notre expertise multi-sectorielle, notre innovation constante et notre contribution positive au développement durable.
                </p>
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Globe className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Expansion Régionale</h4>
                      <p className="text-gray-600 text-sm sm:text-base">Étendre notre présence dans toute l'Afrique de l'Ouest d'ici 2030</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Zap className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Innovation Technologique</h4>
                      <p className="text-gray-600 text-sm sm:text-base">Intégrer l'IA et les technologies émergentes dans nos services</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'values' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 shadow-lg animate-fade-in">
                <div className="text-center mb-6 sm:mb-8">
                  <Heart className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-3 sm:mb-4 text-red-500" />
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Nos Valeurs</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  {coreValues.map((value, index) => (
                    <div key={index} className="group hover:scale-105 transition-transform duration-300">
                      <div className="bg-gray-50 rounded-xl p-4 sm:p-6 h-full">
                        <div className={`w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-r ${value.color} rounded-xl flex items-center justify-center mb-3 sm:mb-4`}>
                          <value.icon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                        </div>
                        <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{value.title}</h4>
                        <p className="text-gray-600 text-sm sm:text-base">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Timeline - Version responsive améliorée */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Notre <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Parcours</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">Une décennie d'innovation et de croissance</p>
          </div>

          {/* Timeline pour mobile (vertical simple) */}
          <div className="block lg:hidden">
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="relative pl-8">
                  <div className="absolute left-0 top-0 w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg"></div>
                  <div className="absolute left-3 top-6 w-0.5 h-full bg-gray-200"></div>
                  <div className="bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-3">
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-xl font-bold text-blue-600">{item.year}</div>
                        <div className="text-base font-semibold text-gray-900">{item.title}</div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline pour desktop (version originale) */}
          <div className="hidden lg:block relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-full max-w-md ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-600">{item.year}</div>
                          <div className="text-lg font-semibold text-gray-900">{item.title}</div>
                        </div>
                      </div>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full border-4 border-blue-500 shadow-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CEO Message - Version responsive améliorée */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-6 sm:p-8 lg:p-12 order-2 lg:order-1">
                <div className="flex items-center mb-6">
                  <Quote className="w-10 sm:w-12 h-10 sm:h-12 text-blue-600 mr-3 sm:mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Mot du PDG</h3>
                    <p className="text-gray-600 text-sm sm:text-base">Message de notre direction</p>
                  </div>
                </div>
                <blockquote className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 italic">
                  "Notre succès repose sur une philosophie simple : écouter nos clients, anticiper leurs besoins et dépasser leurs attentes. Chaque projet est une opportunité de créer de la valeur et de construire l'avenir ensemble."
                </blockquote>
                <blockquote className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 italic">
                  "L'avenir appartient aux entreprises qui savent s'adapter, innover et maintenir l'excellence opérationnelle. C'est notre engagement quotidien envers vous."
                </blockquote>
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" 
                    alt="Dr. Amadou KONE"
                    className="w-12 sm:w-16 h-12 sm:h-16 rounded-full mr-3 sm:mr-4"
                  />
                  <div>
                    <div className="font-bold text-gray-900 text-sm sm:text-base">Dr. Amadou KONE</div>
                    <div className="text-blue-600 text-xs sm:text-sm">Président Directeur Général</div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-6 sm:p-8 lg:p-12 flex items-center justify-center order-1 lg:order-2">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face" 
                  alt="Dr. Amadou KONE"
                  className="w-full max-w-xs sm:max-w-sm rounded-xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Version responsive améliorée */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Notre <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Équipe</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">Des professionnels passionnés et expérimentés</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {team.map((member, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
                  <div className="relative">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-48 sm:h-56 lg:h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-blue-600 font-semibold mb-3 text-sm sm:text-base">{member.position}</p>
                    <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-3">{member.description}</p>
                    <a 
                      href={member.linkedin} 
                      className="inline-flex items-center text-blue-600 hover:text-purple-600 transition-colors text-sm"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contacter
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section - Version responsive améliorée */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Nos <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Partenaires</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">Un réseau solide pour votre réussite</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 lg:mb-16">
            <div className="order-2 lg:order-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                Réseau de Partenaires Stratégiques
              </h3>
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
                Nous collaborons avec des leaders de l'industrie pour offrir à nos clients des solutions complètes et innovantes. Notre réseau de partenaires nous permet d'étendre notre expertise et de garantir l'excellence dans tous nos projets.
              </p>
              <div className="space-y-3 sm:space-y-4">
                {[
                  "Partenaires technologiques certifiés",
                  "Réseau de distribution étendu", 
                  "Collaborations internationales",
                  "Expertise sectorielle spécialisée"
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 sm:w-6 h-5 sm:h-6 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              {/* Partner Carousel */}
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 min-h-56 sm:min-h-64">
                <div className="text-center h-full flex flex-col justify-center">
                  <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">{partners[currentPartner].logo}</div>
                  <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    {partners[currentPartner].name}
                  </h4>
                  <p className="text-blue-600 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
                    {partners[currentPartner].sector}
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {partners[currentPartner].description}
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
                <button
                  onClick={() => setCurrentPartner((prev) => (prev - 1 + partners.length) % partners.length)}
                  className="w-8 sm:w-10 h-8 sm:h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5" />
                </button>
                <button
                  onClick={() => setCurrentPartner((prev) => (prev + 1) % partners.length)}
                  className="w-8 sm:w-10 h-8 sm:h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
                </button>
              </div>

              {/* Partner Indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {partners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPartner(index)}
                    className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-colors ${
                      index === currentPartner ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Partner Logos Grid */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-6 sm:mb-8">
              Ils nous font confiance
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  onClick={() => setCurrentPartner(index)}
                >
                  <div className="text-center">
                    <div className="text-2xl sm:text-4xl mb-2">{partner.logo}</div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-900 mb-1">{partner.name}</p>
                    <p className="text-xs text-gray-500">{partner.sector}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Objectives Section - Version responsive améliorée */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Nos <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Objectifs</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">Ambitions et projets pour les années à venir</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <Target className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Court Terme (2025-2026)</h3>
              <ul className="space-y-2 sm:space-y-3 text-gray-600">
                <li className="flex items-start text-sm sm:text-base">
                  <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Digitalisation complète de nos processus</span>
                </li>
                <li className="flex items-start text-sm sm:text-base">
                  <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Certification ISO 9001 et 14001</span>
                </li>
                <li className="flex items-start text-sm sm:text-base">
                  <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Ouverture de 2 nouvelles agences</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <Clock className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Moyen Terme (2026-2028)</h3>
              <ul className="space-y-2 sm:space-y-3 text-gray-600">
                <li className="flex items-start text-sm sm:text-base">
                  <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Expansion dans 3 pays de la sous-région</span>
                </li>
                <li className="flex items-start text-sm sm:text-base">
                  <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Lancement de notre division R&D</span>
                </li>
                <li className="flex items-start text-sm sm:text-base">
                  <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Partenariats technologiques internationaux</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all md:col-span-2 lg:col-span-1">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <Trophy className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Long Terme (2028-2030)</h3>
              <ul className="space-y-2 sm:space-y-3 text-gray-600">
                <li className="flex items-start text-sm sm:text-base">
                  <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Leadership régional confirmé</span>
                </li>
                <li className="flex items-start text-sm sm:text-base">
                  <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Solutions IA intégrées dans tous nos services</span>
                </li>
                <li className="flex items-start text-sm sm:text-base">
                  <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Impact durable et responsabilité sociale</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Version responsive améliorée */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Rejoignez Notre Aventure
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8">
            Découvrez comment nous pouvons transformer vos projets en succès
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/#servicesSection">
              <button className="w-full sm:w-auto bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                Découvrir Nos Services
              </button>
            </Link>
            <button className="w-full sm:w-auto border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center">
              <Phone className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
              Nous Contacter
            </button>
          </div>
        </div>
      </section>

      {/* CSS amélioré pour les animations et la responsivité */}
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
          opacity: 0;
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

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Améliorations pour les petits écrans */
        @media (max-width: 640px) {
          .animate-fade-in {
            animation-duration: 0.6s;
          }
          
          /* Réduction des margins sur mobile */
          .space-y-8 > * + * {
            margin-top: 1.5rem;
          }
        }

        /* Améliorations pour l'accessibilité */
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in,
          .animate-pulse,
          .animate-bounce {
            animation: none;
          }
          
          .transform {
            transform: none !important;
          }
        }

        /* Focus states pour l'accessibilité */
        button:focus-visible,
        a:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }

        /* Amélioration des performances sur les animations */
        .transform {
          will-change: transform;
        }
        
        .hover\\:scale-105:hover {
          will-change: transform;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;



// "use client";
// import React, { useState, useEffect } from 'react';
// import { 
//   ChevronDown, Menu, X, Building2, TrendingUp, ShoppingCart, MapPin, 
//   Star, ArrowRight, Phone, Mail, CheckCircle, Users, Award, Globe,
//   Target, Eye, Heart, Lightbulb, Quote, Calendar, Briefcase,
//   Shield, Zap, Handshake, Trophy, Play, ArrowDown, UserCheck,
//   ChevronLeft, ChevronRight, Clock, MessageSquare
// } from 'lucide-react';
// import Link from 'next/link';

// const AboutPage = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [currentPartner, setCurrentPartner] = useState(0);
//   const [activeTab, setActiveTab] = useState('vision');

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Auto-rotate partners
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentPartner((prev) => (prev + 1) % partners.length);
//     }, 4000);
//     return () => clearInterval(timer);
//   }, []);

//   const services = [
//     { title: "Analyse des Affaires", icon: TrendingUp },
//     { title: "BTP", icon: Building2 },
//     { title: "Commerce Général", icon: ShoppingCart },
//     { title: "Tourisme", icon: MapPin }
//   ];

//   const coreValues = [
//     {
//       icon: Shield,
//       title: "Intégrité",
//       description: "Nous agissons avec transparence et honnêteté dans toutes nos relations d'affaires",
//       color: "from-blue-500 to-cyan-500"
//     },
//     {
//       icon: Zap,
//       title: "Excellence",
//       description: "Nous visons l'excellence dans chaque projet en dépassant les attentes de nos clients",
//       color: "from-purple-500 to-pink-500"
//     },
//     {
//       icon: Handshake,
//       title: "Partenariat",
//       description: "Nous construisons des relations durables basées sur la confiance mutuelle",
//       color: "from-green-500 to-emerald-500"
//     },
//     {
//       icon: Lightbulb,
//       title: "Innovation",
//       description: "Nous adoptons les dernières technologies pour des solutions innovantes",
//       color: "from-orange-500 to-red-500"
//     }
//   ];

//   const timeline = [
//     {
//       year: "2014",
//       title: "Création de l'entreprise",
//       description: "Fondation de MultiServices Pro avec une vision claire d'excellence",
//       icon: Briefcase
//     },
//     {
//       year: "2017",
//       title: "Expansion des services",
//       description: "Diversification vers le BTP et le commerce général",
//       icon: Building2
//     },
//     {
//       year: "2020",
//       title: "Certification qualité",
//       description: "Obtention des certifications ISO pour nos processus",
//       icon: Award
//     },
//     {
//       year: "2023",
//       title: "Leadership régional",
//       description: "Reconnaissance comme leader dans notre secteur d'activité",
//       icon: Trophy
//     }
//   ];

//   const team = [
//     {
//       name: "Dr. Amadou KONE",
//       position: "Président Directeur Général",
//       image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
//       description: "Visionnaire avec 15+ ans d'expérience dans le développement d'entreprises multi-sectorielles.",
//       linkedin: "#"
//     },
//     {
//       name: "Sarah DJOSSOU",
//       position: "Directrice Générale Adjointe",
//       image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
//       description: "Experte en stratégie d'entreprise et développement commercial international.",
//       linkedin: "#"
//     },
//     {
//       name: "Michel TOGO",
//       position: "Directeur Technique",
//       image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
//       description: "Ingénieur spécialisé en BTP avec une expertise reconnue en gestion de projets complexes.",
//       linkedin: "#"
//     },
//     {
//       name: "Fatou BARRY",
//       position: "Directrice Marketing",
//       image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
//       description: "Stratège marketing avec une passion pour l'innovation et l'expérience client.",
//       linkedin: "#"
//     }
//   ];

//   const partners = [
//     {
//       name: "TechnoFutur SA",
//       sector: "Technologies",
//       logo: "🔧",
//       description: "Partenaire technologique pour l'innovation digitale"
//     },
//     {
//       name: "BuildCorp International",
//       sector: "Construction",
//       logo: "🏗️",
//       description: "Collaboration sur les grands projets BTP"
//     },
//     {
//       name: "Commerce Plus Group",
//       sector: "Distribution",
//       logo: "📦",
//       description: "Réseau de distribution et logistique"
//     },
//     {
//       name: "Tourism Excellence",
//       sector: "Tourisme",
//       logo: "✈️",
//       description: "Partenaire pour les projets touristiques"
//     },
//     {
//       name: "Finance & Advisory",
//       sector: "Finance",
//       logo: "💼",
//       description: "Conseil financier et investissements"
//     }
//   ];

//   const achievements = [
//     { icon: Users, number: "500+", label: "Clients Satisfaits", color: "text-blue-600" },
//     { icon: Trophy, number: "15+", label: "Prix Remportés", color: "text-purple-600" },
//     { icon: Globe, number: "25+", label: "Projets Internationaux", color: "text-green-600" },
//     { icon: UserCheck, number: "98%", label: "Taux de Fidélisation", color: "text-orange-600" }
//   ];

//   return (
//     <div className="min-h-screen bg-white">
    

//       {/* Hero Section */}
//       <section className="relative h-screen flex items-center justify-center overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
//           <div className="absolute inset-0 bg-black/50"></div>
//           {/* Animated Elements */}
//           <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
//           <div className="absolute bottom-40 right-20 w-48 h-48 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
//           <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-cyan-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>
//         </div>

//         <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
//           <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
//             À Propos de
//             <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Nous</span>
//           </h1>
//           <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-fade-in delay-300">
//             Découvrez notre histoire, nos valeurs et notre vision pour l'avenir
//           </p>
//           <div className="flex justify-center animate-fade-in delay-500">
//             <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
//               <ArrowDown className="w-5 h-5 inline mr-2" />
//               Découvrir Notre Histoire
//             </button>
//           </div>
//         </div>

//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
//           <ChevronDown className="w-8 h-8 text-white" />
//         </div>
//       </section>

//       {/* Company Overview */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//                 Notre <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Histoire</span>
//               </h2>
//               <p className="text-lg text-gray-600 mb-6">
//                 Fondée en 2014, MultiServices Pro est née d'une vision audacieuse : devenir le partenaire de référence pour les entreprises cherchant des solutions complètes et innovantes dans plusieurs secteurs d'activité.
//               </p>
//               <p className="text-lg text-gray-600 mb-8">
//                 Au fil des années, nous avons développé une expertise reconnue dans l'analyse des affaires, le BTP, le commerce général et le tourisme, permettant à nos clients de bénéficier d'un accompagnement global et personnalisé.
//               </p>
//               <div className="grid grid-cols-2 gap-6">
//                 {achievements.map((achievement, index) => (
//                   <div key={index} className="text-center p-4 rounded-xl bg-gray-50 hover:shadow-lg transition-all">
//                     <achievement.icon className={`w-8 h-8 mx-auto mb-2 ${achievement.color}`} />
//                     <div className={`text-2xl font-bold ${achievement.color}`}>{achievement.number}</div>
//                     <div className="text-gray-600 text-sm">{achievement.label}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="relative">
//               <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
//                  <img src="/images/Logo_btic 2.png" alt="Logo"  />
//                 <blockquote className="text-gray-700 italic text-center">
//                   "L'excellence n'est pas un acte, mais une habitude. Nous nous efforçons chaque jour de dépasser les attentes de nos clients."
//                 </blockquote>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Mission, Vision, Values Tabs */}
//       <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//               Nos <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Fondamentaux</span>
//             </h2>
//           </div>

//           {/* Tab Navigation */}
//           <div className="flex justify-center mb-12">
//             <div className="bg-white rounded-full p-2 shadow-lg">
//               {[
//                 { id: 'vision', label: 'Vision', icon:Eye},
//                 { id: 'mission', label: 'Mission', icon:Target},
//                 { id: 'values', label: 'Valeurs', icon: Heart }
//               ].map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center space-x-2 
//                     ${
//                     activeTab === tab.id
//                       ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
//                       : 'text-gray-600 hover:text-blue-600'
//                   }`}
//                 >
//                   <tab.icon className="w-5 h-5" />
//                   <span>{tab.label}</span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Tab Content */}
//           <div className="max-w-4xl mx-auto">
//             {activeTab === 'mission' && (
//               <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg animate-fade-in">
//                 <div className="text-center mb-8">
//                   <Target className="w-16 h-16 mx-auto mb-4 text-blue-600" />
//                   <h3 className="text-3xl font-bold text-gray-900 mb-4">Notre Mission</h3>
//                 </div>
//                 <p className="text-lg text-gray-600 text-center mb-8">
//                   Accompagner nos clients dans leur réussite en leur offrant des solutions multi-services innovantes, personnalisées et de haute qualité, tout en contribuant au développement économique et social de notre région.
//                 </p>
//                 <div className="grid md:grid-cols-3 gap-6">
//                   <div className="text-center p-4 bg-blue-50 rounded-xl">
//                     <CheckCircle className="w-8 h-8 mx-auto mb-2 text-blue-600" />
//                     <h4 className="font-semibold text-gray-900 mb-2">Excellence</h4>
//                     <p className="text-gray-600 text-sm">Qualité irréprochable dans tous nos services</p>
//                   </div>
//                   <div className="text-center p-4 bg-purple-50 rounded-xl">
//                     <Users className="w-8 h-8 mx-auto mb-2 text-purple-600" />
//                     <h4 className="font-semibold text-gray-900 mb-2">Proximité</h4>
//                     <p className="text-gray-600 text-sm">Relation client personnalisée et durable</p>
//                   </div>
//                   <div className="text-center p-4 bg-green-50 rounded-xl">
//                     <Lightbulb className="w-8 h-8 mx-auto mb-2 text-green-600" />
//                     <h4 className="font-semibold text-gray-900 mb-2">Innovation</h4>
//                     <p className="text-gray-600 text-sm">Solutions créatives et avant-gardistes</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'vision' && (
//               <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg animate-fade-in">
//                 <div className="text-center mb-8">
//                   <Eye className="w-16 h-16 mx-auto mb-4 text-purple-600" />
//                   <h3 className="text-3xl font-bold text-gray-900 mb-4">Notre Vision</h3>
//                 </div>
//                 <p className="text-lg text-gray-600 text-center mb-8">
//                   Devenir le leader régional des services intégrés, reconnu pour notre expertise multi-sectorielle, notre innovation constante et notre contribution positive au développement durable.
//                 </p>
//                 <div className="grid md:grid-cols-2 gap-8">
//                   <div className="flex items-start space-x-4">
//                     <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
//                       <Globe className="w-6 h-6 text-white" />
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-gray-900 mb-2">Expansion Régionale</h4>
//                       <p className="text-gray-600">Étendre notre présence dans toute l'Afrique de l'Ouest d'ici 2030</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start space-x-4">
//                     <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
//                       <Zap className="w-6 h-6 text-white" />
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-gray-900 mb-2">Innovation Technologique</h4>
//                       <p className="text-gray-600">Intégrer l'IA et les technologies émergentes dans nos services</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'values' && (
//               <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg animate-fade-in">
//                 <div className="text-center mb-8">
//                   <Heart className="w-16 h-16 mx-auto mb-4 text-red-500" />
//                   <h3 className="text-3xl font-bold text-gray-900 mb-4">Nos Valeurs</h3>
//                 </div>
//                 <div className="grid md:grid-cols-2 gap-6">
//                   {coreValues.map((value, index) => (
//                     <div key={index} className="group hover:scale-105 transition-transform duration-300">
//                       <div className="bg-gray-50 rounded-xl p-6 h-full">
//                         <div className={`w-12 h-12 bg-gradient-to-r ${value.color} rounded-xl flex items-center justify-center mb-4`}>
//                           <value.icon className="w-6 h-6 text-white" />
//                         </div>
//                         <h4 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h4>
//                         <p className="text-gray-600">{value.description}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Timeline */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//               Notre <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Parcours</span>
//             </h2>
//             <p className="text-xl text-gray-600">Une décennie d'innovation et de croissance</p>
//           </div>

//           <div className="relative">
//             {/* Timeline Line */}
//             <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>

//             <div className="space-y-12">
//               {timeline.map((item, index) => (
//                 <div key={index} className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
//                   <div className={`w-full max-w-md ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
//                     <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
//                       <div className="flex items-center mb-4">
//                         <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
//                           <item.icon className="w-6 h-6 text-white" />
//                         </div>
//                         <div>
//                           <div className="text-2xl font-bold text-blue-600">{item.year}</div>
//                           <div className="text-lg font-semibold text-gray-900">{item.title}</div>
//                         </div>
//                       </div>
//                       <p className="text-gray-600">{item.description}</p>
//                     </div>
//                   </div>
                  
//                   {/* Timeline Dot */}
//                   <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full border-4 border-blue-500 shadow-lg"></div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CEO Message */}
//       <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//             <div className="grid lg:grid-cols-2 gap-0">
//               <div className="p-8 lg:p-12">
//                 <div className="flex items-center mb-6">
//                   <Quote className="w-12 h-12 text-blue-600 mr-4" />
//                   <div>
//                     <h3 className="text-2xl font-bold text-gray-900">Mot du PDG</h3>
//                     <p className="text-gray-600">Message de notre direction</p>
//                   </div>
//                 </div>
//                 <blockquote className="text-lg text-gray-700 mb-6 italic">
//                   "Notre succès repose sur une philosophie simple : écouter nos clients, anticiper leurs besoins et dépasser leurs attentes. Chaque projet est une opportunité de créer de la valeur et de construire l'avenir ensemble."
//                 </blockquote>
//                 <blockquote className="text-lg text-gray-700 mb-8 italic">
//                   "L'avenir appartient aux entreprises qui savent s'adapter, innover et maintenir l'excellence opérationnelle. C'est notre engagement quotidien envers vous."
//                 </blockquote>
//                 <div className="flex items-center">
//                   <img 
//                     src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" 
//                     alt="Dr. Amadou KONE"
//                     className="w-16 h-16 rounded-full mr-4"
//                   />
//                   <div>
//                     <div className="font-bold text-gray-900">Dr. Amadou KONE</div>
//                     <div className="text-blue-600">Président Directeur Général</div>
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 lg:p-12 flex items-center justify-center">
//                 <img 
//                   src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face" 
//                   alt="Dr. Amadou KONE"
//                   className="w-full max-w-sm rounded-xl shadow-2xl"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Team Section */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//               Notre <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Équipe</span>
//             </h2>
//             <p className="text-xl text-gray-600">Des professionnels passionnés et expérimentés</p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {team.map((member, index) => (
//               <div key={index} className="group">
//                 <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
//                   <div className="relative">
//                     <img 
//                       src={member.image} 
//                       alt={member.name}
//                       className="w-full h-64 object-cover"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                   </div>
//                   <div className="p-6">
//                     <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
//                     <p className="text-blue-600 font-semibold mb-3">{member.position}</p>
//                     <p className="text-gray-600 text-sm mb-4">{member.description}</p>
//                     <a 
//                       href={member.linkedin} 
//                       className="inline-flex items-center text-blue-600 hover:text-purple-600 transition-colors"
//                     >
//                       <MessageSquare className="w-4 h-4 mr-2" />
//                       Contacter
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Partners Section */}
//       <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//               Nos <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Partenaires</span>
//             </h2>
//             <p className="text-xl text-gray-600">Un réseau solide pour votre réussite</p>
//           </div>

//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <h3 className="text-3xl font-bold text-gray-900 mb-6">
//                 Réseau de Partenaires Stratégiques
//               </h3>
//               <p className="text-lg text-gray-600 mb-6">
//                 Nous collaborons avec des leaders de l'industrie pour offrir à nos clients des solutions complètes et innovantes. Notre réseau de partenaires nous permet d'étendre notre expertise et de garantir l'excellence dans tous nos projets.
//               </p>
//               <div className="space-y-4">
//                 <div className="flex items-center">
//                   <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
//                   <span className="text-gray-700">Partenaires technologiques certifiés</span>
//                 </div>
//                 <div className="flex items-center">
//                   <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
//                   <span className="text-gray-700">Réseau de distribution étendu</span>
//                 </div>
//                 <div className="flex items-center">
//                   <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
//                   <span className="text-gray-700">Collaborations internationales</span>
//                 </div>
//                 <div className="flex items-center">
//                   <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
//                   <span className="text-gray-700">Expertise sectorielle spécialisée</span>
//                 </div>
//               </div>
//             </div>

//             <div className="relative">
//               {/* Partner Carousel */}
//               <div className="bg-white rounded-2xl shadow-xl p-8 min-h-64">
//                 <div className="text-center">
//                   <div className="text-6xl mb-4">{partners[currentPartner].logo}</div>
//                   <h4 className="text-2xl font-bold text-gray-900 mb-2">
//                     {partners[currentPartner].name}
//                   </h4>
//                   <p className="text-blue-600 font-semibold mb-4">
//                     {partners[currentPartner].sector}
//                   </p>
//                   <p className="text-gray-600">
//                     {partners[currentPartner].description}
//                   </p>
//                 </div>
//               </div>

//               {/* Navigation */}
//               <div className="flex justify-center mt-6 space-x-2">
//                 <button
//                   onClick={() => setCurrentPartner((prev) => (prev - 1 + partners.length) % partners.length)}
//                   className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
//                 >
//                   <ChevronLeft className="w-5 h-5" />
//                 </button>
//                 <button
//                   onClick={() => setCurrentPartner((prev) => (prev + 1) % partners.length)}
//                   className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
//                 >
//                   <ChevronRight className="w-5 h-5" />
//                 </button>
//               </div>

//               {/* Partner Indicators */}
//               <div className="flex justify-center mt-4 space-x-2">
//                 {partners.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentPartner(index)}
//                     className={`w-3 h-3 rounded-full transition-colors ${
//                       index === currentPartner ? 'bg-blue-600' : 'bg-gray-300'
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Partner Logos Grid */}
//           <div className="mt-16">
//             <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
//               Ils nous font confiance
//             </h3>
//             <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
//               {partners.map((partner, index) => (
//                 <div
//                   key={index}
//                   className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
//                   onClick={() => setCurrentPartner(index)}
//                 >
//                   <div className="text-center">
//                     <div className="text-4xl mb-2">{partner.logo}</div>
//                     <p className="text-sm font-semibold text-gray-900">{partner.name}</p>
//                     <p className="text-xs text-gray-500">{partner.sector}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Objectives Section */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//               Nos <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Objectifs</span>
//             </h2>
//             <p className="text-xl text-gray-600">Ambitions et projets pour les années à venir</p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:shadow-lg transition-all">
//               <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
//                 <Target className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-4">Court Terme (2025-2026)</h3>
//               <ul className="space-y-3 text-gray-600">
//                 <li className="flex items-start">
//                   <CheckCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
//                   <span>Digitalisation complète de nos processus</span>
//                 </li>
//                 <li className="flex items-start">
//                   <CheckCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
//                   <span>Certification ISO 9001 et 14001</span>
//                 </li>
//                 <li className="flex items-start">
//                   <CheckCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
//                   <span>Ouverture de 2 nouvelles agences</span>
//                 </li>
//               </ul>
//             </div>

//             <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 hover:shadow-lg transition-all">
//               <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
//                 <Clock className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-4">Moyen Terme (2026-2028)</h3>
//               <ul className="space-y-3 text-gray-600">
//                 <li className="flex items-start">
//                   <CheckCircle className="w-5 h-5 text-purple-500 mr-2 mt-0.5" />
//                   <span>Expansion dans 3 pays de la sous-région</span>
//                 </li>
//                 <li className="flex items-start">
//                   <CheckCircle className="w-5 h-5 text-purple-500 mr-2 mt-0.5" />
//                   <span>Lancement de notre division R&D</span>
//                 </li>
//                 <li className="flex items-start">
//                   <CheckCircle className="w-5 h-5 text-purple-500 mr-2 mt-0.5" />
//                   <span>Partenariats technologiques internationaux</span>
//                 </li>
//               </ul>
//             </div>

//             <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 hover:shadow-lg transition-all">
//               <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
//                 <Trophy className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-4">Long Terme (2028-2030)</h3>
//               <ul className="space-y-3 text-gray-600">
//                 <li className="flex items-start">
//                   <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
//                   <span>Leadership régional confirmé</span>
//                 </li>
//                 <li className="flex items-start">
//                   <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
//                   <span>Solutions IA intégrées dans tous nos services</span>
//                 </li>
//                 <li className="flex items-start">
//                   <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
//                   <span>Impact durable et responsabilité sociale</span>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//             Rejoignez Notre Aventure
//           </h2>
//           <p className="text-xl text-blue-100 mb-8">
//             Découvrez comment nous pouvons transformer vos projets en succès
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link
//             href="/#servicesSection">
//             <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
//               Découvrir Nos Services
//             </button>
//             </Link>
//             <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
//               <Phone className="w-5 h-5 inline mr-2" />
//               Nous Contacter
//             </button>
//           </div>
//         </div>
//       </section>

      

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

// export default AboutPage;



