import { store } from 'index';
import quizReducer from 'redux/reducers/quiz';

interface UserAnswer {
  parameterId: number | null;
  questionId: number;
}

class UserAnswer {
  static answer = (parameterId: UserAnswer) => {
    store.dispatch(quizReducer.actions.addUserAnswer(parameterId));
  };

  static submitAnswers = () => {
    // TODO: Svar til databasen
  };
}

export default UserAnswer;
