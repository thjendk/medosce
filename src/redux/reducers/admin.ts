import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ExamSet from 'classes/ExamSet';
import { insertOrReplace } from 'redux/misc/reduxFunctions';
import Station from 'classes/Station';
import Question from 'classes/Question';
import QuestionType from 'classes/QuestionType';

const initialState = {
  examSets: [] as ExamSet[],
  stations: [] as Station[],
  questions: [] as Question[],
  questionTypes: [] as QuestionType[]
};

const adminReducer = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setExamSets: (state, action: PayloadAction<ExamSet[]>) => {
      state.examSets = action.payload;
    },
    addExamSet: (state, action: PayloadAction<ExamSet>) => {
      insertOrReplace<ExamSet>(state.examSets, action.payload);
    },
    setStations: (state, action: PayloadAction<Station[]>) => {
      state.stations = action.payload;
    },
    addStation: (state, action: PayloadAction<Station>) => {
      insertOrReplace(state.stations, action.payload);
    },
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
    },
    addQuestion: (state, action: PayloadAction<Question>) => {
      insertOrReplace(state.questions, action.payload);
    },
    setQuestionTypes: (state, action: PayloadAction<QuestionType[]>) => {
      state.questionTypes = action.payload;
    }
  }
});

export default adminReducer;
