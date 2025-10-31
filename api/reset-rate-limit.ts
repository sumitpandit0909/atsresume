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

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const clientIP = rateLimiter.getClientIP(req);
    
    // Create a new rate limiter instance to clear data
    // In production, you'd want a proper reset method
    const fs = require('fs/promises');
    const path = require('path');
    const dataPath = path.join(process.cwd(), 'rate-limit-data.json');
    
    await fs.writeFile(dataPath, JSON.stringify({}, null, 2));
    
    // Reload the data
    await rateLimiter.loadData();
    
    res.json({
      success: true,
      message: `Rate limit reset for IP: ${clientIP}`,
      clientIP
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to reset rate limit",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
}
