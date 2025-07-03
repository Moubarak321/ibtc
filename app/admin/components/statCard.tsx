import React from 'react';
import { TrendingUp } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ElementType;
    color: string;
    change?: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, change }) => {
    return (
        <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
                    <p className={`text-3xl font-bold ${color}`}>
                        {value}
                    </p>
                    {change && (
                        <p className="text-sm text-green-600 mt-2 flex items-center">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            +{change}% ce mois
                        </p>
                    )}
                </div>
                <div className={`p-3 rounded-full bg-gradient-to-br ${
                    color === 'text-blue-600' ? 'from-blue-100 to-blue-200' : 
                    color === 'text-green-600' ? 'from-green-100 to-green-200' : 
                    color === 'text-purple-600' ? 'from-purple-100 to-purple-200' : 
                    'from-yellow-100 to-yellow-200'
                }`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                </div>
            </div>
        </div>
    );
};

export default StatCard;