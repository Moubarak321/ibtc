"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Grid, List, Star, Heart, ShoppingCart, Eye, ChevronDown, Tag, Package, Wrench, Monitor, Home, ChevronLeft, ChevronRight, Play, Link2 } from 'lucide-react';
import Link from 'next/link';
import { getFirestore, collection, getDocs, onSnapshot } from 'firebase/firestore';
import { app } from '@/lib/firebase/client-config'; // Assurez-vous d'avoir ce fichier de configuration
import { useRouter } from 'next/navigation';
interface Product {
  id: string; // Firebase uses string IDs
  name: string;
  subcategory: string;
  category: string;
  brand?: string;
  shortDescription?: string;
  price: number;
  oldPrice?: number;
  images: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  vedette: boolean;
  featured: boolean;
  description: string;
  seller: string;
}
// XCRCGFv9
const MarketplacePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSearchFixed, setIsSearchFixed] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);

  const [cart, setCart] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('marketplace-cart');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCart(new Set(parsed));
      } catch (e) {
        console.error('Erreur de parsing du panier', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('marketplace-cart', JSON.stringify(Array.from(cart)));
  }, [cart]);



  useEffect(() => {
  const cartData = JSON.parse(localStorage.getItem('marketplace-cart-data') || '{}');
  const totalQuantity = Object.values(cartData).reduce((sum, item: any) => {
    return sum + (item.quantity || 1);
  }, 0);
  setCartCount(Number(totalQuantity));
}, [cart]);



  const CATEGORIES_LIST = [
    "Matériaux de structure",
    "Matériaux de revêtement",
    "Matériaux d'isolation",
    "Matériaux de couverture",
    "Matériaux de plomberie",
    "Matériaux électriques",
    "Matériaux de finition",
    "Matériaux de menuiserie",
    "Matériaux de sécurité",
    "Matériaux de décoration",
    "Équipements et outillage",
    "BTIC Bio Nature"
  ];

  // Récupération des produits depuis Firebase
  // Récupération des produits depuis Firebase avec mise à jour en temps réel
  useEffect(() => {
    const db = getFirestore(app);
    const productsCollection = collection(db, 'products');

    // Abonnement aux mises à jour en temps réel
    const unsubscribe = onSnapshot(productsCollection, (snapshot) => {
      try {
        const productsData = snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name || '',
          category: doc.data().category || '',
          subcategory: doc.data().subcategory || '',
          price: doc.data().price || 0,
          oldPrice: doc.data().oldPrice || '',
          images: Array.isArray(doc.data().images) ? doc.data().images : ['📦'],
          rating: doc.data().rating || 0,
          reviews: doc.data().reviews || 0,
          inStock: doc.data().inStock !== undefined ? doc.data().inStock : true,
          vedette: doc.data().vedette || false,
          featured: doc.data().featured || false,
          description: doc.data().description || '',
          seller: doc.data().seller || '',
          brand: doc.data().brand || '',
          shortDescription: doc.data().shortDescription || '',
          discount: doc.data().discount || 0,
        }));

        setProducts(productsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors du traitement des données:", error);
        setIsLoading(false);
      }
    });

    // Nettoyage de l'abonnement lors du démontage du composant
    return () => unsubscribe();
  }, []);


  // Données du carousel
  const carouselSlides = [
    {
      id: 1,
      title: "Matériaux de Construction Premium",
      subtitle: "Ciment, fer, carrelage et plus",
      description: "Découvrez notre gamme complète de matériaux de construction de qualité supérieure",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=600&fit=crop",
      cta: "Voir les produits BTP",
      gradient: "from-blue-600 to-purple-700"
    },
    {
      id: 2,
      title: "Outils & Quincaillerie Pro",
      subtitle: "Équipement professionnel",
      description: "Outillage de qualité pour tous vos projets, des plus petits aux plus grands",
      image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=1200&h=600&fit=crop",
      cta: "Explorer la quincaillerie",
      gradient: "from-orange-500 to-red-600"
    },
    {
      id: 3,
      title: "Technologies & Informatique",
      subtitle: "Solutions digitales",
      description: "Ordinateurs, périphériques et solutions IT pour votre bureau et votre entreprise",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=600&fit=crop",
      cta: "Découvrir l'informatique",
      gradient: "from-green-500 to-teal-600"
    },
    {
      id: 4,
      title: "Commerce Général",
      subtitle: "Produits du quotidien",
      description: "Alimentation, produits d'entretien et articles divers pour tous vos besoins",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
      cta: "Voir tous les produits",
      gradient: "from-purple-500 to-pink-600"
    }
  ];

  // Auto-play du carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Gestion du scroll pour la barre de recherche fixe
  useEffect(() => {
    const handleScroll = () => {
      setIsSearchFixed(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper function to assign icons (vous pouvez personnaliser ce mapping)
  function getIconForCategory(category: string) {
    switch (category) {
      case 'Matériaux de structure': return Home;
      case 'Matériaux de revêtement': return Wrench;
      case 'Matériaux d\'isolation': return Wrench;
      case 'Matériaux de couverture': return Home;
      case 'Matériaux de plomberie': return Wrench;
      case 'Matériaux électriques': return Monitor;
      case 'Matériaux de finition': return Wrench;
      case 'Matériaux de menuiserie': return Wrench;
      case 'Matériaux de sécurité': return Wrench;
      case 'Matériaux de décoration': return Tag;
      case 'Équipements et outillage': return Wrench;
      case 'BTIC Bio Nature': return Tag;
      default: return Package;
    }
  }

  // Fonction helper pour normaliser les IDs de catégorie
  const normalizeCategory = (category: string) =>
    category.toLowerCase().replace(/\s+/g, '-');

  const categories = [
    {
      id: 'all',
      name: 'Tous les produits',
      icon: Package,
      count: products.length
    },
    ...CATEGORIES_LIST.map(cat => ({
      id: normalizeCategory(cat), // Utilisation de la fonction helper
      name: cat,
      icon: getIconForCategory(cat),
      count: products.filter(p => normalizeCategory(p.category) === normalizeCategory(cat)).length
    }))
  ];


  // Filtrage et tri des produits
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.subcategory.toLowerCase().includes(searchTerm.toLowerCase());

      // Modification ici pour gérer les nouveaux IDs de catégorie
      const matchesCategory = selectedCategory === 'all' ||
        normalizeCategory(product.category) === normalizeCategory(selectedCategory);
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });

    // (Le reste du code reste inchangé)
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [products, searchTerm, selectedCategory, priceRange, sortBy]);

  const toggleFavorite = (productId: unknown) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

const toggleCart = (productId: string) => {
  setCart(prev => {
    const newCart = new Set(prev);
    const cartData = JSON.parse(localStorage.getItem('marketplace-cart-data') || '{}');

    if (newCart.has(productId)) {
      newCart.delete(productId);
      delete cartData[productId];
    } else {
      newCart.add(productId);
      const product = products.find(p => p.id === productId);
      if (product) {
        cartData[productId] = {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          description: product.shortDescription || '',
          quantity: 1
        };
      }
    }

    localStorage.setItem('marketplace-cart', JSON.stringify(Array.from(newCart)));
    localStorage.setItem('marketplace-cart-data', JSON.stringify(cartData));

    return newCart;
  });
};



  // Animation pour le panier quand un produit est ajouté/retiré
  useEffect(() => {
    if (cart.size > 0) {
      const cartIcon = document.querySelector('.cart-pulse');
      if (cartIcon) {
        cartIcon.classList.add('animate-pulse');
        setTimeout(() => {
          cartIcon.classList.remove('animate-pulse');
        }, 1000);
      }
    }
  }, [cart.size]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  const goToSlide = (index: React.SetStateAction<number>) => {
    setCurrentSlide(index);
  };

  const formatPrice = (price: string | number | bigint) => {
    return new Intl.NumberFormat('fr-FR').format(Number(price)) + ' FCFA';
  };

  type Product = {
    id: string;
    name: string;
    category: string;
    subcategory: string;
    price: number;
    oldPrice?: number;
    images: string[];
    rating: number;
    reviews: number;
    inStock: boolean;
    featured: boolean;
    description: string;
    seller: string;
    brand?: string;
    shortDescription?: string;
    discount?: number;
    vedette?: boolean;

  };

  const ProductCard = ({ product }: { product: Product }) => (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <Link href={`/marketplace/details/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.vedette && (
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold animate-pulse">
              ⭐ Vedette
            </span>
          )}
          {product.oldPrice && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              -{Math.round((1 - product.price / product.oldPrice) * 100)}%
            </span>
          )}
          {!product.inStock && (
            <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Rupture
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-8 group-hover:translate-x-0">
          <button
            onClick={() => toggleFavorite(product.id)}
            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 ${favorites.has(product.id)
              ? 'bg-red-500 text-white'
              : 'bg-white/80 text-gray-600 hover:bg-red-50 hover:text-red-500'
              }`}
          >
            <Heart className={`w-4 h-4 ${favorites.has(product.id) ? 'fill-current' : ''}`} />
          </button>
          <button className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 hover:scale-110">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full font-medium">
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-gray-600">{product.rating}</span>
            <span className="text-xs text-gray-400">({product.reviews})</span>
          </div>
        </div>
        <Link href={`/marketplace/details/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.shortDescription}</p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">À partir de</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-blue-600">{formatPrice(product.price)}</span>
              {product.oldPrice !== null && product.oldPrice !== undefined && product.oldPrice > 0 ? (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Marque : {product.brand}</span>
          <button
            onClick={() => toggleCart(product.id)}
            disabled={!product.inStock}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${cart.has(product.id)
              ? 'bg-red-500 text-white'
              : product.inStock
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {cart.has(product.id) ? 'Retirer' : product.inStock ? 'Ajouter' : 'Indisponible'}
          </button>
        </div>
      </div>
    </div>
  );


  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(start, start + productsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Carousel Header */}
      <div className="relative h-96 lg:h-[500px] overflow-hidden bg-gray-900">
        {/* Slides */}
        <div className="relative w-full h-full">
          {carouselSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105'
                }`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-80`} />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 w-full">
                  <div className="max-w-2xl text-white">
                    <div className="mb-4 animate-fade-in-up">
                      <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                        {slide.subtitle}
                      </span>
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-fade-in-up animation-delay-200">
                      {slide.title}
                    </h1>
                    <p className="text-lg lg:text-xl mb-8 text-white/90 animate-fade-in-up animation-delay-400">
                      {slide.description}
                    </p>
                    <button
                      onClick={() => setSelectedCategory(index === 0 ? 'btp' : index === 1 ? 'quincaillerie' : index === 2 ? 'informatique' : 'commerce')}
                      className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 animate-fade-in-up animation-delay-600"
                    >
                      {slide.cta}
                      <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        .
        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
                }`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <div
            className="h-full bg-white transition-all duration-300 ease-linear"
            style={{ width: `${((currentSlide + 1) / carouselSlides.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Fixed Search Bar */}
      <div className={`sticky top-0 z-50 transition-all duration-500 ${isSearchFixed
        ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b'
        : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className={`transition-all duration-500 ${isSearchFixed ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}>
              <h2 className="text-xl font-bold text-gray-900">Marketplace</h2>
            </div>

            <div className="flex items-center gap-3 flex-1 lg:flex-none">
              <div className="relative lg:w-96 flex-1 lg:flex-none">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${isSearchFixed
                    ? 'bg-white border-gray-200 shadow-sm'
                    : 'bg-white/90 backdrop-blur-sm border-white/50'
                    }`}
                />
              </div>

              {/* Cart Icon */}
              <div className="relative">
                <button className={`relative p-3 rounded-xl transition-all duration-300 hover:scale-110 group cart-pulse ${isSearchFixed
                  ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700'
                  : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white border border-white/50'
                  }`} onClick={() => router.push('/cart')}>
                  <ShoppingCart className="w-6 h-6" />

                  {/* Cart Badge */}
                  {cartCount > 0 && (
                    <div className={`absolute -top-2 -right-2 min-w-[20px] h-5 rounded-full flex items-center justify-center text-xs font-bold animate-bounce ${isSearchFixed
                      ? 'bg-orange-500 text-white'
                      : 'bg-red-500 text-white'
                      }`}>
                      {cartCount}
                    </div>
                  )}

                  {/* Pulse Animation when items added */}
                  {cartCount > 0 && (
                    <div className={`absolute inset-0 rounded-xl animate-ping ${isSearchFixed
                      ? 'bg-blue-600'
                      : 'bg-white'
                      } opacity-20`} />
                  )}
                </button>

                {/* Cart Tooltip */}
                <div className="absolute top-full mt-2 right-0 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
                  {cartCount === 0 ? 'Panier vide' : `${cartCount} article${cartCount > 1 ? 's' : ''} dans le panier`}
                  <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-900 rotate-45" />
                </div>
              </div>
            </div>

            <div className={`transition-all duration-500 ${isSearchFixed ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {filteredProducts.length} produits
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Info */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Marketplace Multi-Services
            </h1>
            <p className="text-gray-600">
              Découvrez notre sélection de produits BTP, quincaillerie, informatique et commerce général
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80">
            <div className="sticky top-8">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border mb-4"
              >
                <span className="font-semibold flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filtres
                </span>
                <ChevronDown className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              <div className={`${showFilters ? 'block' : 'hidden'} lg:block space-y-6`}>
                {/* Categories */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border">
                  <h3 className="font-semibold text-gray-900 mb-4">Catégories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 hover:scale-105 ${selectedCategory === category.id
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                            }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{category.name}</span>
                          </div>
                          <span className={`text-sm px-2 py-1 rounded-full ${selectedCategory === category.id ? 'bg-white/20' : 'bg-gray-200'
                            }`}>
                            {category.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Price Range */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border">
                  <h3 className="font-semibold text-gray-900 mb-4">Gamme de prix</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{formatPrice(priceRange[0])}</span>
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="500000"
                      step="5000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <span className="text-gray-600">
                  {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''} trouvé{filteredProducts.length !== 1 ? 's' : ''}
                </span>
                {searchTerm && (
                  <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    Recherche: "{searchTerm}"
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="featured">Produits vedettes</option>
                  <option value="price-low">Prix croissant</option>
                  <option value="price-high">Prix décroissant</option>
                  <option value="rating">Mieux notés</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex items-center bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                      }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                      }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <span className="ml-2">Chargement des produits...</span>
              </div>
            ) :
              filteredProducts.length > 0 ? (
                <div className={`grid gap-6 ${viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1'
                  }`}>
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <Package className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun produit trouvé</h3>
                  <p className="text-gray-600 mb-6">
                    Essayez de modifier vos critères de recherche ou de filtrage
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                      setPriceRange([0, 500000]);
                    }}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              )
            }

            {/* pagination suite */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-10 gap-2">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                  Précédent
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageClick(i + 1)}
                    className={`px-4 py-2 rounded-lg ${currentPage === i + 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                  Suivant
                </button>
              </div>
            )}


          </div>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default MarketplacePage;



