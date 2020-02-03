import { Model } from 'objection';

interface Stations {
  stationId: number;
  intro: string;
  globalScore: number;
  stationNumber: number;
  examSetId: number;
}

class Stations extends Model {
  static tableName = 'stations';
  static idColumn = 'stationId';
}

export default Stations;
