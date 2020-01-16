import * as userLoaders from './userLoaders';
import * as examSetLoaders from './examSetLoaders';
import * as categoryLoaders from './categoryLoaders';
import * as parameterLoaders from './parameterLoaders';
import * as questionLoaders from './questionLoaders';
import * as stationLoaders from './stationLoaders';
import * as roleLoaders from './roleLoaders';

export const generateLoaders = () => ({
  ...userLoaders,
  ...examSetLoaders,
  ...categoryLoaders,
  ...parameterLoaders,
  ...questionLoaders,
  ...stationLoaders,
  ...roleLoaders
});
