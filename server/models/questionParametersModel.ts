import { Model } from 'objection';

interface QuestionParameters {
  questionId: string;
  parameterId: string;
  value: string;
  point: number;
}

class QuestionParameters extends Model {
  static tableName = 'questionParameters';
  static idColumn = ['questionId', 'parameterId'];
}

export default QuestionParameters;
