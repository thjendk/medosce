import { Model } from 'objection';

interface QuestionAnswer {
  questionAnswerId: number;
  questionId: number;
  value: string;
  point: number;
}

class QuestionAnswer extends Model {
  static tableName = 'questionAnswers';
  static idColumn = 'questionAnswerId';
}

export default QuestionAnswer;
