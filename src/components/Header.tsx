import React from 'react';
import { Calendar } from 'lucide-react';

const Header: React.FC<{ title: string }> = ({ title }) => {
  return (
    <header className="bg-[#A5C0D0] p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calendar className="h-6 w-6 text-white" />
          <h1 className="text-xl font-bold text-white">Smart Scheduling</h1>
        </div>
        <h2 className="text-lg font-medium text-white">{title}</h2>
      </div>
    </header>
  );
};

export default Header;