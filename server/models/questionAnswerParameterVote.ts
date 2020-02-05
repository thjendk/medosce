import { Model } from 'objection';

interface QuestionAnswerParameterVote {
  questionAnswerId: number;
  parameterId: number;
  userId: number;
  vote: number;
}

class QuestionAnswerParameterVote extends Model {
  static tableName = 'questionAnswerParameterVotes';
  static idColumn = ['questionAnswerId', 'parameterId', 'userId'];
}

export default QuestionAnswerParameterVote;
