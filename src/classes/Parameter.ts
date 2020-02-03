import { gql } from 'apollo-boost';
import Apollo from './Apollo';
import { store } from 'index';
import quizReducer from 'redux/reducers/quiz';
import Category from './Category';

interface Parameter {
  id: number;
  name: string;
  categories: Category[];
  parent: Parameter;
}

export interface ParameterInput {
  name: string;
  categoryIds: number[];
}

class Parameter {
  static fragment = gql`
    fragment Parameter on Parameter {
      id
      name
      categories {
        ...Category
      }
      parent {
        id
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

  static update = async (id: number, data: Partial<ParameterInput>) => {
    const mutation = gql`
      mutation($id: Int, $data: ParameterInput) {
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
