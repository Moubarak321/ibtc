"use client";
import React, { useState } from 'react';
import { Users, Search, Filter, Plus, Mail, Phone, Star, Edit } from 'lucide-react';

interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    orders: number;
    joinDate: string;
    status: 'active' | 'inactive';
}

const CustomersSection = () => {
    const [customers] = useState<Customer[]>([
        { id: 1, name: 'Marie Dubois', email: 'marie@example.com', phone: '06 12 34 56 78', orders: 12, joinDate: '2023-01-15', status: 'active' },
        { id: 2, name: 'Jean Martin', email: 'jean@example.com', phone: '06 23 45 67 89', orders: 5, joinDate: '2023-03-22', status: 'active' },
        { id: 3, name: 'Sophie Leroux', email: 'sophie@example.com', phone: '07 12 34 56 78', orders: 8, joinDate: '2023-05-10', status: 'inactive' },
        { id: 4, name: 'Pierre Moreau', email: 'pierre@example.com', phone: '06 98 76 54 32', orders: 3, joinDate: '2023-07-18', status: 'active' },
    ]);

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold">Gestion des clients</h2>
                <div className="flex gap-2">
                    <button className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                        <Plus className="w-4 h-4 mr-2" />
                        Nouveau client
                    </button>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Rechercher un client..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                </div>
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtres
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left py-4 px-6 font-medium text-gray-600">Client</th>
                                <th className="text-left py-4 px-6 font-medium text-gray-600">Contact</th>
                                <th className="text-left py-4 px-6 font-medium text-gray-600">Commandes</th>
                                <th className="text-left py-4 px-6 font-medium text-gray-600">Date d'inscription</th>
                                <th className="text-left py-4 px-6 font-medium text-gray-600">Statut</th>
                                <th className="text-left py-4 px-6 font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer) => (
                                <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                                    <td className="py-4 px-6 font-medium">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mr-3 text-sm font-medium">
                                                {customer.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            {customer.name}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="space-y-1">
                                            <div className="flex items-center text-sm text-gray-600">
                                                <Mail className="w-4 h-4 mr-2" />
                                                {customer.email}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <Phone className="w-4 h-4 mr-2" />
                                                {customer.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center">
                                            <span className="font-medium mr-2">{customer.orders}</span>
                                            <span className="text-gray-500 text-sm">commandes</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-gray-600">{customer.joinDate}</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {customer.status === 'active' ? 'Actif' : 'Inactif'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex gap-2">
                                            <button className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors duration-200">
                                                <Mail className="w-4 h-4" />
                                            </button>
                                            <button className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors duration-200">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-1 text-yellow-600 hover:bg-yellow-100 rounded transition-colors duration-200">
                                                <Star className="w-4 h-4" />
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

export default CustomersSection;