import { Model } from 'objection';

interface ParametersCategories {
  parameterId: string;
  categoryId: string;
}

class ParametersCategories extends Model {
  static tableName = 'parametersCategories';
  static idColumn = ['parameterId', 'categoryId'];

  static updateRelations = async (parameterId: string, categoryIds: string[]) => {
    const inserts = categoryIds.map((categoryId) => ({ parameterId, categoryId }));
    await ParametersCategories.query()
      .where({ parameterId })
      .delete();
    await ParametersCategories.query().insertGraph(inserts);
  };
}

export default ParametersCategories;
