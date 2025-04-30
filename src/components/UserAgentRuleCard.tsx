import React from 'react';
import { PlusCircle, Trash2, HelpCircle, X } from 'lucide-react';
import { UserAgentRule } from '../types';
import { validatePath } from '../utils/robotsTxtUtils';

interface UserAgentRuleCardProps {
  rule: UserAgentRule;
  onUpdate: (updatedRule: UserAgentRule) => void;
  onDelete: () => void;
}

const UserAgentRuleCard: React.FC<UserAgentRuleCardProps> = ({ 
  rule, 
  onUpdate, 
  onDelete 
}) => {
  const handleUserAgentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...rule, userAgent: e.target.value });
  };

  const addAllowPath = () => {
    onUpdate({ ...rule, allow: [...rule.allow, ''] });
  };

  const updateAllowPath = (index: number, value: string) => {
    const newAllow = [...rule.allow];
    newAllow[index] = value;
    onUpdate({ ...rule, allow: newAllow });
  };

  const removeAllowPath = (index: number) => {
    const newAllow = [...rule.allow];
    newAllow.splice(index, 1);
    onUpdate({ ...rule, allow: newAllow });
  };

  const addDisallowPath = () => {
    onUpdate({ ...rule, disallow: [...rule.disallow, ''] });
  };

  const updateDisallowPath = (index: number, value: string) => {
    const newDisallow = [...rule.disallow];
    newDisallow[index] = value;
    onUpdate({ ...rule, disallow: newDisallow });
  };

  const removeDisallowPath = (index: number) => {
    const newDisallow = [...rule.disallow];
    newDisallow.splice(index, 1);
    onUpdate({ ...rule, disallow: newDisallow });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 mb-6 border border-gray-200 transition-all hover:shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">User-Agent Rule</h3>
        <button 
          onClick={onDelete}
          className="text-gray-500 hover:text-red-500 transition-colors"
          aria-label="Delete rule"
        >
          <Trash2 size={18} />
        </button>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center mb-1">
          <label htmlFor={`user-agent-${rule.id}`} className="block text-sm font-medium text-gray-700">
            User-agent:
          </label>
          <div className="relative ml-2 group">
            <HelpCircle size={16} className="text-gray-400 cursor-help" />
            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-64 z-10">
              Specifies which web crawler the rules apply to. Use * for all crawlers, or specify a particular crawler like "Googlebot".
            </div>
          </div>
        </div>
        <input
          id={`user-agent-${rule.id}`}
          type="text"
          value={rule.userAgent}
          onChange={handleUserAgentChange}
          placeholder="* (all bots)"
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
      </div>
      
      {/* Allow Section */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <h4 className="text-sm font-medium text-gray-700">Allow:</h4>
            <div className="relative ml-2 group">
              <HelpCircle size={16} className="text-gray-400 cursor-help" />
              <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-64 z-10">
                Specifies paths that crawlers are permitted to access, overriding Disallow directives.
              </div>
            </div>
          </div>
          <button 
            onClick={addAllowPath}
            className="text-blue-500 hover:text-blue-700 flex items-center text-sm transition-colors"
          >
            <PlusCircle size={16} className="mr-1" /> Add Path
          </button>
        </div>
        
        {rule.allow.map((path, index) => (
          <div key={`allow-${index}`} className="flex items-center mb-2">
            <input
              type="text"
              value={path}
              onChange={(e) => updateAllowPath(index, e.target.value)}
              placeholder="/allowed-path/"
              className={`flex-grow p-2 border ${!validatePath(path) && path !== '' ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-l focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
            />
            <button 
              onClick={() => removeAllowPath(index)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-r border-y border-r border-gray-300 transition-all"
              aria-label="Remove path"
            >
              <X size={18} />
            </button>
          </div>
        ))}
        {rule.allow.length === 0 && (
          <p className="text-gray-500 text-sm italic">No Allow paths added</p>
        )}
      </div>
      
      {/* Disallow Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <h4 className="text-sm font-medium text-gray-700">Disallow:</h4>
            <div className="relative ml-2 group">
              <HelpCircle size={16} className="text-gray-400 cursor-help" />
              <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-64 z-10">
                Specifies paths that crawlers should not access. Use "/" to block everything.
              </div>
            </div>
          </div>
          <button 
            onClick={addDisallowPath}
            className="text-blue-500 hover:text-blue-700 flex items-center text-sm transition-colors"
          >
            <PlusCircle size={16} className="mr-1" /> Add Path
          </button>
        </div>
        
        {rule.disallow.map((path, index) => (
          <div key={`disallow-${index}`} className="flex items-center mb-2">
            <input
              type="text"
              value={path}
              onChange={(e) => updateDisallowPath(index, e.target.value)}
              placeholder="/private-area/"
              className={`flex-grow p-2 border ${!validatePath(path) && path !== '' ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-l focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
            />
            <button 
              onClick={() => removeDisallowPath(index)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-r border-y border-r border-gray-300 transition-all"
              aria-label="Remove path"
            >
              <X size={18} />
            </button>
          </div>
        ))}
        {rule.disallow.length === 0 && (
          <p className="text-gray-500 text-sm italic">No Disallow paths added</p>
        )}
      </div>
    </div>
  );
};

export default UserAgentRuleCard;