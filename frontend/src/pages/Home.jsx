// File: src/pages/Home.jsx

const Home = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome to Task Manager</h1>
        <p style={styles.subtitle}>
          Manage your tasks efficiently and stay organized.
        </p>
        <div style={styles.links}>
          <a href="/login" style={styles.button}>Login</a>
          <a href="/register" style={{ ...styles.button, backgroundColor: '#4CAF50' }}>Register</a>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f4f4f4',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box',
    width: '100vw',
    overflowX: 'hidden',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '100%',
    maxWidth: '500px',
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '30px',
  },
  links: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  button: {
    textDecoration: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  }
};

export default Home;
