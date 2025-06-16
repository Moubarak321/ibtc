import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';

const ProjectsGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const projects = [
    {
      id: 1,
      title: "Centre Commercial Moderne",
      category: "btp",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&h=300&fit=crop",
      description: "Construction d'un centre commercial de 15000m²"
    },
    {
      id: 2,
      title: "Stratégie E-commerce",
      category: "commerce",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=300&fit=crop",
      description: "Transformation digitale pour une croissance de 300%"
    },
    {
      id: 3,
      title: "Resort Touristique",
      category: "tourisme",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&h=300&fit=crop",
      description: "Développement d'un complexe touristique écologique"
    },
    {
      id: 4,
      title: "Audit Financier Complet",
      category: "analyse",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=300&fit=crop",
      description: "Optimisation des processus pour une PME"
    },
    {
      id: 5,
      title: "Immeuble de Bureaux",
      category: "btp",
      image: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=500&h=300&fit=crop",
      description: "Construction d'un immeuble de bureaux moderne"
    },
    {
      id: 6,
      title: "Plateforme E-commerce",
      category: "commerce",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop",
      description: "Développement d'une marketplace innovante"
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

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nos <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Réalisations</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Découvrez quelques-uns de nos projets qui témoignent de notre expertise
          </p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <button className="text-white m-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                    <ExternalLink className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsGallery;
