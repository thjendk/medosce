import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  questionCount: null as number,
  parameterCount: null as number
};

const selectionReducer = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    setSelectionCounts: (state, action: PayloadAction<Partial<typeof initialState>>) => {
      state.parameterCount = action.payload.parameterCount;
      state.questionCount = action.payload.questionCount;
    }
  }
});

export default selectionReducer;
