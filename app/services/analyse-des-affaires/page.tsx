"use client";
import { motion } from 'framer-motion'
import { FaChartLine, FaUsers, FaCog, FaLightbulb, FaArrowRight, FaCheck } from 'react-icons/fa'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function AnalyseDesAffairesPage() {
  const features = [
    {
      icon: FaChartLine,
      title: "Représentation commerciale",
      description: "Évaluation complète de vos indicateurs clés de performance",
      slug: "/representation"
    },
    {
      icon: FaUsers,
      title: "Négoce international & distribution",
      description: "Optimisation de vos processus et structures internes",
      slug: "/negoce"
    },
    {
      icon: FaCog,
      title: "Etude de marché",
      description: "Accompagnement dans votre transition numérique,de l’analyse stratégique à l’action terrain",
      slug: "/etude"
    },
    {
      icon: FaLightbulb,
      title: "Comparatif de prix",
      description: "Développement de nouvelles opportunités business",
      slug: "/comparatif"
    },
    {
      icon: FaLightbulb,
      title: "Divers services & prestations",
      description: "Développement de nouvelles opportunités business",
      slug: "/prestation",
    }
  ]

  const benefits = [
    "Augmentation de la productivité jusqu'à 40%",
    "Réduction des coûts opérationnels",
    "Amélioration de la satisfaction client",
    "Optimisation des processus métier",
    "Accompagnement personnalisé sur 6 mois"
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <FaChartLine className="mr-2" />
              <span className="text-sm font-medium">Service Premium</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Analyse des <span className="text-blue-300">Affaires</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Transformez vos données en décisions stratégiques avec notre expertise en analyse business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="#contact" variant="white" className="text-lg px-8 py-4">
                Demander un Devis
                <FaArrowRight className="ml-2" />
              </Button>
              <Button href="#features" className="text-lg px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30">
                Découvrir nos Services
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <AnimatedSection className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Nos Expertises</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une approche complète pour optimiser votre performance business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Link href={feature.slug} key={index} className="group">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="cursor-pointer bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    <feature.icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              </Link>

            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Benefits Section */}
      <AnimatedSection className="section bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Pourquoi Choisir Notre <span className="text-blue-600">Expertise</span> ?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Nos consultants expérimentés vous accompagnent dans l'optimisation
                de vos processus business avec des méthodes éprouvées et des outils de pointe.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <div className="bg-green-100 rounded-full p-2 mr-4">
                      <FaCheck className="text-green-600 text-sm" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
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
                  src="https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg"
                  alt="Business Analysis"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl" />
              </motion.div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection id="contact" className="section bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Prêt à Transformer Votre Business ?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Contactez nos experts dès aujourd'hui pour un audit gratuit
                et découvrez comment optimiser vos performances.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 text-lg"
                >
                  Consultation Gratuite
                  <FaArrowRight className="ml-2" />
                </Link>
                <a
                  href="tel:+33123456789"
                  className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all duration-200 text-lg border border-white/30"
                >
                  Appeler Maintenant
                </a>
              </div>

              <div className="mt-8 text-sm text-blue-200">
                ✓ Audit gratuit • ✓ Devis sous 24h • ✓ Accompagnement personnalisé
              </div>
            </motion.div>
          </div>
          
        </div>
      </AnimatedSection>
    </main>
  )
}