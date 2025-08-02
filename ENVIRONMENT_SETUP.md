# Environment Setup Guide

## Frontend Environment Variables

To fix the production API issues, you need to set up environment variables in your Vercel deployment.

### 1. Create Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your frontend project (`aparntment-frontend`)
3. Go to Settings > Environment Variables
4. Add the following environment variable:

```
Name: VITE_API_URL
Value: https://aparntment-rental-frontend.vercel.app
Environment: Production, Preview, Development
```

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