export const insertOrReplace = <T extends any>(array: T[], item: T) => {
  const index = array.findIndex((arrayItem) => arrayItem.id === item.id);
  if (index !== -1) return (array[index] = item);
  return array.push(item);
};
