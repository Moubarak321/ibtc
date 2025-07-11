"use client";
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Plus, Search, Edit, Trash2, Eye, Package, ShoppingCart, TrendingUp, Users, Star, Filter, Calendar, Download } from 'lucide-react';

import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { app } from '@/lib/firebase/client-config';

import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [products, setProducts] = useState<any[]>([]);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const [orders, setOrders] = useState([
        { id: 1001, customer: 'Marie Dubois', total: 2748, status: 'Livré', date: '2024-06-25', items: 2 },
        { id: 1002, customer: 'Jean Martin', total: 1448, status: 'En cours', date: '2024-06-26', items: 3 },
        { id: 1003, customer: 'Sophie Leroux', total: 599, status: 'Expédié', date: '2024-06-27', items: 1 },
        { id: 1004, customer: 'Pierre Moreau', total: 849, status: 'Confirmé', date: '2024-06-28', items: 2 },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    type Product = {
        id: string; // Firestore uses string IDs
        name: string;
        price: number;
        stock: number;
        category: string;
        status: string;
        image: string;
    };
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showProductModal, setShowProductModal] = useState(false);
    const [animateStats, setAnimateStats] = useState(false);

    // Données pour les graphiques
    const salesData = [
        { month: 'Jan', sales: 4000, orders: 240 },
        { month: 'Fév', sales: 3000, orders: 180 },
        { month: 'Mar', sales: 5000, orders: 300 },
        { month: 'Avr', sales: 4500, orders: 270 },
        { month: 'Mai', sales: 6000, orders: 360 },
        { month: 'Jun', sales: 7500, orders: 450 },
    ];

    const categoryData = [
        { name: 'Électronique', value: 45, color: '#3B82F6' },
        { name: 'Téléphone', value: 30, color: '#10B981' },
        { name: 'Audio', value: 15, color: '#F59E0B' },
        { name: 'Tablette', value: 10, color: '#EF4444' },
    ];


    const [productFormData, setProductFormData] = useState({
        name: "",
        id: "",
        price: 0,
        oldPrice: 0,
        discount: 0,
        category: "",
        brand: "",
        images: [""],
        shortDescription: "",
        longDescription: "",
        specifications: [{ key: "", value: "" }],
        features: [""],
        inStock: true,
        fastDelivery: true,
        services: {
          delivery: { title: "", description: "" },
          warranty: { title: "", description: "" },
        },
      });

      

    useEffect(() => {
        setAnimateStats(true);
    }, []);




    // ==========================================================================================================================================================
    // back
    //   Auth
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const auth = getAuth(app);

    // recupérer les produits depuis Firestore
    useEffect(() => {
        const fetchProducts = async () => {
            const db = getFirestore(app);
            const snapshot = await getDocs(collection(db, "products"));
            const productList = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    name: data.name || '',
                    price: data.price || 0,
                    stock: data.stock || 0,
                    category: data.category || '',
                    status: data.status || '',
                    image: (Array.isArray(data.images) && data.images.length > 0) ? data.images : '📦', // fallback emoji
                } as Product;
            });
            setProducts(productList);
        };

        fetchProducts();
    }, []);
    // Vérification de l'authentification
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Utilisateur connecté
                setUser(user);
                setLoading(false);
            } else {
                // Utilisateur non connecté, redirection
                router.push('/login');
            }
        });

        return () => unsubscribe();
    }, [auth, router]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/login');
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }
    };

    // Afficher un loader pendant la vérification de l'authentification
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-600">Vérification de l'authentification...</p>
                </div>
            </div>
        );
    }

    // Si l'utilisateur n'est pas connecté (mais loading est false), ne rien afficher
    if (!user) {
        return null;
    }


    // Ajout de produit
    const handleSaveProduct = async () => {
        console.log("Enregistrement du produit...");
        const db = getFirestore(app);
        const form = document.getElementById("productForm");
        console.log("Formulaire trouvé :", form);
        if (!form) {
            alert("❌ Formulaire non trouvé.");
            return;
        }

        try {
            const getValue = (selector: string) =>
                (form.querySelector(selector) as HTMLInputElement | HTMLTextAreaElement)?.value.trim();

            const product = {
                name: getValue('input[placeholder="Nom"]'),
                id: getValue('input[placeholder="ID (ex: bosch-gsb-13-re)"]'),
                price: parseFloat(getValue('input[placeholder="0.00"]') || "0"),
                oldPrice: parseFloat(((form.querySelectorAll('input[placeholder="0.00"]')[1] as HTMLInputElement)?.value) || "0"),
                discount: parseInt(getValue('input[placeholder="25"]') || "0"),
                category: getValue('input[placeholder="Ex: Outillage > Perceuses"]'),
                brand: getValue('input[placeholder="Bosch"]'),
                images: JSON.parse(getValue('textarea[placeholder*="https://image1.jpg"]') || "[]"),
                shortDescription: getValue('textarea[placeholder*="Petite description"]'),
                longDescription: getValue('textarea[placeholder*="Texte plus détaillé"]'),
                specifications: JSON.parse(getValue('textarea[placeholder*="Puissance"]') || "{}"),
                features: JSON.parse(getValue('textarea[placeholder*="Fonction percussion"]') || "[]"),
                inStock: (form.querySelectorAll('select')[0] as HTMLSelectElement)?.value === "true",
                fastDelivery: (form.querySelectorAll('select')[1] as HTMLSelectElement)?.value === "true",
                services: JSON.parse(getValue('textarea[placeholder*="Livraison gratuite"]') || "{}"),
                createdAt: new Date()
            };

            console.log("Produit à ajouter :", product.name);

            if (!product.name || product.images.length === 0) {
                alert("⚠️ Veuillez remplir le nom et au moins une image.");
                return;
            }

            await addDoc(collection(db, "products"), product);
            console.log("Produit ajouté :", product.name);
            alert("✅ Produit ajouté avec succès !");
            setShowProductModal(false);

        } catch (error) {
            console.error("Erreur lors de l'ajout :", error);
            alert("❌ Une erreur est survenue. Vérifiez les champs JSON.");
        }
    };


    // préremplir le form
    const prefillForm = () => {
        const form = document.querySelector("#productForm");
        if (!form) return;

        // Champs de base
        (form.querySelector('input[placeholder="Nom"]') as HTMLInputElement)!.value = "Perceuse à percussion Bosch GSB 13 RE Professional";
        (form.querySelector('input[placeholder="ID (ex: bosch-gsb-13-re)"]') as HTMLInputElement)!.value = "bosch-gsb-13-re";

        const priceInputs = form.querySelectorAll('input[placeholder="0.00"]') as NodeListOf<HTMLInputElement>;
        priceInputs[0]!.value = "129.99"; // prix
        priceInputs[1]!.value = "159.99"; // ancien prix

        (form.querySelector('input[placeholder="25"]') as HTMLInputElement)!.value = "19";
        (form.querySelector('input[placeholder="Ex: Outillage > Perceuses"]') as HTMLInputElement)!.value = "Outillage > Perceuses";
        (form.querySelector('input[placeholder="Bosch"]') as HTMLInputElement)!.value = "Bosch";

        // Textareas
        (form.querySelector('textarea[placeholder*="https://image1.jpg"]') as HTMLTextAreaElement)!.value = JSON.stringify([
            "https://example.com/images/perceuse1.jpg",
            "https://example.com/images/perceuse2.jpg"
        ]);

        (form.querySelector('textarea[placeholder*="Petite description"]') as HTMLTextAreaElement)!.value =
            "Compacte, puissante et idéale pour les travaux de perçage quotidiens.";

        (form.querySelector('textarea[placeholder*="Texte plus détaillé"]') as HTMLTextAreaElement)!.value =
            "La perceuse à percussion Bosch GSB 13 RE Professional est conçue pour les artisans exigeants. Dotée d’un moteur de 600W, elle assure un perçage efficace dans le bois, l’acier et la maçonnerie. Son design compact et ergonomique offre une prise en main optimale, même dans les espaces restreints.";

        (form.querySelector('textarea[placeholder*="Puissance"]') as HTMLTextAreaElement)!.value = JSON.stringify({
            "Puissance": "600W",
            "Vitesse": "2800 tr/min",
            "Capacité de perçage (béton)": "13 mm",
            "Poids": "1.8 kg"
        });

        (form.querySelector('textarea[placeholder*="Fonction percussion"]') as HTMLTextAreaElement)!.value = JSON.stringify([
            "Fonction percussion",
            "Poignée ergonomique",
            "Contrôle de vitesse",
            "Mandrin automatique"
        ]);

        // Sélecteurs
        form.querySelectorAll("select")[0]!.value = "true"; // En stock
        form.querySelectorAll("select")[1]!.value = "true"; // Livraison rapide

        (form.querySelector('textarea[placeholder*="Livraison gratuite"]') as HTMLTextAreaElement)!.value = JSON.stringify({
            delivery: {
                title: "Livraison gratuite",
                description: "Sous 48h dès 50€ d’achat"
            },
            warranty: {
                title: "Garantie 2 ans",
                description: "Prise en charge constructeur"
            }
        });
    };




    const filteredProducts = products.filter((product) =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );









    const handleDeleteProduct = (id: string) => {
        setProducts(products.filter(p => p.id !== id));
    };


    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Livré': return 'bg-green-100 text-green-800';
            case 'En cours': return 'bg-blue-100 text-blue-800';
            case 'Expédié': return 'bg-purple-100 text-purple-800';
            case 'Confirmé': return 'bg-yellow-100 text-yellow-800';
            case 'Actif': return 'bg-green-100 text-green-800';
            case 'Rupture': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    type StatCardProps = {
        title: string;
        value: string | number;
        icon: React.ElementType;
        color: string;
        change?: string | number;
    };

    const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, change }) => (
        <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${animateStats ? 'animate-fade-in' : ''}`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
                    <p className={`text-3xl font-bold ${color} transition-all duration-700 ${animateStats ? 'count-up' : ''}`}>
                        {value}
                    </p>
                    {change && (
                        <p className="text-sm text-green-600 mt-2 flex items-center">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            +{change}% ce mois
                        </p>
                    )}
                </div>
                <div className={`p-3 rounded-full bg-gradient-to-br ${color === 'text-blue-600' ? 'from-blue-100 to-blue-200' : color === 'text-green-600' ? 'from-green-100 to-green-200' : color === 'text-purple-600' ? 'from-purple-100 to-purple-200' : 'from-yellow-100 to-yellow-200'}`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                </div>
            </div>
        </div>
    );

    const ProductModal = () => (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div id="productForm" className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto  transform transition-all duration-300 scale-95 hover:scale-100 border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">
                        {selectedProduct ? '✏️ Modifier le produit' : '➕ Nouveau produit'}
                    </h3>
                    <button
                        onClick={() => setShowProductModal(false)}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <button
                        onClick={prefillForm}
                        className="mb-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-all"
                    >
                        🪄 Pré-remplir avec un exemple
                    </button>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Nom */}
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Nom du produit</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="Nom"
                            defaultValue={selectedProduct?.name || ''}
                        />
                    </div>

                    {/* ID produit */}
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">ID du produit</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="ID (ex: bosch-gsb-13-re)"
                        />
                    </div>

                    {/* Prix & Ancien prix */}
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Prix</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-gray-500">€</span>
                            <input
                                type="number"
                                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Ancien prix</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-gray-500">€</span>
                            <input
                                type="number"
                                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all line-through text-gray-500"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    {/* Remise */}
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Remise (%)</label>
                        <div className="relative">
                            <span className="absolute right-3 top-2.5 text-gray-500">%</span>
                            <input
                                type="number"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="25"
                            />
                        </div>
                    </div>

                    {/* Catégorie */}
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="Ex: Outillage > Perceuses"
                        />
                    </div>

                    {/* Marque */}
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Marque</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="Bosch"
                        />
                    </div>

                    {/* Images (JSON) */}
                    <div className="col-span-2 space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Images (URLs, tableau JSON)</label>
                        <textarea
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[80px] font-mono text-sm"
                            placeholder='["https://image1.jpg", "https://image2.jpg"]'
                        ></textarea>
                        <p className="text-xs text-gray-500 mt-1">Format JSON requis. Maximum 5 images.</p>
                    </div>

                    {/* Description courte */}
                    <div className="col-span-2 space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Description courte</label>
                        <textarea
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[80px]"
                            placeholder="Petite description visible sur la page principale"
                        ></textarea>
                        <p className="text-xs text-gray-500 mt-1">Maximum 150 caractères</p>
                    </div>

                    {/* Description longue */}
                    <div className="col-span-2 space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Description complète</label>
                        <textarea
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[100px]"
                            placeholder="Texte plus détaillé sur le produit"
                        ></textarea>
                    </div>

                    {/* Caractéristiques */}
                    <div className="col-span-2 space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Spécifications (objet JSON)</label>
                        <textarea
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[100px] font-mono text-sm"
                            placeholder='{"Puissance":"600W","Poids":"1.8kg"}'
                        ></textarea>
                    </div>

                    {/* Fonctionnalités */}
                    <div className="col-span-2 space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Fonctionnalités (tableau JSON)</label>
                        <textarea
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[80px] font-mono text-sm"
                            placeholder='["Fonction percussion", "Poignée ergonomique"]'
                        ></textarea>
                    </div>

                    {/* Stock & Livraison rapide */}
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">En stock</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white">
                            <option value="true">✅ En stock</option>
                            <option value="false">❌ Rupture</option>
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Livraison rapide</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white">
                            <option value="true">🚀 Disponible</option>
                            <option value="false">⏳ Standard</option>
                        </select>
                    </div>

                    {/* Services */}
                    <div className="col-span-2 space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Services (objet JSON)</label>
                        <textarea
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[100px] font-mono text-sm"
                            placeholder={`{
                                "delivery": {"title": "Livraison gratuite", "description": "Dès 50€"},
                                "warranty": {"title": "Garantie 2 ans", "description": "Constructeur"}
                                }`}
                        ></textarea>
                    </div>
                </div>

                {/* Boutons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                    <button
                        onClick={() => setShowProductModal(false)}
                        className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium text-gray-700 flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Annuler
                    </button>
                    <button
                        onClick={handleSaveProduct}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Sauvegarder
                    </button>
                </div>
            </div>
        </div>
    );
    const renderDashboard = () => (
        <div className="space-y-6 animate-fade-in">
            {/* Statistiques principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Ventes totales" value="€47,500" icon={TrendingUp} color="text-blue-600" change="12" />
                <StatCard title="Commandes" value="1,250" icon={ShoppingCart} color="text-green-600" change="8" />
                <StatCard title="Produits" value="145" icon={Package} color="text-purple-600" change="5" />
                <StatCard title="Clients" value="890" icon={Users} color="text-yellow-600" change="15" />
            </div>

            {/* Graphiques */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                        <BarChart className="w-5 h-5 mr-2 text-blue-600" />
                        Évolution des ventes
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" stroke="#666" />
                            <YAxis stroke="#666" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                                }}
                            />
                            <Bar dataKey="sales" fill="url(#blueGradient)" radius={[4, 4, 0, 0]} />
                            <defs>
                                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#3B82F6" />
                                    <stop offset="100%" stopColor="#1E40AF" />
                                </linearGradient>
                            </defs>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                        <PieChart className="w-5 h-5 mr-2 text-green-600" />
                        Répartition par catégorie
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                        {categoryData.map((item, index) => (
                            <div key={index} className="flex items-center">
                                <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: item.color }}></div>
                                <span className="text-sm text-gray-600">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Commandes récentes */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                    <ShoppingCart className="w-5 h-5 mr-2 text-purple-600" />
                    Commandes récentes
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left py-3 px-2 font-medium text-gray-600">Commande</th>
                                <th className="text-left py-3 px-2 font-medium text-gray-600">Client</th>
                                <th className="text-left py-3 px-2 font-medium text-gray-600">Total</th>
                                <th className="text-left py-3 px-2 font-medium text-gray-600">Statut</th>
                                <th className="text-left py-3 px-2 font-medium text-gray-600">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.slice(0, 4).map((order) => (
                                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors duration-200">
                                    <td className="py-3 px-2 font-medium">#{order.id}</td>
                                    <td className="py-3 px-2">{order.customer}</td>
                                    <td className="py-3 px-2 font-medium">€{order.total}</td>
                                    <td className="py-3 px-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-2 text-gray-600">{order.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderProducts = () => {
        const filteredProducts = products.filter((product: any) =>
            product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 className="text-2xl font-bold">Gestion des produits</h2>
                    <button
                        onClick={() => {
                            setSelectedProduct(null);
                            setShowProductModal(true);
                        }}
                        className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Nouveau produit
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Rechercher un produit..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        <Filter className="w-4 h-4 mr-2" />
                        Filtres
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left py-4 px-6 font-medium text-gray-600">Produit</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-600">Prix</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-600">Stock</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-600">Catégorie</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product: any) => (
                                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center">
                                                <div
                                                    className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 mr-3 flex items-center justify-center cursor-pointer group"
                                                    onClick={() => setPreviewImage(product.image?.[0] || '')}
                                                >
                                                    <img
                                                        src={product.image?.[0] || '/placeholder.png'}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-125"
                                                    />
                                                </div>

                                                <span className="font-medium">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 font-medium">€{product.price}</td>
                                        <td className="py-4 px-6">
                                            <span className={`font-medium ${product.stock && product.stock < 10 ? 'text-red-600' : 'text-green-600'}`}>
                                                {product.stock ?? '—'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">{product.category || '—'}</td>
                                        <td className="py-4 px-6">
                                            <div className="flex gap-2">
                                                <button className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors duration-200">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSelectedProduct(product);
                                                        setShowProductModal(true);
                                                    }}
                                                    className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors duration-200"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProduct(product.id)}
                                                    className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors duration-200"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredProducts.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="text-center text-gray-500 py-10">
                                            Aucun produit trouvé.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {previewImage && (
                    <div
                        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center"
                        onClick={() => setPreviewImage(null)}
                    >
                        <img
                            src={previewImage}
                            alt="Aperçu"
                            className="max-w-[90vw] max-h-[90vh] rounded-xl shadow-xl border-4 border-white"
                        />
                    </div>
                )}

            </div>
        );
    };



    const renderOrders = () => (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold">Gestion des commandes</h2>
                <div className="flex gap-2">
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        <Calendar className="w-4 h-4 mr-2" />
                        Aujourd'hui
                    </button>
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        <Download className="w-4 h-4 mr-2" />
                        Exporter
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total commandes</p>
                            <p className="text-2xl font-bold text-blue-600">247</p>
                        </div>
                        <ShoppingCart className="w-8 h-8 text-blue-600" />
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">En attente</p>
                            <p className="text-2xl font-bold text-yellow-600">12</p>
                        </div>
                        <Package className="w-8 h-8 text-yellow-600" />
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Expédiées</p>
                            <p className="text-2xl font-bold text-purple-600">89</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-purple-600" />
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Livrées</p>
                            <p className="text-2xl font-bold text-green-600">146</p>
                        </div>
                        <Star className="w-8 h-8 text-green-600" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Rechercher une commande..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>
                        <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                            <Filter className="w-4 h-4 mr-2" />
                            Filtres
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left py-4 px-6 font-medium text-gray-600">Commande</th>
                                <th className="text-left py-4 px-6 font-medium text-gray-600">Client</th>
                                <th className="text-left py-4 px-6 font-medium text-gray-600">Articles</th>
                                <th className="text-left py-4 px-6 font-medium text-gray-600">Total</th>
                                <th className="text-left py-4 px-6 font-medium text-gray-600">Statut</th>
                                <th className="text-left py-4 px-6 font-medium text-gray-600">Date</th>
                                <th className="text-left py-4 px-6 font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                                    <td className="py-4 px-6 font-medium">#{order.id}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mr-3 text-sm font-medium">
                                                {order.customer.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            {order.customer}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">{order.items} articles</td>
                                    <td className="py-4 px-6 font-bold">€{order.total}</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-gray-600">{order.date}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex gap-2">
                                            <button className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors duration-200">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors duration-200">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen mt-12 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
            {/* Sidebar */}
            <div className="fixed mt-12 left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-lg z-40">
                <div className="p-6">
                    <div className="flex items-center mb-8">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                            <Package className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            AdminPro
                        </h1>
                    </div>

                    <nav className="space-y-2">
                        {[
                            { id: 'dashboard', label: 'Tableau de bord', icon: TrendingUp },
                            { id: 'products', label: 'Produits', icon: Package },
                            { id: 'orders', label: 'Commandes', icon: ShoppingCart },
                            { id: 'customers', label: 'Clients', icon: Users },
                        ].map(({ id, label, icon: Icon }) => (
                            <button
                                key={id}
                                onClick={() => setActiveTab(id)}
                                className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-200 ${activeTab === id
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                            >
                                <Icon className="w-5 h-5 mr-3" />
                                {label}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="ml-64 p-8">
                <div className="max-w-7xl mx-auto">
                    {activeTab === 'dashboard' && renderDashboard()}
                    {activeTab === 'products' && renderProducts()}
                    {activeTab === 'orders' && renderOrders()}
                    {activeTab === 'customers' && (
                        <div className="text-center py-12">
                            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-medium text-gray-600 mb-2">Section Clients</h3>
                            <p className="text-gray-500">Cette section sera bientôt disponible</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {showProductModal && <ProductModal />}

            {/* Styles personnalisés */}
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

        @keyframes count-up {
          from {
            transform: scale(0.8);
          }
          to {
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .count-up {
          animation: count-up 0.3s ease-out;
        }

        /* Scrollbar personnalisée */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #3B82F6, #8B5CF6);
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #2563EB, #7C3AED);
        }

        /* Effet de survol sur les cartes */
        .hover\:shadow-lg:hover {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        /* Animation des boutons */
        .transform:hover {
          transition: all 0.2s ease-in-out;
        }

        /* Gradient de fond animé */
        .bg-gradient-to-br {
          background-size: 200% 200%;
          animation: gradient-shift 15s ease infinite;
        }

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* Effet de pulsation pour les notifications */
        .pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .5;
          }
        }

        /* Effet de rebond pour les éléments interactifs */
        .bounce-in {
          animation: bounce-in 0.6s ease-out;
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        /* Transitions fluides pour tous les éléments */
        * {
          transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 150ms;
        }

        /* Effet de survol sur les lignes de tableau */
        tr:hover {
          transform: translateX(2px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        /* Style pour les graphiques */
        .recharts-wrapper {
          filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
        }

        /* Animation pour les icônes */
        .icon-hover:hover {
          transform: rotate(5deg) scale(1.1);
        }

        /* Effet de glassmorphism pour les modales */
        .glass-effect {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* Responsive design amélioré */
        @media (max-width: 768px) {
          .ml-64 {
            margin-left: 0;
          }
          
          .fixed.left-0 {
            transform: translateX(-100%);
            transition: transform 0.3s ease-in-out;
          }
          
          .fixed.left-0.show {
            transform: translateX(0);
          }
        }

        /* Effet de chargement pour les données */
        .loading-shimmer {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
        </div>
    );
};

export default AdminDashboard;