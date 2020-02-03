import { Model } from 'objection';

interface QuestionsQuestionType {
  questionTypeId: number;
  questionId: number;
}

class QuestionsQuestionType extends Model {
  static tableName = 'questionsQuestionTypes';
  static idColumn = ['questionTypeId', 'questionId'];

  static updateRelations = async (questionId: number, questionTypeIds: number[]) => {
    const inserts = questionTypeIds.map((questionTypeId) => ({ questionTypeId, questionId }));
    await QuestionsQuestionType.query()
      .where({ questionId })
      .delete();
    await QuestionsQuestionType.query().insertGraph(inserts);
    return 0;
  };
}

export default QuestionsQuestionType;
