/**
 * Generates a robots.txt string from the current state
 */
export const generateRobotsTxt = (userAgentRules: any[], sitemaps: string[]): string => {
  let output = '';

  // Add User-agent rules
  userAgentRules.forEach(rule => {
    if (rule.userAgent.trim()) {
      output += `User-agent: ${rule.userAgent.trim()}\n`;
      
      // Add Allow directives
      rule.allow.forEach((path: string) => {
        if (path.trim()) {
          output += `Allow: ${path.trim()}\n`;
        }
      });
      
      // Add Disallow directives
      rule.disallow.forEach((path: string) => {
        if (path.trim()) {
          output += `Disallow: ${path.trim()}\n`;
        }
      });
      
      output += '\n';
    }
  });

  // Add Sitemaps
  sitemaps.forEach(sitemap => {
    if (sitemap.trim()) {
      output += `Sitemap: ${sitemap.trim()}\n`;
    }
  });

  return output;
};

/**
 * Validates a path for Allow or Disallow directives
 */
export const validatePath = (path: string): boolean => {
  // Basic validation - paths should start with /
  return path.trim() === '' || path.trim().startsWith('/');
};

/**
 * Validates a sitemap URL
 */
export const validateSitemap = (url: string): boolean => {
  // Basic URL validation
  try {
    if (url.trim() === '') return true;
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Generates a unique ID for new rules
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

/**
 * Download the robots.txt file
 */
export const downloadRobotsTxt = (content: string): void => {
  const element = document.createElement('a');
  const file = new Blob([content], { type: 'text/plain' });
  
  element.href = URL.createObjectURL(file);
  element.download = 'robots.txt';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};