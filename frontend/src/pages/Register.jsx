import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');
    try {
      const res = await axios.post('http://localhost:8000/api/register/', formData);
      setMessage(res.data.message || 'Registration successful!');
      setMessageType('success');
      // Optionally reset the form
      setFormData({ username: '', email: '', password: '' });
    } catch (err) {
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        const messages = Object.values(errorData).flat().join(' ');
        setMessage(`Registration failed: ${messages}`);
      } else {
        setMessage('Registration failed. Server not responding.');
      }
      setMessageType('error');
      console.error('Registration error:', err.response?.data || err.message);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Register</h2>
        {message && (
          <p style={{
            ...styles.message,
            color: messageType === 'success' ? 'green' : 'red'
          }}>
            {message}
          </p>
        )}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Register</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '5rem',
  },
  form: {
    width: '300px',
    padding: '2rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    background: '#fff',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '1rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  button: {
    width: '100%',
    padding: '10px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  message: {
    marginBottom: '1rem',
    fontWeight: 'bold',
  },
};

export default Register;
