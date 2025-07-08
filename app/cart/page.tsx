"use client";
import React, { useState, useEffect } from 'react';
import { Plus, Minus, Trash2, ShoppingCart, FileText, User, Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';


interface ProductCartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  description?: string;
}

const ModernCartQuote = () => {
  // const [cartItems, setCartItems] = useState([
  //   {
  //     id: 1,
  //     name: "Service de Nettoyage Premium",
  //     description: "Nettoyage complet de votre domicile",
  //     price: 89.99,
  //     quantity: 1,
  //     image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop"
  //   },
  //   {
  //     id: 2,
  //     name: "Réparation Électronique",
  //     description: "Diagnostic et réparation d'appareils",
  //     price: 45.50,
  //     quantity: 2,
  //     image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop"
  //   },
  //   {
  //     id: 3,
  //     name: "Cours Particuliers",
  //     description: "Cours de mathématiques niveau lycée",
  //     price: 35.00,
  //     quantity: 1,
  //     image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop"
  //   }
  // ]);

  const [cartItems, setCartItems] = useState<ProductCartItem[]>([]);


  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);


  useEffect(() => {
    const storedData = localStorage.getItem('marketplace-cart-data');
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        const items: ProductCartItem[] = Object.values(parsed);
        setCartItems(items);
      } catch (e) {
        console.error("Erreur chargement panier :", e);
      }
    }
  }, []);



  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }

    setCartItems(items => {
      const updated = items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );

      // Mise à jour du localStorage
      const cartData: Record<string, any> = {};
      updated.forEach(item => {
        cartData[item.id] = item;
      });
      localStorage.setItem('marketplace-cart-data', JSON.stringify(cartData));
      localStorage.setItem('marketplace-cart', JSON.stringify(updated.map(item => item.id)));

      return updated;
    });
  };


  const removeItem = (id: string) => {
    setCartItems(items => {
      const updated = items.filter(item => item.id !== id);

      // Mise à jour du localStorage
      const cartData: Record<string, any> = {};
      updated.forEach(item => {
        cartData[item.id] = item;
      });
      localStorage.setItem('marketplace-cart-data', JSON.stringify(cartData));
      localStorage.setItem('marketplace-cart', JSON.stringify(updated.map(item => item.id)));

      return updated;
    });
  };


  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generatePDF = async () => {
    // Simulation de génération PDF
    const quoteData = {
      customer: formData,
      items: cartItems,
      total: getTotalPrice(),
      date: new Date().toLocaleDateString('fr-FR'),
      quoteNumber: `DEV-${Date.now()}`
    };

    console.log('Génération PDF avec les données:', quoteData);
    return quoteData;
  };

  const handleSubmitQuote = async () => {
    // Validation basique
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulation d'envoi
      await new Promise(resolve => setTimeout(resolve, 2000));

      const pdfData = await generatePDF();

      // Ici vous intégreriez votre API pour envoyer les données
      console.log('Envoi des données au serveur:', pdfData);

      setIsSuccess(true);

      // Reset après 3 secondes
      setTimeout(() => {
        setIsSuccess(false);
        setShowQuoteForm(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          postalCode: '',
          message: ''
        });
      }, 3000);

    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="w-24 h-24 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Votre panier est vide</h2>
          <p className="text-gray-400">Ajoutez des services pour commencer</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Votre Panier
          </h1>
          <p className="text-gray-600">Vérifiez vos services et demandez votre devis personnalisé</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all duration-300 transform hover:scale-[1.01]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover transform hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-purple-600">
                        {item.price.toFixed(2)} €
                      </span>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center bg-gray-100 rounded-full p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                          >
                            <Minus className="w-4 h-4 text-gray-700" />
                          </button>
                          <span className="px-4 py-2 text-gray-800 font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                          >
                            <Plus className="w-4 h-4 text-gray-700" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-500 hover:text-red-600 hover:bg-red-100 rounded-full transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary & Quote Form */}
          <div className="space-y-6">
            {/* Cart Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-500" />
                Récapitulatif
              </h2>

              <div className="space-y-3 mb-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="text-gray-800 font-medium">
                      {(item.price * item.quantity).toFixed(2)} €
                    </span>
                  </div>
                ))}

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-gray-800">Total estimé</span>
                    <span className="text-purple-600">{getTotalPrice().toFixed(2)} €</span>
                  </div>
                </div>
              </div>

              {!showQuoteForm ? (
                <button
                  onClick={() => setShowQuoteForm(true)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Demander un Devis
                </button>
              ) : (
                <div className="text-center">
                  <p className="text-gray-500 text-sm">Remplissez le formulaire ci-dessous</p>
                </div>
              )}
            </div>

            {/* Quote Form */}
            {showQuoteForm && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 animate-fade-in">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-500" />
                  Vos Coordonnées
                </h2>

                {isSuccess ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Demande envoyée !</h3>
                    <p className="text-gray-600">Vous recevrez votre devis sous 24h</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          name="firstName"
                          placeholder="Prénom"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Nom"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-12 pr-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Téléphone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-12 pr-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div className="relative">
                      <MapPin className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="address"
                        placeholder="Adresse"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-12 pr-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="city"
                        placeholder="Ville"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                      <input
                        type="text"
                        name="postalCode"
                        placeholder="Code postal"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <textarea
                      name="message"
                      placeholder="Message (optionnel)"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                    ></textarea>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setShowQuoteForm(false)}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        onClick={handleSubmitQuote}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-md flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Envoi...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Envoyer
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ModernCartQuote;