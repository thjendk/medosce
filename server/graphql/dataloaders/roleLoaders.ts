import DataLoader from 'dataloader';
import Role from 'models/role.model';

const batchRoles = async (ids: number[]) => {
  const roles = await Role.query().findByIds(ids);
  return ids.map((id) => roles.find((role) => role.roleId === id));
};

export const roleLoader = () => new DataLoader((ids: number[]) => batchRoles(ids));
