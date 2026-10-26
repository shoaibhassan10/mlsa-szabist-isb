# MLSA SZABIST Islamabad 🚀

Official web portal for **Microsoft Learn Student Ambassadors (MLSA) - SZABIST Islamabad Chapter**. Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Appwrite Cloud** (Databases, Storage, Auth).

---

## 🌟 Key Features

- **Azure & Microsoft Fluent Design Aesthetic**: Glassmorphism cards, glowing borders, custom scrollbars, and smooth micro-animations.
- **Events Hub**: Explore upcoming technical workshops, hackathons, and past events with a full registration modal.
- **Community Recruitment**: Online application form with real-time field validation for joining chapter wings (Technical, Event Management, Media & Design, Marketing & PR).
- **Updates Feed**: Announcements, recruitment calls, and chapter milestones.
- **Leadership & Executive Team**: Showcase chapter leaders and team members across all wings.
- **Automated Appwrite Provisioning**: One-command schema, collection, and storage bucket deployment (`npm run setup:appwrite`).

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons & Animation**: [Lucide React](https://lucide.dev/) & [Framer Motion](https://www.framer.com/motion/)
- **Backend as a Service (BaaS)**: [Appwrite Cloud](https://appwrite.io/) (Databases, Storage, Auth)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/shoaibhassan10/mlsa-szabist-isb.git
cd mlsa-szabist-isb
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your Appwrite Cloud credentials:
```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
APPWRITE_API_KEY=your_server_api_key
```

### 4. Provision Appwrite Collections & Storage
Automatically create the database (`mlsa_db`), all 5 collections, attributes, and the storage bucket:
```bash
npm run setup:appwrite
```

### 5. Start the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

```
├── scripts/
│   └── setup-appwrite.mjs       # Automated Appwrite schema provisioning script
├── src/
│   ├── app/
│   │   ├── globals.css          # Tailwind CSS tokens & glassmorphic styling
│   │   ├── layout.tsx           # SEO metadata, font imports, root layout
│   │   └── page.tsx             # Home page component assembly
│   ├── components/
│   │   ├── AboutBento.tsx       # Chapter mission bento grid
│   │   ├── EventsHub.tsx        # Event listings & registration modal
│   │   ├── Footer.tsx           # Social links & footer info
│   │   ├── Hero.tsx             # Interactive hero section with animated stats
│   │   ├── JoinChapterForm.tsx  # Wing recruitment application form
│   │   ├── LeadershipAndTeam.tsx# Executive board & leads showcase
│   │   ├── Navbar.tsx           # Responsive glassmorphism navigation
│   │   └── UpdatesFeed.tsx      # Chapter announcements & achievements
│   ├── data/
│   │   └── mlsaData.ts          # Seed data & TypeScript definitions
│   └── lib/
│       └── appwrite.ts          # Appwrite client & database SDK utilities
├── .env.example                 # Environment variables template
├── next.config.mjs              # Next.js configuration
├── tailwind.config.js           # Theme extensions & custom palette
└── tsconfig.json                # TypeScript compiler config
```

---

## 🔒 Security
- All sensitive API keys and secrets in `.env.local` are excluded via `.gitignore` to prevent leaks.
- Client requests only utilize public `NEXT_PUBLIC_` Appwrite identifiers with granular collection permissions.

---

## 📄 License
This project is open-source under the MIT License.
