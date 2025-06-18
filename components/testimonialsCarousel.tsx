import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TestimonialsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  
  const testimonials = [
    {
      name: "Marie Dubois",
      position: "Directrice Générale",
      company: "TechInnovate",
      content: "BTIC a transformé notre stratégie digitale. Leur expertise en analyse d'affaires nous a permis d'augmenter notre chiffre d'affaires de 250% en 18 mois.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Ismael OUEDRAOGO",
      position: "PDG",
      company: "ConstructPro",
      content: "Leur équipe BTP est exceptionnelle. Ils ont livré notre projet de centre commercial en avance et sous budget. Un professionnalisme remarquable.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Paulette DOSSA",
      position: "Responsable Marketing",
      company: "EcoTourism",
      content: "Grâce à BTIC, notre activité touristique a doublé. Leur approche innovante et leur connaissance du secteur sont impressionnantes.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Jean Durand",
      position: "Fondateur",
      company: "CommerceLocal",
      content: "L'accompagnement de BTIC dans notre transformation e-commerce a été décisif. Une équipe à l'écoute et des résultats concrets.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0
    })
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ce que disent nos <span className="text-blue-300">clients</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Leur confiance et leur satisfaction sont notre plus belle récompense
          </p>
        </motion.div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 h-[400px] md:h-[350px] flex items-center justify-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="flex flex-col items-center text-center w-full"
              >
                <motion.img
                  src={testimonials[currentSlide].avatar}
                  alt={testimonials[currentSlide].name}
                  className="w-20 h-20 rounded-full mb-6 border-4 border-white/20"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                />
                
                <motion.div 
                  className="flex mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </motion.div>
                
                <motion.blockquote 
                  className="text-xl md:text-2xl mb-6 italic"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  "{testimonials[currentSlide].content}"
                </motion.blockquote>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="font-semibold text-lg">{testimonials[currentSlide].name}</div>
                  <div className="text-blue-300">{testimonials[currentSlide].position}</div>
                  <div className="text-gray-300">{testimonials[currentSlide].company}</div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation Buttons */}
          <motion.button
            onClick={prevSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </motion.button>
          
          <motion.button
            onClick={nextSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </motion.button>
          
          {/* Indicators */}
          <motion.div 
            className="flex justify-center mt-8 space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentSlide ? 1 : -1);
                  setCurrentSlide(index);
                }}
                whileHover={{ scale: 1.2 }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;