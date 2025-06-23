"use client";
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

const ModernCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Données du carrousel avec images et textes
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      title: "Analyse d'Affaires",
      subtitle: "Stratégies Innovantes",
      description: "Nous analysons vos besoins pour créer des solutions sur mesure qui propulsent votre entreprise vers le succès.",
      cta: "Découvrir nos analyses",
      gradient: "from-blue-600/80 to-purple-600/80"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "BTP & Construction",
      subtitle: "Bâtir l'Avenir",
      description: "Des fondations solides aux finitions parfaites, nous réalisons vos projets de construction avec expertise et qualité.",
      cta: "Voir nos réalisations",
      gradient: "from-orange-600/80 to-red-600/80"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80",
      title: "Commerce Général",
      subtitle: "Solutions Commerciales",
      description: "De la distribution aux ventes, nous offrons des services commerciaux complets pour développer votre business.",
      cta: "Explorer nos services",
      gradient: "from-green-600/80 to-teal-600/80"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      title: "Tourisme & Voyage",
      subtitle: "Expériences Inoubliables",
      description: "Créons ensemble des expériences touristiques uniques qui marquent les esprits et fidélisent vos clients.",
      cta: "Planifier votre voyage",
      gradient: "from-purple-600/80 to-pink-600/80"
    }
  ];

  // Auto-play du carrousel
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: React.SetStateAction<number>) => {
    setCurrentSlide(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="mt-12 relative w-full h-[600px] overflow-hidden rounded-2xl shadow-2xl">
      {/* Conteneur des slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
          >
            {/* Image de fond */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            
            {/* Overlay gradient */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} backdrop-blur-[1px]`} />
            
            {/* Contenu texte */}
            <div className="relative h-full flex items-center justify-center p-8">
              <div className="text-center text-white max-w-4xl mx-auto">
                <div className={`transform transition-all duration-1000 delay-300 ${
                  index === currentSlide 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-8 opacity-0'
                }`}>
                  <p className="text-lg md:text-xl font-medium mb-2 text-blue-200">
                    {slide.subtitle}
                  </p>
                  <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                    {slide.description}
                  </p>
                  <button className="bg-white/20 backdrop-blur-md text-white px-8 py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30 hover:scale-105 hover:shadow-xl">
                    {slide.cta}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contrôles de navigation */}
      <div className="absolute inset-y-0 left-4 flex items-center">
        <button
          onClick={prevSlide}
          className="bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110 shadow-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
      
      <div className="absolute inset-y-0 right-4 flex items-center">
        <button
          onClick={nextSlide}
          className="bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110 shadow-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Indicateurs de progression */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative overflow-hidden rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'w-12 h-3 bg-white' 
                : 'w-3 h-3 bg-white/50 hover:bg-white/70'
            }`}
          >
            {index === currentSlide && isPlaying && (
              <div 
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                style={{
                  animation: 'progress 5s linear infinite'
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Contrôle Play/Pause */}
      <div className="absolute top-6 right-6">
        <button
          onClick={togglePlayPause}
          className="bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110 shadow-lg"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
      </div>

      {/* Informations sur le slide actuel */}
      <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium">
        {currentSlide + 1} / {slides.length}
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0%);
          }
        }
      `}</style>
    </div>
  );
};

export default ModernCarousel;