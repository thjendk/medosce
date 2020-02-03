import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Station from 'classes/Station';
import Category from 'classes/Category';
import Parameter from 'classes/Parameter';
import ParameterAnswer from 'classes/ParameterAnswer';
import { insertOrReplace } from 'redux/misc/reduxFunctions';

const initialState = {
  items: [] as { station: Station; questionIndex: number }[],
  categories: [] as Category[],
  parameters: [] as Parameter[],
  stationIndex: 0,
  parameterAnswers: [] as ParameterAnswer[]
};

const quizReducer = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setStations: (state, action: PayloadAction<Station[]>) => {
      state.items = action.payload.map((station) => ({ station, questionIndex: 0 }));
    },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    setStationIndex: (state, action: PayloadAction<number>) => {
      state.stationIndex = action.payload;
    },
    setQuestionNumber: (
      state,
      action: PayloadAction<{ stationId: number; questionNumber: number }>
    ) => {
      const index = state.items.findIndex(
        (station) => station.station.id === action.payload.stationId
      );
      if (index === -1) return;
      state.items[index].questionIndex = action.payload.questionNumber;
    },
    setParameters: (state, action: PayloadAction<Parameter[]>) => {
      state.parameters = action.payload;
    },
    addParameterAnswer: (state, action: PayloadAction<ParameterAnswer>) => {
      const index = state.parameterAnswers.findIndex(
        (parameterAnswer) =>
          parameterAnswer.parameterId === action.payload.parameterId &&
          parameterAnswer.questionId === action.payload.questionId
      );
      if (index === -1) {
        state.parameterAnswers.push(action.payload);
      } else {
        state.parameterAnswers[index] = action.payload;
      }
    },
    addParameter: (state, action: PayloadAction<Parameter>) => {
      insertOrReplace(state.parameters, action.payload);
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      insertOrReplace(state.categories, action.payload);
    }
  }
});

export default quizReducer;
