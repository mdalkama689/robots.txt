import React from 'react';
import { PlusCircle, HelpCircle, X } from 'lucide-react';
import { validateSitemap } from '../utils/robotsTxtUtils';

interface SitemapSectionProps {
  sitemaps: string[];
  onUpdate: (sitemaps: string[]) => void;
}

const SitemapSection: React.FC<SitemapSectionProps> = ({ sitemaps, onUpdate }) => {
  const addSitemap = () => {
    onUpdate([...sitemaps, '']);
  };

  const updateSitemap = (index: number, value: string) => {
    const newSitemaps = [...sitemaps];
    newSitemaps[index] = value;
    onUpdate(newSitemaps);
  };

  const removeSitemap = (index: number) => {
    const newSitemaps = [...sitemaps];
    newSitemaps.splice(index, 1);
    onUpdate(newSitemaps);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 mb-6 border border-gray-200 transition-all hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h3 className="text-lg font-semibold text-gray-800">Sitemaps</h3>
          <div className="relative ml-2 group">
            <HelpCircle size={16} className="text-gray-400 cursor-help" />
            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-64 z-10">
              The Sitemap directive tells search engines where to find your XML sitemap(s). You can include multiple sitemaps.
            </div>
          </div>
        </div>
        <button 
          onClick={addSitemap}
          className="text-blue-500 hover:text-blue-700 flex items-center text-sm transition-colors"
        >
          <PlusCircle size={16} className="mr-1" /> Add Sitemap
        </button>
      </div>
      
      {sitemaps.map((sitemap, index) => (
        <div key={`sitemap-${index}`} className="flex items-center mb-2">
          <input
            type="text"
            value={sitemap}
            onChange={(e) => updateSitemap(index, e.target.value)}
            placeholder="https://example.com/sitemap.xml"
            className={`flex-grow p-2 border ${!validateSitemap(sitemap) && sitemap !== '' ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-l focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
          />
          <button 
            onClick={() => removeSitemap(index)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-r border-y border-r border-gray-300 transition-all"
            aria-label="Remove sitemap"
          >
            <X size={18} />
          </button>
        </div>
      ))}
      {sitemaps.length === 0 && (
        <p className="text-gray-500 text-sm italic">No sitemaps added</p>
      )}
    </div>
  );
};

export default SitemapSection;