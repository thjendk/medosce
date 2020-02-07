import { gql } from 'apollo-boost';
import Apollo from './Apollo';
import { store } from 'index';
import quizReducer from 'redux/reducers/quiz';

interface Parameter {
  id: number;
  name: string;
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
      parent {
        id
      }
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

  static suggest = async (data: { name: string; parentId: number }) => {
    const mutation = gql`
      mutation SuggestParameter($data: SuggestParameterInput) {
        suggestParameter(data: $data)
      }
    `;

    await Apollo.mutate('suggestParameter', mutation, { data });
    return 'Success';
  };
}

export default Parameter;
