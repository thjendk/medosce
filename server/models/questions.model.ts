import { Model } from 'objection';

interface Questions {
  questionId: string;
  stationId: string;
  text: string;
  questionNumber: number;
}

class Questions extends Model {
  static tableName = 'questions';
  static idColumn = 'questionId';
}

export default Questions;
