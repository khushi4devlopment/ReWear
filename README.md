# ReWear — Clothing Exchange & Swap Marketplace

A full-stack sustainable fashion marketplace built with **React + Bootstrap + JavaScript** on the frontend and **Node.js + Express + MongoDB (Mongoose)** on the backend.

## Features
- JWT registration/login with bcrypt password hashing
- User profile and dashboard
- Clothing listings with image upload (Multer)
- Search/filter by category, size, condition and location
- Item detail page with owner information
- Swap requests: send, accept, reject, cancel, complete
- Negotiation chat using REST polling (no paid service required)
- Swap value calculator and fair-match suggestions
- Location-based nearby listings
- Admin panel for users, listings, swaps and analytics
- Input validation, Helmet, rate limiting, CORS and ownership checks
- Responsive Bootstrap UI

## Pages
1. Login / Register
2. Home / Clothing Listings
3. Item Detail
4. Swap Requests
5. Chat
6. User Dashboard
7. Profile
8. Admin Panel

## Run locally
### 1. MongoDB
Create a MongoDB database named `rewear_marketplace` using MongoDB Atlas or local MongoDB.

### 2. Backend
```bash
cd server
npm install
copy .env.example .env
npm run seed
npm run dev
```

### 3. Frontend
In a second terminal:
```bash
cd client
npm install
npm run dev
```

Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

Backend runs on `http://localhost:5000`.

## Demo accounts after seed
- Admin: `admin@rewear.local` / `Admin@123`
- User: `riya@rewear.local` / `User@123`
- User: `arjun@rewear.local` / `User@123`

Change demo passwords before deployment.

## Deployment
- Frontend: Vercel / Netlify
- Backend: Render / Railway
- Database: MongoDB Atlas
- Set `VITE_API_URL` to the deployed backend URL and configure `CLIENT_URL` on the backend.
