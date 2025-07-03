import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, ShoppingCart, Package, Users } from 'lucide-react';
import StatCard from '../components/statCard';

const salesData = [
    { month: 'Jan', sales: 4000, orders: 240 },
    { month: 'Fév', sales: 3000, orders: 180 },
    { month: 'Mar', sales: 5000, orders: 300 },
    { month: 'Avr', sales: 4500, orders: 270 },
    { month: 'Mai', sales: 6000, orders: 360 },
    { month: 'Jun', sales: 7500, orders: 450 },
];

const categoryData = [
    { name: 'Électronique', value: 45, color: '#3B82F6' },
    { name: 'Téléphone', value: 30, color: '#10B981' },
    { name: 'Audio', value: 15, color: '#F59E0B' },
    { name: 'Tablette', value: 10, color: '#EF4444' },
];

const DashboardSection = () => {
    return (
        <div className="space-y-6 animate-fade-in">
            {/* Statistiques principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Ventes totales" value="€47,500" icon={TrendingUp} color="text-blue-600" change="12" />
                <StatCard title="Commandes" value="1,250" icon={ShoppingCart} color="text-green-600" change="8" />
                <StatCard title="Produits" value="145" icon={Package} color="text-purple-600" change="5" />
                <StatCard title="Clients" value="890" icon={Users} color="text-yellow-600" change="15" />
            </div>

            {/* Graphiques */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                        <BarChart className="w-5 h-5 mr-2 text-blue-600" />
                        Évolution des ventes
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" stroke="#666" />
                            <YAxis stroke="#666" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                                }}
                            />
                            <Bar dataKey="sales" fill="url(#blueGradient)" radius={[4, 4, 0, 0]} />
                            <defs>
                                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#3B82F6" />
                                    <stop offset="100%" stopColor="#1E40AF" />
                                </linearGradient>
                            </defs>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                        <PieChart className="w-5 h-5 mr-2 text-green-600" />
                        Répartition par catégorie
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                        {categoryData.map((item, index) => (
                            <div key={index} className="flex items-center">
                                <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: item.color }}></div>
                                <span className="text-sm text-gray-600">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardSection;