import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Station from 'classes/Station';
import Parameter from 'classes/Parameter';
import UserAnswer from 'classes/UserAnswer';
import { insertOrReplace } from 'redux/misc/reduxFunctions';
import Question from 'classes/Question';

const initialState = {
  quizItems: [] as { station: Station; questionIndex: number }[],
  questions: [] as Question[],
  parameters: [] as Parameter[],
  giveUpQuestionIds: [] as number[],
  stationIndex: 0,
  userAnswers: [] as UserAnswer[]
};

const quizReducer = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setStations: (state, action: PayloadAction<Station[]>) => {
      state.quizItems = action.payload.map((station) => ({ station, questionIndex: 0 }));
      action.payload.map((station) => state.questions.push(...station.questions));
    },
    setStationIndex: (state, action: PayloadAction<number>) => {
      state.stationIndex = action.payload;
    },
    setQuestionNumber: (
      state,
      action: PayloadAction<{ stationId: number; questionNumber: number }>
    ) => {
      const index = state.quizItems.findIndex(
        (station) => station.station.id === action.payload.stationId
      );
      if (index === -1) return;
      state.quizItems[index].questionIndex = action.payload.questionNumber;
    },
    setParameters: (state, action: PayloadAction<Parameter[]>) => {
      state.parameters = action.payload;
    },
    addUserAnswer: (state, action: PayloadAction<UserAnswer>) => {
      const index = state.userAnswers.findIndex(
        (parameterAnswer) =>
          parameterAnswer.parameterId === action.payload.parameterId &&
          parameterAnswer.questionId === action.payload.questionId
      );
      if (index === -1) {
        state.userAnswers.push(action.payload);
      } else {
        state.userAnswers[index] = action.payload;
      }
    },
    addParameter: (state, action: PayloadAction<Parameter>) => {
      insertOrReplace(state.parameters, action.payload);
    },
    addGiveUpQuestionId: (state, action: PayloadAction<number>) => {
      state.giveUpQuestionIds.push(action.payload);
    },
    addQuestion: (state, action: PayloadAction<Question>) => {
      insertOrReplace(state.questions, action.payload);
    }
  }
});

export default quizReducer;
