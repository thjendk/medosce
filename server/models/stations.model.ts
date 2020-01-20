import { Model } from 'objection';

interface Stations {
  stationId: string;
  intro: string;
  globalScore: number;
  stationNumber: number;
  examSetId: string;
}

class Stations extends Model {
  static tableName = 'stations';
  static idColumn = 'stationId';
}

export default Stations;
