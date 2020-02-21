import DataLoader from 'dataloader';
import Stations from 'models/stations.model';

const batchStations = async (ids: number[]) => {
  const stations = await Stations.query().findByIds(ids);
  return ids.map((id) => stations.find((station) => station.stationId === id));
};

export const stationLoader = () => new DataLoader((ids: number[]) => batchStations(ids));
