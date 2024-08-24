// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CourseForm from './components/CourseForm';
import CourseList from './components/CourseList';
import CourseInstanceForm from './components/CourseInstanceForm';
import CourseInstanceList from './components/CourseInstanceList';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses/create" element={<CourseForm />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/instances/create" element={<CourseInstanceForm />} />
          <Route path="/instances" element={<CourseInstanceList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
