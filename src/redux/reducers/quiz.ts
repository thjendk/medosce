import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Station from 'classes/Station';
import Category from 'classes/Category';
import Parameter from 'classes/Parameter';
import UserAnswer from 'classes/UserAnswer';

const initialState = {
  items: [] as { station: Station; questionIndex: number }[],
  categories: [] as Category[],
  parameters: [] as Parameter[],
  stationIndex: 0,
  answers: [] as UserAnswer[]
};

const quizReducer = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setStations: (state, action: PayloadAction<Station[]>) => {
      state.items = action.payload.map((station) => ({ station, questionIndex: 1 }));
    },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    setStationIndex: (state, action: PayloadAction<number>) => {
      state.stationIndex = action.payload;
    },
    setQuestionNumber: (
      state,
      action: PayloadAction<{ stationId: string; questionNumber: number }>
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
    addAnswer: (state, action: PayloadAction<UserAnswer>) => {
      state.answers.push(action.payload);
    }
  }
});

export default quizReducer;
