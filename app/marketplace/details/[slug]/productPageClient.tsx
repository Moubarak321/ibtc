"use client";
import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Heart, 
  Share2, 
  ShoppingCart, 
  Truck, 
  Shield, 
  RotateCcw, 
  Award, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Minus, 
  Check,
  ArrowLeft,
  Package,
  Zap,
  Clock
} from 'lucide-react';
import Link from 'next/link';

interface Product {
  name: string;
  id: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  category: string;
  brand?: string;
  images: string[];
  shortDescription?: string;
  longDescription?: string;
  specifications: Record<string, string>;
  features: string[];
  inStock: boolean;
  vedette: boolean;
  fastDelivery: boolean;
  services: {
    delivery: { title: string; description: string };
    warranty: { title: string; description: string };
  };
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  brand?: string;
}

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('description');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);

  // Charger le panier depuis localStorage au montage du composant
  useEffect(() => {
    const loadCartFromStorage = () => {
      try {
        const savedCart = localStorage.getItem('marketplace-cart-data');
        if (savedCart) {
          const cartData = JSON.parse(savedCart);
          const items = Object.values(cartData) as CartItem[];
          setCartItems(items);
          
          // Calculer le nombre total d'articles
          const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
          setCartCount(totalCount);
        }
      } catch (error) {
        console.error('Erreur lors du chargement du panier:', error);
      }
    };

    loadCartFromStorage();
  }, []);

  // Sauvegarder le panier dans localStorage
  const saveCartToStorage = (items: CartItem[]) => {
    try {
      const cartData: Record<string, CartItem> = {};
      items.forEach(item => {
        cartData[item.id] = item;
      });
      
      localStorage.setItem('marketplace-cart-data', JSON.stringify(cartData));
      
      // Mettre à jour aussi l'ancien format pour compatibilité
      const productIds = items.map(item => item.id);
      localStorage.setItem('marketplace-cart', JSON.stringify(productIds));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du panier:', error);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  const handleAddToCart = () => {
    const newCartItems = [...cartItems];
    const existingItemIndex = newCartItems.findIndex(item => item.id === product.id);

    if (existingItemIndex >= 0) {
      // Si le produit existe déjà, augmenter la quantité
      newCartItems[existingItemIndex].quantity += quantity;
    } else {
      // Ajouter un nouveau produit au panier
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.images[0] || '/placeholder-image.jpg',
        category: product.category,
        brand: product.brand
      };
      newCartItems.push(newItem);
    }

    // Mettre à jour l'état et sauvegarder
    setCartItems(newCartItems);
    const totalCount = newCartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalCount);
    saveCartToStorage(newCartItems);

    // Animation de confirmation
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 3000);

    // Réinitialiser la quantité à 1
    setQuantity(1);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.shortDescription,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Erreur lors du partage:', error);
      }
    } else {
      // Fallback: copier l'URL dans le presse-papiers
      try {
        await navigator.clipboard.writeText(window.location.href);
        // Vous pouvez ajouter une notification ici
        alert('Lien copié dans le presse-papiers!');
      } catch (error) {
        console.log('Impossible de copier le lien:', error);
      }
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    
    // Optionnel: sauvegarder la wishlist dans localStorage
    try {
      const savedWishlist = JSON.parse(localStorage.getItem('marketplace-wishlist') || '[]');
      let newWishlist;
      
      if (isWishlisted) {
        // Retirer de la wishlist
        newWishlist = savedWishlist.filter((id: string) => id !== product.id);
      } else {
        // Ajouter à la wishlist
        newWishlist = [...savedWishlist, product.id];
      }
      
      localStorage.setItem('marketplace-wishlist', JSON.stringify(newWishlist));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la wishlist:', error);
    }
  };

  const discountPercentage = product.oldPrice 
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  // Vérifier si le produit est déjà dans le panier
  const isInCart = cartItems.some(item => item.id === product.id);
  const cartQuantity = cartItems.find(item => item.id === product.id)?.quantity || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6 flex items-center justify-between">
          <Link 
            href="/marketplace" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour au marketplace</span>
          </Link>
          
          {/* Compteur du panier (optionnel) */}
          {cartCount > 0 && (
            <Link href="/cart">
              <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full hover:bg-blue-200 transition-colors">
                <ShoppingCart className="w-5 h-5" />
                <span className="font-medium">{cartCount} article{cartCount > 1 ? 's' : ''}</span>
              </div>
            </Link>
          )}
        </div>

        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-blue-600">Accueil</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/marketplace" className="hover:text-blue-600">Marketplace</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">{product.category}</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-blue-600 font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images Section */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl">
              <img
                src={product.images[selectedImage] || '/placeholder-image.jpg'}
                alt={product.name}
                className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={handleWishlist}
                  className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                    isWishlisted 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/80 text-gray-700 hover:bg-red-50'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
                <button 
                  onClick={handleShare}
                  className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:bg-blue-50 transition-all duration-300"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.vedette && (
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ⭐ Vedette
                  </span>
                )}
                {discountPercentage > 0 && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    -{discountPercentage}%
                  </span>
                )}
                {product.fastDelivery && (
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    <Zap className="w-4 h-4 inline mr-1" />
                    Livraison rapide
                  </span>
                )}
              </div>
            </div>

            {/* Image Thumbnails */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                    selectedImage === index
                      ? 'ring-2 ring-blue-500 shadow-lg'
                      : 'hover:shadow-md opacity-70 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`Vue ${index + 1}`} 
                    className="w-full h-full object-cover" 
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  product.inStock 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.inStock ? 'En stock' : 'Rupture de stock'}
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
                  {product.category}
                </span>
                {product.brand && (
                  <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full font-medium">
                    {product.brand}
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              
              {product.shortDescription && (
                <p className="text-gray-600 mb-4">
                  {product.shortDescription}
                </p>
              )}

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">(127 avis)</span>
                </div>
              </div>
            </div>

            {/* Price and Purchase Section */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-end space-x-4 mb-6">
                <span className="text-3xl font-bold text-blue-600">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                    <span className="bg-red-100 text-red-600 text-sm px-2 py-1 rounded-full font-medium">
                      -{discountPercentage}%
                    </span>
                  </>
                )}
              </div>

              {product.inStock && (
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

                  {isInCart && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center space-x-2 text-green-700">
                        <Check className="w-5 h-5" />
                        <span className="font-medium">
                          Déjà dans le panier ({cartQuantity} article{cartQuantity > 1 ? 's' : ''})
                        </span>
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={handleAddToCart}
                    className={`w-full font-medium py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2 ${
                      isAddedToCart
                        ? 'bg-green-600 text-white'
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>
                      {isAddedToCart ? 'Ajouté au panier!' : isInCart ? 'Ajouter plus' : 'Ajouter au panier'}
                    </span>
                  </button>

                  <Link href="/cart">
                    <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-4 px-6 rounded-xl transition-all duration-300">
                      Voir le panier & Commander
                    </button>
                  </Link>
                </div>
              )}

              {!product.inStock && (
                <div className="text-center py-4">
                  <p className="text-red-600 font-medium mb-3">Produit temporairement indisponible</p>
                  <button className="w-full bg-gray-100 text-gray-500 font-medium py-4 px-6 rounded-xl cursor-not-allowed">
                    <Clock className="w-5 h-5 inline mr-2" />
                    Notifier quand disponible
                  </button>
                </div>
              )}
            </div>

            {/* Service Icons */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Truck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {product.services?.delivery?.title || 'Livraison'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {product.services?.delivery?.description || 'Livraison rapide'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {product.services?.warranty?.title || 'Garantie'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {product.services?.warranty?.description || 'Garantie fabricant'}
                  </p>
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
                    {product.longDescription || product.shortDescription || 'Aucune description disponible pour ce produit.'}
                  </p>
                </div>

                {product.features && product.features.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Caractéristiques principales</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {selectedTab === 'specifications' && (
              <div>
                <h3 className="text-xl font-semibold mb-6">Fiche technique</h3>
                {product.specifications && Object.keys(product.specifications).length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(product.specifications).map(([label, value], index) => (
                      <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="font-medium text-gray-700">{label}</span>
                        <span className="text-gray-900 font-semibold">{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Aucune spécification technique disponible</p>
                  </div>
                )}
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
                    { 
                      name: 'Marc D.', 
                      rating: 5, 
                      comment: 'Excellent produit, très robuste et efficace. Je recommande vivement !', 
                      date: '15 mars 2024' 
                    },
                    { 
                      name: 'Sophie L.', 
                      rating: 5, 
                      comment: 'Parfaite pour mes travaux de bricolage. Bonne prise en main et puissante.', 
                      date: '8 mars 2024' 
                    },
                    { 
                      name: 'Pierre M.', 
                      rating: 4, 
                      comment: 'Bonne perceuse, rapport qualité-prix intéressant. Livrée rapidement.', 
                      date: '28 février 2024' 
                    }
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

















// app/marketplace/details/[slug]/ProductDetailClient.tsx (Client Component)
// "use client";
// import React, { useState } from 'react';
// import { 
//   Star, 
//   Heart, 
//   Share2, 
//   ShoppingCart, 
//   Truck, 
//   Shield, 
//   RotateCcw, 
//   Award, 
//   ChevronLeft, 
//   ChevronRight, 
//   Plus, 
//   Minus, 
//   Check,
//   ArrowLeft,
//   Package,
//   Zap,
//   Clock
// } from 'lucide-react';
// import Link from 'next/link';

// interface Product {
//   name: string;
//   id: string;
//   price: number;
//   oldPrice?: number;
//   discount?: number;
//   category: string;
//   brand?: string;
//   images: string[];
//   shortDescription?: string;
//   longDescription?: string;
//   specifications: Record<string, string>;
//   features: string[];
//   inStock: boolean;
//   vedette: boolean;
//   fastDelivery: boolean;
//   services: {
//     delivery: { title: string; description: string };
//     warranty: { title: string; description: string };
//   };
// }

// interface ProductDetailClientProps {
//   product: Product;
// }

// export default function ProductDetailClient({ product }: ProductDetailClientProps) {
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedTab, setSelectedTab] = useState('description');
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [isAddedToCart, setIsAddedToCart] = useState(false);
//   const [cart, setCart] = useState<Set<string>>(new Set());

//     useEffect(() => {
//         const saved = localStorage.getItem('marketplace-cart');
//         if (saved) {
//             try {
//                 const parsed = JSON.parse(saved);
//                 setCart(new Set(parsed));
//             } catch (e) {
//                 console.error('Erreur de parsing du panier', e);
//             }
//         }
//     }, []);

//     useEffect(() => {
//         localStorage.setItem('marketplace-cart', JSON.stringify(Array.from(cart)));
//     }, [cart]);

//      useEffect(() => {
//             const cartData = JSON.parse(localStorage.getItem('marketplace-cart-data') || '{}');
//             const totalQuantity = Object.values(cartData).reduce((sum, item: any) => {
//                 return sum + (item.quantity || 1);
//             }, 0);
//             setCartCount(Number(totalQuantity));
//         }, [cart]);

//   const formatPrice = (price: number) => {
//     return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
//   };

//   const handleAddToCart = () => {
//     setIsAddedToCart(true);
//     // Add your cart logic here
//     setTimeout(() => setIsAddedToCart(false), 3000);
//   };

//   const handleShare = async () => {
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: product.name,
//           text: product.shortDescription,
//           url: window.location.href,
//         });
//       } catch (error) {
//         console.log('Erreur lors du partage:', error);
//       }
//     } else {
//       // Fallback: copier l'URL dans le presse-papiers
//       navigator.clipboard.writeText(window.location.href);
//       // Vous pouvez ajouter une notification ici
//     }
//   };

//   const discountPercentage = product.oldPrice 
//     ? Math.round((1 - product.price / product.oldPrice) * 100)
//     : 0;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Back Button */}
//         <div className="mb-6">
//           <Link 
//             href="/marketplace" 
//             className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
//           >
//             <ArrowLeft className="w-5 h-5" />
//             <span>Retour au marketplace</span>
//           </Link>
//         </div>

//         {/* Breadcrumb */}
//         <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
//           <Link href="/" className="hover:text-blue-600">Accueil</Link>
//           <ChevronRight className="w-4 h-4" />
//           <Link href="/marketplace" className="hover:text-blue-600">Marketplace</Link>
//           <ChevronRight className="w-4 h-4" />
//           <span className="text-gray-900">{product.category}</span>
//           <ChevronRight className="w-4 h-4" />
//           <span className="text-blue-600 font-medium">{product.name}</span>
//         </nav>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
//           {/* Images Section */}
//           <div className="space-y-4">
//             <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl">
//               <img
//                 src={product.images[selectedImage] || '/placeholder-image.jpg'}
//                 alt={product.name}
//                 className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-500"
//               />
//               <div className="absolute top-4 right-4 flex space-x-2">
//                 <button
//                   onClick={() => setIsWishlisted(!isWishlisted)}
//                   className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
//                     isWishlisted 
//                       ? 'bg-red-500 text-white' 
//                       : 'bg-white/80 text-gray-700 hover:bg-red-50'
//                   }`}
//                 >
//                   <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
//                 </button>
//                 <button 
//                   onClick={handleShare}
//                   className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:bg-blue-50 transition-all duration-300"
//                 >
//                   <Share2 className="w-5 h-5" />
//                 </button>
//               </div>

//               {/* Badges */}
//               <div className="absolute top-4 left-4 flex flex-col gap-2">
//                 {product.vedette && (
//                   <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
//                     ⭐ Vedette
//                   </span>
//                 )}
//                 {discountPercentage > 0 && (
//                   <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
//                     -{discountPercentage}%
//                   </span>
//                 )}
//                 {product.fastDelivery && (
//                   <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
//                     <Zap className="w-4 h-4 inline mr-1" />
//                     Livraison rapide
//                   </span>
//                 )}
//               </div>
//             </div>

//             {/* Image Thumbnails */}
//             <div className="flex space-x-2 overflow-x-auto pb-2">
//               {product.images.map((image, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedImage(index)}
//                   className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all duration-300 ${
//                     selectedImage === index
//                       ? 'ring-2 ring-blue-500 shadow-lg'
//                       : 'hover:shadow-md opacity-70 hover:opacity-100'
//                   }`}
//                 >
//                   <img 
//                     src={image} 
//                     alt={`Vue ${index + 1}`} 
//                     className="w-full h-full object-cover" 
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Product Info */}
//           <div className="space-y-6">
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <span className={`text-xs px-3 py-1 rounded-full font-medium ${
//                   product.inStock 
//                     ? 'bg-green-100 text-green-800' 
//                     : 'bg-red-100 text-red-800'
//                 }`}>
//                   {product.inStock ? 'En stock' : 'Rupture de stock'}
//                 </span>
//                 <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
//                   {product.category}
//                 </span>
//                 {product.brand && (
//                   <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full font-medium">
//                     {product.brand}
//                   </span>
//                 )}
//               </div>

//               <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                 {product.name}
//               </h1>
              
//               {product.shortDescription && (
//                 <p className="text-gray-600 mb-4">
//                   {product.shortDescription}
//                 </p>
//               )}

//               <div className="flex items-center space-x-4 mb-6">
//                 <div className="flex items-center">
//                   {[...Array(5)].map((_, i) => (
//                     <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                   ))}
//                   <span className="ml-2 text-sm text-gray-600">(127 avis)</span>
//                 </div>
//               </div>
//             </div>

//             {/* Price and Purchase Section */}
//             <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//               <div className="flex items-end space-x-4 mb-6">
//                 <span className="text-3xl font-bold text-blue-600">
//                   {formatPrice(product.price)}
//                 </span>
//                 {product.oldPrice && (
//                   <>
//                     <span className="text-lg text-gray-500 line-through">
//                       {formatPrice(product.oldPrice)}
//                     </span>
//                     <span className="bg-red-100 text-red-600 text-sm px-2 py-1 rounded-full font-medium">
//                       -{discountPercentage}%
//                     </span>
//                   </>
//                 )}
//               </div>

//               {product.inStock && (
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between">
//                     <span className="text-gray-700 font-medium">Quantité:</span>
//                     <div className="flex items-center space-x-3">
//                       <button
//                         onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                         className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
//                       >
//                         <Minus className="w-4 h-4" />
//                       </button>
//                       <span className="px-4 py-2 bg-gray-50 rounded-lg font-medium min-w-[60px] text-center">
//                         {quantity}
//                       </span>
//                       <button
//                         onClick={() => setQuantity(quantity + 1)}
//                         className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
//                       >
//                         <Plus className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>

//                   <button 
//                     onClick={handleAddToCart}
//                     className={`w-full font-medium py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2 ${
//                       isAddedToCart
//                         ? 'bg-green-600 text-white'
//                         : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
//                     }`}
//                   >
//                     <ShoppingCart className="w-5 h-5" />
//                     <span>
//                       {isAddedToCart ? 'Ajouté au panier!' : 'Ajouter au panier'}
//                     </span>
//                   </button>

//                   <Link href="/cart">
//                     <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-4 px-6 rounded-xl transition-all duration-300">
//                       Acheter maintenant
//                     </button>
//                   </Link>
//                 </div>
//               )}

//               {!product.inStock && (
//                 <div className="text-center py-4">
//                   <p className="text-red-600 font-medium mb-3">Produit temporairement indisponible</p>
//                   <button className="w-full bg-gray-100 text-gray-500 font-medium py-4 px-6 rounded-xl cursor-not-allowed">
//                     <Clock className="w-5 h-5 inline mr-2" />
//                     Notifier quand disponible
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Service Icons */}
//             <div className="grid grid-cols-2 gap-4">
//               <div className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
//                 <div className="p-2 bg-green-100 rounded-lg">
//                   <Truck className="w-5 h-5 text-green-600" />
//                 </div>
//                 <div>
//                   <p className="font-medium text-gray-900">
//                     {product.services?.delivery?.title || 'Livraison'}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     {product.services?.delivery?.description || 'Livraison rapide'}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
//                 <div className="p-2 bg-blue-100 rounded-lg">
//                   <Shield className="w-5 h-5 text-blue-600" />
//                 </div>
//                 <div>
//                   <p className="font-medium text-gray-900">
//                     {product.services?.warranty?.title || 'Garantie'}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     {product.services?.warranty?.description || 'Garantie fabricant'}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Product Details Tabs */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
//           <div className="border-b border-gray-200">
//             <nav className="flex space-x-8 px-6">
//               {['description', 'specifications', 'reviews'].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setSelectedTab(tab)}
//                   className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-300 ${
//                     selectedTab === tab
//                       ? 'border-blue-500 text-blue-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700'
//                   }`}
//                 >
//                   {tab === 'description' && 'Description'}
//                   {tab === 'specifications' && 'Caractéristiques'}
//                   {tab === 'reviews' && 'Avis clients'}
//                 </button>
//               ))}
//             </nav>
//           </div>

//           <div className="p-6">
//             {selectedTab === 'description' && (
//               <div className="space-y-6">
//                 <div>
//                   <h3 className="text-xl font-semibold mb-4">Description du produit</h3>
//                   <p className="text-gray-700 leading-relaxed mb-6">
//                     {product.longDescription || product.shortDescription || 'Aucune description disponible pour ce produit.'}
//                   </p>
//                 </div>

//                 {product.features && product.features.length > 0 && (
//                   <div>
//                     <h4 className="text-lg font-semibold mb-3">Caractéristiques principales</h4>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       {product.features.map((feature, index) => (
//                         <div key={index} className="flex items-start space-x-3">
//                           <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
//                           <span className="text-gray-700">{feature}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}

//             {selectedTab === 'specifications' && (
//               <div>
//                 <h3 className="text-xl font-semibold mb-6">Fiche technique</h3>
//                 {product.specifications && Object.keys(product.specifications).length > 0 ? (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {Object.entries(product.specifications).map(([label, value], index) => (
//                       <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
//                         <span className="font-medium text-gray-700">{label}</span>
//                         <span className="text-gray-900 font-semibold">{value}</span>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-8">
//                     <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                     <p className="text-gray-600">Aucune spécification technique disponible</p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {selectedTab === 'reviews' && (
//               <div className="space-y-6">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-xl font-semibold">Avis clients</h3>
//                   {/* <div className="flex items-center space-x-2">
//                     <div className="flex">
//                       {[...Array(5)].map((_, i) => (
//                         <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                       ))}
//                     </div>
//                     <span className="text-lg font-semibold">4.8/5</span>
//                     <span className="text-gray-600">(127 avis)</span>
//                   </div> */}
//                 </div>

//                 {/* <div className="space-y-4">
//                   {[
//                     { 
//                       name: 'Marc D.', 
//                       rating: 5, 
//                       comment: 'Excellent produit, très robuste et efficace. Je recommande vivement !', 
//                       date: '15 mars 2024' 
//                     },
//                     { 
//                       name: 'Sophie L.', 
//                       rating: 5, 
//                       comment: 'Parfaite pour mes travaux de bricolage. Bonne prise en main et puissante.', 
//                       date: '8 mars 2024' 
//                     },
//                     { 
//                       name: 'Pierre M.', 
//                       rating: 4, 
//                       comment: 'Bonne perceuse, rapport qualité-prix intéressant. Livrée rapidement.', 
//                       date: '28 février 2024' 
//                     }
//                   ].map((review, index) => (
//                     <div key={index} className="bg-gray-50 rounded-xl p-4">
//                       <div className="flex items-center justify-between mb-2">
//                         <div className="flex items-center space-x-3">
//                           <span className="font-medium">{review.name}</span>
//                           <div className="flex">
//                             {[...Array(review.rating)].map((_, i) => (
//                               <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
//                             ))}
//                           </div>
//                         </div>
//                         <span className="text-sm text-gray-500">{review.date}</span>
//                       </div>
//                       <p className="text-gray-700">{review.comment}</p>
//                     </div>
//                   ))}
//                 </div> */}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }











































// <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
//           <div className="border-b border-gray-200">
//             <nav className="flex space-x-8 px-6">
//               {['description', 'specifications', 'reviews'].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setSelectedTab(tab)}
//                   className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-300 ${
//                     selectedTab === tab
//                       ? 'border-blue-500 text-blue-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700'
//                   }`}
//                 >
//                   {tab === 'description' && 'Description'}
//                   {tab === 'specifications' && 'Caractéristiques'}
//                   {tab === 'reviews' && 'Avis clients'}
//                 </button>
//               ))}
//             </nav>
//           </div>

//           <div className="p-6">
//             {selectedTab === 'description' && (
//               <div className="space-y-6">
//                 <div>
//                   <h3 className="text-xl font-semibold mb-4">Description du produit</h3>
//                   <p className="text-gray-700 leading-relaxed mb-6">
//                     {product.longDescription || product.shortDescription || 'Aucune description disponible pour ce produit.'}
//                   </p>
//                 </div>

//                 {product.features && product.features.length > 0 && (
//                   <div>
//                     <h4 className="text-lg font-semibold mb-3">Caractéristiques principales</h4>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       {product.features.map((feature, index) => (
//                         <div key={index} className="flex items-start space-x-3">
//                           <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
//                           <span className="text-gray-700">{feature}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}

//             {selectedTab === 'specifications' && (
//               <div>
//                 <h3 className="text-xl font-semibold mb-6">Fiche technique</h3>
//                 {product.specifications && Object.keys(product.specifications).length > 0 ? (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {Object.entries(product.specifications).map(([label, value], index) => (
//                       <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
//                         <span className="font-medium text-gray-700">{label}</span>
//                         <span className="text-gray-900 font-semibold">{value}</span>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-8">
//                     <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                     <p className="text-gray-600">Aucune spécification technique disponible</p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {selectedTab === 'reviews' && (
//               <div className="space-y-6">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-xl font-semibold">Avis clients</h3>
//                   {/* <div className="flex items-center space-x-2">
//                     <div className="flex">
//                       {[...Array(5)].map((_, i) => (
//                         <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                       ))}
//                     </div>
//                     <span className="text-lg font-semibold">4.8/5</span>
//                     <span className="text-gray-600">(127 avis)</span>
//                   </div> */}
//                 </div>

//                 {/* <div className="space-y-4">
//                   {[
//                     { 
//                       name: 'Marc D.', 
//                       rating: 5, 
//                       comment: 'Excellent produit, très robuste et efficace. Je recommande vivement !', 
//                       date: '15 mars 2024' 
//                     },
//                     { 
//                       name: 'Sophie L.', 
//                       rating: 5, 
//                       comment: 'Parfaite pour mes travaux de bricolage. Bonne prise en main et puissante.', 
//                       date: '8 mars 2024' 
//                     },
//                     { 
//                       name: 'Pierre M.', 
//                       rating: 4, 
//                       comment: 'Bonne perceuse, rapport qualité-prix intéressant. Livrée rapidement.', 
//                       date: '28 février 2024' 
//                     }
//                   ].map((review, index) => (
//                     <div key={index} className="bg-gray-50 rounded-xl p-4">
//                       <div className="flex items-center justify-between mb-2">
//                         <div className="flex items-center space-x-3">
//                           <span className="font-medium">{review.name}</span>
//                           <div className="flex">
//                             {[...Array(review.rating)].map((_, i) => (
//                               <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
//                             ))}
//                           </div>
//                         </div>
//                         <span className="text-sm text-gray-500">{review.date}</span>
//                       </div>
//                       <p className="text-gray-700">{review.comment}</p>
//                     </div>
//                   ))}
//                 </div> */}
//               </div>
//             )}
//           </div>
//         </div>