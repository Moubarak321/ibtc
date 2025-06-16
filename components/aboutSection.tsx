import React from 'react';
import { Users, Award, Target, Heart } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection'

const AboutSection = () => {
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "Nous visons l'excellence dans chaque projet"
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Travail d'équipe et partenariat durable"
    },
    {
      icon: Award,
      title: "Innovation",
      description: "Solutions créatives et technologies avancées"
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Engagement total envers nos clients"
    }
  ];

  return (
    <section id="apropos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              À propos de <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AuraPro</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-6">
              Depuis plus de 15 ans, AuraPro accompagne les entreprises dans leur développement 
              grâce à une expertise multi-sectorielle unique. Notre équipe passionnée transforme 
              vos défis en opportunités de croissance.
            </p>
            
            <p className="text-gray-600 mb-8">
              De l'analyse stratégique aux projets de construction, en passant par le développement 
              commercial et les services touristiques, nous mettons notre savoir-faire au service 
              de votre réussite.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="bg-blue-50 px-4 py-2 rounded-full">
                <span className="text-blue-600 font-semibold">15+ années d'expérience</span>
              </div>
              <div className="bg-purple-50 px-4 py-2 rounded-full">
                <span className="text-purple-600 font-semibold">500+ projets réalisés</span>
              </div>
              <div className="bg-green-50 px-4 py-2 rounded-full">
                <span className="text-green-600 font-semibold">98% de satisfaction</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <value.icon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;





























// import React from 'react';
// import { Users, Award, Target, Heart, ArrowDown, ChevronDown } from 'lucide-react';
// import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// const AboutSection = () => {
//   const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation(0.1);
//   const { ref: valuesRef, isVisible: valuesVisible } = useScrollAnimation(0.1);

//   const values = [
//     {
//       icon: Target,
//       title: "Excellence",
//       description: "Nous visons l'excellence dans chaque projet"
//     },
//     {
//       icon: Users,
//       title: "Collaboration",
//       description: "Travail d'équipe et partenariat durable"
//     },
//     {
//       icon: Award,
//       title: "Innovation",
//       description: "Solutions créatives et technologies avancées"
//     },
//     {
//       icon: Heart,
//       title: "Passion",
//       description: "Engagement total envers nos clients"
//     }
//   ];

//   return (
//     <section id="apropos">
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
//             <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> AuraPro</span>
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

//       {/* Content Section */}
//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-4">
//           <div 
//             ref={contentRef}
//             className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
//           >
//             <div className={`transition-all duration-1000 ${
//               contentVisible 
//                 ? 'animate-slide-in-left' 
//                 : 'scroll-hidden'
//             }`}>
//               <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//                 Notre Histoire et <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Expertise</span>
//               </h2>
              
//               <p className="text-lg text-gray-600 mb-6">
//                 Depuis plus de 15 ans, AuraPro accompagne les entreprises dans leur développement 
//                 grâce à une expertise multi-sectorielle unique. Notre équipe passionnée transforme 
//                 vos défis en opportunités de croissance.
//               </p>
              
//               <p className="text-gray-600 mb-8">
//                 De l'analyse stratégique aux projets de construction, en passant par le développement 
//                 commercial et les services touristiques, nous mettons notre savoir-faire au service 
//                 de votre réussite.
//               </p>
              
//               <div className="flex flex-wrap gap-4">
//                 <div className="bg-blue-50 px-4 py-2 rounded-full">
//                   <span className="text-blue-600 font-semibold">15+ années d'expérience</span>
//                 </div>
//                 <div className="bg-purple-50 px-4 py-2 rounded-full">
//                   <span className="text-purple-600 font-semibold">500+ projets réalisés</span>
//                 </div>
//                 <div className="bg-green-50 px-4 py-2 rounded-full">
//                   <span className="text-green-600 font-semibold">98% de satisfaction</span>
//                 </div>
//               </div>
//             </div>
            
//             <div 
//               ref={valuesRef}
//               className={`grid grid-cols-2 gap-6 transition-all duration-1000 ${
//                 valuesVisible 
//                   ? 'animate-slide-in-right' 
//                   : 'scroll-hidden'
//               }`}
//             >
//               {values.map((value, index) => (
//                 <div
//                   key={index}
//                   className={`bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 ${
//                     valuesVisible 
//                       ? 'animate-scale-in' 
//                       : 'scroll-hidden'
//                   }`}
//                   style={{ animationDelay: `${index * 0.1 + 0.5}s` }}
//                 >
//                   <value.icon className="h-12 w-12 text-blue-600 mb-4" />
//                   <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
//                   <p className="text-sm text-gray-600">{value.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//     </section>
//   );
// };

// export default AboutSection;