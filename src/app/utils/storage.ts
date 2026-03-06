export interface UserProgress {
  isPaid: boolean;
  completedQuestions: number[];
  categoryProgress: { [key: string]: number };
  totalScore: number;
  quizHistory: QuizResult[];
}

export interface QuizResult {
  date: string;
  category: string;
  score: number;
  totalQuestions: number;
  timeSpent: number;
}

const STORAGE_KEY = 'islamic_quiz_data';

export const getStoredData = (): UserProgress => {
  if (typeof window === 'undefined') {
    return getDefaultData();
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return getDefaultData();
    }
  }
  return getDefaultData();
};

export const saveStoredData = (data: UserProgress): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const markAsPaid = (): void => {
  const data = getStoredData();
  data.isPaid = true;
  saveStoredData(data);
};

export const saveQuizResult = (result: QuizResult): void => {
  const data = getStoredData();
  data.quizHistory.push(result);
  data.totalScore += result.score;
  
  // Update category progress
  if (!data.categoryProgress[result.category]) {
    data.categoryProgress[result.category] = 0;
  }
  data.categoryProgress[result.category] += result.score;
  
  saveStoredData(data);
};

export const markQuestionAsCompleted = (questionId: number): void => {
  const data = getStoredData();
  if (!data.completedQuestions.includes(questionId)) {
    data.completedQuestions.push(questionId);
    saveStoredData(data);
  }
};

export const resetProgress = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
};

const getDefaultData = (): UserProgress => ({
  isPaid: false,
  completedQuestions: [],
  categoryProgress: {},
  totalScore: 0,
  quizHistory: []
});
