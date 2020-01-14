import Parameter from './Parameter';
import { store } from 'index';
import quizReducer from 'redux/reducers/quiz';
import UserAnswer from './UserAnswer';

interface Question {
  id: string;
  questionNumber: number;
  text: string;
  parameters: [Parameter];
}

class Question {
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
}

export default Question;
