import { Model } from 'objection';

interface QuestionType {
  questionTypeId: string;
  name: string;
}

class QuestionType extends Model {
  static tableName = 'questionTypes';
  static idColumn = 'questionTypeId';
}

export default QuestionType;
