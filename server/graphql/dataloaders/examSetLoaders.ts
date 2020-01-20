import DataLoader from 'dataloader';
import ExamSets from 'models/examSets.model';

const batchExamSets = async (ids: string[]) => {
  const examSets = await ExamSets.query().findByIds(ids);
  return ids.map((id) => examSets.find((examSet) => examSet.examSetId === id));
};

export const examSetLoader = new DataLoader((ids: string[]) => batchExamSets(ids));
