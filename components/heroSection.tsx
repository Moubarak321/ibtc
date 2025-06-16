// import React from 'react';
// import { ArrowRight, Play } from 'lucide-react';

// const HeroSection = () => {
//   return (
//     <section id="accueil" className="min-h-screen relative overflow-hidden flex items-center">
//       {/* Animated Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
//         <div className="absolute inset-0 bg-black/20"></div>
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>
//       </div>
      
//       {/* Floating Elements */}
//       <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full animate-bounce"></div>
//       <div className="absolute top-40 right-20 w-16 h-16 bg-purple-400/20 rounded-full animate-pulse"></div>
//       <div className="absolute bottom-20 left-20 w-24 h-24 bg-blue-300/20 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
      
//       <div className="container mx-auto px-4 relative z-10">
//         <div className="max-w-4xl mx-auto text-center text-white">
//           <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
//             Votre Partenaire
//             <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//               Multi-Services
//             </span>
//           </h1>
          
//           <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fade-in" style={{animationDelay: '0.3s'}}>
//             Excellence • Innovation • Confiance
//           </p>
          
//           <p className="text-lg mb-12 text-gray-300 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '0.6s'}}>
//             De l'analyse d'affaires au BTP, du commerce général au tourisme, 
//             nous transformons vos idées en succès concrets avec notre expertise multisectorielle.
//           </p>
          
//           <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{animationDelay: '0.9s'}}>
//             <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center group">
//               Découvrir nos services
//               <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
//             </button>
            
//             <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center group">
//               <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
//               Voir notre vidéo
//             </button>
//           </div>
          
//           {/* Stats */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 animate-fade-in" style={{animationDelay: '1.2s'}}>
//             <div className="text-center">
//               <div className="text-3xl md:text-4xl font-bold text-blue-400">500+</div>
//               <div className="text-gray-300">Projets Réalisés</div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl md:text-4xl font-bold text-purple-400">15+</div>
//               <div className="text-gray-300">Années d'Expérience</div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl md:text-4xl font-bold text-blue-400">98%</div>
//               <div className="text-gray-300">Clients Satisfaits</div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl md:text-4xl font-bold text-purple-400">24/7</div>
//               <div className="text-gray-300">Support Client</div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Scroll Indicator */}
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
//         <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
//           <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;


















import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="accueil" className="min-h-screen relative overflow-hidden flex items-center">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full animate-bounce"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-purple-400/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-blue-300/20 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Votre Partenaire
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Multi-Services
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fade-in" style={{animationDelay: '0.3s'}}>
            Excellence • Innovation • Confiance
          </p>
          
          <p className="text-lg mb-12 text-gray-300 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '0.6s'}}>
            De l'analyse d'affaires au BTP, du commerce général au tourisme, 
            nous transformons vos idées en succès concrets avec notre expertise multisectorielle.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{animationDelay: '0.9s'}}>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center group">
              Découvrir nos services
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center group">
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Voir notre vidéo
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 animate-fade-in" style={{animationDelay: '1.2s'}}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-400">500+</div>
              <div className="text-gray-300">Projets Réalisés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-400">15+</div>
              <div className="text-gray-300">Années d'Expérience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-400">98%</div>
              <div className="text-gray-300">Clients Satisfaits</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-400">24/7</div>
              <div className="text-gray-300">Support Client</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
