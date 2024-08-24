import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Home Page</h1>
      <div style={styles.buttonContainer}>
        <button
          onClick={() => navigate('/courses/create')}
          style={styles.button}
        >
          Create Course
        </button>
        <button
          onClick={() => navigate('/courses')}
          style={styles.button}
        >
          Course List
        </button>
        <button
          onClick={() => navigate('/instances/create')}
          style={styles.button}
        >
          Create Course Instance
        </button>
        <button
          onClick={() => navigate('/instances')}
          style={styles.button}
        >
          Course Instances List
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
    padding: '20px',
    boxSizing: 'border-box',
  },
  header: {
    marginBottom: '30px',
    fontSize: '2em',
    color: '#333',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  button: {
    padding: '15px 30px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '1.2em',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s, box-shadow 0.3s',
  },
};

export default HomePage;
