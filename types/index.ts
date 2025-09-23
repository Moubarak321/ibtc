// Interface pour les produits
export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  category: string;
  promotion?:string;
  brand: string;
  images: string[];
  shortDescription: string;
  longDescription: string;
  specifications: Record<string, string>; // Ou { [key: string]: string }
  features: string[];
  inStock: boolean;
  fastDelivery: boolean;
  services: {
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

// Interface pour les commandes
export interface Order {
  id: number | string;
  customer: string;
  total: number;
  status: 'Livré' | 'En cours' | 'Expédié' | 'Confirmé' | 'Annulé';
  date: string;
  items: number;
  products?: Array<{
    id: string;
    quantity: number;
    price: number;
  }>;
}

// Interface pour les clients
export interface Customer {
  id: number | string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  joinDate: string;
  status: 'active' | 'inactive';
  address?: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
}

// Props pour ProductModal
 export interface ProductModalProps {
  selectedProduct?: Product | null;
  setShowProductModal: (show: boolean) => void;
  handleSaveProduct: () => void;
  // Note: prefillForm a été déplacée dans le composant donc n'est plus dans les props
}

// Props pour StatCard
export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  change?: string | number;
}

// Autres interfaces utiles
export interface Category {
  id: string;
  name: string;
  parentId: string | null;
  image?: string;
}

export interface SalesData {
  month: string;
  sales: number;
  orders: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
}