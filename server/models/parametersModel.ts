import { Model } from 'objection';

interface Parameters {
  parameterId: string;
  name: string;
  categoryId: string;
}

class Parameters extends Model {
  static tableName = 'parameters';
  static idColumn = 'parameterId';
}

export default Parameters;
