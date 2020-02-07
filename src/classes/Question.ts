import quizReducer from 'redux/reducers/quiz';
import { gql } from 'apollo-boost';
import Apollo from './Apollo';
import adminReducer from 'redux/reducers/admin';
import Station from './Station';
import Parameter from './Parameter';
import User from './User';
import selectionReducer from 'redux/reducers/selection';
import store from 'config/persistStore';

interface Question {
  id: number;
  questionNumber: number;
  text: string;
  station: Station;
  answers: QuestionAnswer[];
}

export interface QuestionAnswer {
  id: number;
  value: string;
  point: number;
  votes: QuestionParameterVote[];
  parameters: Parameter[];
}

export interface QuestionParameterVote {
  questionAnswer: QuestionAnswer;
  parameter: Parameter;
  user: User;
  vote: number;
}

export interface QuestionInput {
  stationId: number;
  text: string;
  questionNumber: number;
  questionTypeIds: number[];
}

export interface QuestionAnswerInput {
  questionId: number;
  value: string;
  point: number;
}

export interface ParameterVoteInput {
  questionAnswerId: number;
  parameterId: number;
  vote: number;
}

class Question {
  static questionAnswerFragment = gql`
    fragment QuestionAnswer on QuestionAnswer {
      id
      value
      point
      parameters {
        ...Parameter
      }
      votes {
        questionAnswer {
          id
        }
        parameter {
          ...Parameter
        }
        user {
          id
        }
        vote
      }
    }
    ${Parameter.fragment}
  `;

  static fragment = gql`
    fragment Question on Question {
      id
      text
      questionNumber
      station {
        id
      }
      answers {
        ...QuestionAnswer
      }
    }
    ${Question.questionAnswerFragment}
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

  static nextQuestion = (stationId: number) => {
    const state = store.getState();
    const stationIndex = state.quiz.quizItems.findIndex((item) => item.station.id === stationId);
    const nextQuestionNumber = state.quiz.quizItems[stationIndex].questionIndex + 1;
    store.dispatch(
      quizReducer.actions.setQuestionNumber({ stationId, questionNumber: nextQuestionNumber })
    );
  };

  static create = async (data: Partial<QuestionInput>) => {
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

  static update = async (id: Question['id'], data: Partial<QuestionInput>) => {
    const mutation = gql`
      mutation($id: Int, $data: QuestionInput) {
        updateQuestion(id: $id, data: $data) {
          ...Question
        }
      }
      ${Question.fragment}
    `;

    const question = await Apollo.mutate<Question>('updateQuestion', mutation, { id, data });
    return store.dispatch(adminReducer.actions.addQuestion(question));
  };

  static addAnswer = async (data: QuestionAnswerInput) => {
    const mutation = gql`
      mutation($data: QuestionAnswerInput) {
        createQuestionAnswer(data: $data) {
          ...Question
        }
      }
      ${Question.fragment}
    `;

    const question = await Apollo.mutate<Question>('createQuestionAnswer', mutation, { data });
    return store.dispatch(adminReducer.actions.addQuestion(question));
  };

  static deleteAnswer = async (id: number) => {
    const mutation = gql`
      mutation($id: Int) {
        deleteQuestionAnswer(id: $id) {
          ...Question
        }
      }
      ${Question.fragment}
    `;

    const question = await Apollo.mutate<Question>('deleteQuestionAnswer', mutation, { id });
    return store.dispatch(adminReducer.actions.addQuestion(question));
  };

  static giveUp = async (questionId: number) => {
    store.dispatch(quizReducer.actions.addGiveUpQuestionId(questionId));
  };

  static createOrUpdateVote = async (data: ParameterVoteInput) => {
    const mutation = gql`
      mutation($data: ParameterVoteInput) {
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

  static fetchCounts = async () => {
    const query = gql`
      query Counts {
        questionCount
        parameterCount
      }
    `;

    const counts = await Apollo.query<{ parametersCount: number; questionCount: number }>(
      '',
      query
    );
    store.dispatch(selectionReducer.actions.setSelectionCounts(counts));
  };
}

export default Question;
