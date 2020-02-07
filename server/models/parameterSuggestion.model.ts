import { Model } from 'objection';

interface ParameterSuggestion {
  parameterSuggestionId: number;
  name: string;
  parentId: number;
  userId: number;
}

class ParameterSuggestion extends Model {
  static tableName = 'parameterSuggestions';
  static idColumn = 'parameterSuggestionId';
}

export default ParameterSuggestion;
