import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from 'express';
import { userRouter } from './routes/userRouter';
import { gameRouter } from "./routes/gameRouter";
import { questionRouter } from "./routes/questionRouter";
import { optionRouter } from "./routes/optionRouter";
import { playerRouter } from "./routes/playerRouter";
import { playerRequestRouter } from "./routes/playerRequest";
import { aiRouter } from "./routes/aiRouter";

const app = express();
app.use(express.json());

const allowedOrigins = [
  "https://project-mcq-battle-winters24.vercel.app",
  "http://localhost:3000",
  ...(process.env.FRONTEND_ORIGIN ? [process.env.FRONTEND_ORIGIN] : []),
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser clients (no origin) and any whitelisted origin.
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/games", gameRouter);
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/options", optionRouter);
app.use("/api/v1/players", playerRouter);
app.use("/api/v1/playerRequest", playerRequestRouter);
app.use("/api/v1/ai", aiRouter);
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});
function main() {
  app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
  });
}

main();
