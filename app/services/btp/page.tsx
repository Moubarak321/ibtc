"use client";

import { motion } from 'framer-motion'
import { FaBuilding, FaHardHat, FaTools, FaCertificate, FaArrowRight, FaCheck, FaPhone } from 'react-icons/fa'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function BTPPage() {
  const services = [
    {
      icon: FaBuilding,
      title: "Vente de matériaux de construction & Quicaillerie",
      description: "Bâtiments résidentiels et commerciaux clés en main"
    },
    {
      icon: FaTools,
      title: "Rénovation",
      description: "Gestion immobilière"
    },
  
    {
      icon: FaCertificate,
      title: "Gestion immobilière",
      description: "Études de faisabilité et conseils en ingénierie"
    }
  ]

  const projects = [
    { name: "Centre Commercial Modern", surface: "15,000 m²", duration: "18 mois" },
    { name: "Résidence Les Jardins", surface: "8,500 m²", duration: "12 mois" },
    { name: "Infrastructure Routière A86", surface: "5 km", duration: "24 mois" }
  ]

  const certifications = [
    "Qualibat RGE",
    "ISO 9001:2015",
    "Certification HQE",
    "Label BBC Effinergie"
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-orange-600 via-red-600 to-pink-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-20 w-64 h-64 bg-orange-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-red-400/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <FaBuilding className="mr-2" />
              <span className="text-sm font-medium">Expertise BTP</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Matériaux de construction   <span className="text-orange-300">-Quincaillerie-</span>Gestion immobilière 
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 mb-8 max-w-3xl mx-auto">
              Construisons ensemble l'avenir avec des projets durables et innovants
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="#contact" variant="white" className="text-lg px-8 py-4">
                Voir notre boutique
                <FaArrowRight className="ml-2" />
              </Button>
              <Button href="#services" className="text-lg px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30">
                Nos Réalisations
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <AnimatedSection id="services" className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Nos Services BTP</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              De la conception à la livraison, nous maîtrisons tous les aspects de la construction
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="bg-gradient-to-br from-orange-500 to-red-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Projects Showcase */}
      <AnimatedSection className="section bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Nos <span className="text-orange-600">Réalisations</span> Marquantes
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Plus de 200 projets réalisés avec succès, de la construction résidentielle 
                aux grands projets d'infrastructure.
              </p>
              
              <div className="space-y-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <h4 className="font-semibold text-lg mb-2">{project.name}</h4>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span>📐 {project.surface}</span>
                      <span>⏱️ {project.duration}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <img
                  src="https://images.pexels.com/photos/3850838/pexels-photo-3850838.jpeg"
                  alt="Construction Project"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-600/20 to-transparent rounded-2xl" />
                
                {/* Floating Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">200+</div>
                    <div className="text-sm text-gray-600">Projets Réalisés</div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="absolute -top-6 -right-6 bg-white p-6 rounded-xl shadow-xl"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">15+</div>
                    <div className="text-sm text-gray-600">Années d'Expérience</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Certifications */}
      <AnimatedSection className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nos Certifications</h2>
            <p className="text-gray-600">Qualité et conformité garanties</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow duration-300"
              >
                <FaCertificate className="text-3xl text-orange-600 mx-auto mb-3" />
                <div className="font-semibold text-sm">{cert}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection id="contact" className="section bg-gradient-to-r from-orange-600 to-red-700">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Votre Projet Mérite le Meilleur
              </h2>
              <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
                Confiez-nous votre projet de construction. Devis gratuit et étude personnalisée 
                par nos experts certifiés.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 text-lg"
                >
                  Devis Gratuit
                  <FaArrowRight className="ml-2" />
                </Link>
                <a
                  href="tel:+33123456789"
                  className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all duration-200 text-lg border border-white/30"
                >
                  <FaPhone className="mr-2" />
                  Urgence 24/7
                </a>
              </div>
              
              <div className="mt-8 text-sm text-orange-200">
                ✓ Devis sous 48h • ✓ Garantie décennale • ✓ Suivi de chantier en temps réel
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>
    </main>
  )
}