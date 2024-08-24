import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseInstanceForm = () => {
  const [courseYear, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [courseId, setCourseId] = useState('');
  const [courses, setCourses] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch courses when the component mounts
    axios.get('http://localhost:8080/api/courses')
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!courseYear) newErrors.courseYear = 'Year is required';
    if (!semester) newErrors.semester = 'Semester is required';
    if (!courseId) newErrors.courseId = 'Course ID is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios.post('http://localhost:8080/api/instances', {
        courseYear,
        semester,
        courseId,
      })
      .then(() => {
        alert('Course instance successfully created');
        // Reset fields after successful submission
        setYear('');
        setSemester('');
        setCourseId('');
        setErrors({});
      })
      .catch((error) => console.error('Error creating instance:', error));
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.header}>Create Course Instance</h2>
        <label style={styles.label}>
          Year:
          <input 
            type="number" 
            value={courseYear} 
            onChange={(e) => setYear(e.target.value)} 
            required 
            style={styles.input} 
          />
          {errors.courseYear && <span style={styles.error}>{errors.courseYear}</span>}
        </label>
        <label style={styles.label}>
          Semester:
          <input 
            type="number" 
            value={semester} 
            onChange={(e) => setSemester(e.target.value)} 
            required 
            style={styles.input} 
          />
          {errors.semester && <span style={styles.error}>{errors.semester}</span>}
        </label>
        <label style={styles.label}>
          Course ID:
          <select 
            value={courseId} 
            onChange={(e) => setCourseId(e.target.value)} 
            required 
            style={styles.input} 
          >
            <option value="">Select a course</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>
                {course.title} ({course.courseCode})
              </option>
            ))}
          </select>
          {errors.courseId && <span style={styles.error}>{errors.courseId}</span>}
        </label>
        <button 
          type="submit" 
          style={styles.submitButton}
        >
          Create Instance
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
  },
  form: {
    maxWidth: '600px',
    width: '100%',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '20px',
  },
  input: {
    width: 'calc(100% - 22px)',
    padding: '10px',
    marginTop: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  error: {
    display: 'block',
    color: 'red',
    fontSize: '12px',
    marginTop: '5px',
  },
  submitButton: {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    width: '100%',
  },
};

export default CourseInstanceForm;
