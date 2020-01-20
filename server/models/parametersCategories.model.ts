import { Model } from 'objection';

interface ParametersCategories {
  parameterId: string;
  categoryId: string;
}

class ParametersCategories extends Model {
  static tableName = 'parametersCategories';
  static idColumn = ['parameterId', 'categoryId'];
}

export default ParametersCategories;
