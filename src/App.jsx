import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import DonationForm from './components/DonationForm';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
            <Routes>
                {/* Public Route: Donation Form */}
                <Route path="/" element={
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px' }}>
                        <DonationForm />
                    </div>
                } />
                
                {/* Admin Routes */}
                <Route path="/login" element={<Login />} />
                <Route 
                    path="/admin" 
                    element={
                        <PrivateRoute>
                            <AdminDashboard />
                        </PrivateRoute>
                    } 
                />
            </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
