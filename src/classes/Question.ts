import Parameter from './Parameter';
import { store } from 'index';
import quizReducer from 'redux/reducers/quiz';
import UserAnswer from './UserAnswer';
import { gql } from 'apollo-boost';
import Apollo from './Apollo';
import adminReducer from 'redux/reducers/admin';
import Station from './Station';
import QuestionType from './QuestionType';

interface Question {
  id: string;
  questionNumber: number;
  text: string;
  station: Station;
  parameters: QuestionParameter[];
  questionTypes: QuestionType[];
}

export interface QuestionParameter {
  id: string;
  value: string;
  point: number;
  parameter: Parameter;
}

export interface QuestionInput {
  stationId: string;
  text: string;
  questionNumber: number;
}

export interface QuestionParameterInput {
  questionId: string;
  parameterId: string;
  value: string;
  point: number;
}

class Question {
  static fragment = gql`
    fragment Question on Question {
      id
      text
      questionNumber
      station {
        id
      }
      parameters {
        ...QuestionParameter
      }
      questionTypes {
        ...QuestionType
      }
    }
    ${Parameter.questionParameterFragment}
    ${QuestionType.fragment}
  `;

  static fetchAll = async () => {
    const query = gql`
      query {
        questions {
          ...Question
        }
      }
      ${Question.fragment}
    `;

    const questions = await Apollo.query<Question[]>('questions', query);
    return store.dispatch(adminReducer.actions.setQuestions(questions));
  };

  static nextQuestion = (stationId: string) => {
    const state = store.getState();
    const stationIndex = state.quiz.items.findIndex((item) => item.station.id === stationId);
    const nextQuestionNumber = state.quiz.items[stationIndex].questionIndex + 1;
    store.dispatch(
      quizReducer.actions.setQuestionNumber({ stationId, questionNumber: nextQuestionNumber })
    );
  };

  static answer = (parameterId: UserAnswer) => {
    store.dispatch(quizReducer.actions.addAnswer(parameterId));
  };

  static create = async (data: QuestionInput) => {
    const mutation = gql`
      mutation($data: QuestionInput) {
        createQuestion(data: $data) {
          ...Question
        }
      }
      ${Question.fragment}
    `;

    const question = await Apollo.mutate<Question>('createQuestion', mutation, { data });
    return store.dispatch(adminReducer.actions.addQuestion(question));
  };

  static addParameter = async (data: QuestionParameterInput) => {
    const mutation = gql`
      mutation($data: QuestionParameterInput) {
        createQuestionParameter(data: $data) {
          ...Question
        }
      }
      ${Question.fragment}
    `;

    const question = await Apollo.mutate<Question>('createQuestionParameter', mutation, { data });
    return store.dispatch(adminReducer.actions.addQuestion(question));
  };

  static deleteParameter = async (id: String) => {
    const mutation = gql`
      mutation($id: String) {
        deleteQuestionParameter(id: $id) {
          ...Question
        }
      }
      ${Question.fragment}
    `;

    const question = await Apollo.mutate<Question>('deleteQuestionParameter', mutation, { id });
    return store.dispatch(adminReducer.actions.addQuestion(question));
  };
}

export default Question;
