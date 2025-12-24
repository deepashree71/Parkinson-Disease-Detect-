import React from 'react';
import { Brain } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">ParkiScan</h1>
              <p className="text-sm text-gray-600">Advanced Early Detection System</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Powered Analysis</div>
            <div className="text-xs text-gray-500">With Exercise Therapy</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
