import React from 'react';
import { Users, Award, Target, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

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

  const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.8 } }
  };

  return (
    <section id="apropos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                À propos de <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">BTIC</span>
              </h2>
              
              <motion.p variants={item} className="text-lg text-gray-600 mb-6">
                Depuis plus de 15 ans, AuraPro accompagne les entreprises dans leur développement 
                grâce à une expertise multi-sectorielle unique. Notre équipe passionnée transforme 
                vos défis en opportunités de croissance.
              </motion.p>
              
              <motion.p variants={item} className="text-gray-600 mb-8">
                De l'analyse stratégique aux projets de construction, en passant par le développement 
                commercial et les services touristiques, nous mettons notre savoir-faire au service 
                de votre réussite.
              </motion.p>
              
              <motion.div 
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-wrap gap-4"
              >
                <motion.div variants={item} className="bg-blue-50 px-4 py-2 rounded-full">
                  <span className="text-blue-600 font-semibold">15+ années d'expérience</span>
                </motion.div>
                <motion.div variants={item} className="bg-purple-50 px-4 py-2 rounded-full">
                  <span className="text-purple-600 font-semibold">500+ projets réalisés</span>
                </motion.div>
                <motion.div variants={item} className="bg-green-50 px-4 py-2 rounded-full">
                  <span className="text-green-600 font-semibold">98% de satisfaction</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatedSection>
          
          <AnimatedSection>
            <motion.div
              className="grid grid-cols-2 gap-6"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                  whileHover={{ y: -5 }}
                >
                  <value.icon className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;