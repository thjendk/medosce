import QuestionType from 'models/questionTypes.model';
import DataLoader from 'dataloader';

const batchQuestionTypes = async (ids: string[]) => {
  const questionTypes = await QuestionType.query().findByIds(ids);
  return ids.map((id) => questionTypes.find((questionType) => questionType.questionTypeId === id));
};

export const questionTypeLoader = new DataLoader((ids: string[]) => batchQuestionTypes(ids));
