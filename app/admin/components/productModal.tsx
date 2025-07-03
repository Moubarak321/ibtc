// "use client";
// import React, { useRef, useEffect, useState } from 'react';
// import { TrendingUp } from 'lucide-react';

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

//     const prefillForm = () => {
//         const form = formRef.current;
//         if (!form) return;

//         // Helper functions
//         const setValue = (selector: string, value: string) => {
//             const el = form.querySelector(selector) as HTMLInputElement | HTMLTextAreaElement | null;
//             if (el) el.value = value;
//         };

//         const setSelectValue = (index: number, value: string) => {
//             const select = form.querySelectorAll('select')[index] as HTMLSelectElement | null;
//             if (select) select.value = value;
//         };

//         // Basic fields
//         setValue('input[placeholder="Nom"]', "Perceuse à percussion Bosch GSB 13 RE Professional");
//         setValue('input[placeholder="ID (ex: bosch-gsb-13-re)"]', "bosch-gsb-13-re");

//         const priceInputs = form.querySelectorAll('input[placeholder="0.00"]') as NodeListOf<HTMLInputElement>;
//         if (priceInputs[0]) priceInputs[0].value = "129.99";
//         if (priceInputs[1]) priceInputs[1].value = "159.99";

//         setValue('input[placeholder="25"]', "19");
//         setValue('input[placeholder="Ex: Outillage > Perceuses"]', "Outillage > Perceuses");
//         setValue('input[placeholder="Bosch"]', "Bosch");

//         // Textareas
//         setValue('textarea[placeholder*="https://image1.jpg"]', JSON.stringify([
//             "https://example.com/images/perceuse1.jpg",
//             "https://example.com/images/perceuse2.jpg"
//         ], null, 2));

//         setValue('textarea[placeholder*="Petite description"]',
//             "Compacte, puissante et idéale pour les travaux de perçage quotidiens.");

//         setValue('textarea[placeholder*="Texte plus détaillé"]',
//             "La perceuse à percussion Bosch GSB 13 RE Professional est conçue pour les artisans exigeants. Dotée d'un moteur de 600W, elle assure un perçage efficace dans le bois, l'acier et la maçonnerie. Son design compact et ergonomique offre une prise en main optimale, même dans les espaces restreints.");

//         setValue('textarea[placeholder*="Puissance"]', JSON.stringify({
//             "Puissance": "600W",
//             "Vitesse": "2800 tr/min",
//             "Capacité de perçage (béton)": "13 mm",
//             "Poids": "1.8 kg"
//         }, null, 2));

//         setValue('textarea[placeholder*="Fonction percussion"]', JSON.stringify([
//             "Fonction percussion",
//             "Poignée ergonomique",
//             "Contrôle de vitesse",
//             "Mandrin automatique"
//         ], null, 2));

//         // Selects
//         setSelectValue(0, "true");
//         setSelectValue(1, "true");

//         setValue('textarea[placeholder*="Livraison gratuite"]', JSON.stringify({
//             delivery: {
//                 title: "Livraison gratuite",
//                 description: "Sous 48h dès 50€ d'achat"
//             },
//             warranty: {
//                 title: "Garantie 2 ans",
//                 description: "Prise en charge constructeur"
//             }
//         }, null, 2));
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
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
//                 images: JSON.parse(getValue('textarea[placeholder*="https://image1.jpg"]') || "[]"),
//                 shortDescription: getValue('textarea[placeholder*="Petite description"]') || '',
//                 longDescription: getValue('textarea[placeholder*="Texte plus détaillé"]') || '',
//                 specifications: JSON.parse(getValue('textarea[placeholder*="Puissance"]') || "{}"),
//                 features: JSON.parse(getValue('textarea[placeholder*="Fonction percussion"]') || "[]"),
//                 inStock: getSelectValue(0),
//                 fastDelivery: getSelectValue(1),
//                 services: JSON.parse(getValue('textarea[placeholder*="Livraison gratuite"]') || "{}"),
//                 updatedAt: new Date(),
//                 ...(!selectedProduct && { createdAt: new Date() })
//             };

//             await handleSaveProduct(productData);
//         } catch (error) {
//             console.error("Erreur lors de la soumission:", error);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     // Pré-remplir le formulaire si un produit est sélectionné
//     useEffect(() => {
//         if (selectedProduct && formRef.current) {
//             const form = formRef.current;

//             const setValue = (selector: string, value: any) => {
//                 const el = form.querySelector(selector) as HTMLInputElement | HTMLTextAreaElement | null;
//                 if (el) el.value = value;
//             };

//             const setSelectValue = (index: number, value: boolean) => {
//                 const select = form.querySelectorAll('select')[index] as HTMLSelectElement | null;
//                 if (select) select.value = value.toString();
//             };

//             setValue('input[placeholder="Nom"]', selectedProduct.name);
//             setValue('input[placeholder="ID (ex: bosch-gsb-13-re)"]', selectedProduct.id);

//             const priceInputs = form.querySelectorAll('input[placeholder="0.00"]') as NodeListOf<HTMLInputElement>;
//             if (priceInputs[0]) priceInputs[0].value = selectedProduct.price.toString();
//             if (priceInputs[1]) priceInputs[1].value = selectedProduct.oldPrice?.toString() || "";

//             setValue('input[placeholder="25"]', selectedProduct.discount?.toString() || "");
//             setValue('input[placeholder="Ex: Outillage > Perceuses"]', selectedProduct.category);
//             setValue('input[placeholder="Bosch"]', selectedProduct.brand || "");
//             setValue('textarea[placeholder*="https://image1.jpg"]', JSON.stringify(selectedProduct.images || [], null, 2));
//             setValue('textarea[placeholder*="Petite description"]', selectedProduct.shortDescription || "");
//             setValue('textarea[placeholder*="Texte plus détaillé"]', selectedProduct.longDescription || "");
//             setValue('textarea[placeholder*="Puissance"]', JSON.stringify(selectedProduct.specifications || {}, null, 2));
//             setValue('textarea[placeholder*="Fonction percussion"]', JSON.stringify(selectedProduct.features || [], null, 2));
//             setSelectValue(0, selectedProduct.inStock ?? true);
//             setSelectValue(1, selectedProduct.fastDelivery ?? false);
//             setValue('textarea[placeholder*="Livraison gratuite"]', JSON.stringify(selectedProduct.services || {
//                 delivery: { title: "", description: "" },
//                 warranty: { title: "", description: "" }
//             }, null, 2));
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
//                             />
//                         </div>

//                         {/* Marque */}
//                         <div className="space-y-1">
//                             <label className="block text-sm font-medium text-gray-700">Marque</label>
//                             <input
//                                 type="text"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                                 placeholder="Bosch"
//                             />
//                         </div>

//                         {/* Images (JSON) */}
//                         <div className="col-span-2 space-y-1">
//                             <label className="block text-sm font-medium text-gray-700">Images (URLs, tableau JSON) *</label>
//                             <textarea
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[80px] font-mono text-sm"
//                                 placeholder='["https://image1.jpg", "https://image2.jpg"]'
//                                 required
//                             ></textarea>
//                             <p className="text-xs text-gray-500 mt-1">Format JSON requis. Maximum 5 images.</p>
//                         </div>

//                         {/* Description courte */}
//                         <div className="col-span-2 space-y-1">
//                             <label className="block text-sm font-medium text-gray-700">Description courte *</label>
//                             <textarea
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[80px]"
//                                 placeholder="Petite description visible sur la page principale"
//                                 required
//                             ></textarea>
//                             <p className="text-xs text-gray-500 mt-1">Maximum 150 caractères</p>
//                         </div>

//                         {/* Description longue */}
//                         <div className="col-span-2 space-y-1">
//                             <label className="block text-sm font-medium text-gray-700">Description complète</label>
//                             <textarea
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[100px]"
//                                 placeholder="Texte plus détaillé sur le produit"
//                             ></textarea>
//                         </div>

//                         {/* Caractéristiques */}
//                         <div className="col-span-2 space-y-1">
//                             <label className="block text-sm font-medium text-gray-700">Spécifications (objet JSON)</label>
//                             <textarea
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[100px] font-mono text-sm"
//                                 placeholder='{"Puissance":"600W","Poids":"1.8kg"}'
//                             ></textarea>
//                         </div>

//                         {/* Fonctionnalités */}
//                         <div className="col-span-2 space-y-1">
//                             <label className="block text-sm font-medium text-gray-700">Fonctionnalités (tableau JSON)</label>
//                             <textarea
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[80px] font-mono text-sm"
//                                 placeholder='["Fonction percussion", "Poignée ergonomique"]'
//                             ></textarea>
//                         </div>

//                         {/* Stock & Livraison rapide */}
//                         <div className="space-y-1">
//                             <label className="block text-sm font-medium text-gray-700">En stock</label>
//                             <select
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
//                                 defaultValue="true"
//                             >
//                                 <option value="true">✅ En stock</option>
//                                 <option value="false">❌ Rupture</option>
//                             </select>
//                         </div>

//                         <div className="space-y-1">
//                             <label className="block text-sm font-medium text-gray-700">Livraison rapide</label>
//                             <select
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
//                                 defaultValue="true"
//                             >
//                                 <option value="true">🚀 Disponible</option>
//                                 <option value="false">⏳ Standard</option>
//                             </select>
//                         </div>

//                         {/* Services */}
//                         <div className="col-span-2 space-y-1">
//                             <label className="block text-sm font-medium text-gray-700">Services (objet JSON)</label>
//                             <textarea
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[100px] font-mono text-sm"
//                                 placeholder={`{
//   "delivery": {"title": "Livraison gratuite", "description": "Dès 50€"},
//   "warranty": {"title": "Garantie 2 ans", "description": "Constructeur"}
// }`}
//                             ></textarea>
//                         </div>
//                     </div>

//                     {/* Boutons */}
//                     <div className="flex flex-col sm:flex-row gap-3 mt-8">
//                         <button
//                             type="button"
//                             onClick={() => setShowProductModal(false)}
//                             className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium text-gray-700 flex items-center justify-center gap-2"
//                             disabled={isSubmitting}
//                         >
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                             Annuler
//                         </button>
//                         <button
//                             type="submit"
//                             className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2"
//                             disabled={isSubmitting}
//                         >
//                             {isSubmitting ? (
//                                 <span className="loading loading-spinner loading-sm"></span>
//                             ) : (
//                                 <>
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                                     </svg>
//                                     Sauvegarder
//                                 </>
//                             )}
//                         </button>
//                     </div>
//                 </form>

//                 <button
//                     onClick={prefillForm}
//                     className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-all"
//                     disabled={isSubmitting}
//                 >
//                     🪄 Pré-remplir avec un exemple
//                 </button>
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

    // Gestion des images
    const handleAddImage = () => setImages([...images, '']);
    const handleImageChange = (index: number, value: string) => {
        const newImages = [...images];
        newImages[index] = value;
        setImages(newImages);
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
            const form = formRef.current;
            if (!form) return;

            const getValue = (selector: string) =>
                (form.querySelector(selector) as HTMLInputElement | HTMLTextAreaElement)?.value.trim();

            const getSelectValue = (index: number) =>
                (form.querySelectorAll('select')[index] as HTMLSelectElement)?.value === "true";

            const productData = {
                name: getValue('input[placeholder="Nom"]') || '',
                id: getValue('input[placeholder="ID (ex: bosch-gsb-13-re)"]') || '',
                price: parseFloat(getValue('input[placeholder="0.00"]') || "0"),
                oldPrice: parseFloat((form.querySelectorAll('input[placeholder="0.00"]')[1] as HTMLInputElement)?.value || "0"),
                discount: parseInt(getValue('input[placeholder="25"]') || "0"),
                category: getValue('input[placeholder="Ex: Outillage > Perceuses"]') || '',
                brand: getValue('input[placeholder="Bosch"]') || '',
                images: validImages,
                shortDescription: getValue('textarea[placeholder*="Petite description"]') || '',
                longDescription: getValue('textarea[placeholder*="Texte plus détaillé"]') || '',
                specifications: specs.reduce((acc, { key, value }) => {
                    if (key.trim()) acc[key.trim()] = value.trim();
                    return acc;
                }, {} as Record<string, string>),
                features: features.filter(f => f.trim() !== ''),
                inStock: getSelectValue(0),
                fastDelivery: getSelectValue(1),
                services,
                updatedAt: new Date(),
                ...(!selectedProduct && { createdAt: new Date() })
            };

            await handleSaveProduct({
                ...productData,
                // Assure que les tableaux ne sont pas undefined
                images: productData.images || [],
                features: productData.features || [],
                specifications: productData.specifications || {}
            });
        } catch (error) {
            console.error("Erreur lors de la soumission:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Initialisation des données si produit existant
    useEffect(() => {
        if (selectedProduct) {
            // Initialisation des images - garantit toujours un tableau non vide
            setImages(
                selectedProduct.images?.filter((img: string) => img.trim() !== '').length > 0
                    ? selectedProduct.images.filter((img: string) => img.trim() !== '')
                    : [''] // Champ vide prêt à être rempli
            );

            // Initialisation des caractéristiques - filtre les valeurs vides
            setFeatures(
                selectedProduct.features?.filter((f: string) => f.trim() !== '').length > 0
                    ? selectedProduct.features.filter((f: string) => f.trim() !== '')
                    : [''] // Au moins un champ vide
            );

            // Initialisation des spécifications - conversion depuis l'objet
            setSpecs(
                selectedProduct.specifications && Object.keys(selectedProduct.specifications).length > 0
                    ? Object.entries(selectedProduct.specifications)
                        .filter(([key, value]) => key.trim() !== '' && String(value).trim() !== '')
                        .map(([key, value]) => ({
                            key,
                            value: String(value) // Conversion explicite en string
                        }))
                    : [{ key: '', value: '' }] // Champ vide par défaut
            );

            // Initialisation des services avec valeurs par défaut propres
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
            // Initialisation pour un nouveau produit
            setImages(['']); // Un seul champ image vide
            setFeatures(['']); // Un seul champ caractéristique vide
            setSpecs([{ key: '', value: '' }]); // Une paire vide
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


                <form id="productForm" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Nom */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Nom du produit *</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="Nom"
                                required
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
                            />
                        </div>

                        {/* Prix & Ancien prix */}
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
                                />
                            </div>
                        </div>

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
                        {/* Images - Nouvelle interface */}
                        <div className="col-span-2 space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Images *
                                {images.length === 0 && (
                                    <span className="text-red-500 ml-2">(Au moins une image requise)</span>
                                )}
                            </label>

                            {images.map((img, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <input
                                        type="url"
                                        value={img}
                                        onChange={(e) => handleImageChange(index, e.target.value)}
                                        className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all ${index === 0 && !img.trim() ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="https://example.com/image.jpg"
                                        required={index === 0} // Seulement le premier champ est obligatoire
                                    />
                                    {images.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => setImages(images.filter((_, i) => i !== index))}
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

                            {images.length === 0 && (
                                <button
                                    type="button"
                                    onClick={handleAddImage}
                                    className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                                >
                                    + Ajouter une image
                                </button>
                            )}
                        </div>

                        {/* Caractéristiques - Nouvelle interface */}
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

                        {/* Spécifications - Nouvelle interface */}
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

                        {/* Services - Nouvelle interface */}
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

                        {/* ... (boutons identiques) ... */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-8">
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