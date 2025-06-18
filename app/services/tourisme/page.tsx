"use client";
import { motion } from 'framer-motion'
import { FaPlane, FaHotel, FaMap, FaCamera, FaArrowRight, FaCheck, FaStar, FaGlobe } from 'react-icons/fa'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function TourismePage() {
  const services = [
    {
      icon: FaPlane,
      title: "Promotion touristique",
      description: "Circuits personnalisés et voyages de groupe sur mesure"
    },
    {
      icon: FaHotel,
      title: "Evènementiel",
      description: "Sélection d'hôtels et résidences de standing"
    },
    {
      icon: FaMap,
      title: "Hébergement",
      description: "Accompagnement par des guides locaux certifiés"
    },
    {
      icon: FaCamera,
      title: "Package Touristique",
      description: "Activités exclusives et découvertes authentiques"
    }
  ]

  const destinations = [
    {
      name: "Paris & Île-de-France",
      image: "https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg",
      rating: 4.9,
      tours: "25+ circuits"
    },
    {
      name: "Côte d'Azur",
      image: "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg",
      rating: 4.8,
      tours: "18+ circuits"
    },
    {
      name: "Châteaux de la Loire",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd2LeXxQiQgTTFnAUE7OX08LPowGrj-mUguA&s",
      rating: 4.9,
      tours: "12+ circuits"
    }
  ]

  const testimonials = [
    {
      name: "Marie & Pierre",
      text: "Un voyage inoubliable ! L'organisation était parfaite.",
      rating: 5
    },
    {
      name: "Famille Johnson",
      text: "Nos enfants ont adoré chaque moment de ce séjour.",
      rating: 5
    },
    {
      name: "Groupe Entreprise XYZ",
      text: "Excellent pour notre incentive d'équipe.",
      rating: 5
    }
  ]

  const features = [
    "Guides multilingues certifiés",
    "Transport premium inclus",
    "Assurance voyage complète",
    "Support 24h/7j pendant le séjour",
    "Activités exclusives",
    "Hébergement 4-5 étoiles"
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <FaPlane className="mr-2" />
              <span className="text-sm font-medium">Voyages d'Exception</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Tourisme & <span className="text-purple-300">Voyages</span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Créons ensemble des souvenirs inoubliables avec nos expériences de voyage sur mesure
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="#contact" variant="white" className="text-lg px-8 py-4">
                Réserver Maintenant
                <FaArrowRight className="ml-2" />
              </Button>
              <Button href="#destinations" className="text-lg px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30">
                Nos Destinations
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <AnimatedSection id="services" className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Nos Services Touristiques</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une gamme complète de services pour des voyages exceptionnels
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
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Destinations Section */}
      <AnimatedSection id="destinations" className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Destinations <span className="text-purple-600">Populaires</span>
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez nos circuits les plus appréciés
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                    <FaStar className="text-yellow-500 mr-1" />
                    <span className="text-sm font-semibold">{destination.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
                  <p className="text-gray-600 mb-4">{destination.tours}</p>
                  <Button className="w-full">
                    Découvrir
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Features & Benefits */}
      <AnimatedSection className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Pourquoi Choisir Nos <span className="text-purple-600">Voyages</span> ?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Nous créons des expériences de voyage uniques avec une attention particulière 
                aux détails et un service client exceptionnel.
              </p>
              
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <div className="bg-purple-100 rounded-full p-2 mr-4">
                      <FaCheck className="text-purple-600 text-sm" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
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
                  src="https://www.gouv.bj/upload/images/articles/ckeditor/amazone.jpg"
                  alt="Tourism Experience"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent rounded-2xl" />
                
                {/* Floating Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">5000+</div>
                    <div className="text-sm text-gray-600">Voyageurs Satisfaits</div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="absolute -top-6 -right-6 bg-white p-6 rounded-xl shadow-xl"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">4.9/5</div>
                    <div className="text-sm text-gray-600">Note Moyenne</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials */}
      <AnimatedSection className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Témoignages Clients</h2>
            <p className="text-xl text-gray-600">Ce que disent nos voyageurs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <div className="font-semibold text-purple-600">{testimonial.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection id="contact" className="section bg-gradient-to-r from-purple-600 to-pink-700">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Votre Prochaine Aventure Vous Attend
              </h2>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Laissez-nous créer le voyage de vos rêves. Devis personnalisé 
                et conseils d'experts gratuits.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 text-lg"
                >
                  Réserver Maintenant
                  <FaArrowRight className="ml-2" />
                </Link>
                <a
                  href="tel:+33123456789"
                  className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all duration-200 text-lg border border-white/30"
                >
                  <FaGlobe className="mr-2" />
                  Brochures Gratuites
                </a>
              </div>
              
              <div className="mt-8 text-sm text-purple-200">
                ✓ Devis gratuit sous 24h • ✓ Annulation flexible • ✓ Guide francophone inclus
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>
    </main>
  )
}