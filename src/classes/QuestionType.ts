import { gql } from 'apollo-boost';
import Apollo from './Apollo';
import { store } from 'index';
import adminReducer from 'redux/reducers/admin';

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

  static fetchAll = async () => {
    const query = gql`
      query {
        questionTypes {
          ...QuestionType
        }
      }
      ${QuestionType.fragment}
    `;

    const questionTypes = await Apollo.query<QuestionType[]>('questionTypes', query);
    return store.dispatch(adminReducer.actions.setQuestionTypes(questionTypes));
  };
}

export default QuestionType;
