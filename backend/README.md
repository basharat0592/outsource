 Project Structure Summary
outsource-main/
├── frontend/                 # Next.js + TypeScript + Shadcn UI
│   ├── src/
│   │   ├── app/             # Next.js 13+ App Router
│   │   │   ├── (app)/       # Dashboard, Settings pages
│   │   │   └── (auth)/      # Login, Signup, Forgot Password
│   │   ├── components/      # UI Components (Shadcn)
│   │   ├── hooks/           # Custom React Hooks
│   │   ├── services/        # API calls
│   │   ├── store/           # State Management
│   │   ├── types/           # TypeScript types
│   │   └── utils/           # Helper functions
│   └── public/              # Static assets
│
└── backend/                  # FastAPI + PostgreSQL
    ├── app/
    │   ├── api/             # API routes
    │   ├── models/          # SQLAlchemy models
    │   ├── schemas/         # Pydantic schemas
    │   └── utils/           # Helper functions
    ├── config.py            # Configuration
    ├── main.py              # FastAPI entry point
    └── requirements.txt     # Python dependencies
