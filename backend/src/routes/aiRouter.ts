import { Router } from "express";
import { z } from "zod";
import { userMiddleware } from "../middleware/userMiddleware";
import { generateQuestions } from "../utils/aiQuestionService";
import { explainAnswer } from "../utils/aiExplanationService";
import prisma from "../prisma/client";

export const aiRouter = Router();

aiRouter.use(userMiddleware);

const generateSchema = z.object({
  topic: z.string().trim().min(2).max(150),
  difficulty: z.enum(["easy", "medium", "hard"]).default("medium"),
  count: z.coerce.number().int().min(1).max(15).default(5),
});

aiRouter.post("/generate-questions", async (req, res) => {
  const parsed = generateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
    return;
  }

  try {
    const questions = await generateQuestions(parsed.data);
    res.status(200).json({ questions });
  } catch (err) {
    console.error("AI generate-questions error:", err);
    res.status(502).json({ error: "Failed to generate questions. Please try again." });
  }
});

const explainSchema = z.object({
  questionId: z.string().uuid(),
  optionId: z.string().uuid().optional(),
});

aiRouter.post("/explain", async (req, res) => {
  const parsed = explainSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
    return;
  }

  const userId = req.body.userId as string;
  const { questionId, optionId } = parsed.data;

  try {
    const question = await prisma.question.findUnique({
      where: { id: questionId },
      include: {
        options: true,
        game: { select: { userId: true } },
      },
    });

    if (!question) {
      res.status(404).json({ error: "Question not found" });
      return;
    }

    // Authorization: only the game owner or a player in the game may request explanations.
    const isOwner = question.game.userId === userId;
    const isPlayer = await prisma.player.findUnique({
      where: { userId_gameId: { userId, gameId: question.gameId } },
    });

    if (!isOwner && !isPlayer) {
      res.status(403).json({ error: "You do not have access to this question" });
      return;
    }

    // Serve cached explanation when available (and no personalized chosen option).
    if (question.aiExplanation && !optionId) {
      res.status(200).json({ explanation: question.aiExplanation, cached: true });
      return;
    }

    const correctOption = question.options.find((o) => o.isCorrect);
    const chosenOption = optionId
      ? question.options.find((o) => o.id === optionId)
      : undefined;

    const explanation = await explainAnswer({
      question: question.question,
      options: question.options.map((o) => o.option),
      correctOption: correctOption?.option || "",
      chosenOption: chosenOption?.option,
      isChosenCorrect: chosenOption?.isCorrect,
      authoredExplanation: question.explanation,
    });

    // Cache the generic (non-personalized) explanation for reuse.
    if (!optionId) {
      await prisma.question.update({
        where: { id: questionId },
        data: { aiExplanation: explanation },
      });
    }

    res.status(200).json({ explanation, cached: false });
  } catch (err) {
    console.error("AI explain error:", err);
    res.status(502).json({ error: "Failed to generate explanation. Please try again." });
  }
});
