import Stations from 'models/stationsModel';
import DataLoader from 'dataloader';

const batchStations = async (ids: string[]) => {
  const stations = await Stations.query().findByIds(ids);
  return ids.map((id) => stations.find((station) => station.stationId === id));
};

export const stationLoader = new DataLoader((ids: string[]) => batchStations(ids));
