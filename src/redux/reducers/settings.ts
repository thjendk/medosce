import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showToolbox: true
};

const settingsReducer = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleToolbox: (state) => {
      state.showToolbox = !state.showToolbox;
    }
  }
});

export default settingsReducer;
