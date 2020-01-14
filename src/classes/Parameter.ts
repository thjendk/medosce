import { gql } from 'apollo-boost';
import Apollo from './Apollo';
import { store } from 'index';
import quizReducer from 'redux/reducers/quiz';

interface Parameter {
  id: string;
  name: string;
  value: string;
  point: number;
}

class Parameter {
  static fragment = gql`
    fragment Parameter on Parameter {
      id
      name
      value
      point
    }
  `;

  static fetchAll = async () => {
    const query = gql`
      query {
        parameters {
          ...Parameter
        }
      }
      ${Parameter.fragment}
    `;

    const parameters = await Apollo.query<Parameter[]>('parameters', query);
    store.dispatch(quizReducer.actions.setParameters(parameters));
  };
}

export default Parameter;
