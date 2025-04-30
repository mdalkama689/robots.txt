import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { RobotsTxtState, UserAgentRule } from './types';
import UserAgentRuleCard from './components/UserAgentRuleCard';
import SitemapSection from './components/SitemapSection';
import RobotsTxtPreview from './components/RobotsTxtPreview';
import Navbar from './components/Navbar';
import InfoCard from './components/InfoCard';
import { 
  generateRobotsTxt, 
  generateId, 
  downloadRobotsTxt 
} from './utils/robotsTxtUtils';

function App() {
  const [state, setState] = useState<RobotsTxtState>({
    userAgentRules: [
      {
        id: generateId(),
        userAgent: '*',
        allow: [],
        disallow: ['/admin/', '/private/']
      }
    ],
    sitemaps: ['https://example.com/sitemap.xml']
  });

  const addUserAgentRule = () => {
    setState(prevState => ({
      ...prevState,
      userAgentRules: [
        ...prevState.userAgentRules,
        {
          id: generateId(),
          userAgent: '',
          allow: [],
          disallow: []
        }
      ]
    }));
  };

  const updateUserAgentRule = (id: string, updatedRule: UserAgentRule) => {
    setState(prevState => ({
      ...prevState,
      userAgentRules: prevState.userAgentRules.map(rule => 
        rule.id === id ? updatedRule : rule
      )
    }));
  };

  const deleteUserAgentRule = (id: string) => {
    setState(prevState => ({
      ...prevState,
      userAgentRules: prevState.userAgentRules.filter(rule => rule.id !== id)
    }));
  };

  const updateSitemaps = (newSitemaps: string[]) => {
    setState(prevState => ({
      ...prevState,
      sitemaps: newSitemaps
    }));
  };

  const robotsTxtContent = generateRobotsTxt(state.userAgentRules, state.sitemaps);

  const handleDownload = () => {
    downloadRobotsTxt(robotsTxtContent);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <InfoCard />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-md p-5 mb-6 border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">User-Agent Rules</h2>
                  <button 
                    onClick={addUserAgentRule}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center transition-colors"
                  >
                    <PlusCircle size={18} className="mr-2" /> Add Rule
                  </button>
                </div>
                
                {state.userAgentRules.map(rule => (
                  <UserAgentRuleCard 
                    key={rule.id}
                    rule={rule}
                    onUpdate={(updatedRule) => updateUserAgentRule(rule.id, updatedRule)}
                    onDelete={() => deleteUserAgentRule(rule.id)}
                  />
                ))}
              </div>
              
              <SitemapSection 
                sitemaps={state.sitemaps}
                onUpdate={updateSitemaps}
              />
            </div>
            
            <div className="lg:col-span-1">
              <RobotsTxtPreview 
                content={robotsTxtContent}
                onDownload={handleDownload}
              />
            </div>
          </div>
        </div>
      </main>
      
    </div>
  );
}

export default App;