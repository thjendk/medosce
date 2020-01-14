import { Model } from 'objection';

interface Questions {
  questionId: string;
  stationId: string;
  questionNumber: number;
  text: string;
}

class Questions extends Model {
  static tableName = 'questions';
  static idColumn = 'questionId';
}

export default Questions;
