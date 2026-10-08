# Shorts Publisher Frontend

React + TypeScript + Capacitor Android client.

## Local
npm install
npm run dev

Set VITE_API_URL to the NestJS backend URL for a device build.

## Android
GitHub Actions builds a debug APK on every push to main and exposes it as a workflow artifact.

The app sends URL/text metadata to the backend. The backend handles downloading authorized media and uploading it to YouTube.