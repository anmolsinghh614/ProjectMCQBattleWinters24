import { z } from "zod";
import genAI, { GEMINI_MODEL } from "./gemini";

export type Difficulty = "easy" | "medium" | "hard";

export interface GenerateParams {
  topic: string;
  difficulty: Difficulty;
  count: number;
}

const optionSchema = z.object({
  option: z.string().min(1),
  isCorrect: z.boolean(),
});

const questionSchema = z.object({
  question: z.string().min(1),
  explanation: z.string().min(1),
  options: z.array(optionSchema).min(2).max(6),
});

const responseSchema = z.object({
  questions: z.array(questionSchema).min(1),
});

export type GeneratedQuestion = z.infer<typeof questionSchema>;

// JSON schema handed to Gemini so it returns strictly shaped output.
const geminiResponseSchema = {
  type: "object",
  properties: {
    questions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: { type: "string" },
          explanation: { type: "string" },
          options: {
            type: "array",
            items: {
              type: "object",
              properties: {
                option: { type: "string" },
                isCorrect: { type: "boolean" },
              },
              required: ["option", "isCorrect"],
            },
          },
        },
        required: ["question", "explanation", "options"],
      },
    },
  },
  required: ["questions"],
};

function buildPrompt({ topic, difficulty, count }: GenerateParams): string {
  return [
    `You are an expert quiz author. Generate ${count} multiple-choice questions about "${topic}".`,
    `Difficulty level: ${difficulty}.`,
    `Rules:`,
    `- Each question must have exactly 4 options.`,
    `- Exactly ONE option must have isCorrect = true; all others false.`,
    `- Options must be plausible and mutually exclusive; do not prefix them with letters like "A." or "1.".`,
    `- Provide a concise (1-3 sentence) explanation of why the correct option is correct.`,
    `- Keep questions factually accurate and unambiguous.`,
    `Return ONLY JSON that matches the provided schema.`,
  ].join("\n");
}

/**
 * Ensures each question has exactly one correct option. If the model returned
 * zero or multiple correct options, normalize to the first correct one (or the
 * first option as a fallback) so downstream game logic stays valid.
 */
function normalizeCorrectness(questions: GeneratedQuestion[]): GeneratedQuestion[] {
  return questions.map((q) => {
    const correctIndex = q.options.findIndex((o) => o.isCorrect);
    const chosen = correctIndex === -1 ? 0 : correctIndex;
    return {
      ...q,
      options: q.options.map((o, i) => ({ ...o, isCorrect: i === chosen })),
    };
  });
}

export async function generateQuestions(
  params: GenerateParams
): Promise<GeneratedQuestion[]> {
  const response = await genAI.models.generateContent({
    model: GEMINI_MODEL,
    contents: buildPrompt(params),
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: geminiResponseSchema,
      temperature: 0.7,
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("Empty response from AI model");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("AI model returned invalid JSON");
  }

  const validated = responseSchema.safeParse(parsed);
  if (!validated.success) {
    throw new Error("AI output did not match the expected format");
  }

  return normalizeCorrectness(validated.data.questions);
}
