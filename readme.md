# JSS Beauty

A modern website for JSS Beauty salon built with Next.js, React, and Supabase.

## Features

### Public Site
- **Home** — Hero section, featured services, portfolio highlights, and call-to-action
- **Services** — Categorised service listings with descriptions and pricing
- **Portfolio** — Gallery showcasing before/after transformations with filtering
- **About** — Salon story, team info, and location details
- **Contact** — Form with validation (stored in Supabase), business hours, map, and direct links to WhatsApp/Instagram/Treatwell

### Admin Dashboard
- **Authentication** — Protected routes with Supabase Auth and cookie-based sessions
- **Categories Management** — Full CRUD for service categories
- **Services Management** — Create, edit, and delete services with pricing
- **Portfolio Management** — Upload and manage gallery images via Supabase Storage
- **About Page Management** — Edit about content and images
- **Business Info** — Update hours, contact details, and location
- **Submissions** — View and bulk-delete contact form submissions

### General
- Fully responsive design with a minimal luxury aesthetic
- Smooth page transitions and scroll animations (Framer Motion)
- Server components for fast initial page loads
- Form validation with React Hook Form and Zod
- Row Level Security (RLS) on all Supabase tables

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS v4, Framer Motion
- **Backend**: Supabase (database, auth, storage)
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project

### Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Database Setup

Run the following SQL files in your Supabase SQL Editor (in order):

1. `supabase/schema.sql` — creates tables and storage bucket
2. `supabase/seed.sql` — populates initial data
3. `supabase/admin-policies.sql` — sets up RLS policies for admin access

### Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── (public)/          # Public pages
│   │   ├── page.tsx        #   Home
│   │   ├── services/       #   Services
│   │   ├── portfolio/      #   Portfolio
│   │   ├── about/          #   About
│   │   └── contact/        #   Contact
│   └── (admin)/            # Admin dashboard (protected)
│       └── admin/
│           ├── login/      #   Login
│           └── (dashboard)/#   Dashboard pages
├── components/
│   ├── layout/             # Header, Footer, Navigation
│   ├── home/               # Home page sections
│   ├── services/           # Services components
│   ├── portfolio/          # Portfolio components
│   ├── contact/            # Contact form
│   └── admin/              # Admin dashboard components
├── lib/                    # Supabase clients, data fetching, server actions
└── types/                  # TypeScript interfaces
```

## Admin Dashboard

The admin panel at `/admin` provides management for:

- **Categories** — service categories
- **Services** — individual services with pricing
- **Portfolio** — gallery items with image upload
- **About** — about page content and images
- **Business Info** — hours, contact details, location
- **Submissions** — contact form submissions

Access requires a Supabase auth user created via the Supabase Dashboard.

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Production build         |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |
