# Environment Setup Guide

## Frontend Environment Variables

To fix the production API issues, you need to set up environment variables in your Vercel deployment.

### 1. Create Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your frontend project (`aparntment-frontend` or `homehubstay.com`)
3. Go to Settings > Environment Variables
4. Add the following environment variable:

```
Name: VITE_API_URL
Value: https://aparntment-rental-frontend.vercel.app
Environment: Production, Preview, Development
```

**Important**: Make sure there's no trailing slash in the URL.

### Important Note
Your frontend is now running on `https://www.homehubstay.com`. Make sure to:
1. Set the environment variable in the correct Vercel project
2. Redeploy your backend to apply the CORS changes

### 2. Local Development

For local development, create a `.env` file in the `aparntment-frontend` directory:

```
VITE_API_URL=http://localhost:5000
```

### 3. Backend Environment Variables

Make sure your backend (`aparntment-rental-frontend`) has all the required environment variables set in Vercel:

- `DB_BASE_URL`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `JWT_SECRET`
- `EMAIL_USER`
- `EMAIL_PASS`
- `ADMIN_EMAIL`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`

### 4. Redeploy

After setting the environment variables:

1. Redeploy your frontend project
2. Redeploy your backend project
3. Clear browser cache and test

### 5. Test Backend Health

Test your backend endpoints to ensure they're working:

- **Main endpoint**: [https://aparntment-rental-frontend.vercel.app/](https://aparntment-rental-frontend.vercel.app/)
- **Health check**: [https://aparntment-rental-frontend.vercel.app/health](https://aparntment-rental-frontend.vercel.app/health)
- **Apartments endpoint**: [https://aparntment-rental-frontend.vercel.app/get-apparntment](https://aparntment-rental-frontend.vercel.app/get-apparntment)

## Troubleshooting

If you're still getting the "Unexpected token '<'" error:

1. Check that the environment variable is set correctly
2. Verify the backend is running and accessible
3. Check the browser's Network tab to see the actual response
4. Ensure CORS is properly configured on the backend

## API Endpoints

The frontend now uses these endpoints:
- `GET /get-apparntment` - Get all apartments
- `GET /apartments/:id` - Get apartment by ID
- `POST /book` - Book an apartment
- `POST /report` - Report an issue
- `POST /shorten-url` - Shorten URL 