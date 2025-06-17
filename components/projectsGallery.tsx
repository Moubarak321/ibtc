
// import React, { useState } from 'react';
// import { ExternalLink } from 'lucide-react';

// const ProjectsGallery = () => {
//   const [selectedCategory, setSelectedCategory] = useState('all');
  
//   const projects = [
//     {
//       id: 1,
//       title: "Centre Commercial Moderne",
//       category: "btp",
//       image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&h=300&fit=crop",
//       description: "Construction d'un centre commercial de 15000m²"
//     },
//     {
//       id: 2,
//       title: "Stratégie E-commerce",
//       category: "commerce",
//       image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=300&fit=crop",
//       description: "Transformation digitale pour une croissance de 300%"
//     },
//     {
//       id: 3,
//       title: "Resort Touristique",
//       category: "tourisme",
//       image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&h=300&fit=crop",
//       description: "Développement d'un complexe touristique écologique"
//     },
//     {
//       id: 4,
//       title: "Audit Financier Complet",
//       category: "analyse",
//       image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=300&fit=crop",
//       description: "Optimisation des processus pour une PME"
//     },
//     {
//       id: 5,
//       title: "Immeuble de Bureaux",
//       category: "btp",
//       image: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=500&h=300&fit=crop",
//       description: "Construction d'un immeuble de bureaux moderne"
//     },
//     {
//       id: 6,
//       title: "Plateforme E-commerce",
//       category: "commerce",
//       image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop",
//       description: "Développement d'une marketplace innovante"
//     }
//   ];

//   const categories = [
//     { id: 'all', name: 'Tous les projets' },
//     { id: 'btp', name: 'BTP' },
//     { id: 'commerce', name: 'Commerce' },
//     { id: 'tourisme', name: 'Tourisme' },
//     { id: 'analyse', name: 'Analyse' }
//   ];

//   const filteredProjects = selectedCategory === 'all' 
//     ? projects 
//     : projects.filter(project => project.category === selectedCategory);

//   return (
//     <section className="py-20 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             Nos <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Réalisations</span>
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
//             Découvrez quelques-uns de nos projets qui témoignent de notre expertise
//           </p>
          
//           {/* Category Filter */}
//           <div className="flex flex-wrap justify-center gap-4">
//             {categories.map((category) => (
//               <button
//                 key={category.id}
//                 onClick={() => setSelectedCategory(category.id)}
//                 className={`px-6 py-2 rounded-full transition-all duration-300 ${
//                   selectedCategory === category.id
//                     ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
//                     : 'bg-white text-gray-600 hover:bg-gray-100'
//                 }`}
//               >
//                 {category.name}
//               </button>
//             ))}
//           </div>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredProjects.map((project) => (
//             <div
//               key={project.id}
//               className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
//             >
//               <div className="relative overflow-hidden">
//                 <img
//                   src={project.image}
//                   alt={project.title}
//                   className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
//                   <button className="text-white m-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
//                     <ExternalLink className="h-5 w-5" />
//                   </button>
//                 </div>
//               </div>
              
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
//                 <p className="text-gray-600">{project.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProjectsGallery;



import React, { useState, useEffect } from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';

const ProjectsGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const projects = [
    {
      id: 1,
      title: "Centre Commercial Moderne",
      category: "btp",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&h=300&fit=crop",
      description: "Construction d'un centre commercial de 15000m²",
      year: "2023"
    },
    {
      id: 2,
      title: "Stratégie E-commerce",
      category: "commerce",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=300&fit=crop",
      description: "Transformation digitale pour une croissance de 300%",
      year: "2022"
    },
    {
      id: 3,
      title: "Resort Touristique",
      category: "tourisme",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&h=300&fit=crop",
      description: "Développement d'un complexe touristique écologique",
      year: "2021"
    },
    {
      id: 4,
      title: "Audit Financier Complet",
      category: "analyse",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=300&fit=crop",
      description: "Optimisation des processus pour une PME",
      year: "2020"
    },
    {
      id: 5,
      title: "Immeuble de Bureaux",
      category: "btp",
      image: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=500&h=300&fit=crop",
      description: "Construction d'un immeuble de bureaux moderne",
      year: "2023"
    },
    {
      id: 6,
      title: "Plateforme E-commerce",
      category: "commerce",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop",
      description: "Développement d'une marketplace innovante",
      year: "2022"
    }
  ];

  const categories = [
    { id: 'all', name: 'Tous les projets' },
    { id: 'btp', name: 'BTP' },
    { id: 'commerce', name: 'Commerce' },
    { id: 'tourisme', name: 'Tourisme' },
    { id: 'analyse', name: 'Analyse' }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const hoverEffect = {
    scale: 1.03,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.3 }
  };

  return (
    <>
      <Head>
        <title>Nos Réalisations | Portfolio</title>
        <meta name="description" content="Découvrez nos projets phares dans différents domaines d'expertise" />
      </Head>

      <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Nos <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Réalisations</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Découvrez quelques-uns de nos projets qui témoignent de notre expertise
            </p>
            
            {/* Category Filter */}
            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-100 shadow-md'
                  }`}
                >
                  {category.name}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
          
          <AnimatePresence>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={container}
              initial="hidden"
              animate="show"
              key={selectedCategory}
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={item}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group relative"
                  whileHover="hover"
                  onHoverStart={() => setIsHovered(project.id)}
                  onHoverEnd={() => setIsHovered(null)}
                >
                  <div className="relative overflow-hidden h-64">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1 }}
                      animate={isHovered === project.id ? { scale: 1.1 } : { scale: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <motion.button 
                        className="text-white p-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors flex items-center gap-2"
                        whileHover={{ scale: 1.1 }}
                      >
                        <span className="text-sm font-medium">Voir le projet</span>
                        <ArrowRight className="h-4 w-4" />
                      </motion.button>
                    </div>
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {project.year}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                        {categories.find(c => c.id === project.category)?.name}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex gap-2">
                      {[...Array(3)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`h-1 rounded-full ${i === 0 ? 'w-8 bg-blue-500' : i === 1 ? 'w-4 bg-purple-500' : 'w-2 bg-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Hover effect overlay */}
                  {isHovered === project.id && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className="text-2xl font-medium text-gray-500">Aucun projet trouvé dans cette catégorie</h3>
              <button 
                onClick={() => setSelectedCategory('all')}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg transition-all"
              >
                Voir tous les projets
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProjectsGallery;