import { Model } from 'objection';

interface Questions {
  questionId: number;
  stationId: number;
  text: string;
  questionNumber: number;
}

class Questions extends Model {
  static tableName = 'questions';
  static idColumn = 'questionId';
}

export default Questions;
