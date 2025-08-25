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

const MarketplacePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceRange, setPriceRange] = useState([0, 500000]);
    const [sortBy, setSortBy] = useState('vedette');
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

    // Helper function to assign icons
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
            id: normalizeCategory(cat),
            name: cat,
            icon: getIconForCategory(cat),
            count: products.filter(p => normalizeCategory(p.category) === normalizeCategory(cat)).length
        }))
    ];

    // Filtrage et tri des produits AMÉLIORÉ
    const filteredProducts = useMemo(() => {
        let filtered = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.subcategory.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory = selectedCategory === 'all' ||
                normalizeCategory(product.category) === normalizeCategory(selectedCategory);
            const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

            return matchesSearch && matchesCategory && matchesPrice;
        });

        // TRI AMÉLIORÉ : Produits vedettes TOUJOURS en premier
        filtered.sort((a, b) => {
            // D'abord, trier par statut vedette (vedette en premier)
            if (a.vedette && !b.vedette) return -1;
            if (!a.vedette && b.vedette) return 1;

            // Si les deux ont le même statut vedette, appliquer le tri secondaire
            switch (sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                case 'vedette':
                    // Si déjà trié par vedette ci-dessus, pas besoin de re-trier
                    return 0;
                default:
                    return 0;
            }
        });

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

    // COMPOSANT PRODUCT CARD AMÉLIORÉ POUR LA RESPONSIVITÉ
    const ProductCard = ({ product }: { product: Product }) => (
        <div className="group bg-white rounded-xl lg:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200" >
            {/* Image Container */}
            < div className="relative overflow-hidden" >
                <Link href={`/marketplace/details/${product.id}`
                }>
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-40 sm:h-48 lg:h-52 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                </Link>

                {/* Badges - Responsive */}
                <div className="absolute top-2 left-2 lg:top-3 lg:left-3 flex flex-col gap-1 lg:gap-2" >
                    {
                        product.vedette && (
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold animate-pulse flex items-center gap-1">
                                ⭐ < span className="hidden sm:inline" > Vedette </span>
                            </span>
                        )}
                    {
                        product.oldPrice && (
                            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold" >
                                -{Math.round((1 - product.price / product.oldPrice) * 100)} %
                            </span>
                        )
                    }
                    {
                        !product.inStock && (
                            <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-semibold" >
                                Rupture
                            </span>
                        )
                    }
                </div>

                {/* Action Buttons - Responsive */}
                <div className="absolute top-2 right-2 lg:top-3 lg:right-3 flex flex-col gap-1 lg:gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-8 group-hover:translate-x-0" >
                    <button
                        onClick={() => toggleFavorite(product.id)}
                        className={`p-1.5 lg:p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 ${favorites.has(product.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white/80 text-gray-600 hover:bg-red-50 hover:text-red-500'
                            }`}
                    >
                        <Heart className={`w-3 h-3 lg:w-4 lg:h-4 ${favorites.has(product.id) ? 'fill-current' : ''}`} />
                    </button>
                    < button className="p-1.5 lg:p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 hover:scale-110" >
                        <Eye className="w-3 h-3 lg:w-4 lg:h-4" />
                    </button>
                </div>
            </div>

            {/* Content - Responsive */}
            <div className="p-3 lg:p-4" >
                {/* Category and Rating - Responsive */}
                < div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2" >
                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full font-medium w-fit" >
                        {product.category}
                    </span>
                    < div className="flex items-center gap-1" >
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-600" > {product.rating} </span>
                        < span className="text-xs text-gray-400" > ({product.reviews}) </span>
                    </div>
                </div>

                {/* Title */}
                <Link href={`/marketplace/details/${product.id}`}>
                    <h3 className="font-semibold text-sm lg:text-base text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 min-h-[2.5rem] lg:min-h-[3rem]" >
                        {product.name}
                    </h3>
                </Link>

                {/* Description - Hidden on very small screens */}
                <p className="text-sm text-gray-600 mb-3 line-clamp-2 max-w-xs sm:max-w-md lg:max-w-lg" >
                    {product.shortDescription}
                </p>
                {/* Price Section - Responsive */}
                <div className="flex items-center justify-between mb-3" >
                    <div className="flex flex-col" >
                        <div className="flex items-center gap-2" >
                            <span className="text-xs text-gray-500 hidden lg:inline" > À partir de </span>
                        </div>
                        < div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-2" >
                            <span className="text-base lg:text-lg font-bold text-blue-600" > {formatPrice(product.price)} </span>
                            {
                                product.oldPrice !== null && product.oldPrice !== undefined && product.oldPrice > 0 ? (
                                    <span className="text-xs lg:text-sm text-gray-400 line-through" >
                                        {formatPrice(product.oldPrice)}
                                    </span>
                                ) : null
                            }
                        </div>
                    </div>
                </div>

                {/* Footer - Brand and Cart Button - Responsive */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2" >
                    <span className="text-xs text-gray-500 truncate" > Marque : {product.brand} </span>
                    < button
                        onClick={() => toggleCart(product.id)}
                        disabled={!product.inStock}
                        className={`flex items-center justify-center gap-1 lg:gap-2 px-3 lg:px-4 py-2 rounded-lg lg:rounded-xl font-medium text-sm transition-all duration-300 hover:scale-105 w-full sm:w-auto ${cart.has(product.id)
                            ? 'bg-red-500 text-white'
                            : product.inStock
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        <ShoppingCart className="w-3 h-3 lg:w-4 lg:h-4" />
                        <span className="text-xs lg:text-sm" >
                            {cart.has(product.id) ? 'Retirer' : product.inStock ? 'Ajouter' : 'Indisponible'}
                        </span>
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white" >
            {/* Carousel Header - Responsive */}
            < div className="relative h-64 sm:h-80 lg:h-96 xl:h-[500px] overflow-hidden bg-gray-900" >
                {/* Slides */}
                < div className="relative w-full h-full" >
                    {
                        carouselSlides.map((slide, index) => (
                            <div
                                key={slide.id}
                                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide
                                    ? 'opacity-100 scale-100'
                                    : 'opacity-0 scale-105'
                                    }`}
                            >
                                {/* Background Image */}
                                < div className="absolute inset-0" >
                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-80`} />
                                </div>

                                {/* Content - Responsive */}
                                <div className="relative z-10 h-full flex items-center" >
                                    <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full" >
                                        <div className="max-w-2xl text-white" >
                                            <div className="mb-4 animate-fade-in-up" >
                                                <span className="inline-block px-3 py-1 lg:px-4 lg:py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs lg:text-sm font-medium mb-4" >
                                                    {slide.subtitle}
                                                </span>
                                            </div>
                                            < h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-6xl font-bold mb-4 lg:mb-6 animate-fade-in-up animation-delay-200" >
                                                {slide.title}
                                            </h1>
                                            < p className="text-sm sm:text-base lg:text-lg xl:text-xl mb-6 lg:mb-8 text-white/90 animate-fade-in-up animation-delay-400" >
                                                {slide.description}
                                            </p>
                                            {/* < button
                                                onClick={() => setSelectedCategory(index === 0 ? 'btp' : index === 1 ? 'quincaillerie' : index === 2 ? 'informatique' : 'commerce')}
                                                className="group inline-flex items-center gap-2 lg:gap-3 px-4 py-2 lg:px-8 lg:py-4 bg-white text-gray-900 rounded-xl lg:rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 animate-fade-in-up animation-delay-600 text-sm lg:text-base"
                                            >
                                                {slide.cta}
                                                < Play className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                            </button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                {/* Navigation Arrows - Responsive */}
                <button
                    onClick={prevSlide}
                    className="absolute left-2 lg:left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 lg:p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
                >
                    <ChevronLeft className="w-4 h-4 lg:w-6 lg:h-6" />
                </button>
                < button
                    onClick={nextSlide}
                    className="absolute right-2 lg:right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 lg:p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
                >
                    <ChevronRight className="w-4 h-4 lg:w-6 lg:h-6" />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 lg:bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2 lg:space-x-3" >
                    {
                        carouselSlides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${index === currentSlide
                                    ? 'bg-white scale-125'
                                    : 'bg-white/50 hover:bg-white/75'
                                    }`}
                            />
                        ))}
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 lg:h-1 bg-white/20" >
                    <div
                        className="h-full bg-white transition-all duration-300 ease-linear"
                        style={{ width: `${((currentSlide + 1) / carouselSlides.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Fixed Search Bar - Responsive */}
            <div className={
                `sticky top-0 z-50 transition-all duration-500 ${isSearchFixed
                    ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b'
                    : 'bg-transparent'
                }`
            }>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 lg:py-4" >
                    <div className="flex items-center justify-between gap-2 lg:gap-4" >
                        <div className={
                            `transition-all duration-500 hidden lg:block ${isSearchFixed ? 'opacity-100' : 'opacity-0 pointer-events-none'
                            }`
                        }>
                            <h2 className="text-xl font-bold text-gray-900" > Marketplace </h2>
                        </div>

                        < div className="flex items-center gap-2 lg:gap-3 flex-1 lg:flex-none" >
                            <div className="relative flex-1 lg:w-96 lg:flex-none" >
                                <Search className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 lg:w-5 lg:h-5" />
                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className={`w-full pl-10 lg:pl-12 pr-3 lg:pr-4 py-2 lg:py-3 border rounded-lg lg:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm lg:text-base ${isSearchFixed
                                        ? 'bg-white border-gray-200 shadow-sm'
                                        : 'bg-white/90 backdrop-blur-sm border-white/50'
                                        }`}
                                />
                            </div>

                            {/* Cart Icon - Responsive */}
                            <div className="relative" >
                                <button
                                    className={
                                        `relative p-2 lg:p-3 rounded-lg lg:rounded-xl transition-all duration-300 hover:scale-110 group cart-pulse ${isSearchFixed
                                            ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700'
                                            : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white border border-white/50'
                                        }`
                                    }
                                    onClick={() => router.push('/cart')}
                                >
                                    <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6" />

                                    {/* Cart Badge */}
                                    {
                                        cartCount > 0 && (
                                            <div className={
                                                `absolute -top-1 -right-1 lg:-top-2 lg:-right-2 min-w-[18px] lg:min-w-[20px] h-4 lg:h-5 rounded-full flex items-center justify-center text-xs font-bold animate-bounce ${isSearchFixed
                                                    ? 'bg-orange-500 text-white'
                                                    : 'bg-red-500 text-white'
                                                }`
                                            }>
                                                {cartCount}
                                            </div>
                                        )
                                    }

                                    {/* Pulse Animation when items added */}
                                    {
                                        cartCount > 0 && (
                                            <div className={
                                                `absolute inset-0 rounded-lg lg:rounded-xl animate-ping ${isSearchFixed
                                                    ? 'bg-blue-600'
                                                    : 'bg-white'
                                                } opacity-20`
                                            } />
                                        )
                                    }
                                </button>

                                {/* Cart Tooltip - Responsive */}
                                <div className="absolute top-full mt-2 right-0 bg-gray-900 text-white text-xs lg:text-sm px-2 lg:px-3 py-1 lg:py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50" >
                                    {cartCount === 0 ? 'Panier vide' : `${cartCount} article${cartCount > 1 ? 's' : ''}`}
                                    <div className="absolute -top-1 right-3 lg:right-4 w-2 h-2 bg-gray-900 rotate-45" />
                                </div>
                            </div>
                        </div>

                        < div className={`transition-all duration-500 hidden lg:block ${isSearchFixed ? 'opacity-100' : 'opacity-0 pointer-events-none'
                            }`}>
                            <div className="flex items-center gap-2" >
                                <span className="text-sm text-gray-600" >
                                    {filteredProducts.length} produits
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header Info - Responsive */}
            <div className="bg-white shadow-sm border-b" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 lg:py-6" >
                    <div className="text-center" >
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2" >
                            Marketplace Multi - Services
                        </h1>
                        < p className="text-sm lg:text-base text-gray-600 px-4" >
                            Découvrez notre sélection de produits BTP, quincaillerie, informatique et commerce général
                        </p>
                    </div>
                </div>
            </div>

            < div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8" >
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8" >
                    {/* Sidebar Filters - Responsive */}
                    < div className="lg:w-80" >
                        <div className="sticky top-8" >
                            {/* Mobile Filter Toggle */}
                            < button
                                onClick={() => setShowFilters(!showFilters)}
                                className="lg:hidden w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border mb-4"
                            >
                                <span className="font-semibold flex items-center gap-2" >
                                    <Filter className="w-5 h-5" />
                                    Filtres
                                </span>
                                < ChevronDown className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                            </button>

                            < div className={`${showFilters ? 'block' : 'hidden'} lg:block space-y-4 lg:space-y-6`}>
                                {/* Categories - Responsive */}
                                < div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-sm border" >
                                    <h3 className="font-semibold text-gray-900 mb-4" > Catégories </h3>
                                    < div className="space-y-2" >
                                        {
                                            categories.map((category) => {
                                                const Icon = category.icon;
                                                return (
                                                    <button
                                                        key={category.id}
                                                        onClick={() => setSelectedCategory(category.id)
                                                        }
                                                        className={`w-full flex items-center justify-between p-2 lg:p-3 rounded-lg lg:rounded-xl transition-all duration-300 hover:scale-105 text-sm lg:text-base ${selectedCategory === category.id
                                                            ? 'bg-blue-600 text-white shadow-lg'
                                                            : 'bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-2 lg:gap-3" >
                                                            <Icon className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                                                            <span className="font-medium truncate" > {category.name} </span>
                                                        </div>
                                                        < span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${selectedCategory === category.id ? 'bg-white/20' : 'bg-gray-200'
                                                            }`}>
                                                            {category.count}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                    </div>
                                </div>

                                {/* Price Range - Responsive */}
                                <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-sm border" >
                                    <h3 className="font-semibold text-gray-900 mb-4" > Gamme de prix </h3>
                                    < div className="space-y-4" >
                                        <div className="flex items-center justify-between text-xs lg:text-sm text-gray-600" >
                                            <span>{formatPrice(priceRange[0])} </span>
                                            < span > {formatPrice(priceRange[1])} </span>
                                        </div>
                                        < input
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
                    <div className="flex-1" >
                        {/* Toolbar - Responsive */}
                        < div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8" >
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 lg:gap-4" >
                                <span className="text-sm lg:text-base text-gray-600" >
                                    {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''} trouvé{filteredProducts.length !== 1 ? 's' : ''}
                                </span>
                                {
                                    searchTerm && (
                                        <span className="text-xs lg:text-sm text-blue-600 bg-blue-50 px-2 lg:px-3 py-1 rounded-full w-fit" >
                                            Recherche: "{searchTerm}"
                                        </span>
                                    )
                                }
                            </div>

                            < div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4" >
                                {/* Sort Dropdown - Responsive */}
                                < select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-3 lg:px-4 py-2 border border-gray-200 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm lg:text-base"
                                >
                                    <option value="vedette" > Produits vedettes </option>
                                    < option value="price-low" > Prix croissant </option>
                                    < option value="price-high" > Prix décroissant </option>
                                    < option value="rating" > Mieux notés </option>
                                </select>

                                {/* View Mode Toggle - Responsive */}
                                <div className="flex items-center bg-gray-100 rounded-lg lg:rounded-xl p-1" >
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-1.5 lg:p-2 rounded-md lg:rounded-lg transition-all duration-300 ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        <Grid className="w-4 h-4 lg:w-5 lg:h-5" />
                                    </button>
                                    < button
                                        onClick={() => setViewMode('list')}
                                        className={`p-1.5 lg:p-2 rounded-md lg:rounded-lg transition-all duration-300 ${viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        <List className="w-4 h-4 lg:w-5 lg:h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid - Responsive */}
                        {
                            isLoading ? (
                                <div className="flex flex-col justify-center items-center h-64 space-y-4" >
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" > </div>
                                    < span className="text-sm lg:text-base text-gray-600" > Chargement des produits...</span>
                                </div>
                            ) :
                                filteredProducts.length > 0 ? (
                                    <div className={`grid gap-4 lg:gap-6 ${viewMode === 'grid'
                                        ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                                        : 'grid-cols-1'
                                        }`}>
                                        {
                                            paginatedProducts.map((product) => (
                                                <ProductCard key={product.id} product={product} />
                                            ))
                                        }
                                    </div>
                                ) : (
                                    <div className="text-center py-12 lg:py-16" >
                                        <div className="w-20 h-20 lg:w-24 lg:h-24 mx-auto mb-4 lg:mb-6 bg-gray-100 rounded-full flex items-center justify-center" >
                                            <Package className="w-10 h-10 lg:w-12 lg:h-12 text-gray-400" />
                                        </div>
                                        < h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2" > Aucun produit trouvé </h3>
                                        < p className="text-sm lg:text-base text-gray-600 mb-4 lg:mb-6 px-4" >
                                            Essayez de modifier vos critères de recherche ou de filtrage
                                        </p>
                                        < button
                                            onClick={() => {
                                                setSearchTerm('');
                                                setSelectedCategory('all');
                                                setPriceRange([0, 500000]);
                                            }}
                                            className="px-4 lg:px-6 py-2 lg:py-3 bg-blue-600 text-white rounded-lg lg:rounded-xl hover:bg-blue-700 transition-colors duration-300 text-sm lg:text-base"
                                        >
                                            Réinitialiser les filtres
                                        </button>
                                    </div>
                                )
                        }

                        {/* Pagination - Responsive */}
                        {
                            totalPages > 1 && (
                                <div className="flex flex-wrap justify-center mt-8 lg:mt-10 gap-2" >
                                    <button
                                        onClick={handlePrevPage}
                                        disabled={currentPage === 1
                                        }
                                        className="px-3 lg:px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-sm lg:text-base"
                                    >
                                        Précédent
                                    </button>

                                    {/* Page Numbers - Responsive display */}
                                    {
                                        [...Array(Math.min(totalPages, 5))].map((_, i) => {
                                            let pageNum;
                                            if (totalPages <= 5) {
                                                pageNum = i + 1;
                                            } else if (currentPage <= 3) {
                                                pageNum = i + 1;
                                            } else if (currentPage >= totalPages - 2) {
                                                pageNum = totalPages - 4 + i;
                                            } else {
                                                pageNum = currentPage - 2 + i;
                                            }

                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => handlePageClick(pageNum)
                                                    }
                                                    className={`px-3 lg:px-4 py-2 rounded-lg text-sm lg:text-base ${currentPage === pageNum
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-100 hover:bg-gray-200'
                                                        }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}

                                    <button
                                        onClick={handleNextPage}
                                        disabled={currentPage === totalPages}
                                        className="px-3 lg:px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-sm lg:text-base"
                                    >
                                        Suivant
                                    </button>
                                </div>
                            )}
                    </div>
                </div>
            </div>

            < style jsx > {`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
        }
        
        @media (min-width: 1024px) {
          .slider::-webkit-slider-thumb {
            height: 20px;
            width: 20px;
          }
        }
        
        .slider::-moz-range-thumb {
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
        }

        @media (min-width: 1024px) {
          .slider::-moz-range-thumb {
            height: 20px;
            width: 20px;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (min-width: 1024px) {
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

        /* Responsive scrollbar */
        ::-webkit-scrollbar {
          width: 4px;
        }

        @media (min-width: 1024px) {
          ::-webkit-scrollbar {
            width: 8px;
          }
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
        </div>
    );
};

export default MarketplacePage; 