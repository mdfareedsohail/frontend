# Deployment Guide for Render

This guide will help you deploy the Tribal Handicrafts Frontend to Render.

## Prerequisites

1. A GitHub account with the repository pushed
2. A Render account (sign up at https://render.com)

## Deployment Steps

### Option 1: Using Render Dashboard (Recommended)

1. **Sign in to Render**
   - Go to https://dashboard.render.com
   - Sign in with your GitHub account

2. **Create a New Static Site**
   - Click "New +" button
   - Select "Static Site"

3. **Connect Repository**
   - Select "Connect GitHub"
   - Authorize Render to access your repositories
   - Select the repository: `mdfareedsohail/frontend`

4. **Configure Build Settings**
   - **Name**: `tribal-handicrafts-frontend` (or any name you prefer)
   - **Branch**: `main`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Environment**: `Static Site`

5. **Configure Routing (Important for React Router)**
   - Render will automatically use the `_redirects` file in the `public` folder
   - This ensures all routes redirect to `index.html` for client-side routing

6. **Deploy**
   - Click "Create Static Site"
   - Render will automatically build and deploy your site
   - Your site will be available at `https://your-site-name.onrender.com`

### Option 2: Using render.yaml (Automatic)

If you've pushed the `render.yaml` file to your repository:

1. **Sign in to Render**
   - Go to https://dashboard.render.com
   - Sign in with your GitHub account

2. **Import from Repository**
   - Click "New +" button
   - Select "Blueprint"
   - Select your repository: `mdfareedsohail/frontend`
   - Render will automatically detect and use the `render.yaml` configuration

3. **Deploy**
   - Render will automatically configure everything based on `render.yaml`
   - Your site will be deployed automatically

## Post-Deployment

### Custom Domain (Optional)

1. Go to your site settings in Render
2. Click "Custom Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

### Environment Variables (If needed in future)

If you need to add environment variables:

1. Go to your site settings
2. Click "Environment"
3. Add your environment variables
4. Redeploy the site

## Troubleshooting

### Build Fails

- Check the build logs in Render dashboard
- Ensure `package.json` has all required dependencies
- Verify Node.js version compatibility (Render uses Node 18 by default)

### Routes Not Working (404 errors)

- Ensure `public/_redirects` file exists with `/*    /index.html   200`
- Verify the build output includes `index.html` in the `dist` folder
- Check that React Router is configured correctly

### Assets Not Loading

- Verify that `vite.config.js` has `base: '/'` set
- Check that assets are being copied to the `dist` folder during build
- Ensure asset paths are relative, not absolute

## Build Verification

Before deploying, test the build locally:

```bash
npm run build
npm run preview
```

This will build and preview your production build locally.

## Support

For Render-specific issues, check:
- Render Documentation: https://render.com/docs
- Render Community: https://community.render.com

For application-specific issues, check the main README.md file.

