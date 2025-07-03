// "use client";
// import React, { useRef, useEffect, useState } from 'react';

// interface ProductModalProps {
//     selectedProduct?: any;
//     setShowProductModal: (show: boolean) => void;
//     handleSaveProduct: (productData: any) => Promise<void>;
// }

// const ProductModal: React.FC<ProductModalProps> = ({
//     selectedProduct,
//     setShowProductModal,
//     handleSaveProduct,
// }) => {
//     const formRef = useRef<HTMLDivElement>(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [images, setImages] = useState<string[]>([]);
//     const [features, setFeatures] = useState<string[]>(['']);
//     const [specs, setSpecs] = useState<{ key: string, value: string }[]>([{ key: '', value: '' }]);
//     const [services, setServices] = useState({
//         delivery: { title: '', description: '' },
//         warranty: { title: '', description: '' }
//     });

//     // Controlled input states
//     const [name, setName] = useState('');
//     const [productId, setProductId] = useState('');
//     const [price, setPrice] = useState('');
//     const [oldPrice, setOldPrice] = useState('');
//     const [discount, setDiscount] = useState('');
//     const [category, setCategory] = useState('');
//     const [brand, setBrand] = useState('');
//     const [shortDescription, setShortDescription] = useState('');
//     const [longDescription, setLongDescription] = useState('');

//     // Gestion des images
//     const handleAddImage = () => setImages([...images, '']);
//     const handleImageChange = (index: number, value: string) => {
//         const newImages = [...images];
//         newImages[index] = value;
//         setImages(newImages);
//     };

//     // Gestion des caractéristiques
//     const handleAddFeature = () => setFeatures([...features, '']);
//     const handleFeatureChange = (index: number, value: string) => {
//         const newFeatures = [...features];
//         newFeatures[index] = value;
//         setFeatures(newFeatures);
//     };

//     // Gestion des spécifications
//     const handleAddSpec = () => setSpecs([...specs, { key: '', value: '' }]);
//     const handleSpecChange = (index: number, field: 'key' | 'value', val: string) => {
//         const newSpecs = [...specs];
//         newSpecs[index][field] = val;
//         setSpecs(newSpecs);
//     };

//     // Gestion des services
//     const handleServiceChange = (service: 'delivery' | 'warranty', field: 'title' | 'description', value: string) => {
//         setServices({
//             ...services,
//             [service]: {
//                 ...services[service],
//                 [field]: value
//             }
//         });
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         // Validation des images
//         const validImages = images.filter(img => img.trim() !== '');
//         if (validImages.length === 0) {
//             alert("Veuillez ajouter au moins une image valide");
//             return;
//         }

//         setIsSubmitting(true);

//         try {
//             const form = formRef.current;
//             if (!form) return;

//             const getValue = (selector: string) =>
//                 (form.querySelector(selector) as HTMLInputElement | HTMLTextAreaElement)?.value.trim();

//             const getSelectValue = (index: number) =>
//                 (form.querySelectorAll('select')[index] as HTMLSelectElement)?.value === "true";

//             const productData = {
//                 name: getValue('input[placeholder="Nom"]') || '',
//                 id: getValue('input[placeholder="ID (ex: bosch-gsb-13-re)"]') || '',
//                 price: parseFloat(getValue('input[placeholder="0.00"]') || "0"),
//                 oldPrice: parseFloat((form.querySelectorAll('input[placeholder="0.00"]')[1] as HTMLInputElement)?.value || "0"),
//                 discount: parseInt(getValue('input[placeholder="25"]') || "0"),
//                 category: getValue('input[placeholder="Ex: Outillage > Perceuses"]') || '',
//                 brand: getValue('input[placeholder="Bosch"]') || '',
//                 images: validImages,
//                 shortDescription: getValue('textarea[placeholder*="Petite description"]') || '',
//                 longDescription: getValue('textarea[placeholder*="Texte plus détaillé"]') || '',
//                 specifications: specs.reduce((acc, { key, value }) => {
//                     if (key.trim()) acc[key.trim()] = value.trim();
//                     return acc;
//                 }, {} as Record<string, string>),
//                 features: features.filter(f => f.trim() !== ''),
//                 inStock: getSelectValue(0),
//                 fastDelivery: getSelectValue(1),
//                 services,
//                 updatedAt: new Date(),
//                 ...(!selectedProduct && { createdAt: new Date() })
//             };

//             await handleSaveProduct({
//                 ...productData,
//                 // Assure que les tableaux ne sont pas undefined
//                 images: productData.images || [],
//                 features: productData.features || [],
//                 specifications: productData.specifications || {}
//             });
//         } catch (error) {
//             console.error("Erreur lors de la soumission:", error);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     // Initialisation des données si produit existant
//     useEffect(() => {
//         if (selectedProduct) {
//             // Initialisation des images - garantit toujours un tableau non vide
//             setImages(
//                 selectedProduct.images && selectedProduct.images.length > 0
//                     ? [...selectedProduct.images] // Copie directe du tableau
//                     : [''] // Fallback si pas d'images
//             );
//             // Initialisation des caractéristiques - filtre les valeurs vides
//             setFeatures(
//                 selectedProduct.features?.filter((f: string) => f.trim() !== '').length > 0
//                     ? selectedProduct.features.filter((f: string) => f.trim() !== '')
//                     : [''] // Au moins un champ vide
//             );

//             // Initialisation des spécifications - conversion depuis l'objet
//             setSpecs(
//                 selectedProduct.specifications && Object.keys(selectedProduct.specifications).length > 0
//                     ? Object.entries(selectedProduct.specifications)
//                         .filter(([key, value]) => key.trim() !== '' && String(value).trim() !== '')
//                         .map(([key, value]) => ({
//                             key,
//                             value: String(value) // Conversion explicite en string
//                         }))
//                     : [{ key: '', value: '' }] // Champ vide par défaut
//             );

//             // Initialisation des services avec valeurs par défaut propres
//             setServices({
//                 delivery: {
//                     title: selectedProduct.services?.delivery?.title || '',
//                     description: selectedProduct.services?.delivery?.description || ''
//                 },
//                 warranty: {
//                     title: selectedProduct.services?.warranty?.title || '',
//                     description: selectedProduct.services?.warranty?.description || ''
//                 }
//             });
//         } else {
//             // Initialisation pour un nouveau produit
//             setImages(['']); // Un seul champ image vide
//             setFeatures(['']); // Un seul champ caractéristique vide
//             setSpecs([{ key: '', value: '' }]); // Une paire vide
//             setServices({
//                 delivery: { title: '', description: '' },
//                 warranty: { title: '', description: '' }
//             });
//         }
//     }, [selectedProduct]);

//     return (
//         <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
//             <div
//                 ref={formRef}
//                 className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 hover:scale-100 border border-gray-100"
//             >
//                 <div className="flex justify-between items-center mb-6">
//                     <h3 className="text-2xl font-bold text-gray-800">
//                         {selectedProduct ? '✏️ Modifier le produit' : '➕ Nouveau produit'}
//                     </h3>
//                     <button
//                         onClick={() => setShowProductModal(false)}
//                         className="text-gray-500 hover:text-gray-700 transition-colors"
//                         disabled={isSubmitting}
//                     >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                     </button>
//                 </div>


//                 <form id="productForm" onSubmit={handleSubmit}>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                         {/* Nom */}
//                         <div className="space-y-1">
//                             <label className="block text-sm font-medium text-gray-700">Nom du produit *</label>
//                             <input
//                                 type="text"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                                 placeholder="Nom"
//                                 required
//                                 value={selectedProduct?.name || ''}
//                             />
//                         </div>

//                         {/* ID produit */}
//                         <div className="space-y-1">
//                             <label className="block text-sm font-medium text-gray-700">ID du produit *</label>
//                             <input
//                                 type="text"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                                 placeholder="ID (ex: bosch-gsb-13-re)"
//                                 required
//                                 value={selectedProduct?.id || ''}
//                             />
//                         </div>

//                         {/* Prix & Ancien prix */}
//                         <div className="space-y-1">
//                             <label className="block text-sm font-medium text-gray-700">Prix *</label>
//                             <div className="relative">
//                                 <span className="absolute left-3 top-2.5 text-gray-500">€</span>
//                                 <input
//                                     type="number"
//                                     step="0.01"
//                                     min="0"
//                                     className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                                     placeholder="0.00"
//                                     required
//                                     value={selectedProduct?.price || ''}
//                                 />
//                             </div>
//                         </div>

//                         <div className="space-y-1">
//                             <label className="block text-sm font-medium text-gray-700">Ancien prix</label>
//                             <div className="relative">
//                                 <span className="absolute left-3 top-2.5 text-gray-500">€</span>
//                                 <input
//                                     type="number"
//                                     step="0.01"
//                                     min="0"
//                                     className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all line-through text-gray-500"
//                                     placeholder="0.00"
//                                     value={selectedProduct?.oldPrice || ''}
//                                 />
//                             </div>
//                         </div>

//                         {/* Remise */}
//                         <div className="space-y-1">
//                             <label className="block text-sm font-medium text-gray-700">Remise (%)</label>
//                             <div className="relative">
//                                 <span className="absolute right-3 top-2.5 text-gray-500">%</span>
//                                 <input
//                                     type="number"
//                                     min="0"
//                                     max="100"
//                                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                                     placeholder="25"
//                                     value={selectedProduct?.discount || ''}
//                                 />
//                             </div>
//                         </div>

//                         {/* Catégorie */}
//                         <div className="space-y-1">
//                             <label className="block text-sm font-medium text-gray-700">Catégorie *</label>
//                             <input
//                                 type="text"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                                 placeholder="Ex: Outillage > Perceuses"
//                                 required
//                                 value={selectedProduct?.category || ''}
//                             />
//                         </div>

//                         {/* Marque */}
//                         <div className="space-y-1">
//                             <label className="block text-sm font-medium text-gray-700">Marque</label>
//                             <input
//                                 type="text"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                                 placeholder="Bosch"
//                                 value={selectedProduct?.brand || ''}
//                             />
//                         </div>

//                         {/* stock */}
//                         <div className="space-y-1">
//                             <label className="block text-sm font-medium text-gray-700">Stock</label>

//                             <select
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                                 value={selectedProduct?.inStock ? 'true' : 'false'}
//                             >
//                                 <option value="true">En stock</option>
//                                 <option value="false">En rupture</option>
//                             </select>
//                         </div>

//                         {/* livraison */}
//                         <div className="space-y-1">
//                             <label className="block text-sm font-medium text-gray-700">Livraison</label>

//                             <select
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                                 value={selectedProduct?.fastDelivery ? 'true' : 'false'}
//                             >
//                                 <option value="true">Livraison rapide</option>
//                                 <option value="false">Livraison standard</option>
//                             </select>
//                         </div>



//                         <div className="space-y-1">
//                             <label className="block text-sm font-medium text-gray-700">Courte description *</label>
//                             <textarea
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                                 placeholder="Petite description qui apparaît dans les listes"
//                                 value={selectedProduct?.shortDescription || ''}
//                             />
//                         </div>

//                         <div className="space-y-1">
//                             <label className="block text-sm font-medium text-gray-700">Longue description *</label>
//                             <textarea
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                                 placeholder="Texte plus détaillé pour la page produit"
//                                 rows={4}
//                                 value={selectedProduct?.longDescription || ''}
//                             />
//                         </div>

//                         {/* Images - Nouvelle interface */}
//                         <div className="col-span-2 space-y-2">
//                             <label className="block text-sm font-medium text-gray-700">
//                                 Images *
//                                 {images.filter(img => img.trim() === '').length > 0 && (
//                                     <span className="text-red-500 ml-2">(URL d'image requise)</span>
//                                 )}
//                             </label>

//                             {images.map((img, index) => (
//                                 <div key={`image-${index}`} className="flex gap-2 mb-2">
//                                     <input
//                                         type="url"
//                                         value={img}
//                                         onChange={(e) => handleImageChange(index, e.target.value)}
//                                         className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all ${!img.trim() ? 'border-red-500' : 'border-gray-300'
//                                             }`}
//                                         placeholder="https://example.com/image.jpg"
//                                         required
//                                     />
//                                     {images.length > 1 && (
//                                         <button
//                                             type="button"
//                                             onClick={() => setImages(images.filter((_, i) => i !== index))}
//                                             className="px-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
//                                         >
//                                             -
//                                         </button>
//                                     )}
//                                     {index === images.length - 1 && (
//                                         <button
//                                             type="button"
//                                             onClick={handleAddImage}
//                                             className="px-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
//                                         >
//                                             +
//                                         </button>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Caractéristiques - Nouvelle interface */}
//                         <div className="col-span-2 space-y-2">
//                             <label className="block text-sm font-medium text-gray-700">Fonctionnalités</label>
//                             {features.map((feature, index) => (
//                                 <div key={index} className="flex gap-2 mb-2">
//                                     <input
//                                         type="text"
//                                         value={feature}
//                                         onChange={(e) => handleFeatureChange(index, e.target.value)}
//                                         className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                                         placeholder="Fonction percussion"
//                                     />
//                                     {index === features.length - 1 && (
//                                         <button
//                                             type="button"
//                                             onClick={handleAddFeature}
//                                             className="px-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
//                                         >
//                                             +
//                                         </button>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Spécifications - Nouvelle interface */}
//                         <div className="col-span-2 space-y-2">
//                             <label className="block text-sm font-medium text-gray-700">Spécifications techniques</label>
//                             {specs.map((spec, index) => (
//                                 <div key={index} className="grid grid-cols-2 gap-2 mb-2">
//                                     <input
//                                         type="text"
//                                         value={spec.key}
//                                         onChange={(e) => handleSpecChange(index, 'key', e.target.value)}
//                                         className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                                         placeholder="Caractéristique (ex: Puissance)"
//                                     />
//                                     <div className="flex gap-2">
//                                         <input
//                                             type="text"
//                                             value={spec.value}
//                                             onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
//                                             className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                                             placeholder="Valeur (ex: 600W)"
//                                         />
//                                         {index === specs.length - 1 && (
//                                             <button
//                                                 type="button"
//                                                 onClick={handleAddSpec}
//                                                 className="px-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
//                                             >
//                                                 +
//                                             </button>
//                                         )}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Services - Nouvelle interface */}
//                         <div className="col-span-2 space-y-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Service de livraison</label>
//                                 <div className="space-y-2">
//                                     <input
//                                         type="text"
//                                         value={services.delivery.title}
//                                         onChange={(e) => handleServiceChange('delivery', 'title', e.target.value)}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                                         placeholder="Titre (ex: Livraison gratuite)"
//                                     />
//                                     <textarea
//                                         value={services.delivery.description}
//                                         onChange={(e) => handleServiceChange('delivery', 'description', e.target.value)}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                                         placeholder="Description (ex: Sous 48h dès 50€ d'achat)"
//                                         rows={2}
//                                     />
//                                 </div>
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Service de garantie</label>
//                                 <div className="space-y-2">
//                                     <input
//                                         type="text"
//                                         value={services.warranty.title}
//                                         onChange={(e) => handleServiceChange('warranty', 'title', e.target.value)}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                                         placeholder="Titre (ex: Garantie 2 ans)"
//                                     />
//                                     <textarea
//                                         value={services.warranty.description}
//                                         onChange={(e) => handleServiceChange('warranty', 'description', e.target.value)}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                                         placeholder="Description (ex: Prise en charge constructeur)"
//                                         rows={2}
//                                     />
//                                 </div>
//                             </div>
//                         </div>

//                         {/* ... (boutons identiques) ... */}
//                         <div className="flex flex-col sm:flex-row gap-3 mt-8">
//                             <button
//                                 type="button"
//                                 onClick={() => setShowProductModal(false)}
//                                 className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium text-gray-700 flex items-center justify-center gap-2"
//                                 disabled={isSubmitting}
//                             >
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                 </svg>
//                                 Annuler
//                             </button>
//                             <button
//                                 type="submit"
//                                 className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2"
//                                 disabled={isSubmitting}
//                             >
//                                 {isSubmitting ? (
//                                     <span className="loading loading-spinner loading-sm"></span>
//                                 ) : (
//                                     <>
//                                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                                         </svg>
//                                         Sauvegarder
//                                     </>
//                                 )}
//                             </button>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ProductModal;




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
    const [images, setImages] = useState<string[]>([]);
    const [features, setFeatures] = useState<string[]>(['']);
    const [specs, setSpecs] = useState<{ key: string, value: string }[]>([{ key: '', value: '' }]);
    const [services, setServices] = useState({
        delivery: { title: '', description: '' },
        warranty: { title: '', description: '' }
    });

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
    const handleServiceChange = (service: 'delivery' | 'warranty', field: 'title' | 'description', value: string) => {
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
                fastDelivery,
                services,
                updatedAt: new Date(),
                ...(!selectedProduct && { createdAt: new Date() })
            };

            await handleSaveProduct(productData);
            setShowProductModal(false);
        } catch (error) {
            console.error("Erreur lors de la soumission:", error);
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
            setFastDelivery(selectedProduct.fastDelivery === true);

            // Initialisation des images
            setImages(
                selectedProduct.images && selectedProduct.images.length > 0
                    ? [...selectedProduct.images]
                    : ['']
            );
            console.log(images, 'selectedProduct.images');

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
                delivery: {
                    title: selectedProduct.services?.delivery?.title || '',
                    description: selectedProduct.services?.delivery?.description || ''
                },
                warranty: {
                    title: selectedProduct.services?.warranty?.title || '',
                    description: selectedProduct.services?.warranty?.description || ''
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
            setFastDelivery(false);
            setImages(['']);
            setFeatures(['']);
            setSpecs([{ key: '', value: '' }]);
            setServices({
                delivery: { title: '', description: '' },
                warranty: { title: '', description: '' }
            });
        }
    }, [selectedProduct]);

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
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="Ex: Outillage > Perceuses"
                                required
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
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
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Courte description *</label>
                            <textarea
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="Petite description qui apparaît dans les listes"
                                value={shortDescription}
                                onChange={(e) => setShortDescription(e.target.value)}
                            />
                        </div>

                        {/* Longue description */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Longue description *</label>
                            <textarea
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="Texte plus détaillé pour la page produit"
                                rows={4}
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
                                        className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all ${!img.trim() ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="https://example.com/image.jpg"
                                        required
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

                        {/* Services */}
                        <div className="col-span-2 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Service de livraison</label>
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        value={services.delivery.title}
                                        onChange={(e) => handleServiceChange('delivery', 'title', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        placeholder="Titre (ex: Livraison gratuite)"
                                    />
                                    <textarea
                                        value={services.delivery.description}
                                        onChange={(e) => handleServiceChange('delivery', 'description', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        placeholder="Description (ex: Sous 48h dès 50€ d'achat)"
                                        rows={2}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Service de garantie</label>
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        value={services.warranty.title}
                                        onChange={(e) => handleServiceChange('warranty', 'title', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        placeholder="Titre (ex: Garantie 2 ans)"
                                    />
                                    <textarea
                                        value={services.warranty.description}
                                        onChange={(e) => handleServiceChange('warranty', 'description', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        placeholder="Description (ex: Prise en charge constructeur)"
                                        rows={2}
                                    />
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