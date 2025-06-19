"use client";
import React, { useState } from 'react';
import { Star, Heart, Share2, ShoppingCart, Truck, Shield, RotateCcw, Award, ChevronLeft, ChevronRight, Plus, Minus, Check } from 'lucide-react';

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('description');
  const [isWishlisted, setIsWishlisted] = useState(false);

  const images = [
    'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1609205807107-171b1c5db7f1?w=600&h=600&fit=crop'
  ];

  const specifications = [
    { label: 'Puissance', value: '600W' },
    { label: 'Vitesse à vide', value: '0-2800 tr/min' },
    { label: 'Diamètre de perçage', value: '13mm' },
    { label: 'Mandrin', value: 'Auto-serrant 13mm' },
    { label: 'Poids', value: '1.8kg' },
    { label: 'Câble', value: '4m' }
  ];

  const features = [
    'Moteur robuste 600W pour applications exigeantes',
    'Mandrin auto-serrant 13mm pour changement rapide',
    'Poignée ergonomique avec revêtement Softgrip',
    'Fonction percussion pour perçage dans la maçonnerie',
    'Variateur électronique de vitesse',
    'Butée de profondeur et poignée auxiliaire incluses'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <span>Accueil</span>
          <ChevronRight className="w-4 h-4" />
          <span>Outillage</span>
          <ChevronRight className="w-4 h-4" />
          <span>Perceuses</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-blue-600 font-medium">Bosch GSB 13 RE</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images Section */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl">
              <img
                src={images[selectedImage]}
                alt="Perceuse Bosch GSB 13 RE"
                className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                    isWishlisted ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-700 hover:bg-red-50'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
                <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:bg-blue-50 transition-all duration-300">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                    selectedImage === index
                      ? 'ring-2 ring-blue-500 shadow-lg'
                      : 'hover:shadow-md opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={image} alt={`Vue ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                  En stock
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                  Livraison rapide
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Perceuse à percussion Bosch GSB 13 RE
              </h1>
              <p className="text-gray-600 mb-4">
                Perceuse filaire professionnelle 600W avec fonction percussion pour tous vos travaux de perçage
              </p>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">(127 avis)</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-end space-x-4 mb-6">
                <span className="text-3xl font-bold text-blue-600">89,99 €</span>
                <span className="text-lg text-gray-500 line-through">119,99 €</span>
                <span className="bg-red-100 text-red-600 text-sm px-2 py-1 rounded-full font-medium">
                  -25%
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">Quantité:</span>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 bg-gray-50 rounded-lg font-medium min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Ajouter au panier</span>
                </button>

                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-4 px-6 rounded-xl transition-all duration-300">
                  Acheter maintenant
                </button>
              </div>
            </div>

            {/* Service Icons */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Truck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Livraison gratuite</p>
                  <p className="text-sm text-gray-600">Dès 50€ d'achat</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Garantie 2 ans</p>
                  <p className="text-sm text-gray-600">Constructeur</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <RotateCcw className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Retour 30 jours</p>
                  <p className="text-sm text-gray-600">Satisfait ou remboursé</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Award className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Qualité Bosch</p>
                  <p className="text-sm text-gray-600">Marque premium</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['description', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-300 ${
                    selectedTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab === 'description' && 'Description'}
                  {tab === 'specifications' && 'Caractéristiques'}
                  {tab === 'reviews' && 'Avis clients'}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {selectedTab === 'description' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Description du produit</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    La perceuse à percussion Bosch GSB 13 RE est l'outil parfait pour vos travaux de perçage dans différents matériaux. 
                    Avec sa puissance de 600W et sa fonction percussion, elle permet de percer efficacement dans le bois, le métal et la maçonnerie.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-3">Caractéristiques principales</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'specifications' && (
              <div>
                <h3 className="text-xl font-semibold mb-6">Fiche technique</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-700">{spec.label}</span>
                      <span className="text-gray-900 font-semibold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Avis clients</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-lg font-semibold">4.8/5</span>
                    <span className="text-gray-600">(127 avis)</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { name: 'Marc D.', rating: 5, comment: 'Excellent produit, très robuste et efficace. Je recommande vivement !', date: '15 mars 2024' },
                    { name: 'Sophie L.', rating: 5, comment: 'Parfaite pour mes travaux de bricolage. Bonne prise en main et puissante.', date: '8 mars 2024' },
                    { name: 'Pierre M.', rating: 4, comment: 'Bonne perceuse, rapport qualité-prix intéressant. Livrée rapidement.', date: '28 février 2024' }
                  ].map((review, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <span className="font-medium">{review.name}</span>
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}