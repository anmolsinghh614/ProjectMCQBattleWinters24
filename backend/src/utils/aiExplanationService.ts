import genAI, { GEMINI_MODEL } from "./gemini";

export interface ExplainParams {
  question: string;
  options: string[];
  correctOption: string;
  chosenOption?: string;
  isChosenCorrect?: boolean;
  authoredExplanation?: string;
}

function buildPrompt(params: ExplainParams): string {
  const {
    question,
    options,
    correctOption,
    chosenOption,
    isChosenCorrect,
    authoredExplanation,
  } = params;

  const lines: string[] = [
    `You are a friendly quiz tutor. Explain the answer to the following multiple-choice question clearly and concisely (2-4 sentences).`,
    ``,
    `Question: ${question}`,
    `Options: ${options.join(" | ")}`,
    `Correct answer: ${correctOption}`,
  ];

  if (authoredExplanation) {
    lines.push(`Author's note (use if helpful): ${authoredExplanation}`);
  }

  if (chosenOption) {
    lines.push(
      `The player selected: "${chosenOption}" (${isChosenCorrect ? "correct" : "incorrect"}).`
    );
    if (!isChosenCorrect) {
      lines.push(
        `Briefly explain why their choice is wrong, then why the correct answer is right.`
      );
    } else {
      lines.push(`Reinforce why this is correct and add one interesting detail.`);
    }
  }

  lines.push(``, `Respond in plain text. Do not restate the full question.`);
  return lines.join("\n");
}

export async function explainAnswer(params: ExplainParams): Promise<string> {
  const response = await genAI.models.generateContent({
    model: GEMINI_MODEL,
    contents: buildPrompt(params),
    config: { temperature: 0.5 },
  });

  const text = response.text?.trim();
  if (!text) {
    throw new Error("Empty response from AI model");
  }
  return text;
}
