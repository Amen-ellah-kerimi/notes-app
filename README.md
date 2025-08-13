# 📝 Notes App

A modern note-taking application built with Next.js 15, featuring user authentication with Clerk, PostgreSQL database with Drizzle ORM, and a clean, responsive interface.

> 🇫🇷 **Version française disponible** : [README.fr.md](README.fr.md)

## ✨ Features

- **🔐 Authentication**: Secure user authentication with Clerk
- **📝 Note Management**: Create, edit, delete, and organize notes
- **💾 Database**: PostgreSQL with Drizzle ORM for type-safe queries
- **🎨 Modern UI**: Clean, responsive design with TailwindCSS 4
- **⚡ Performance**: Built with Next.js 15 and React 19
- **🛡️ Type Safety**: Full TypeScript support
- **🔧 Production Ready**: Optimized for Vercel deployment
- **📱 Mobile Friendly**: Responsive design that works on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database (Neon, Supabase, or local)
- Clerk account ([Sign up here](https://clerk.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd notes-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your configuration:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/notes_app"

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
   CLERK_SECRET_KEY=sk_test_your_secret_key_here

   # Clerk Webhook (for user synchronization)
   CLERK_WEBHOOK_SIGNING_SECRET=whsec_your_webhook_signing_secret_here

   # Clerk URLs
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
   ```

4. **Set up the database**
   ```bash
   # Generate database schema
   npx drizzle-kit generate

   # Push schema to database
   npx drizzle-kit push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ Yes |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | ✅ Yes |
| `CLERK_SECRET_KEY` | Clerk secret key | ✅ Yes |
| `CLERK_WEBHOOK_SIGNING_SECRET` | Clerk webhook secret | ❌ No |

### Clerk Setup

1. **Create Clerk Application**:
   - Sign up at [Clerk](https://clerk.com)
   - Create a new application
   - Copy your publishable and secret keys

2. **Configure Authentication**:
   - Set up sign-in/sign-up pages
   - Configure OAuth providers if needed
   - Set up webhooks for user synchronization (optional)

### Database Setup

1. **Neon Database** (Recommended):
   - Create account at [Neon](https://neon.tech)
   - Create a new database
   - Copy connection string to `DATABASE_URL`

2. **Supabase**:
   - Create account at [Supabase](https://supabase.com)
   - Create a new project
   - Use PostgreSQL connection string

3. **Local PostgreSQL**:
   - Install PostgreSQL locally
   - Create database: `createdb notes_app`
   - Use connection string: `postgresql://username:password@localhost:5432/notes_app`

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Visit [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     - `DATABASE_URL`: Your PostgreSQL connection string
     - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key
     - `CLERK_SECRET_KEY`: Your Clerk secret key
     - `CLERK_WEBHOOK_SIGNING_SECRET`: Your Clerk webhook secret (if using webhooks)
   - Deploy!

3. **Set up production database**
   - Use Neon, Supabase, or another PostgreSQL service
   - Run database migrations in production
   - Update `DATABASE_URL` in Vercel environment variables

### Deploy to Other Platforms

The app can be deployed to any platform that supports Next.js:

- **Netlify**: Use `npm run build` and deploy the `.next` folder
- **Railway**: Connect your GitHub repo and add environment variables
- **DigitalOcean**: Use App Platform with automatic GitHub integration

## 🛠️ Development

### Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── notes/              # Notes API routes
│   │   └── webhooks/           # Clerk webhooks
│   ├── dashboard/              # Dashboard page
│   ├── sign-in/               # Sign-in page
│   ├── sign-up/               # Sign-up page
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/
│   ├── NoteCard.tsx           # Note display component
│   ├── NoteEditor.tsx         # Note editing component
│   └── Navigation.tsx         # Navigation component
├── db/
│   ├── index.ts               # Database connection
│   ├── schema.ts              # Drizzle schema
│   └── migrations/            # Database migrations
├── lib/
│   ├── auth.ts                # Authentication utilities
│   └── utils.ts               # Utility functions
└── middleware.ts              # Clerk middleware
```

### Tech Stack

- **Framework**: Next.js 15 with App Router
- **Authentication**: Clerk
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: TailwindCSS 4
- **Language**: TypeScript
- **Deployment**: Vercel-ready

### Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Database Commands

```bash
# Generate migrations
npx drizzle-kit generate

# Push schema to database
npx drizzle-kit push

# Open Drizzle Studio
npx drizzle-kit studio
```

## 🐛 Troubleshooting

### Common Issues

#### "Database connection failed"
- **Solution**: Check your `DATABASE_URL` is correct
- **Check**: Ensure your database is running and accessible

#### "Clerk authentication error"
- **Solution**: Verify your Clerk keys are correct
- **Check**: Ensure your Clerk application is properly configured

#### "Migration failed"
- **Solution**: Check your database permissions
- **Check**: Ensure the database exists and is accessible

#### "Build errors in production"
- **Solution**: Check TypeScript errors and fix them
- **Check**: Ensure all environment variables are set in production

## 🔒 Security & Performance

- **Environment Variables**: Never commit secrets to version control
- **Database**: Uses connection pooling for optimal performance
- **Authentication**: Secure JWT-based sessions with Clerk
- **Type Safety**: Full TypeScript coverage with Drizzle ORM

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

---

**Built with ❤️ using Next.js 15, React 19, Drizzle ORM, and Clerk**
