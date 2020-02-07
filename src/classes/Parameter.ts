import { gql } from 'apollo-boost';
import Apollo from './Apollo';
import quizReducer from 'redux/reducers/quiz';
import Question from './Question';
import store from 'config/persistStore';

interface Parameter {
  id: number;
  name: string;
  parent: Parameter;
  isForcedSubMenu: boolean;
}

export interface ParameterInput {
  name: string;
  parentId: number;
  isForcedSubMenu: boolean;
}

export interface ParameterVoteInput {
  questionAnswerId: number;
  parameterId: number;
  vote: number;
}

class Parameter {
  static fragment = gql`
    fragment Parameter on Parameter {
      id
      name
      parent {
        id
      }
      isForcedSubMenu
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

  static suggest = async (data: ParameterInput) => {
    const mutation = gql`
      mutation SuggestParameter($data: ParameterInput) {
        suggestParameter(data: $data)
      }
    `;

    const answer = await Apollo.mutate('suggestParameter', mutation, { data });
    if (answer.includes('added')) {
      await Parameter.fetchAll();
    }
    return 'Success';
  };

  static vote = async (data: ParameterVoteInput) => {
    const mutation = gql`
      mutation VoteParameter($data: ParameterVoteInput) {
        createOrUpdateParameterVote(data: $data) {
          ...Question
        }
      }
      ${Question.fragment}
    `;

    const question = await Apollo.mutate<Question>('createOrUpdateParameterVote', mutation, {
      data
    });
    store.dispatch(quizReducer.actions.addQuestion(question));
  };
}

export default Parameter;
