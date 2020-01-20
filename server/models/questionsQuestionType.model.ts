import { Model } from 'objection';

interface QuestionsQuestionType {
  questionTypeId: string;
  questionId: string;
}

class QuestionsQuestionType extends Model {
  static tableName = 'questionsQuestionTypes';
  static idColumn = ['questionTypeId', 'questionId'];
}

export default QuestionsQuestionType;
