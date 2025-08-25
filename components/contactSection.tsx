import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ContactForm from './ui/ContactForm';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // toast.success("Message envoyé avec succès! Nous vous répondrons dans les plus brefs délais.");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const contactItem = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const formItem = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Contactez-<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">nous</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Prêt à démarrer votre projet ? Notre équipe est là pour vous accompagner
            </p>
          </motion.div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <AnimatedSection>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h3 variants={fadeInUp} className="text-2xl font-semibold text-gray-900 mb-8">
                Parlons de votre projet
              </motion.h3>
              
              <motion.div variants={staggerContainer} className="space-y-6">
                <motion.div variants={contactItem} className="flex items-start space-x-4">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"
                  >
                    <Phone className="h-6 w-6 text-white" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Téléphone</h4>
                    <p className="text-gray-600">+229 01 94 50 78 44/01 67 54 28 52</p>
                    <p className="text-sm text-gray-500">Lun-Ven 9h-18h</p>
                  </div>
                </motion.div>
                
                <motion.div variants={contactItem} className="flex items-start space-x-4">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"
                  >
                    <Mail className="h-6 w-6 text-white" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600">businesscompany@gmail.com</p>
                    <p className="text-sm text-gray-500">Réponse sous 24h</p>
                  </div>
                </motion.div>
                
                <motion.div variants={contactItem} className="flex items-start space-x-4">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"
                  >
                    <MapPin className="h-6 w-6 text-white" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Adresse</h4>
                    <p className="text-gray-600">Cotonou</p>
                    <p className="text-gray-600">Zogbohoue</p>
                  </div>
                </motion.div>
              </motion.div>
              
              <motion.div 
                variants={contactItem}
                whileHover={{ y: -5 }}
                className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl"
              >
                <h4 className="font-semibold text-gray-900 mb-2">Consultation gratuite</h4>
                <p className="text-gray-600 text-sm">
                  Obtenez une analyse personnalisée de vos besoins et un devis détaillé sans engagement.
                </p>
              </motion.div>
            </motion.div>
          </AnimatedSection>
          
          {/* Contact Form */}
         <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;