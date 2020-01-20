import DataLoader from 'dataloader';
import Categories from 'models/categories.model';

const batchCategories = async (ids: string[]) => {
  const categories = await Categories.query().findByIds(ids);
  return ids.map((id) => categories.find((category) => category.categoryId === id));
};

export const categoryLoader = new DataLoader((ids: string[]) => batchCategories(ids));
