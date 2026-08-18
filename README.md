
# 🧠 McqBattleApp

A real-time multiplayer MCQ battle game where users can challenge each other, join private rooms, and play quiz battles with live question delivery and scoring. Built with a modern stack — Express, Prisma, PostgreSQL, Pusher, and Next.js.

---

## 🔧 Tech Stack

- **Frontend:** Next.js, Tailwind CSS, Pusher
- **Backend:** Node.js, Express.js, Prisma, PostgreSQL
- **Real-Time Communication:** Pusher
- **Authentication:** JWT
- **Email Service:** Gmail SMTP
- **GenAI:** Google Gemini (`@google/genai`) for question generation & answer explanations
- **Deployment:** Vercel (Frontend), Render (Backend)

---

## 📦 Folder Structure

```

mcq-battle-app/
├── backend/
└── frontend/

````

---

## 🚀 Getting Started Locally

### 1. Clone the repository

```bash
git clone https://github.com/asr-orzz/McqBattleApp
cd McqBattleApp
````

---

## ⚙️ Backend Setup

### Step 1: Navigate to the backend directory

```bash
cd backend
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Create your `.env` file

Copy the example file:

```bash
cp .env.example .env
```

Fill in the following values in `.env`:

```env
DATABASE_URL=""               # PostgreSQL connection string
USER_JWT_SECRET_KEY=""        # Secret key for JWT signing
PUSHER_APP_ID=""              # From your Pusher dashboard
PUSHER_KEY=""
PUSHER_SECRET=""
PUSHER_CLUSTER=""
OTP_SECRET=""                 # Any random string used for OTP encryption
GMAIL_USER=""                 # Gmail address used to send OTPs
GMAIL_APP_PASS=""             # App-specific password from Gmail
GEMINI_API_KEY=""             # Google Gemini API key (https://aistudio.google.com)
GEMINI_MODEL="gemini-2.5-flash" # Optional; defaults to gemini-2.5-flash
FRONTEND_ORIGIN=""            # Optional extra CORS origin (localhost:3000 is allowed by default)
```

### Step 4: Run database migrations (if using Prisma)

```bash
npx prisma generate
npx prisma migrate dev
```

### Step 5: Start the backend server

```bash
npm run start
```

The backend should now be running on `http://localhost:3001` (or your configured port).

---

## 🌐 Frontend Setup

### Step 1: Navigate to the frontend directory

```bash
cd ../frontend
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Create your `.env.local` file

```bash
touch .env.local
```

Fill in the following environment variables:

```env
NEXT_PUBLIC_PUSHER_KEY=""     # Same as PUSHER_KEY from backend
NEXT_PUBLIC_PUSHER_CLUSTER="" # Same as PUSHER_CLUSTER
NEXT_PUBLIC_API_BASE_URL=""   # Backend API base, e.g. http://localhost:3001/api/v1 for local dev
```

### Step 4: Run the frontend dev server

```bash
npm run dev
```

The frontend will run on `http://localhost:3000`.

---

## ✅ Features

* 🔐 Secure Signup & Login with JWT
* 📩 OTP Verification via Email
* 👥 Real-Time 1v1 Multiplayer Matchmaking
* 🧠 Live MCQ Questions with Timed Answers
* 📊 Game Stats & Leaderboard (optional)
* 🔒 Private Games with Invite System

---

## 🤖 AI Features (Google Gemini)

All AI runs on the backend so the API key is never exposed to the browser. Model
output is constrained with a JSON schema and re-validated with Zod before use.

### ✨ AI Question Generation
On the **Create Game** page, enter a topic, pick a difficulty (easy/medium/hard),
choose how many questions you want, and click **Generate Questions**. Gemini drafts
fully-formed MCQs (question, 4 options with one correct answer, and an explanation)
that pre-fill the editor — review, tweak, and save through the normal flow.

- Endpoint: `POST /api/v1/ai/generate-questions` (auth required)
- Body: `{ topic, difficulty, count }`

### 💡 AI Explanations (with caching)
- **During play:** after answering, click **Explain with AI** for a personalized
  explanation of why your choice was right/wrong (auto-advance pauses so you can read).
- **On the leaderboard:** review any question with a one-click AI explanation.
- Generic explanations are **cached** on the `Question.aiExplanation` column so repeat
  requests are instant and free.

- Endpoint: `POST /api/v1/ai/explain` (auth required)
- Body: `{ questionId, optionId? }` — `optionId` produces a personalized answer.

---

## 📦 Deployment

* **Frontend:** Deployed to [Vercel](https://vercel.com/)
* **Backend:** Deployed on Render

---

## 🤝 Contributing

Feel free to fork this repo and contribute via pull requests! Let’s build the ultimate quiz battle experience together.

---

## 📧 Contact

For issues or suggestions, feel free to reach out via GitHub Issues or contact the maintainer directly.


