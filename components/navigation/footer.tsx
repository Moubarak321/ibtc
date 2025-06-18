"use client";

import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 w-20 h-15">
              <img src="/images/Logo_btic 2.png" alt="Logo"  />
            </div>
            <p className="text-gray-300 mb-6">
              Votre partenaire multi-services pour transformer vos idées en succès concrets.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Nos Services</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Analyse des Affaires</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">BTP & Construction</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Commerce Général</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Tourisme</a></li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Liens Rapides</h3>
            <ul className="space-y-3">
              <li><a href="#accueil" className="text-gray-300 hover:text-white transition-colors">Accueil</a></li>
              <li><a href="#apropos" className="text-gray-300 hover:text-white transition-colors">À propos</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Carrières</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-10 w-10 text-blue-400" />
                <span className="text-gray-300">Godomey,Agbocodji</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-10 w-10 text-blue-400" />
                <span className="text-gray-300 ">+229 01 94 50 78 44/01 67 54 28 62  /  +33 751 567 086</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-10 w-10 text-blue-400" />
                <span className="text-gray-300">businesscompanyha@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 ">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm container mx-auto text-center">
              © {currentYear} International Business and Tourisme Company. Tous droits réservés.
            </p>
           
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;