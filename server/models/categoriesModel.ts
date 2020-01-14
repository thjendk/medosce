import { Model } from 'objection';

interface Categories {
  categoryId: string;
  name: string;
}

class Categories extends Model {
  static tableName = 'categories';
  static idColumn = 'categoryId';
}

export default Categories;
