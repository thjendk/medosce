import DataLoader from 'dataloader';
import Parameters from 'models/parametersModel';

const batchParameters = async (ids: string[]) => {
  const parameters = await Parameters.query().findByIds(ids);
  return ids.map((id) => parameters.find((parameter) => parameter.parameterId === id));
};

export const parametersLoader = new DataLoader((ids: string[]) => batchParameters(ids));
