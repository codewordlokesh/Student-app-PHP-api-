import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  students: [],
  loading: false,
  error: null,
};

// Fetch students action
export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
  const response = await axios.get('http://localhost/training/assignments/backend/api.php');
  return response.data.students;  // Return data for the students
});

// Add student action
export const addStudent = createAsyncThunk('students/addStudent', async (newStudent) => {
  const response = await axios.post('http://localhost/training/assignments/backend/api.php', newStudent);
  return response.data;  // Assuming the API returns the newly added student data
});

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handling add student
      .addCase(addStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students.push(action.payload);  // Add the newly added student to the list
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Default export of the reducer
export default studentSlice.reducer;
