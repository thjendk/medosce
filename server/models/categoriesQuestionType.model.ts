import { Model } from 'objection';

interface CategoriesQuestionType {
  categoryId: string;
  questionTypeId: string;
}

class CategoriesQuestionType extends Model {
  static tableName = 'categoriesQuestionTypes';
  static idColumn = ['categoryId', 'questionTypeId'];
}

export default CategoriesQuestionType;
