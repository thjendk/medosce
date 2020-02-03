import { Model } from 'objection';

interface QuestionParameters {
  questionParameterId: number;
  questionId: number;
  parameterId: number;
  value: string;
  point: number;
}

class QuestionParameters extends Model {
  static tableName = 'questionParameters';
  static idColumn = 'questionParameterId';
}

export default QuestionParameters;
