"use client";
import React, { useState } from 'react';
import { ShoppingCart, Package, TrendingUp, Star, Filter, Calendar, Download, Eye, Edit, Search } from 'lucide-react';

interface Order {
    id: number;
    customer: string;
    total: number;
    status: string;
    date: string;
    items: number;
}

const OrdersSection = () => {
    const [orders] = useState<Order[]>([
        { id: 1001, customer: 'Marie Dubois', total: 2748, status: 'Livré', date: '2024-06-25', items: 2 },
        { id: 1002, customer: 'Jean Martin', total: 1448, status: 'En cours', date: '2024-06-26', items: 3 },
        { id: 1003, customer: 'Sophie Leroux', total: 599, status: 'Expédié', date: '2024-06-27', items: 1 },
        { id: 1004, customer: 'Pierre Moreau', total: 849, status: 'Confirmé', date: '2024-06-28', items: 2 },
    ]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Livré': return 'bg-green-100 text-green-800';
            case 'En cours': return 'bg-blue-100 text-blue-800';
            case 'Expédié': return 'bg-purple-100 text-purple-800';
            case 'Confirmé': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
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
};

export default OrdersSection;