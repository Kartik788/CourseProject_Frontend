import React, { useState } from 'react';
import axios from 'axios';

const CourseForm = () => {
  const [title, setTitle] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [description, setDescription] = useState('');

  const [titleError, setTitleError] = useState(false);
  const [courseCodeError, setCourseCodeError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset error states
    setTitleError(false);
    setCourseCodeError(false);
    setDescriptionError(false);

    // Check if any fields are empty
    let valid = true;
    if (!title) {
      setTitleError(true);
      valid = false;
    }
    if (!courseCode) {
      setCourseCodeError(true);
      valid = false;
    }
    if (!description) {
      setDescriptionError(true);
      valid = false;
    }

    if (valid) {
      // Only submit the form if all fields are filled
      axios.post('http://localhost:8080/api/courses', {
        title,
        courseCode,
        description,
      })
      .then(() => {
        // Reset form fields after successful submission
        setTitle('');
        setCourseCode('');
        setDescription('');

        alert('Course successfully created');
      })
      .catch((error) => console.error('Error creating course:', error));
    }
  };

  return (
    <div style={styles.pageContainer}>
      <form 
        onSubmit={handleSubmit} 
        style={styles.form}
      >
        <h2 style={styles.header}>Create Course</h2>
        <label style={styles.label}>
          Title:
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            style={titleError ? styles.inputError : styles.input}
          />
        </label>
        <label style={styles.label}>
          Course Code:
          <input 
            type="text" 
            value={courseCode} 
            onChange={(e) => setCourseCode(e.target.value)} 
            style={courseCodeError ? styles.inputError : styles.input}
          />
        </label>
        <label style={styles.label}>
          Description:
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            style={descriptionError ? styles.inputError : styles.textarea}
          />
        </label>
        <button 
          type="submit" 
          style={styles.button}
        >
          Create Course
        </button>
      </form>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
  },
  form: {
    maxWidth: '500px',
    width: '100%',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#e5e7e9',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    minHeight: '100px',
    resize: 'vertical',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
  },
  inputError: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '2px solid red',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default CourseForm;
