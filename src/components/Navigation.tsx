import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Home } from 'lucide-react';

export function Navigation() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link
              to="/"
              className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-blue-500"
            >
              <Home className="h-5 w-5 mr-2" />
              Dashboard
            </Link>
            <Link
              to="/heroes"
              className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-blue-500"
            >
              <Users className="h-5 w-5 mr-2" />
              Heroes
            </Link>
          </div>
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-500" />
          </div>
        </div>
      </div>
    </nav>
  );
}