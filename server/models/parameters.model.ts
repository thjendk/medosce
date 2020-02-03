import { Model } from 'objection';

interface Parameters {
  parameterId: number;
  name: string;
  categoryId: number;
  parentId: number;
}

class Parameters extends Model {
  static tableName = 'parameters';
  static idColumn = 'parameterId';
}

export default Parameters;
