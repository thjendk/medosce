import DataLoader from 'dataloader';
import Questions from 'models/questionsModel';

const batchQuestions = async (ids: string[]) => {
  const questions = await Questions.query().findByIds(ids);
  return ids.map((id) => questions.find((question) => question.questionId === id));
};

export const questionsLoader = new DataLoader((ids: string[]) => batchQuestions(ids));
