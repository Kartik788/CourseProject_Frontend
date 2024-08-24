import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    axios.get('http://localhost:8080/api/courses')
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching courses:', error));
  };

  const deleteCourse = (id) => {
    axios.delete(`http://localhost:8080/api/courses/${id}`)
      .then(() => fetchCourses())
      .catch(error => console.error('Error deleting course:', error));
  };

  const showCourseDetails = (course) => {
    alert(`Course Details:\n\nID: ${course.id}\nTitle: ${course.title}\nCourse Code: ${course.courseCode}\nDescription: ${course.description}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.tableContainer}>
        <h2 style={styles.header}>Courses</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Course Code</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id}>
                <td style={styles.td}>{course.title}</td>
                <td style={styles.td}>{course.courseCode}</td>
                <td style={styles.td}>
                  <button 
                    onClick={() => showCourseDetails(course)} 
                    style={styles.detailsButton}
                  >
                    Details
                  </button>
                  <button 
                    onClick={() => deleteCourse(course.id)} 
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
  tableContainer: {
    maxWidth: '800px',
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
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '10px',
    borderBottom: '2px solid #ccc',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  detailsButton: {
    padding: '5px 10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    marginRight: '5px',
  },
  deleteButton: {
    padding: '5px 10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#dc3545',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default CourseList;
