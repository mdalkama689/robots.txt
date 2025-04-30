export interface UserAgentRule {
  id: string;
  userAgent: string;
  allow: string[];
  disallow: string[];
}

export interface RobotsTxtState {
  userAgentRules: UserAgentRule[];
  sitemaps: string[];
}