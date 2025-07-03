import React from 'react';
import { TrendingUp, Package, ShoppingCart, Users } from 'lucide-react';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
    return (
        <div className="fixed mt-12 left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-lg z-40">
            <div className="p-6">
                <div className="flex items-center mb-8">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                        <Package className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        AdminPro
                    </h1>
                </div>

                <nav className="space-y-2">
                    {[
                        { id: 'dashboard', label: 'Tableau de bord', icon: TrendingUp },
                        { id: 'products', label: 'Produits', icon: Package },
                        { id: 'orders', label: 'Commandes', icon: ShoppingCart },
                        { id: 'customers', label: 'Clients', icon: Users },
                    ].map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                                activeTab === id
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                            }`}
                        >
                            <Icon className="w-5 h-5 mr-3" />
                            {label}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;