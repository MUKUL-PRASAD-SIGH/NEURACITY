# CaaS Waste Prediction MVP - Frontend

This is the frontend application for the City as a System (CaaS) Waste Prediction MVP, built with Next.js 14+ and TypeScript.

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Mapping**: MapLibre GL
- **Charts**: Recharts
- **HTTP Client**: Axios

## Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
├── lib/                   # Utility functions and API clients
├── styles/                # Additional CSS modules
├── public/                # Static assets
└── .env.local            # Environment variables
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Copy `.env.local.example` to `.env.local` and update the values as needed.

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

- `NEXT_PUBLIC_API_BASE_URL`: Backend API base URL (default: http://localhost:8000/api/v1)
- `NEXT_PUBLIC_MAP_STYLE_URL`: MapLibre style URL for the map component
- `NEXT_PUBLIC_ENABLE_MOCK_DATA`: Enable mock data for development (optional)

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

## Requirements

This frontend implements the following requirements:
- 9.1: Interactive ward map with color-coded severity levels
- 9.2: Overflow predictions dashboard with confidence levels
- 9.3: Priority queue with approval workflow
- 9.4: Active cleanups with before/after comparisons
- 9.5: Payment recommendations with quality scores
