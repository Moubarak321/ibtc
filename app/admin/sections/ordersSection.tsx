"use client";
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Package, TrendingUp, Star, Filter, Calendar, Download, Eye, Edit, Search, X, User, MapPin, Phone, Mail, MessageCircle, Loader2, CheckCircle, Clock, Truck, AlertCircle, ChevronRight, ChevronsRight, ChevronLeft, ChevronsLeft ,CreditCard, PersonStanding} from 'lucide-react';
import { collection, getDocs, doc, updateDoc, query, orderBy, where, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/client-config'; // Ajustez le chemin selon votre configuration

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface Customer {
          
    lastName: string,
    firstName: string,
    email: string,
    phone: string,
    deliveryAddress: string,
    deliveryDeadline: string,
    paymentMethod: string,
    message?: string;

}

interface Order {
    id: string;
    customer: Customer;
    items: CartItem[];
    total: number;
    status: string;
    createdAt: Timestamp;
}

const OrdersSection = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingOrder, setEditingOrder] = useState<Order | null>(null);
    const [newStatus, setNewStatus] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');

    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(10); // Nombre d'éléments par page

    const statusOptions = [
        { value: 'en_attente', label: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
        { value: 'confirme', label: 'Confirmé', color: 'bg-blue-100 text-blue-800' },
        { value: 'expedie', label: 'Expédié', color: 'bg-purple-100 text-purple-800' },
        { value: 'livre', label: 'Livré', color: 'bg-green-100 text-green-800' },
        { value: 'annule', label: 'Annulé', color: 'bg-red-100 text-red-800' }
    ];

    const getStatusColor = (status: string) => {
        const statusOption = statusOptions.find(s => s.value === status);
        return statusOption ? statusOption.color : 'bg-gray-100 text-gray-800';
    };

    const getStatusLabel = (status: string) => {
        const statusOption = statusOptions.find(s => s.value === status);
        return statusOption ? statusOption.label : status;
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'en_attente': return <Clock className="w-4 h-4" />;
            case 'confirme': return <CheckCircle className="w-4 h-4" />;
            case 'expedie': return <Truck className="w-4 h-4" />;
            case 'livre': return <Star className="w-4 h-4" />;
            case 'annule': return <AlertCircle className="w-4 h-4" />;
            default: return <Package className="w-4 h-4" />;
        }
    };

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const ordersQuery = query(
                collection(db, 'cart'),
                orderBy('createdAt', 'desc')
            );
            
            const querySnapshot = await getDocs(ordersQuery);
            const ordersData: Order[] = [];
            
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                ordersData.push({
                    id: doc.id,
                    customer: data.customer,
                    items: data.items,
                    total: data.total,
                    status: data.status,
                    createdAt: data.createdAt
                });
            });
            
            setOrders(ordersData);
        } catch (error) {
            console.error('Erreur lors du chargement des commandes:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId: string, newStatus: string) => {
        try {
            const orderRef = doc(db, 'cart', orderId);
            await updateDoc(orderRef, {
                status: newStatus
            });
            
            // Mettre à jour l'état local
            setOrders(prevOrders => 
                prevOrders.map(order => 
                    order.id === orderId 
                        ? { ...order, status: newStatus }
                        : order
                )
            );
            
            setShowEditModal(false);
            setEditingOrder(null);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du statut:', error);
        }
    };

    const formatDate = (timestamp: Timestamp) => {
        return timestamp.toDate().toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XOF'
        }).format(price);
    };

    const getOrderStats = () => {
        const total = orders.length;
        const pending = orders.filter(o => o.status === 'en_attente').length;
        const shipped = orders.filter(o => o.status === 'expedie').length;
        const delivered = orders.filter(o => o.status === 'livre').length;
        
        return { total, pending, shipped, delivered };
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = searchTerm === '' || 
            order.customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        
        const matchesDate = dateFilter === 'all' || (() => {
            const orderDate = order.createdAt.toDate();
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            const lastWeek = new Date(today);
            lastWeek.setDate(today.getDate() - 7);
            
            switch (dateFilter) {
                case 'today':
                    return orderDate.toDateString() === today.toDateString();
                case 'yesterday':
                    return orderDate.toDateString() === yesterday.toDateString();
                case 'week':
                    return orderDate >= lastWeek;
                default:
                    return true;
            }
        })();
        
        return matchesSearch && matchesStatus && matchesDate;
    });

    const exportOrders = () => {
        const csvContent = [
            ['ID', 'Client', 'Email', 'Téléphone', 'Total', 'Statut', 'Date'],
            ...filteredOrders.map(order => [
                order.id,
                `${order.customer.firstName} ${order.customer.lastName}`,
                order.customer.email,
                order.customer.phone,
                order.total,
                getStatusLabel(order.status),
                formatDate(order.createdAt)
            ])
        ].map(row => row.join(',')).join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'commandes.csv';
        link.click();
        window.URL.revokeObjectURL(url);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const stats = getOrderStats();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-96">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }


    // Pagination logic
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
    const firstPage = () => setCurrentPage(1);
    const lastPage = () => setCurrentPage(totalPages);


    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold">Gestion des commandes</h2>
                <div className="flex gap-2">
                    <select 
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                        <option value="all">Toutes les dates</option>
                        <option value="today">Aujourd'hui</option>
                        <option value="yesterday">Hier</option>
                        <option value="week">Cette semaine</option>
                    </select>
                    <button 
                        onClick={exportOrders}
                        className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Exporter
                    </button>
                    <button 
                        onClick={fetchOrders}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        Actualiser
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total commandes</p>
                            <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
                        </div>
                        <ShoppingCart className="w-8 h-8 text-blue-600" />
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">En attente</p>
                            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                        </div>
                        <Package className="w-8 h-8 text-yellow-600" />
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Expédiées</p>
                            <p className="text-2xl font-bold text-purple-600">{stats.shipped}</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-purple-600" />
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Livrées</p>
                            <p className="text-2xl font-bold text-green-600">{stats.delivered}</p>
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
                                placeholder="Rechercher par client, email, ou ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        >
                            <option value="all">Tous les statuts</option>
                            {statusOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
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
                            {currentOrders.map((order) => (
                                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                                    <td className="py-4 px-6 font-medium">#{order.id.substring(0, 8)}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mr-3 text-sm font-medium">
                                                {order.customer.firstName[0]}{order.customer.lastName[0]}
                                            </div>
                                            <div>
                                                <div className="font-medium">{order.customer.firstName} {order.customer.lastName}</div>
                                                <div className="text-sm text-gray-500">{order.customer.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">{order.items.length} articles</td>
                                    <td className="py-4 px-6 font-bold">{formatPrice(order.total)}</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getStatusColor(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            {getStatusLabel(order.status)}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-gray-600">{formatDate(order.createdAt)}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => {
                                                    setSelectedOrder(order);
                                                    setShowOrderModal(true);
                                                }}
                                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                                                title="Voir les détails"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    setEditingOrder(order);
                                                    setNewStatus(order.status);
                                                    setShowEditModal(true);
                                                }}
                                                className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors duration-200"
                                                title="Modifier le statut"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredOrders.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 px-4 py-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">
                Affichage de {indexOfFirstOrder + 1} à {Math.min(indexOfLastOrder, filteredOrders.length)} sur {filteredOrders.length} commandes
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

            {/* Modal de détails de commande */}
            {showOrderModal && selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold">Détails de la commande #{selectedOrder.id.substring(0, 8)}</h3>
                            <button 
                                onClick={() => setShowOrderModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-6">
                            {/* Informations client */}
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    Informations client
                                </h4>
                                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-gray-500" />
                                        <strong>Nom:</strong> {selectedOrder.customer.firstName} {selectedOrder.customer.lastName}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-gray-500" />
                                        <strong>Email:</strong> {selectedOrder.customer.email}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-gray-500" />
                                        <strong>Téléphone:</strong> {selectedOrder.customer.phone}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-gray-500" />  
                                        <strong>Adresse de livraison:</strong> {selectedOrder.customer.deliveryAddress} 
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-gray-500" />
                                        <strong>Delai de livraison:</strong> {selectedOrder.customer.deliveryDeadline}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CreditCard className="w-4 h-4 text-gray-500" />
                                        <strong>Mode de paiement:</strong> {selectedOrder.customer.paymentMethod}
                                    </div>
                                    {selectedOrder.customer.message && (
                                        <div className="flex items-start gap-2">
                                            <MessageCircle className="w-4 h-4 text-gray-500 mt-0.5" />
                                            <div>
                                                <strong>Message:</strong> {selectedOrder.customer.message}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Articles commandés */}
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <Package className="w-5 h-5" />
                                    Articles commandés
                                </h4>
                                <div className="space-y-2">
                                    {selectedOrder.items.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                            <div>
                                                <div className="font-medium">{item.name}</div>
                                                <div className="text-sm text-gray-500">Quantité: {item.quantity}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-medium">{formatPrice(item.price)}</div>
                                                <div className="text-sm text-gray-500">
                                                    Total: {formatPrice(item.price * item.quantity)}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Résumé */}
                            <div className="border-t pt-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium">Statut actuel:</span>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(selectedOrder.status)}`}>
                                        {getStatusIcon(selectedOrder.status)}
                                        {getStatusLabel(selectedOrder.status)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium">Date de commande:</span>
                                    <span>{formatDate(selectedOrder.createdAt)}</span>
                                </div>
                                <div className="flex justify-between items-center text-lg font-bold">
                                    <span>Total:</span>
                                    <span>{formatPrice(selectedOrder.total)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal d'édition du statut */}
            {showEditModal && editingOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl max-w-md w-full mx-4">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold">Modifier le statut</h3>
                            <button 
                                onClick={() => setShowEditModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <div className="p-6">
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 mb-2">
                                    Commande #{editingOrder.id.substring(0, 8)}
                                </p>
                                <p className="font-medium">
                                    {editingOrder.customer.firstName} {editingOrder.customer.lastName}
                                </p>
                            </div>
                            
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-gray-700">
                                    Nouveau statut
                                </label>
                                <select
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    {statusOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setShowEditModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={() => updateOrderStatus(editingOrder.id, newStatus)}
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Confirmer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrdersSection;
