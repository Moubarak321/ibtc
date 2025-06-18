"use client";

import { motion } from 'framer-motion'
import { FaStore, FaTruck, FaGlobe, FaHandshake, FaArrowRight, FaCheck, FaChartBar } from 'react-icons/fa'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function CommerceGeneralPage() {
  const services = [
    {
      icon: FaStore,
      title: "Matériels informatique/Bureautique",
      description: "Réseau de distribution étendu pour tous types de produits"
    },
    {
      icon: FaTruck,
      title: "Lubrifiants/Engins lourds & Pièces de rechange",
      description: "Solutions complètes de stockage et transport"
    },
    {
      icon: FaGlobe,
      title: "Import/Export",
      description: "Commerce international et sourcing global"
    },
    {
      icon: FaHandshake,
      title: "Partenariats Stratégiques",
      description: "Développement de réseaux commerciaux durables"
    }
  ]

  const sectors = [
    { name: "Électronique & High-Tech", growth: "+25%", icon: "📱" },
    { name: "Textile & Mode", growth: "+18%", icon: "👕" },
    { name: "Alimentaire & Boissons", growth: "+32%", icon: "🍎" },
    { name: "Équipements Industriels", growth: "+15%", icon: "⚙️" },
    { name: "Cosmétiques & Bien-être", growth: "+28%", icon: "💄" },
    { name: "Sports & Loisirs", growth: "+22%", icon: "⚽" }
  ]

  const stats = [
    { number: "500+", label: "Partenaires Actifs" },
    { number: "50+", label: "Pays Couverts" },
    { number: "1M+", label: "Produits Référencés" },
    { number: "99.5%", label: "Taux de Satisfaction" }
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <FaStore className="mr-2" />
              <span className="text-sm font-medium">Commerce International</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Commerce <span className="text-green-300">Général</span>
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
              Votre passerelle vers les marchés mondiaux avec des solutions commerciales innovantes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="#contact" variant="white" className="text-lg px-8 py-4">
                Boutique
                <FaArrowRight className="ml-2" />
              </Button>
              <Button href="#services" className="text-lg px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30">
                Contactez-nous
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <AnimatedSection className="section -mt-16 relative z-10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-xl text-center"
              >
                <div className="text-3xl font-bold text-green-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Services Section */}
      <AnimatedSection id="services" className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Nos Solutions Commerciales</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des services intégrés pour optimiser votre chaîne de valeur commerciale
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
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Sectors Section */}
      <AnimatedSection className="section bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Secteurs d'<span className="text-green-600">Excellence</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Nous couvrons une large gamme de secteurs avec une expertise approfondie 
                et des partenariats stratégiques établis.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sectors.map((sector, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{sector.icon}</span>
                        <div>
                          <h4 className="font-semibold text-sm">{sector.name}</h4>
                          <div className="text-xs text-gray-500">Croissance annuelle</div>
                        </div>
                      </div>
                      <div className="text-green-600 font-bold">{sector.growth}</div>
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
                  src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg"
                  alt="Commerce Global"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent rounded-2xl" />
                
                {/* Floating Elements */}
                <motion.div
                  initial={{ opacity: 0, rotate: -10 }}
                  whileInView={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-xl"
                >
                  <FaGlobe className="text-2xl text-green-600" />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, rotate: 10 }}
                  whileInView={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-xl"
                >
                  <FaChartBar className="text-2xl text-green-600" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Process Section */}
      <AnimatedSection className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Notre Processus</h2>
            <p className="text-xl text-gray-600">De l'idée à la réalisation</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Analyse", desc: "Étude de marché approfondie" },
              { step: "02", title: "Sourcing", desc: "Sélection des meilleurs fournisseurs" },
              { step: "03", title: "Négociation", desc: "Conditions optimales garanties" },
              { step: "04", title: "Distribution", desc: "Livraison et suivi qualité" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection id="contact" className="section bg-gradient-to-r from-green-600 to-emerald-700">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Développons Votre Business Ensemble
              </h2>
              <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                Rejoignez notre réseau de partenaires et accédez à de nouveaux marchés 
                avec nos solutions commerciales sur mesure.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 text-lg"
                >
                 Boutique
                  <FaArrowRight className="ml-2" />
                </Link>
                <a
                  href="mailto:commerce@entreprise.com"
                  className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all duration-200 text-lg border border-white/30"
                >
                  Contactez-nous
                </a>
              </div>
              
              <div className="mt-8 text-sm text-green-200">
                ✓ Catalogue de 1M+ produits • ✓ Livraison mondiale • ✓ Support 24/7
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>
    </main>
  )
}