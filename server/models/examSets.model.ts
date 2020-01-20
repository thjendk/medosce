import { Model } from 'objection';

interface ExamSets {
  examSetId: string;
  season: 'E' | 'F';
  year: string;
}

class ExamSets extends Model {
  static tableName = 'examSets';
  static idColumn = 'examSetId';
}

export default ExamSets;
