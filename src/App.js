import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import StudentList from './studentcomponents/studentList';
import StudentDetails from './studentcomponents/studentDetails';
import EditStudent from './studentcomponents/EditStudent';
import DeleteStudent from './studentcomponents/DeleteStudent';
import AddStudent from './studentcomponents/add-student';
import Login from './studentcomponents/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/studentList" element={<StudentList />} />
      <Route path="/view/:id" element={<StudentDetails />} />
      <Route path="/edit/:id" element={<EditStudent />} />
      <Route path="/delete/:id" element={<DeleteStudent />} />
      <Route path="/addstudent" element={<AddStudent />} />
      <Route path="/home" element={<h2>Welcome to the Home Page</h2>} />
    </Routes>
  );
}

export default App;
