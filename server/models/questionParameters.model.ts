import { Model } from 'objection';

interface QuestionParameters {
  questionParameterId: string;
  questionId: string;
  parameterId: string;
  value: string;
  point: number;
}

class QuestionParameters extends Model {
  static tableName = 'questionParameters';
  static idColumn = 'questionParameterId';
}

export default QuestionParameters;
