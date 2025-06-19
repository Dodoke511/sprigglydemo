'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import { FaLeaf, FaSeedling, FaTree, FaChartLine } from 'react-icons/fa';
import Link from 'next/link';
import SettingsPage from '../../components/SettingsPage';
import ProfilePage from '../../components/ProfilePage';
import LeaderboardPage from '../../components/LeaderboardPage';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('Home');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <FaLeaf className="h-8 w-8 text-green-600 mr-2" />
              <h1 className="text-xl font-semibold text-gray-800">Spriggly Garden</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {session?.user?.name}</span>
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
          {/* Dashboard Navigation Bar (just below Spriggly Garden) */}
          <div className="flex justify-center items-center gap-8">
            <button
              className={`px-4 py-2 rounded-md font-semibold focus:outline-none transition-colors text-blue-700 hover:bg-blue-100 ${activeSection === 'Home' ? 'bg-blue-100' : ''}`}
              onClick={() => setActiveSection('Home')}
              type="button"
            >
              Home
            </button>
            <button
              className={`px-4 py-2 rounded-md font-semibold focus:outline-none transition-colors text-blue-700 hover:bg-blue-100 ${activeSection === 'Marketplace' ? 'bg-blue-100' : ''}`}
              onClick={() => setActiveSection('Marketplace')}
              type="button"
            >
              Marketplace
            </button>
            <button
              className={`px-4 py-2 rounded-md font-semibold focus:outline-none transition-colors text-blue-700 hover:bg-blue-100 ${activeSection === 'Leaderboard' ? 'bg-blue-100' : ''}`}
              onClick={() => setActiveSection('Leaderboard')}
              type="button"
            >
              Leaderboard
            </button>
            <button
              className={`px-4 py-2 rounded-md font-semibold focus:outline-none transition-colors text-blue-700 hover:bg-blue-100 ${activeSection === 'Profile' ? 'bg-blue-100' : ''}`}
              onClick={() => setActiveSection('Profile')}
              type="button"
            >
              Profile
            </button>
            <button
              className={`px-4 py-2 rounded-md font-semibold focus:outline-none transition-colors text-blue-700 hover:bg-blue-100 ${activeSection === 'Settings' ? 'bg-blue-100' : ''}`}
              onClick={() => setActiveSection('Settings')}
              type="button"
            >
              Settings
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {activeSection === 'Settings' ? (
          <SettingsPage />
        ) : activeSection === 'Profile' ? (
          <ProfilePage user={session?.user} />
        ) : activeSection === 'Leaderboard' ? (
          <LeaderboardPage />
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-600">
                    <FaSeedling className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Plants</p>
                    <p className="text-2xl font-semibold text-gray-900">24</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <FaTree className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Mature Plants</p>
                    <p className="text-2xl font-semibold text-gray-900">12</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                    <FaChartLine className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                    <p className="text-2xl font-semibold text-gray-900">+15%</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                    <FaLeaf className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Harvest Ready</p>
                    <p className="text-2xl font-semibold text-gray-900">8</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Garden Overview */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Garden Overview</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-800">Tomato Plants</h3>
                      <p className="text-sm text-gray-600">Ready in 3 days</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Growing</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-800">Carrots</h3>
                      <p className="text-sm text-gray-600">Ready in 5 days</p>
                    </div>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Seeding</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-800">Lettuce</h3>
                      <p className="text-sm text-gray-600">Ready to harvest</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Harvest</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <button className="w-full bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
                    Plant New Seeds
                  </button>
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                    Water Plants
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
