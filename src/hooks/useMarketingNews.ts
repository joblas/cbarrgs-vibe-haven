import { useState, useEffect } from 'react';

// For local development, this points to the local Cloudflare Agent.
// In production, this should point to the deployed Agent URL (e.g., https://agent.cbarrgs.com)
const AGENT_API_URL = import.meta.env.PROD 
  ? 'https://cbarrgs-marketing-agent.YOUR_SUBDOMAIN.workers.dev' 
  : 'http://localhost:8787';

export interface MarketingNews {
  headline: string;
  subheadline: string;
  ctaText: string;
}

export const useMarketingNews = () => {
  const [news, setNews] = useState<MarketingNews | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${AGENT_API_URL}/api/news`);
        if (!response.ok) {
          throw new Error('Failed to fetch news from Agent');
        }
        const data = await response.json();
        setNews(data);
      } catch (err) {
        console.error('Error fetching marketing news:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return { news, loading, error };
};
