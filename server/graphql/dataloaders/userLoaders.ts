import DataLoader from 'dataloader';
import User from 'models/user.model';

const batchUsers = async (ids: number[]) => {
  const users = await User.query().findByIds(ids);
  return ids.map((id) => users.find((user) => user.userId === id));
};

export const userLoader = new DataLoader((ids: number[]) => batchUsers(ids));
