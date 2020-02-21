import DataLoader from 'dataloader';
import QuestionAnswer from 'models/questionAnswer.model';
import Questions from 'models/questions.model';

const batchQuestions = async (ids: number[]) => {
  const questions = await Questions.query().findByIds(ids);
  return ids.map((id) => questions.find((question) => question.questionId === id));
};
const batchQuestionAnswers = async (ids: number[]) => {
  const questionAnswers = await QuestionAnswer.query().findByIds(ids);
  return ids.map((id) =>
    questionAnswers.find((questionAnswer) => questionAnswer.questionAnswerId === id)
  );
};

export const questionsLoader = () => new DataLoader((ids: number[]) => batchQuestions(ids));
export const questionAnswerLoader = () =>
  new DataLoader((ids: number[]) => batchQuestionAnswers(ids));
