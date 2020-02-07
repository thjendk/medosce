import quizReducer from 'redux/reducers/quiz';
import store from 'config/persistStore';

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
