import { Model } from 'objection';

interface Categories {
  categoryId: number;
  name: string;
  parentId: number;
  iconName: string;
}

class Categories extends Model {
  static tableName = 'categories';
  static idColumn = 'categoryId';
}

export default Categories;
