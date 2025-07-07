"use client";
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { app } from '@/lib/firebase/client-config';

import DashboardSection from './sections/dashboardSection';
import ProductsSection from './sections/productsSection';
import OrdersSection from './sections/ordersSection';
import CustomersSection from './sections/customersSection';
import Sidebar from './components/sidebar';

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const auth = getAuth(app);

    // Vérification de l'authentification
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setLoading(false);
            } else {
                router.push('/login');
            }
        });

        return () => unsubscribe();
    }, [auth, router]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/login');
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-600">Vérification de l'authentification...</p>
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen mt-12 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <div className="ml-64 p-8">
                <div className="max-w-7xl mx-auto">
                    {activeTab === 'dashboard' && <DashboardSection />}
                    {activeTab === 'products' && <ProductsSection />}
                    {activeTab === 'orders' && <OrdersSection />}
                    {activeTab === 'customers' && <CustomersSection />}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;