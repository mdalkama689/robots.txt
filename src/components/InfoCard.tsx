import React from 'react';
import { Info } from 'lucide-react';

const InfoCard: React.FC = () => {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <Info className="h-5 w-5 text-blue-500" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-blue-800">What is robots.txt?</h3>
          <div className="mt-2 text-sm text-blue-700">
            <p>
              A robots.txt file tells search engine crawlers which URLs the crawler can access on your site. 
              This is used mainly to avoid overloading your site with requests.
            </p>
            <p className="mt-2">
              Use this generator to create a proper robots.txt file for your website. Add rules for different user agents, 
              specify which paths should be allowed or disallowed, and add your sitemaps.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;