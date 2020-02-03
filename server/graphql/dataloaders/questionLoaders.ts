import DataLoader from 'dataloader';
import Questions from 'models/questions.model';

const batchQuestions = async (ids: number[]) => {
  const questions = await Questions.query().findByIds(ids);
  return ids.map((id) => questions.find((question) => question.questionId === id));
};

export const questionsLoader = new DataLoader((ids: number[]) => batchQuestions(ids));
