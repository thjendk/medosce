import Role from 'models/role.model';
import DataLoader from 'dataloader';

const batchRoles = async (ids: string[]) => {
  const roles = await Role.query().findByIds(ids);
  return ids.map((id) => roles.find((role) => role.roleId === id));
};

export const roleLoader = new DataLoader((ids: string[]) => batchRoles(ids));
