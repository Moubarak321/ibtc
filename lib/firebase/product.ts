// // lib/firebase/products.ts
// import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
// import { db } from './config';

// interface Product {
//   id: string; // Correspond à l'ID du document Firestore
//   name: string;
//   price: number;
//   oldPrice?: number;
//   discount?: number;
//   category: string;
//   subcategory?: string;
//   brand?: string;
//   images: string[];
//   shortDescription?: string;
//   longDescription?: string;
//   specifications: Record<string, string>;
//   features: string[];
//   inStock: boolean;
//   vedette?: boolean;
//   featured?: boolean;
//   fastDelivery?: boolean;
//   rating?: number;
//   reviews?: number;
//   seller?: string;
//   services: {
//     delivery: {
//       title: string;
//       description: string;
//       available?: boolean;
//     };
//     warranty: {
//       title: string;
//       description: string;
//       duration?: number;
//     };
//   };
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// /**
//  * Récupère un produit par son ID de document Firestore
//  */
// export async function getProductById(id: string): Promise<Product | null> {
//   if (!id) {
//     console.error('Aucun ID fourni');
//     return null;
//   }

//   try {
//     const productsRef = collection(db, 'products');

//     const docRef = doc(productsRef, id);
//     const docSnap = await getDoc(docRef);

//     if (!docSnap.exists()) {
//       console.warn(`Aucun produit trouvé avec l'ID: ${id}`);
//       return null;
//     }

//     return formatProductDocument(docSnap);
//   } catch (error) {
//     console.error('Erreur lors de la récupération du produit:', error);
//     return null;
//   }
// }

// /**
//  * Récupère plusieurs produits par leurs IDs
//  */
// // export async function getProductsByIds(ids: string[]): Promise<Product[]> {
// //   if (!ids.length) return [];

// //   try {
// //     const productsRef = collection(db, 'products');
// //     const q = query(productsRef, where('__name__', 'in', ids.slice(0, 10))); // Firestore limite à 10 IDs
// //     const querySnapshot = await getDocs(q);

// //     return querySnapshot.docs.map(formatProductDocument);
// //   } catch (error) {
// //     console.error('Erreur lors de la récupération des produits:', error);
// //     return [];
// //   }
// // }

// /**
//  * Formate un document Firestore en objet Product
//  */
// function formatProductDocument(docSnap: any): Product {
//   const data = docSnap.data();
//   const id = docSnap.id;

//   return {
//     id,
//     name: data.name || 'Nom inconnu',
//     price: data.price || 0,
//     oldPrice: data.oldPrice || undefined,
//     discount: data.discount || undefined,
//     category: data.category || 'Non catégorisé',
//     subcategory: data.subcategory || undefined,
//     brand: data.brand || undefined,
//     images: Array.isArray(data.images) ? data.images : [],
//     shortDescription: data.shortDescription || '',
//     longDescription: data.longDescription || '',
//     specifications: data.specifications || {},
//     features: Array.isArray(data.features) ? data.features : [],
//     inStock: data.inStock !== undefined ? data.inStock : true,
//     vedette: data.vedette || false,
//     featured: data.featured || false,
//     fastDelivery: data.fastDelivery || false,
//     rating: data.rating || 0,
//     reviews: data.reviews || 0,
//     seller: data.seller || undefined,
//     services: {
//       delivery: {
//         title: data.services?.delivery?.title || 'Livraison standard',
//         description: data.services?.delivery?.description || '',
//         available: data.services?.delivery?.available ?? true
//       },
//       warranty: {
//         title: data.services?.warranty?.title || 'Garantie',
//         description: data.services?.warranty?.description || '',
//         duration: data.services?.warranty?.duration || 12
//       }
//     },
//     createdAt: data.createdAt?.toDate() || undefined,
//     updatedAt: data.updatedAt?.toDate() || undefined
//   };
// }

// /**
//  * Formate un prix pour l'affichage
//  */
// export function formatPrice(price: number): string {
//   return new Intl.NumberFormat('fr-FR', {
//     style: 'currency',
//     currency: 'EUR'
//   }).format(price);
// }