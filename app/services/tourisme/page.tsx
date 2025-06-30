"use client";
import { motion } from "framer-motion";
import {
  FaPlane,
  FaHotel,
  FaMap,
  FaArrowRight,
  FaCheck,
  FaStar,
  FaGlobe,
} from "react-icons/fa";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";
import Link from "next/link";
import React, { useState } from "react";

type Service = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  image: string;
  description: string;
  header: string;
  details: string;
};

const services: Service[] = [
  {
    icon: FaPlane,
    title: "Promotion & Vulgarisation du secteur touristique",
    description: "Circuits personnalisés et voyages de groupe sur mesure",
    header: "Promotion & Vulgarisation du secteur touristique",
    image: "/images/c10.png",
    details:
      "L'excellence n'est pas un acte, mais une habitude. Nous nous efforçons chaque jour de dépasser les attentes de nos clients. Accompagner nos clients dans leur réussite en leur offrant des solutions multi-services innovantes, personnalisées et de haute qualité, tout en contribuant au développement économique et social de notre région. Devenir le leader régional des services intégrés, reconnu pour notre expertise multi-sectorielle, notre innovation constante et notre contribution positive au développement durable.",
  },
  {
    icon: FaHotel,
    title: "Evènementiel",
    description: "Sélection d'hôtels et résidences de standing",
    header: "Evènementiel",
    image: "/images/c10.png",
    details:
      "L'excellence n'est pas un acte, mais une habitude. Nous nous efforçons chaque jour de dépasser les attentes de nos clients. Accompagner nos clients dans leur réussite en leur offrant des solutions multi-services innovantes, personnalisées et de haute qualité, tout en contribuant au développement économique et social de notre région. Devenir le leader régional des services intégrés, reconnu pour notre expertise multi-sectorielle, notre innovation constante et notre contribution positive au développement durable.",
  },
  {
    icon: FaMap,
    title: "Hôtellerie",
    description: "Accompagnement par des guides locaux certifiés",
    header: "Hôtellerie",
    image: "/images/c10.png",
    details:
      "L'excellence n'est pas un acte, mais une habitude. Nous nous efforçons chaque jour de dépasser les attentes de nos clients. Accompagner nos clients dans leur réussite en leur offrant des solutions multi-services innovantes, personnalisées et de haute qualité, tout en contribuant au développement économique et social de notre région. Devenir le leader régional des services intégrés, reconnu pour notre expertise multi-sectorielle, notre innovation constante et notre contribution positive au développement durable.",
  },
];

export default function TourismePage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showForm, setShowForm] = useState(false);

  const destinations = [
    {
      name: "Paris & Île-de-France",
      image:
        "https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg",
      rating: 4.9,
      tours: "25+ circuits",
    },
    {
      name: "Côte d'Azur",
      image:
        "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg",
      rating: 4.8,
      tours: "18+ circuits",
    },
    {
      name: "Châteaux de la Loire",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd2LeXxQiQgTTFnAUE7OX08LPowGrj-mUguA&s",
      rating: 4.9,
      tours: "12+ circuits",
    },
  ];

  const testimonials = [
    {
      name: "Marie & Pierre",
      text: "Un voyage inoubliable ! L'organisation était parfaite.",
      rating: 5,
    },
    {
      name: "Famille Johnson",
      text: "Nos enfants ont adoré chaque moment de ce séjour.",
      rating: 5,
    },
    {
      name: "Groupe Entreprise XYZ",
      text: "Excellent pour notre incentive d'équipe.",
      rating: 5,
    },
  ];

  const features = [
    "Guides multilingues certifiés",
    "Transport premium inclus",
    "Assurance voyage complète",
    "Support 24h/7j pendant le séjour",
    "Activités exclusives",
    "Hébergement 4-5 étoiles",
  ];

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
              Créons ensemble des souvenirs inoubliables avec nos expériences de
              voyage sur mesure
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="#contact" variant="white" className="text-lg px-8 py-4">
                Réserver Maintenant
                <FaArrowRight className="ml-2" />
              </Button>
              <Button
                href="#destinations"
                className="text-lg px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30"
              >
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

                <button
                  style={{
                    marginTop: 12,
                    color: "blue",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: 5,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSelectedService(service);
                    setShowForm(false);
                  }}
                >
                  En savoir plus
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* MODAL */}
      {selectedService && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: 25,
              borderRadius: 10,
              maxWidth: 600,
              width: "90%",
              position: "relative",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <button
              onClick={() => setSelectedService(null)}
              style={{
                position: "absolute",
                top: 10,
                right: 15,
                background: "none",
                border: "none",
                fontSize: 20,
                cursor: "pointer",
              }}
              aria-label="Fermer la fenêtre"
            >
              ✖
            </button>

            <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors flex items-center justify-center">
              {selectedService.header}
            </h3>
            <div style={{ marginBottom: 15 }}>
              <img
                src={selectedService.image}
                alt={selectedService.header}
                style={{
                  width: "100%",
                  height: 180,
                  objectFit: "cover",
                  borderRadius: 8,
                  marginBottom: 15,
                }}
              />
            </div>

            <p style={{ marginBottom: 15 }}>{selectedService.details}</p>

            {showForm ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Demande envoyée !");
                  setSelectedService(null);
                  setShowForm(false);
                }}
              >
                <input
                  type="text"
                  placeholder="Votre nom"
                  required
                  style={inputStyle}
                />
                <input
                  type="email"
                  placeholder="Votre email"
                  required
                  style={inputStyle}
                />
                <input
                  type="tel"
                  placeholder="Votre téléphone"
                  required
                  style={inputStyle}
                />
                <input type="date" required style={inputStyle} />
                <textarea
                  placeholder="Message...."
                  required
                  style={{
                    width: "100%",
                    height: 100,
                    padding: 10,
                    marginBottom: 10,
                    borderRadius: 5,
                    border: "1px solid #ccc",
                  }}
                />
                <button type="submit" style={submitBtn}>
                  Confirmer la demande
                </button>
              </form>
            ) : (
              <button onClick={() => setShowForm(true)} style={confirmBtn}>
                Demandez un devis
              </button>
            )}
          </div>
        </div>
      )}

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
                  <Button className="w-full">Découvrir</Button>
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
                Pourquoi Choisir Nos <span className="text-purple-600">Voyages</span>{" "}
                ?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Nous créons des expériences de voyage uniques avec une attention
                particulière aux détails et un service client exceptionnel.
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
                <p className="text-gray-600 italic mb-4">"{testimonial.text}"</p>
                <div className="font-semibold text-purple-600">{testimonial.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Contact Section */}
      <AnimatedSection id="contact" className="section py-20 bg-purple-600 text-white">
        <div className="container max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-center">Contactez-Nous</h2>
          <p className="mb-10 text-center max-w-xl mx-auto">
            Pour toute demande de devis ou informations, remplissez le formulaire
            ci-dessous :
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Message envoyé !");
            }}
            className="space-y-6"
          >
            <input
              type="text"
              placeholder="Nom complet"
              required
              className="w-full p-4 rounded-lg text-black"
            />
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full p-4 rounded-lg text-black"
            />
            <input
              type="tel"
              placeholder="Téléphone"
              required
              className="w-full p-4 rounded-lg text-black"
            />
            <textarea
              placeholder="Votre message..."
              required
              className="w-full p-4 rounded-lg text-black h-32"
            />
            <button
              type="submit"
              className="w-full bg-white text-purple-700 font-bold py-4 rounded-lg hover:bg-purple-100 transition"
            >
              Envoyer
            </button>
          </form>
        </div>
      </AnimatedSection>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
};

const submitBtn: React.CSSProperties = {
  backgroundColor: "#6b21a8",
  color: "white",
  padding: "12px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
  width: "100%",
};

const confirmBtn: React.CSSProperties = {
  backgroundColor: "#9333ea",
  color: "white",
  padding: "12px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
  width: "100%",
};
