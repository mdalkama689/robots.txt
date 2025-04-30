import React from 'react';
import { Bot } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Bot size={28} className="mr-3" />
          <h1 className="text-xl font-bold">Robots.txt Generator</h1>
        </div>
        <div>
          <a 
            href="https://developers.google.com/search/docs/crawling-indexing/robots/intro" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white text-sm transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;