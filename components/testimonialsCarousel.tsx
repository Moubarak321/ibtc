// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

// const TestimonialsCarousel = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
  
//   const testimonials = [
//     {
//       name: "Marie Dubois",
//       position: "Directrice Générale",
//       company: "TechInnovate",
//       content: "AuraPro a transformé notre stratégie digitale. Leur expertise en analyse d'affaires nous a permis d'augmenter notre chiffre d'affaires de 250% en 18 mois.",
//       rating: 5,
//       avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
//     },
//     {
//       name: "Pierre Martin",
//       position: "PDG",
//       company: "ConstructPro",
//       content: "Leur équipe BTP est exceptionnelle. Ils ont livré notre projet de centre commercial en avance et sous budget. Un professionnalisme remarquable.",
//       rating: 5,
//       avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
//     },
//     {
//       name: "Sophie Laurent",
//       position: "Responsable Marketing",
//       company: "EcoTourism",
//       content: "Grâce à AuraPro, notre activité touristique a doublé. Leur approche innovante et leur connaissance du secteur sont impressionnantes.",
//       rating: 5,
//       avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
//     },
//     {
//       name: "Jean Durand",
//       position: "Fondateur",
//       company: "CommerceLocal",
//       content: "L'accompagnement d'AuraPro dans notre transformation e-commerce a été décisif. Une équipe à l'écoute et des résultats concrets.",
//       rating: 5,
//       avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
//     }
//   ];

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % testimonials.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, [testimonials.length]);

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % testimonials.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
//   };

//   return (
//     <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 text-white">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold mb-4">
//             Ce que disent nos <span className="text-blue-300">clients</span>
//           </h2>
//           <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//             Leur confiance et leur satisfaction sont notre plus belle récompense
//           </p>
//         </div>
        
//         <div className="relative max-w-4xl mx-auto">
//           <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12">
//             <div className="flex flex-col items-center text-center">
//               <img
//                 src={testimonials[currentSlide].avatar}
//                 alt={testimonials[currentSlide].name}
//                 className="w-20 h-20 rounded-full mb-6 border-4 border-white/20"
//               />
              
//               <div className="flex mb-4">
//                 {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
//                   <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
//                 ))}
//               </div>
              
//               <blockquote className="text-xl md:text-2xl mb-6 italic">
//                 "{testimonials[currentSlide].content}"
//               </blockquote>
              
//               <div>
//                 <div className="font-semibold text-lg">{testimonials[currentSlide].name}</div>
//                 <div className="text-blue-300">{testimonials[currentSlide].position}</div>
//                 <div className="text-gray-300">{testimonials[currentSlide].company}</div>
//               </div>
//             </div>
//           </div>
          
//           {/* Navigation Buttons */}
//           <button
//             onClick={prevSlide}
//             className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors"
//           >
//             <ChevronLeft className="h-6 w-6" />
//           </button>
          
//           <button
//             onClick={nextSlide}
//             className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors"
//           >
//             <ChevronRight className="h-6 w-6" />
//           </button>
          
//           {/* Indicators */}
//           <div className="flex justify-center mt-8 space-x-2">
//             {testimonials.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentSlide(index)}
//                 className={`w-3 h-3 rounded-full transition-colors ${
//                   index === currentSlide ? 'bg-white' : 'bg-white/30'
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TestimonialsCarousel;


























import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const TestimonialsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const testimonials = [
    {
      name: "Marie Dubois",
      position: "Directrice Générale",
      company: "TechInnovate",
      content: "AuraPro a transformé notre stratégie digitale. Leur expertise en analyse d'affaires nous a permis d'augmenter notre chiffre d'affaires de 250% en 18 mois.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Pierre Martin",
      position: "PDG",
      company: "ConstructPro",
      content: "Leur équipe BTP est exceptionnelle. Ils ont livré notre projet de centre commercial en avance et sous budget. Un professionnalisme remarquable.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Sophie Laurent",
      position: "Responsable Marketing",
      company: "EcoTourism",
      content: "Grâce à AuraPro, notre activité touristique a doublé. Leur approche innovante et leur connaissance du secteur sont impressionnantes.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Jean Durand",
      position: "Fondateur",
      company: "CommerceLocal",
      content: "L'accompagnement d'AuraPro dans notre transformation e-commerce a été décisif. Une équipe à l'écoute et des résultats concrets.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ce que disent nos <span className="text-blue-300">clients</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Leur confiance et leur satisfaction sont notre plus belle récompense
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12">
            <div className="flex flex-col items-center text-center">
              <img
                src={testimonials[currentSlide].avatar}
                alt={testimonials[currentSlide].name}
                className="w-20 h-20 rounded-full mb-6 border-4 border-white/20"
              />
              
              <div className="flex mb-4">
                {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-xl md:text-2xl mb-6 italic">
                "{testimonials[currentSlide].content}"
              </blockquote>
              
              <div>
                <div className="font-semibold text-lg">{testimonials[currentSlide].name}</div>
                <div className="text-blue-300">{testimonials[currentSlide].position}</div>
                <div className="text-gray-300">{testimonials[currentSlide].company}</div>
              </div>
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
