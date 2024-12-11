import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Axios instance
const api = axios.create({
  baseURL: 'http://localhost',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Login Function
const loginUser = async () => {
  try {
    const response = await api.get('/training/assignments/backend/api.php');
    console.log(response,'response');
    
    const data = response.data.students;
    console.log(data,"data");
    
    return data;
  } catch (error) {
    console.error('Login Error:', error);
    throw error.response?.data || error.message;
  }
};

// Fetch Students Function
const fetchStudents = async (page = 1) => {
  try {
    const response = await api.get(`/training/assignments/backend/api.php`);
    console.log(response,"response");

    const data = response.data.students;
    console.log(data,"data");
    
    return response.data.students;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error.response?.data || error.message;
  }
};

export {loginUser,fetchStudents};
