import { Model } from 'objection';

interface ParametersCategories {
  parameterId: number;
  categoryId: number;
}

class ParametersCategories extends Model {
  static tableName = 'parametersCategories';
  static idColumn = ['parameterId', 'categoryId'];

  static updateRelations = async (parameterId: number, categoryIds: number[]) => {
    const inserts = categoryIds.map((categoryId) => ({ parameterId, categoryId }));
    await ParametersCategories.query()
      .where({ parameterId })
      .delete();
    await ParametersCategories.query().insertGraph(inserts);
  };
}

export default ParametersCategories;
