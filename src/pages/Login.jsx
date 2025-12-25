import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const { error } = await login(email, password);
    if (error) {
        setError(error.message);
        setLoading(false);
    } else {
        navigate('/admin');
    }
  };

  return (
    <div style={{
        minHeight: '100vh',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
        <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '16px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            width: '100%',
            maxWidth: '400px'
        }}>
            <h2 style={{marginTop: 0, marginBottom: '20px', color: '#333'}}>Admin Login</h2>
            {error && <div style={{background: '#ffebee', color: '#c62828', padding: '10px', borderRadius: '4px', marginBottom: '15px'}}>{error}</div>}
            
            <form onSubmit={handleSubmit}>
                <div style={{marginBottom: '15px'}}>
                    <label style={{display: 'block', marginBottom: '5px', color: '#666'}}>Email</label>
                    <input 
                        type="email" 
                        required 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd'}}
                    />
                </div>
                <div style={{marginBottom: '20px'}}>
                    <label style={{display: 'block', marginBottom: '5px', color: '#666'}}>Password</label>
                    <input 
                        type="password" 
                        required 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd'}}
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '12px',
                        background: '#e05757',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    </div>
  );
};

export default Login;
