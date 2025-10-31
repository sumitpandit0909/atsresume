import { VercelRequest, VercelResponse } from '@vercel/node';
import { rateLimiter } from '../server/lib/rate-limiter';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers for Vercel deployment
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const status = rateLimiter.getStatus();
    const clientIP = rateLimiter.getClientIP(req);
    const remainingTime = rateLimiter.getRemainingTime(clientIP);
    
    res.json({
      clientIP,
      remainingTime,
      status: {
        totalEntries: status.totalEntries,
        entries: status.entries
      }
    });
  } catch (error) {
    console.error("Rate limit status error:", error);
    res.status(500).json({
      error: "Failed to get rate limit status",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
}
