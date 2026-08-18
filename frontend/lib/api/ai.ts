import axios from './axiosInstance';

const authHeader = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export interface GeneratedOption {
  option: string;
  isCorrect: boolean;
}

export interface GeneratedQuestion {
  question: string;
  explanation: string;
  options: GeneratedOption[];
}

export const generateQuestions = async (
  token: string,
  params: { topic: string; difficulty: 'easy' | 'medium' | 'hard'; count: number }
): Promise<GeneratedQuestion[]> => {
  const res = await axios.post('/ai/generate-questions', params, authHeader(token));
  return res.data.questions;
};

export const explainAnswer = async (
  token: string,
  params: { questionId: string; optionId?: string }
): Promise<{ explanation: string; cached: boolean }> => {
  const res = await axios.post('/ai/explain', params, authHeader(token));
  return res.data;
};
