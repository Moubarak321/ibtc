
"use client";
import React, { useRef, useEffect, useState } from 'react';

interface ProductModalProps {
    selectedProduct?: any;
    setShowProductModal: (show: boolean) => void;
    handleSaveProduct: (productData: any) => Promise<void>;
}

const ProductModal: React.FC<ProductModalProps> = ({
    selectedProduct,
    setShowProductModal,
    handleSaveProduct,
}) => {
    const formRef = useRef<HTMLDivElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [images, setImages] = useState<string[]>(['']);
    const [features, setFeatures] = useState<string[]>(['']);
    const [specs, setSpecs] = useState<{ key: string, value: string }[]>([{ key: '', value: '' }]);
    const [services, setServices] = useState({
        livraison: {
            disponible: false,
            gratuite: false,
            seuil: 0,
            delai: ""
        },
        garantie: {
            disponible: false,
            duree: 0,
            type: ""
        }
    });

    const CATEGORIES = [
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
    ].sort();

    // Controlled input states
    const [name, setName] = useState('');
    const [productId, setProductId] = useState('');
    const [price, setPrice] = useState('');
    const [oldPrice, setOldPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [longDescription, setLongDescription] = useState('');
    const [inStock, setInStock] = useState(true);
    const [vedette, setVedette] = useState(true);
    const [fastDelivery, setFastDelivery] = useState(false);

    // Gestion des images
    const handleAddImage = () => setImages([...images, '']);
    const handleImageChange = (index: number, value: string) => {
        const newImages = [...images];
        newImages[index] = value;
        setImages(newImages);
    };
    const handleRemoveImage = (index: number) => {
        if (images.length > 1) {
            setImages(images.filter((_, i) => i !== index));
        }
    };

    // Gestion des caractéristiques
    const handleAddFeature = () => setFeatures([...features, '']);
    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...features];
        newFeatures[index] = value;
        setFeatures(newFeatures);
    };

    // Gestion des spécifications
    const handleAddSpec = () => setSpecs([...specs, { key: '', value: '' }]);
    const handleSpecChange = (index: number, field: 'key' | 'value', val: string) => {
        const newSpecs = [...specs];
        newSpecs[index][field] = val;
        setSpecs(newSpecs);
    };

    // Gestion des services
    const handleServiceChange = (
        service: 'livraison' | 'garantie',
        field: string,
        value: string | boolean | number
    ) => {
        setServices({
            ...services,
            [service]: {
                ...services[service],
                [field]: value
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation des images
        const validImages = images.filter(img => img.trim() !== '');
        if (validImages.length === 0) {
            alert("Veuillez ajouter au moins une image valide");
            return;
        }

        setIsSubmitting(true);

        try {
            const productData = {
                name: name.trim(),
                id: productId.trim(),
                price: parseFloat(price) || 0,
                oldPrice: parseFloat(oldPrice) || 0,
                discount: parseInt(discount) || 0,
                category: category.trim(),
                brand: brand.trim(),
                images: validImages,
                shortDescription: shortDescription.trim(),
                longDescription: longDescription.trim(),
                specifications: specs.reduce((acc, { key, value }) => {
                    if (key.trim()) acc[key.trim()] = value.trim();
                    return acc;
                }, {} as Record<string, string>),
                features: features.filter(f => f.trim() !== ''),
                inStock,
                vedette,
                fastDelivery,
                services,
                updatedAt: new Date().toISOString(),
                ...(!selectedProduct && { createdAt: new Date().toISOString() })
            };

            await handleSaveProduct(productData);
            setShowProductModal(false);
        } catch (error) {
            console.error("Erreur lors de la soumission:", error);
            alert("Une erreur s'est produite lors de la sauvegarde");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Initialisation des données si produit existant
    useEffect(() => {
        if (selectedProduct) {
            setName(selectedProduct.name || '');
            setProductId(selectedProduct.id || '');
            setPrice(selectedProduct.price?.toString() || '');
            setOldPrice(selectedProduct.oldPrice?.toString() || '');
            setDiscount(selectedProduct.discount?.toString() || '');
            setCategory(selectedProduct.category || '');
            setBrand(selectedProduct.brand || '');
            setShortDescription(selectedProduct.shortDescription || '');
            setLongDescription(selectedProduct.longDescription || '');
            setInStock(selectedProduct.inStock !== false);
            setVedette(selectedProduct.vedette !== false);
            setFastDelivery(selectedProduct.fastDelivery === true);

            // Initialisation des images
            setImages(
                selectedProduct.images && selectedProduct.images.length > 0
                    ? [...selectedProduct.images]
                    : ['']
            );

            // Initialisation des caractéristiques
            setFeatures(
                selectedProduct.features?.filter((f: string) => f.trim() !== '').length > 0
                    ? selectedProduct.features.filter((f: string) => f.trim() !== '')
                    : ['']
            );

            // Initialisation des spécifications
            setSpecs(
                selectedProduct.specifications && Object.keys(selectedProduct.specifications).length > 0
                    ? Object.entries(selectedProduct.specifications)
                        .filter(([key, value]) => key.trim() !== '' && String(value).trim() !== '')
                        .map(([key, value]) => ({
                            key,
                            value: String(value)
                        }))
                    : [{ key: '', value: '' }]
            );

            // Initialisation des services
            setServices({
                livraison: {
                    disponible: selectedProduct.services?.livraison?.disponible ?? false,
                    gratuite: selectedProduct.services?.livraison?.gratuite ?? false,
                    seuil: selectedProduct.services?.livraison?.seuil ?? 0,
                    delai: selectedProduct.services?.livraison?.delai ?? ""
                },
                garantie: {
                    disponible: selectedProduct.services?.garantie?.disponible ?? false,
                    duree: selectedProduct.services?.garantie?.duree ?? 0,
                    type: selectedProduct.services?.garantie?.type ?? ""
                }
            });
        } else {
            // Réinitialisation pour un nouveau produit
            setName('');
            setProductId('');
            setPrice('');
            setOldPrice('');
            setDiscount('');
            setCategory('');
            setBrand('');
            setShortDescription('');
            setLongDescription('');
            setInStock(true);
            setVedette(true);
            setFastDelivery(false);
            setImages(['']);
            setFeatures(['']);
            setSpecs([{ key: '', value: '' }]);
            setServices({
                livraison: {
                    disponible: false,
                    gratuite: false,
                    seuil: 0,
                    delai: ""
                },
                garantie: {
                    disponible: false,
                    duree: 0,
                    type: ""
                }
            });
        }
    }, [selectedProduct]);

    const formatPrice = (seuil: number) => {
        if (typeof seuil !== "number" || isNaN(seuil)) return "0 FCFA";
        return seuil.toLocaleString("fr-FR", { 
            minimumFractionDigits: 0, 
            maximumFractionDigits: 0 
        }) + " FCFA";
    };

    // Mock handleSaveProduct pour la démo
    const mockHandleSaveProduct = async (productData: any) => {
        console.log("Données du produit sauvegardées:", productData);
        // Simuler un délai de sauvegarde
        await new Promise(resolve => setTimeout(resolve, 1000));
    };

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div
                ref={formRef}
                className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 hover:scale-100 border border-gray-100"
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">
                        {selectedProduct ? '✏️ Modifier le produit' : '➕ Nouveau produit'}
                    </h3>
                    <button
                        onClick={() => setShowProductModal(false)}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                        disabled={isSubmitting}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Nom */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Nom du produit *</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="Nom"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        {/* ID produit */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">ID du produit *</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="ID (ex: bosch-gsb-13-re)"
                                required
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                            />
                        </div>

                        {/* Prix */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Prix *</label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-gray-500">€</span>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="0.00"
                                    required
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Ancien prix */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Ancien prix</label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-gray-500">€</span>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all line-through text-gray-500"
                                    placeholder="0.00"
                                    value={oldPrice}
                                    onChange={(e) => setOldPrice(e.target.value)}
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
                                    min="0"
                                    max="100"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="25"
                                    value={discount}
                                    onChange={(e) => setDiscount(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Catégorie */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Catégorie *</label>
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                required
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Sélectionnez une catégorie</option>
                                {CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Marque */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Marque</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="Bosch"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            />
                        </div>

                        {/* Stock */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Stock</label>
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                value={inStock ? 'true' : 'false'}
                                onChange={(e) => setInStock(e.target.value === 'true')}
                            >
                                <option value="true">En stock</option>
                                <option value="false">En rupture</option>
                            </select>
                        </div>

                        {/* Vedette */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Vedette</label>
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                value={vedette ? 'true' : 'false'}
                                onChange={(e) => setVedette(e.target.value === 'true')}
                            >
                                <option value="true">Oui</option>
                                <option value="false">Non</option>
                            </select>
                        </div>

                        {/* Livraison */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Livraison</label>
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                value={fastDelivery ? 'true' : 'false'}
                                onChange={(e) => setFastDelivery(e.target.value === 'true')}
                            >
                                <option value="true">Livraison rapide</option>
                                <option value="false">Livraison standard</option>
                            </select>
                        </div>

                        {/* Courte description */}
                        <div className="space-y-1 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Courte description *</label>
                            <textarea
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="Petite description qui apparaît dans les listes"
                                rows={2}
                                required
                                value={shortDescription}
                                onChange={(e) => setShortDescription(e.target.value)}
                            />
                        </div>

                        {/* Longue description */}
                        <div className="space-y-1 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Longue description *</label>
                            <textarea
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="Texte plus détaillé pour la page produit"
                                rows={4}
                                required
                                value={longDescription}
                                onChange={(e) => setLongDescription(e.target.value)}
                            />
                        </div>

                        {/* Images */}
                        <div className="col-span-2 space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Images *
                                {images.filter(img => img.trim() === '').length > 0 && (
                                    <span className="text-red-500 ml-2">(URL d'image requise)</span>
                                )}
                            </label>

                            {images.map((img, index) => (
                                <div key={`image-${index}`} className="flex gap-2 mb-2">
                                    <input
                                        type="url"
                                        value={img}
                                        onChange={(e) => handleImageChange(index, e.target.value)}
                                        className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all ${
                                            !img.trim() ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="https://example.com/image.jpg"
                                    />
                                    {images.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="px-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                                        >
                                            -
                                        </button>
                                    )}
                                    {index === images.length - 1 && (
                                        <button
                                            type="button"
                                            onClick={handleAddImage}
                                            className="px-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                                        >
                                            +
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Caractéristiques */}
                        <div className="col-span-2 space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Fonctionnalités</label>
                            {features.map((feature, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={feature}
                                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        placeholder="Fonction percussion"
                                    />
                                    {index === features.length - 1 && (
                                        <button
                                            type="button"
                                            onClick={handleAddFeature}
                                            className="px-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                                        >
                                            +
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Spécifications */}
                        <div className="col-span-2 space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Spécifications techniques</label>
                            {specs.map((spec, index) => (
                                <div key={index} className="grid grid-cols-2 gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={spec.key}
                                        onChange={(e) => handleSpecChange(index, 'key', e.target.value)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        placeholder="Caractéristique (ex: Puissance)"
                                    />
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={spec.value}
                                            onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            placeholder="Valeur (ex: 600W)"
                                        />
                                        {index === specs.length - 1 && (
                                            <button
                                                type="button"
                                                onClick={handleAddSpec}
                                                className="px-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                                            >
                                                +
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Services - Section simplifiée et fonctionnelle */}
                        <div className="col-span-2 space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-medium text-gray-700 mb-3">Services</h4>
                                
                                {/* Livraison */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-4">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={services.livraison.disponible}
                                                onChange={(e) => handleServiceChange('livraison', 'disponible', e.target.checked)}
                                                className="mr-2"
                                            />
                                            Livraison disponible
                                        </label>
                                        {services.livraison.disponible && (
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={services.livraison.gratuite}
                                                    onChange={(e) => handleServiceChange('livraison', 'gratuite', e.target.checked)}
                                                    className="mr-2"
                                                />
                                                Livraison gratuite
                                            </label>
                                        )}
                                    </div>
                                    {services.livraison.disponible && (
                                        <div className="grid grid-cols-2 gap-2">
                                            <input
                                                type="number"
                                                placeholder="Seuil (FCFA)"
                                                value={services.livraison.seuil}
                                                onChange={(e) => handleServiceChange('livraison', 'seuil', parseInt(e.target.value) || 0)}
                                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Délai (ex: 24-48h)"
                                                value={services.livraison.delai}
                                                onChange={(e) => handleServiceChange('livraison', 'delai', e.target.value)}
                                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Garantie */}
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={services.garantie.disponible}
                                                onChange={(e) => handleServiceChange('garantie', 'disponible', e.target.checked)}
                                                className="mr-2"
                                            />
                                            Garantie disponible
                                        </label>
                                    </div>
                                    {services.garantie.disponible && (
                                        <div className="grid grid-cols-2 gap-2">
                                            <input
                                                type="number"
                                                placeholder="Durée (mois)"
                                                value={services.garantie.duree}
                                                onChange={(e) => handleServiceChange('garantie', 'duree', parseInt(e.target.value) || 0)}
                                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Type (ex: Constructeur)"
                                                value={services.garantie.type}
                                                onChange={(e) => handleServiceChange('garantie', 'type', e.target.value)}
                                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Boutons */}
                        <div className="col-span-2 flex flex-col sm:flex-row gap-3 mt-8">
                            <button
                                type="button"
                                onClick={() => setShowProductModal(false)}
                                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium text-gray-700 flex items-center justify-center gap-2"
                                disabled={isSubmitting}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="loading loading-spinner loading-sm"></span>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Sauvegarder
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;