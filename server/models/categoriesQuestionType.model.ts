import { Model } from 'objection';

interface CategoriesQuestionType {
  categoryId: number;
  questionTypeId: number;
}

class CategoriesQuestionType extends Model {
  static tableName = 'categoriesQuestionTypes';
  static idColumn = ['categoryId', 'questionTypeId'];
}

export default CategoriesQuestionType;
