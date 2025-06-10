"use client";
import Link from 'next/link';
import { services } from '@/lib/data';
import { Globe, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">MultiServices Pro</span>
              </div>
              <p className="text-gray-400">
                Votre partenaire de confiance pour tous vos projets professionnels.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                {services.map((service, index) => (
                  <li key={index}>{service.title}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Accueil</li>
                <li>À propos</li>
                <li>Contact</li>
                <li>Devis</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  +229 XX XX XX XX
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  contact@multiservices.pro
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Cotonou, Bénin
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 MultiServices Pro. Tous droits réservés.</p>
          </div>

          
        </div>
      </footer>
      
  )
}