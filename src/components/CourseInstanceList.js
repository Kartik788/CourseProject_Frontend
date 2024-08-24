import React, { useState } from 'react';
import axios from 'axios';

const CourseInstanceList = () => {
  const [instances, setInstances] = useState([]);
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');

  // Fetch instances based on the input year and semester
  const fetchInstances = () => {
    axios.get(`http://localhost:8080/api/instances/${year}/${semester}`)
      .then(response => {
        const instancesData = response.data;
        Promise.all(instancesData.map(instance =>
          axios.get(`http://localhost:8080/api/courses/${instance.courseId}`)
            .then(courseResponse => {
              console.log(courseResponse.data);  // Log the API response to check structure
              return {
                ...instance,
                courseTitle: courseResponse.data.title,
                courseCode: courseResponse.data.courseCode,
                courseId: courseResponse.data.id, // Fetch and store course ID
                courseDescription: courseResponse.data.description, // Fetch and store course description
              };
            })
        )).then(combinedData => setInstances(combinedData))
          .catch(error => console.error('Error fetching course details:', error));
      })
      .catch(error => console.error('Error fetching instances:', error));
  };

  // Delete an instance by ID
  const deleteInstance = (id) => {
    axios.delete(`http://localhost:8080/api/instances/${year}/${semester}/${id}`)
      .then(() => fetchInstances())
      .catch(error => console.error('Error deleting instance:', error));
  };

  // Show instance details in an alert
  const showDetails = (instance) => {
    alert(`Course Title: ${instance.courseTitle}\nYear: ${year}\nSemester: ${semester}\nCourse Code: ${instance.courseCode}\nCourse ID: ${instance.courseId}\nCourse Description: ${instance.courseDescription}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.header}>Course Instances</h2>
        
        <div style={styles.form}>
          <label>
            Year:
            <input 
              type="number" 
              value={year} 
              onChange={(e) => setYear(e.target.value)} 
              style={styles.input}
            />
          </label>
          <label>
            Semester:
            <input 
              type="number" 
              value={semester} 
              onChange={(e) => setSemester(e.target.value)} 
              style={styles.input}
            />
          </label>
          <button 
            onClick={fetchInstances} 
            style={styles.fetchButton}
          >
            Fetch Instances
          </button>
        </div>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Course Title</th>
              <th style={styles.th}>Year</th>
              <th style={styles.th}>Semester</th>
              <th style={styles.th}>Course Code</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {instances.map(instance => (
              <tr key={instance.id}>
                <td style={styles.td}>{instance.courseTitle}</td>
                <td style={styles.td}>{year}</td>
                <td style={styles.td}>{semester}</td>
                <td style={styles.td}>{instance.courseCode}</td>
                <td style={styles.td}>
                  <button 
                    onClick={() => showDetails(instance)} 
                    style={styles.detailsButton}
                  >
                    Details
                  </button>
                  <button 
                    onClick={() => deleteInstance(instance.id)} 
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
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
  },
  formContainer: {
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '900px',
    width: '100%',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  fetchButton: {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
  tableContainer: {
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    borderBottom: '2px solid #ddd',
    padding: '10px',
    textAlign: 'left',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  detailsButton: {
    padding: '5px 10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#28a745',
    color: '#fff',
    cursor: 'pointer',
    marginRight: '10px',
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

export default CourseInstanceList;
