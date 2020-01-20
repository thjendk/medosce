import { gql } from 'apollo-boost';
import Apollo from './Apollo';
import { store } from 'index';
import quizReducer from 'redux/reducers/quiz';
import Category from './Category';
import adminReducer from 'redux/reducers/admin';

interface Parameter {
  id: string;
  name: string;
  categories: Category[];
}

export interface ParameterInput {
  name: string;
  categoryIds: string[];
}

class Parameter {
  static fragment = gql`
    fragment Parameter on Parameter {
      id
      name
      categories {
        ...Category
      }
    }
    ${Category.fragment}
  `;

  static questionParameterFragment = gql`
    fragment QuestionParameter on QuestionParameter {
      id
      value
      point
      parameter {
        ...Parameter
      }
    }
    ${Parameter.fragment}
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

  static create = async (data: ParameterInput) => {
    const mutation = gql`
      mutation($data: ParameterInput) {
        createParameter(data: $data) {
          ...Parameter
        }
      }
      ${Parameter.fragment}
    `;

    const parameter = await Apollo.mutate<Parameter>('createParameter', mutation, { data });
    return store.dispatch(quizReducer.actions.addParameter(parameter));
  };

  static update = async (id: String, data: Partial<ParameterInput>) => {
    const mutation = gql`
      mutation($id: String, $data: ParameterInput) {
        updateParameter(id: $id, data: $data) {
          ...Parameter
        }
      }
      ${Parameter.fragment}
    `;

    const parameter = await Apollo.mutate<Parameter>('updateParameter', mutation, { id, data });
    store.dispatch(quizReducer.actions.addParameter(parameter));
  };
}

export default Parameter;
