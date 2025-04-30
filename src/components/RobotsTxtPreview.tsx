import React, { useState, useEffect } from 'react';
import { Copy, Check, Download, Eye, EyeOff } from 'lucide-react';

interface RobotsTxtPreviewProps {
  content: string;
  onDownload: () => void;
}

const RobotsTxtPreview: React.FC<RobotsTxtPreviewProps> = ({ 
  content,
  onDownload
}) => {
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Reset the copied state when content changes
  useEffect(() => {
    setCopied(false);
  }, [content]);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 transition-all hover:shadow-lg">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Preview</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="p-2 text-gray-600 hover:text-gray-800 rounded transition-colors"
            aria-label={showPreview ? "Hide preview" : "Show preview"}
          >
            {showPreview ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          <button
            onClick={handleCopy}
            className={`p-2 ${copied ? 'text-green-600' : 'text-gray-600 hover:text-gray-800'} rounded transition-colors`}
            aria-label="Copy to clipboard"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
          </button>
          <button
            onClick={onDownload}
            className="p-2 text-gray-600 hover:text-gray-800 rounded transition-colors"
            aria-label="Download robots.txt"
          >
            <Download size={18} />
          </button>
        </div>
      </div>
      
      {showPreview && (
        <div className="p-4 relative">
          <pre className="bg-gray-50 p-4 rounded border border-gray-200 whitespace-pre overflow-x-auto font-mono text-gray-800 text-sm">
            {content || '# Your robots.txt file will appear here'}
          </pre>
          {copied && (
            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs py-1 px-2 rounded shadow-md transition-opacity duration-300">
              Copied!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RobotsTxtPreview;