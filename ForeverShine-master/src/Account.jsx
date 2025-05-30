import React from 'react';
import { UserIcon } from '@heroicons/react/24/outline';

export default function Account() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center">
            <UserIcon className="w-10 h-10 text-teal-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
            <p className="text-gray-600">Welcome to your Forever Shine account</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Account Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Account Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          </div>

          {/* Order History */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-600 text-center">No orders yet</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button className="bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
} 