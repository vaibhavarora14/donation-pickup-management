import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { Input, Button } from '../components/ui';

const Login = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    
    const { error: loginError } = await login(data.email, data.password);
    if (loginError) {
        setError(loginError.message);
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
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{marginBottom: '15px'}}>
                    <Input
                        type="email"
                        label="Email"
                        placeholder="Enter your email"
                        fullWidth
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address'
                            }
                        })}
                        error={errors.email?.message}
                    />
                </div>
                <div style={{marginBottom: '20px'}}>
                    <Input
                        type="password"
                        label="Password"
                        placeholder="Enter your password"
                        fullWidth
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters'
                            }
                        })}
                        error={errors.password?.message}
                    />
                </div>
                {error && (
                    <div style={{
                        background: '#ffebee', 
                        color: '#c62828', 
                        padding: '10px', 
                        borderRadius: '4px', 
                        marginBottom: '15px'
                    }}>
                        {error}
                    </div>
                )}
                <Button
                    type="submit"
                    variant="primary"
                    size="large"
                    fullWidth
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
            </form>
        </div>
    </div>
  );
};

export default Login;
