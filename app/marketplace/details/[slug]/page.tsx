// app/marketplace/details/[slug]/page.tsx (Server Component)
import { getFirestore, doc, getDoc, collection } from 'firebase/firestore';
import { app } from '@/lib/firebase/server-config';
import { notFound } from 'next/navigation';
import ProductDetailClient from './productPageClient';

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
  createdAt?: string; // Changé en string optionnel
  updatedAt?: string; // Changé en string optionnel
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  try {
    const productId = params.slug; 
    const db = getFirestore(app);
    const docRef = doc(db, 'products', productId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.error('Produit non trouvé:', productId);
      return notFound();
    }

    const productData = docSnap.data();
    
    // Convertir les timestamps Firestore en strings
    const convertFirebaseTimestamps = (obj: any): any => {
      if (obj === null || typeof obj !== 'object') {
        return obj;
      }
      
      if (obj.toDate && typeof obj.toDate === 'function') {
        return obj.toDate().toISOString();
      }
      
      if (Array.isArray(obj)) {
        return obj.map(convertFirebaseTimestamps);
      }
      
      return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, convertFirebaseTimestamps(value)])
      );
    };

    const serializedData = convertFirebaseTimestamps(productData);
    
    const product: Product = {
      id: docSnap.id,
      ...serializedData,
      images: Array.isArray(serializedData.images) ? serializedData.images : [],
      features: Array.isArray(serializedData.features) ? serializedData.features : [],
      specifications: serializedData.specifications || {}
    };

    return <ProductDetailClient product={product} />;
  } catch (error) {
    console.error('Erreur Firestore:', error);
    return notFound();
  }
}

// "use client";
// import React, { useState } from 'react';
// import { Star, Heart, Share2, ShoppingCart, Truck, Shield, RotateCcw, Award, ChevronLeft, ChevronRight, Plus, Minus, Check } from 'lucide-react';
// import Link from 'next/link';
// import { getFirestore, doc, getDoc } from 'firebase/firestore';
// import { app } from '@/lib/firebase/config';
// import { notFound } from 'next/navigation';


// // Define the Product type according to your Firestore document structure
// interface Product {
//   // Example fields, adjust as needed
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
//     // Add other fields as per your Firestore product document
//   };
// }

// interface Params {
//   params: {
//     slug: string;
//   };
// }


// export default  async function ProductPage({ params }: Params) {
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedTab, setSelectedTab] = useState('description');
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const productId = params.slug.split('-')[0];
//   const db = getFirestore(app);
//   const docRef = doc(db, 'products', productId);
//   const docSnap = await getDoc(docRef);

//   if (!docSnap.exists()) {
//     return notFound();
//   }

//   const product = docSnap.data() as Product;


//   return (

//     <div className="min-h-screen mt-12 bg-gradient-to-br from-slate-50 to-blue-50">

//       <div className="max-w-7xl mx-auto px-4 py-8">

//         {/* Breadcrumb */}
//         <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
//           <span>Accueil</span>
//           <ChevronRight className="w-4 h-4" />
//           <span>Outillage</span>
//           <ChevronRight className="w-4 h-4" />
//           <span>Perceuses</span>
//           <ChevronRight className="w-4 h-4" />
//           <span className="text-blue-600 font-medium">Bosch GSB 13 RE</span>
//         </nav>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
//           {/* Images Section */}
//           <div className="space-y-4">
//             <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl">
//               <img
//                 src={product.images[selectedImage]}
//                 alt="Perceuse Bosch GSB 13 RE"
//                 className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-500"
//               />
//               <div className="absolute top-4 right-4 flex space-x-2">
//                 <button
//                   onClick={() => setIsWishlisted(!isWishlisted)}
//                   className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-700 hover:bg-red-50'
//                     }`}
//                 >
//                   <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
//                 </button>
//                 <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:bg-blue-50 transition-all duration-300">
//                   <Share2 className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>

//             <div className="flex space-x-2 overflow-x-auto pb-2">
//               {product.images.map((image, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedImage(index)}
//                   className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all duration-300 ${selectedImage === index
//                       ? 'ring-2 ring-blue-500 shadow-lg'
//                       : 'hover:shadow-md opacity-70 hover:opacity-100'
//                     }`}
//                 >
//                   <img src={image} alt={`Vue ${index + 1}`} className="w-full h-full object-cover" />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Product Info */}
//           <div className="space-y-6">
//             <div>
//               <div className="flex items-center space-x-2 mb-2">
//                 <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
//                   En stock
//                 </span>
//                 <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
//                   Livraison rapide
//                 </span>
//               </div>
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                 {product.shortDescription}
//               </h1>
//               <p className="text-gray-600 mb-4">
//                 {product.longDescription}
//               </p>

//               <div className="flex items-center space-x-4 mb-6">
//                 <div className="flex items-center">
//                   {[...Array(5)].map((_, i) => (
//                     <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                   ))}
//                   <span className="ml-2 text-sm text-gray-600">(127 avis)</span>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//               <div className="flex items-end space-x-4 mb-6">
//                 <span className="text-3xl font-bold text-blue-600">{product.price} €</span>
//                 <span className="text-lg text-gray-500 line-through">{product.oldPrice} €</span>
//                 <span className="bg-red-100 text-red-600 text-sm px-2 py-1 rounded-full font-medium">
//                   -25%
//                 </span>
//               </div>

//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-700 font-medium">Quantité:</span>
//                   <div className="flex items-center space-x-3">
//                     <button
//                       onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                       className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
//                     >
//                       <Minus className="w-4 h-4" />
//                     </button>
//                     <span className="px-4 py-2 bg-gray-50 rounded-lg font-medium min-w-[60px] text-center">
//                       {quantity}
//                     </span>
//                     <button
//                       onClick={() => setQuantity(quantity + 1)}
//                       className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
//                     >
//                       <Plus className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>

//                 <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2">
//                   <ShoppingCart className="w-5 h-5" />
//                   <Link href="/cart">
//                     <span>Ajouter au panier</span>
//                   </Link>
//                 </button>

//                 <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-4 px-6 rounded-xl transition-all duration-300">
//                   Acheter maintenant
//                 </button>
//               </div>
//             </div>

//             {/* Service Icons */}
//             <div className="grid grid-cols-2 gap-4">
//               <div className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
//                 <div className="p-2 bg-green-100 rounded-lg">
//                   <Truck className="w-5 h-5 text-green-600" />
//                 </div>
//                 <div>
//                   <p className="font-medium text-gray-900">{product.services.delivery.title}</p>
//                   <p className="text-sm text-gray-600">{product.services.delivery.description}</p>
//                 </div>
//               </div>

//               <div className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
//                 <div className="p-2 bg-blue-100 rounded-lg">
//                   <Shield className="w-5 h-5 text-blue-600" />
//                 </div>
//                 <div>
//                   <p className="font-medium text-gray-900">{product.services.warranty.title}</p>
//                   <p className="text-sm text-gray-600">{product.services.warranty.description}</p>
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
//                   className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-300 ${selectedTab === tab
//                       ? 'border-blue-500 text-blue-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700'
//                     }`}
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
//                     {product.longDescription || 'Aucune description disponible pour ce produit.'}
//                   </p>
//                 </div>

//                 <div>
//                   <h4 className="text-lg font-semibold mb-3">Caractéristiques principales</h4>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {product.features.map((feature, index) => (
//                       <div key={index} className="flex items-start space-x-3">
//                         <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
//                         <span className="text-gray-700">{feature}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {selectedTab === 'specifications' && (
//               <div>
//                 <h3 className="text-xl font-semibold mb-6">Fiche technique</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {Object.entries(product.specifications).map(([label, value], index) => (
//                     <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
//                       <span className="font-medium text-gray-700">{label}</span>
//                       <span className="text-gray-900 font-semibold">{value}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {selectedTab === 'reviews' && (
//               <div className="space-y-6">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-xl font-semibold">Avis clients</h3>
//                   <div className="flex items-center space-x-2">
//                     <div className="flex">
//                       {[...Array(5)].map((_, i) => (
//                         <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                       ))}
//                     </div>
//                     <span className="text-lg font-semibold">4.8/5</span>
//                     <span className="text-gray-600">(127 avis)</span>
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   {[
//                     { name: 'Marc D.', rating: 5, comment: 'Excellent produit, très robuste et efficace. Je recommande vivement !', date: '15 mars 2024' },
//                     { name: 'Sophie L.', rating: 5, comment: 'Parfaite pour mes travaux de bricolage. Bonne prise en main et puissante.', date: '8 mars 2024' },
//                     { name: 'Pierre M.', rating: 4, comment: 'Bonne perceuse, rapport qualité-prix intéressant. Livrée rapidement.', date: '28 février 2024' }
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
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }




































