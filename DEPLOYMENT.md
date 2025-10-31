# Vercel Deployment Guide for ClientSideResume

This guide will help you deploy your ClientSideResume application to Vercel using serverless functions.

## Prerequisites

- Vercel account (free tier available)
- GitHub repository with your code
- DeepSeek API key

## Deployment Steps

### 1. Prepare Your Repository

Ensure your repository has the following structure:
```
ClientSideResume/
├── api/                    # Serverless functions
│   ├── ai-analyze.ts
│   ├── rate-limit-status.ts
│   ├── reset-rate-limit.ts
│   └── tsconfig.json
├── client/                 # React frontend
├── server/                 # Express backend (for development)
├── shared/                 # Shared types
├── vercel.json            # Vercel configuration
└── package.json           # Build scripts
```

### 2. Set Up Environment Variables

In Vercel dashboard, set these environment variables:

- `DEEPSEEK_API_KEY` - Your DeepSeek AI API key
- `NODE_ENV` - Set to "production"

### 3. Deploy to Vercel

#### Option A: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel --prod
```

#### Option B: GitHub Integration
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the configuration
3. Set environment variables in Vercel dashboard
4. Deploy from the Vercel dashboard

#### Option C: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables
5. Deploy

## Configuration Details

### Vercel Configuration (vercel.json)
- **Frontend**: Built React app served from `dist/public/`
- **Backend**: Serverless functions in `api/` directory
- **Routes**: API calls routed to serverless functions, static files to frontend

### Build Process
- Frontend: Built with Vite to `dist/public/`
- Backend: Compiled with esbuild to `dist/` (for development)
- Serverless functions: Deployed directly from `api/` directory

## API Endpoints

Your application now has these serverless API endpoints:

- `POST /api/ai-analyze` - AI resume analysis
- `GET /api/rate-limit-status` - Check rate limit status
- `POST /api/reset-rate-limit` - Reset rate limit (for testing)

## Development vs Production

### Development
```bash
npm run dev
```
- Uses Express server with Vite development server
- Full hot reload and development features

### Production (Vercel)
- Frontend: Static files served from CDN
- Backend: Serverless functions with automatic scaling
- Global CDN distribution

## Troubleshooting

### Common Issues

1. **API Key Not Found**
   - Ensure `DEEPSEEK_API_KEY` is set in Vercel environment variables
   - Check for typos in the variable name

2. **Build Failures**
   - Verify all dependencies are in package.json
   - Check TypeScript compilation errors

3. **CORS Errors**
   - The serverless functions include CORS headers
   - Ensure frontend is making requests to the correct domain

4. **Rate Limiting**
   - Rate limiting uses file-based storage on Vercel
   - May need adjustment for serverless environment

### File Upload Considerations

- Serverless functions have execution time limits (30 seconds)
- Large file processing may need optimization
- Consider using external storage for rate limit data

## Monitoring and Analytics

- Use Vercel Analytics for performance monitoring
- Check serverless function logs in Vercel dashboard
- Monitor API usage and rate limiting

## Cost Optimization

- Vercel has generous free tier for personal projects
- Serverless functions are pay-per-use
- Consider optimizing bundle size for faster loading

## Security Best Practices

1. **API Keys**: Never commit API keys to repository
2. **Environment Variables**: Use Vercel environment variables
3. **Rate Limiting**: Keep rate limiting enabled to prevent abuse
4. **CORS**: Configure appropriate CORS settings

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test API endpoints locally
4. Check the [Vercel documentation](https://vercel.com/docs)

---

**Your ClientSideResume application is now ready for production deployment on Vercel!**
