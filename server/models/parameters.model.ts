import { Model } from 'objection';

interface Parameters {
  parameterId: number;
  name: string;
  parentId: number;
  isForcedSubMenu: 1 | 0;
}

class Parameters extends Model {
  static tableName = 'parameters';
  static idColumn = 'parameterId';
}

export default Parameters;
