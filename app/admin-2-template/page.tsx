"use client";
import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  Eye,
  DollarSign,
  Activity,
  Clock,
  Star
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([
    { id: 1, name: 'iPhone 15 Pro', price: 1199, stock: 25, category: 'Electronics', status: 'active' },
    { id: 2, name: 'MacBook Air M2', price: 999, stock: 12, category: 'Electronics', status: 'active' },
    { id: 3, name: 'AirPods Pro', price: 249, stock: 45, category: 'Audio', status: 'active' },
    { id: 4, name: 'iPad Pro', price: 799, stock: 18, category: 'Electronics', status: 'inactive' }
  ]);
  
  const [orders, setOrders] = useState([
    { id: '#ORD-001', customer: 'Jean Dupont', total: 1199, status: 'completed', date: '2024-12-28' },
    { id: '#ORD-002', customer: 'Marie Martin', total: 999, status: 'pending', date: '2024-12-29' },
    { id: '#ORD-003', customer: 'Pierre Durand', total: 249, status: 'processing', date: '2024-12-30' },
    { id: '#ORD-004', customer: 'Sophie Bernard', total: 799, status: 'shipped', date: '2024-12-30' }
  ]);

  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const stats = {
    totalRevenue: 125430,
    totalOrders: 342,
    totalProducts: products.length,
    totalCustomers: 1250
  };

  const statusList = ['active', 'inactive', 'completed', 'pending', 'processing', 'shipped'] as const;
  type Status = typeof statusList[number];

  const getStatusColor = (status: string) => {
    const colors: Record<Status, string> = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-red-100 text-red-800',
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800'
    };
    return colors[status as Status] || 'bg-gray-100 text-gray-800';
  };

  type StatCardProps = {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    title: string;
    value: React.ReactNode;
    change: string;
    color: string;
  };

  const StatCard = ({ icon: Icon, title, value, change, color }: StatCardProps) => (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${color} p-6 shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-white mt-2">{value}</p>
          <p className="text-white/80 text-sm mt-1">+{change}% ce mois</p>
        </div>
        <div className="bg-white/20 p-3 rounded-xl">
          <Icon className="h-8 w-8 text-white" />
        </div>
      </div>
      <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full"></div>
      <div className="absolute -right-2 -bottom-2 w-16 h-16 bg-white/10 rounded-full"></div>
    </div>
  );

  const ProductModal = () => (
    <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center transition-all duration-300 ${showProductModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`bg-white rounded-2xl p-8 w-full max-w-md mx-4 transform transition-all duration-300 ${showProductModal ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          {editingProduct ? 'Modifier le produit' : 'Nouveau produit'}
        </h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nom du produit</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Entrez le nom du produit"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prix (€)</label>
              <input 
                type="number" 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
              <input 
                type="number" 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="0"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
            <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
              <option>Electronics</option>
              <option>Audio</option>
              <option>Accessoires</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowProductModal(false)}
              className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-200 font-medium"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium transform hover:scale-105"
            >
              {editingProduct ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600 mt-1">Vue d'ensemble de votre boutique</p>
        </div>
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium">
          Aujourd'hui: 30 Juin 2025
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={DollarSign}
          title="Revenus totaux"
          value={`€${stats.totalRevenue.toLocaleString()}`}
          change="12.5"
          color="from-emerald-500 to-teal-600"
        />
        <StatCard
          icon={ShoppingCart}
          title="Commandes"
          value={stats.totalOrders}
          change="8.2"
          color="from-blue-500 to-indigo-600"
        />
        <StatCard
          icon={Package}
          title="Produits"
          value={stats.totalProducts}
          change="3.1"
          color="from-purple-500 to-pink-600"
        />
        <StatCard
          icon={Users}
          title="Clients"
          value={stats.totalCustomers}
          change="15.3"
          color="from-orange-500 to-red-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
            Ventes récentes
          </h3>
          <div className="space-y-4">
            {orders.slice(0, 3).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                <div>
                  <p className="font-semibold text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">€{order.total}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Activity className="h-6 w-6 text-green-600 mr-2" />
            Activité récente
          </h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-900">Nouvelle commande reçue</p>
                <p className="text-xs text-gray-500">il y a 2 minutes</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-900">Produit mis en stock</p>
                <p className="text-xs text-gray-500">il y a 15 minutes</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-900">Nouveau client inscrit</p>
                <p className="text-xs text-gray-500">il y a 1 heure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des produits</h1>
          <p className="text-gray-600 mt-1">Gérez votre catalogue de produits</p>
        </div>
        <button
          onClick={() => setShowProductModal(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
        >
          <Plus className="h-5 w-5" />
          Nouveau produit
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filtres
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Produit</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Prix</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Stock</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Catégorie</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Statut</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.filter(product => 
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg mr-4">
                        {product.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">ID: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-bold text-gray-900">€{product.price}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      product.stock > 20 ? 'bg-green-100 text-green-800' : 
                      product.stock > 10 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.stock} unités
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-700">{product.category}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors duration-200">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                        <Trash2 className="h-4 w-4" />
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

  const renderOrders = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestion des commandes</h1>
        <p className="text-gray-600 mt-1">Suivez et gérez toutes vos commandes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">En attente</p>
              <p className="text-2xl font-bold text-yellow-600">8</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">En cours</p>
              <p className="text-2xl font-bold text-blue-600">15</p>
            </div>
            <Activity className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Expédiées</p>
              <p className="text-2xl font-bold text-purple-600">23</p>
            </div>
            <Package className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Terminées</p>
              <p className="text-2xl font-bold text-green-600">296</p>
            </div>
            <Star className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Commande</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Client</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Total</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Statut</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Date</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="py-4 px-6">
                    <span className="font-bold text-blue-600">{order.id}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                        {order.customer.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-gray-900">{order.customer}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-bold text-gray-900">€{order.total}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-700">{order.date}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors duration-200">
                        <Edit className="h-4 w-4" />
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
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-xl border-r border-gray-100 min-h-screen">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">AdminPro</h2>
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
            </div>
            
            <nav className="space-y-2">
              {[
                { id: 'dashboard', label: 'Tableau de bord', icon: BarChart3 },
                { id: 'products', label: 'Produits', icon: Package },
                { id: 'orders', label: 'Commandes', icon: ShoppingCart }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'products' && renderProducts()}
          {activeTab === 'orders' && renderOrders()}
        </div>
      </div>

      <ProductModal />
    </div>
  );
};

export default AdminDashboard;