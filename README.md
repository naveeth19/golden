# Golden Travels — Premium Road Travel Since 1987

The official website for Golden Travels, a premium road travel company based in Bengaluru, India. Founded in 1987 by Mr Lakshmana K Amin.

## Tech Stack

- Next.js (App Router, TypeScript)
- Supabase (Database, Auth, Storage)
- Tailwind CSS
- shadcn/ui
- TipTap (Rich text editor for blog)
- @hello-pangea/dnd (Drag and drop for admin)

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Deployment

Push to the `main` branch on GitHub. Auto-deploys via Vercel.
