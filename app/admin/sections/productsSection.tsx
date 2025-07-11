"use client";
import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Filter, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { app } from '@/lib/firebase/client-config';
import ProductModal from '../components/productModal';
import Link from 'next/link';

interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    category: string;
    status: string;
    images: string[];
    oldPrice?: number;
    discount?: number;
    brand?: string;
    shortDescription?: string;
    longDescription?: string;
    specifications?: Record<string, string>;
    features?: string[];
    inStock?: boolean;
    vedette?: boolean;
    fastDelivery?: boolean;
    services?: {
        delivery: {
            title: string;
            description: string;
        };
        warranty: {
            title: string;
            description: string;
        };
    };
    createdAt?: Date;
    updatedAt?: Date;
}

const ProductsSection = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showProductModal, setShowProductModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10); // Nombre d'éléments par page


    


    // Chargement initial des produits depuis Firestore
    useEffect(() => {
        const db = getFirestore(app);
        const productsCollection = collection(db, 'products');

        // Abonnement aux mises à jour en temps réel
        const unsubscribe = onSnapshot(productsCollection, (snapshot) => {
            try {
                const productList = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        name: data.name || '',
                        price: data.price || 0,
                        stock: data.stock || 0,
                        category: data.category || '',
                        status: data.status || 'Actif',
                        images: Array.isArray(data.images) ? data.images : ['📦'],
                        oldPrice: data.oldPrice || '',
                        discount: data.discount || 0,
                        brand: data.brand || '',
                        shortDescription: data.shortDescription || '',
                        longDescription: data.longDescription || '',
                        specifications: data.specifications || {},
                        features: data.features || [],
                        inStock: data.inStock ?? true,
                        vedette: data.vedette ?? false,
                        fastDelivery: data.fastDelivery ?? false,
                        services: data.services || {
                            delivery: { title: '', description: '' },
                            warranty: { title: '', description: '' }
                        },
                        createdAt: data.createdAt?.toDate() || new Date(),
                        updatedAt: data.updatedAt?.toDate() || new Date()
                    };
                });
                setProducts(productList);
                setIsLoading(false);
            } catch (error) {
                console.error("Erreur lors du chargement des produits:", error);
                setIsLoading(false);
            }
        });

        // Nettoyage de l'abonnement
        return () => unsubscribe();
    }, []);

    const handleSaveProduct = async (productData: {
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
    }) => {
        const db = getFirestore(app);
        setIsLoading(true);

        try {
            // Validation renforcée
            if (!productData.name.trim()) {
                throw new Error("Le nom du produit est obligatoire");
            }

            if (!productData.id.trim()) {
                throw new Error("L'ID du produit est obligatoire");
            }

            const validImages = productData.images.filter(img => img.trim() !== '');
            if (validImages.length === 0) {
                throw new Error("Au moins une image valide est requise");
            }

            if (isNaN(productData.price)) {
                throw new Error("Le prix doit être un nombre valide");
            }

            // Préparation des données pour Firestore
            const productToSave = {
                name: productData.name.trim(),
                id: productData.id.trim(),
                price: Number(productData.price),
                oldPrice: productData.oldPrice ? Number(productData.oldPrice) : '',
                discount: productData.discount ? Number(productData.discount) : 0,
                category: productData.category.trim(),
                brand: productData.brand?.trim() || '',
                images: validImages,
                shortDescription: productData.shortDescription?.trim() || '',
                longDescription: productData.longDescription?.trim() || '',
                specifications: Object.fromEntries(
                    Object.entries(productData.specifications)
                        .filter(([key, value]) => key.trim() && value.trim())
                ),
                features: productData.features.filter(f => f.trim() !== ''),
                inStock: Boolean(productData.inStock),
                vedette: Boolean(productData.vedette),
                fastDelivery: Boolean(productData.fastDelivery),
                services: {
                    delivery: {
                        title: productData.services.delivery.title.trim(),
                        description: productData.services.delivery.description.trim()
                    },
                    warranty: {
                        title: productData.services.warranty.title.trim(),
                        description: productData.services.warranty.description.trim()
                    }
                },
                updatedAt: new Date(),
                ...(!selectedProduct && { createdAt: new Date() })
            };

            // Opération Firestore
            if (selectedProduct) {
                await updateDoc(doc(db, "products", selectedProduct.id), productToSave);
                alert("✅ Produit mis à jour avec succès !");
            } else {
                await addDoc(collection(db, "products"), productToSave);
                alert("✅ Produit ajouté avec succès !");
            }

            setShowProductModal(false);
        } catch (error) {
            console.error("Erreur lors de la sauvegarde:", error);
            alert(`❌ ${error instanceof Error ? error.message : "Une erreur est survenue lors de la sauvegarde"}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteProduct = async (id: string) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) return;

        setIsLoading(true);
        try {
            const db = getFirestore(app);
            await deleteDoc(doc(db, "products", id));
            alert("✅ Produit supprimé avec succès !");
        } catch (error) {
            console.error("Erreur lors de la suppression:", error);
            alert("❌ Une erreur est survenue lors de la suppression");
        } finally {
            setIsLoading(false);
        }
    };

    const filteredProducts = products.filter((product) =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Actif': return 'bg-green-100 text-green-800';
            case 'Rupture': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };


    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
    const firstPage = () => setCurrentPage(1);
    const lastPage = () => setCurrentPage(totalPages);

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
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                        <>
                            <Plus className="w-4 h-4 mr-2" />
                            Nouveau produit
                        </>
                    )}
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
                        disabled={isLoading}
                    />
                </div>
                <button
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    disabled={isLoading}
                >
                    <Filter className="w-4 h-4 mr-2" />
                    Filtres
                </button>
            </div>

            {isLoading && products.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left py-4 px-6 font-medium text-gray-600">Produit</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-600">Prix</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-600">Stock</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-600">Vedette</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-600">Catégorie</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-600">Statut</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentProducts.map((product) => (
                                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center">
                                                <div
                                                    className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 mr-3 flex items-center justify-center cursor-pointer group"
                                                    onClick={() => setPreviewImage(product.images?.[0] || '')}
                                                >
                                                    {product.images[0].startsWith('http') ? (
                                                        <img
                                                            src={product.images[0]}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-125"
                                                        />
                                                    ) : (
                                                        <span className="text-2xl">{product.images[0]}</span>
                                                    )}
                                                </div>
                                                <span className="font-medium">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 font-medium">€{product.price.toFixed(2)}</td>
                                        <td className="py-4 px-6">
                                            <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                                                {product.inStock ? 'Oui' : 'Non'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`font-medium ${product.vedette ? 'text-green-600' : 'text-red-600'}`}>
                                                {product.vedette ? 'Oui' : 'Non'}
                                            </span>
                                        </td>

                                        <td className="py-4 px-6">{product.category || '—'}</td>
                                        <td className="py-4 px-6">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                                                {product.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex gap-2">
                                                <Link href={`/marketplace/details/${product.id}`}>
                                                    <button
                                                        className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors duration-200"
                                                        disabled={isLoading}
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        setSelectedProduct(product);
                                                        setShowProductModal(true);
                                                    }}
                                                    className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors duration-200"
                                                    disabled={isLoading}
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProduct(product.id)}
                                                    className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors duration-200"
                                                    disabled={isLoading}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredProducts.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="text-center text-gray-500 py-10">
                                            {products.length === 0 ?
                                                "Aucun produit disponible" :
                                                "Aucun produit ne correspond à votre recherche"}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {filteredProducts.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 px-4 py-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">
                Affichage de {indexOfFirstProduct + 1} à {Math.min(indexOfLastProduct, filteredProducts.length)} sur {filteredProducts.length} produits
            </div>
            <div className="flex items-center gap-1">
                <button
                    onClick={firstPage}
                    disabled={currentPage === 1}
                    className="p-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
                >
                    <ChevronsLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="p-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                    <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`w-8 h-8 rounded-md text-sm ${currentPage === number ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`}
                    >
                        {number}
                    </button>
                ))}
                
                <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="p-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
                <button
                    onClick={lastPage}
                    disabled={currentPage === totalPages}
                    className="p-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
                >
                    <ChevronsRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    )}
                </div>
            )}

            {previewImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center"
                    onClick={() => setPreviewImage(null)}
                >
                    {previewImage.startsWith('http') ? (
                        <img
                            src={previewImage}
                            alt="Aperçu"
                            className="max-w-[90vw] max-h-[90vh] rounded-xl shadow-xl border-4 border-white"
                        />
                    ) : (
                        <div className="text-8xl bg-white p-8 rounded-xl">
                            {previewImage}
                        </div>
                    )}
                </div> 
            )}

            {showProductModal && (
                <ProductModal
                    selectedProduct={selectedProduct}
                    setShowProductModal={setShowProductModal}
                    handleSaveProduct={handleSaveProduct}
                />
            )}
        </div>
    );
};

export default ProductsSection;