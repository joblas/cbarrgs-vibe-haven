import { useState, useEffect } from 'react';

// In production the site's own Pages Function (/api/news) proxies the
// marketing-agent worker same-origin, so the CSP (connect-src 'self')
// is satisfied. For local development it points at the local agent.
const AGENT_API_URL = import.meta.env.PROD
  ? ''
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
