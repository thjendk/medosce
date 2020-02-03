import { store } from 'index';
import quizReducer from 'redux/reducers/quiz';

interface ParameterAnswer {
  parameterId: number;
  questionId: number;
  giveUp: boolean;
  stationId: number;
}

class ParameterAnswer {
  static answer = (parameterId: ParameterAnswer) => {
    store.dispatch(quizReducer.actions.addParameterAnswer(parameterId));
  };

  static submitAnswers = () => {
    // TODO: Svar til databasen
  };
}

export default ParameterAnswer;
