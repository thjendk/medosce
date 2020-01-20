import { gql } from 'apollo-boost';

interface QuestionType {
  id: string;
  name: string;
}

class QuestionType {
  static fragment = gql`
    fragment QuestionType on QuestionType {
      id
      name
    }
  `;
}

export default QuestionType;
