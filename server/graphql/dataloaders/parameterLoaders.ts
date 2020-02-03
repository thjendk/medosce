import DataLoader from 'dataloader';
import Parameters from 'models/parameters.model';

const batchParameters = async (ids: number[]) => {
  const parameters = await Parameters.query().findByIds(ids);
  return ids.map((id) => parameters.find((parameter) => parameter.parameterId === id));
};

export const parametersLoader = new DataLoader((ids: number[]) => batchParameters(ids));
