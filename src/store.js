import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './studentSlice'; // Student slice reducer

const store = configureStore({
  reducer: {
    students: studentReducer, // Key for managing student-related state
  },
  // Optionally add middleware or dev tools configuration
});

export default store;
