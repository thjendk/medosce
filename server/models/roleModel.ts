import { Model } from 'objection';

interface Role {
  roleId: string;
  name: string;
}

class Role extends Model {
  static tableName = 'roles';
  static idColumn = 'roleId';
}

export default Role;
