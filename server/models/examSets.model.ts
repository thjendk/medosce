import { Model } from 'objection';

interface ExamSets {
  examSetId: number;
  season: 'E' | 'F';
  year: string;
}

class ExamSets extends Model {
  static tableName = 'examSets';
  static idColumn = 'examSetId';
}

export default ExamSets;
