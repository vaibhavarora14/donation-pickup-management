import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DonationDetailModal from '../components/DonationDetailModal';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabaseClient';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [donations, setDonations] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [orgId, setOrgId] = useState(null);

  useEffect(() => {
     if (user) {
         fetchOrgAndData();
     }
  }, [user]);

  const fetchOrgAndData = async () => {
      try {
          // 1. Get User's Organization
          const { data: memberData, error: memberError } = await supabase
            .from('organization_members')
            .select('organization_id')
            .eq('user_id', user.id)
            .single();
          
          if (memberError || !memberData) {
              console.error("Not an admin or error fetching org:", memberError);
              setLoading(false);
              return;
          }
        
          setOrgId(memberData.organization_id);
          fetchDonations(memberData.organization_id);

      } catch (error) {
          console.error("Error:", error);
          setLoading(false);
      }
  };

  const fetchDonations = async (organizationId) => {
      let query = supabase
        .from('donations')
        .select('*')
        .eq('organization_id', organizationId)
        .order('created_at', { ascending: false });
      
      const { data, error } = await query;
      
      if (error) {
          console.error("Error fetching donations:", error);
      } else {
          setDonations(data || []);
      }
      setLoading(false);
  };

  const handleStatusUpdate = async (donationId, newStatus) => {
      const { error } = await supabase
        .from('donations')
        .update({ status: newStatus })
        .eq('id', donationId);
      
      if (error) {
          alert("Failed to update status");
      } else {
          // Optimistic update
          setDonations(prev => prev.map(d => d.id === donationId ? { ...d, status: newStatus } : d));
      }
  };
  
  const handleLogout = async () => {
      await logout();
      navigate('/login');
  };

  const [selectedDonation, setSelectedDonation] = useState(null);

  // ... (inside component)

  const filteredDonations = donations.filter(d => {
      const matchesStatus = filterStatus === 'all' || d.status === filterStatus;
      const matchesSearch = 
        d.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.phone?.includes(searchTerm);
      
      return matchesStatus && matchesSearch;
  });

  return (
    <div style={{padding: '40px', maxWidth: '1200px', margin: '0 auto'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
            <h1 style={{margin: 0, color: '#333'}}>Admin Dashboard</h1>
            <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                <span style={{color: '#666'}}>{user?.email}</span>
                <button 
                    onClick={handleLogout} 
                    style={{padding: '8px 16px', background: '#333', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer'}}
                >
                    Logout
                </button>
            </div>
        </div>

        {/* Filters */}
        <div style={{background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', marginBottom: '30px', display: 'flex', gap: '20px', flexWrap: 'wrap'}}>
            <div style={{flex: 1, minWidth: '200px'}}>
                <label style={{display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#666', fontWeight: 600}}>Search</label>
                <input 
                    type="text" 
                    placeholder="Search by name, email, phone..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd'}}
                />
            </div>
            <div style={{width: '200px'}}>
                <label style={{display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#666', fontWeight: 600}}>Status</label>
                <select 
                    value={filterStatus} 
                    onChange={(e) => setFilterStatus(e.target.value)}
                    style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd'}}
                >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>
        </div>

        {/* Table */}
        <div style={{background: 'white', borderRadius: '12px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', overflow: 'hidden'}}>
            {loading ? (
                <div style={{padding: '40px', textAlign: 'center'}}>Loading data...</div>
            ) : filteredDonations.length === 0 ? (
                <div style={{padding: '40px', textAlign: 'center', color: '#888'}}>No donations found.</div>
            ) : (
                <div style={{overflowX: 'auto'}}>
                    <table style={{width: '100%', borderCollapse: 'collapse', minWidth: '800px'}}>
                        <thead>
                            <tr style={{background: '#f8f9fa', borderBottom: '1px solid #eee'}}>
                                <th style={{padding: '15px', textAlign: 'left', fontSize: '0.9rem', color: '#666'}}>Date</th>
                                <th style={{padding: '15px', textAlign: 'left', fontSize: '0.9rem', color: '#666'}}>Donor</th>
                                <th style={{padding: '15px', textAlign: 'left', fontSize: '0.9rem', color: '#666'}}>Items</th>
                                <th style={{padding: '15px', textAlign: 'left', fontSize: '0.9rem', color: '#666'}}>Vehicle</th>
                                <th style={{padding: '15px', textAlign: 'left', fontSize: '0.9rem', color: '#666'}}>Status</th>
                                <th style={{padding: '15px', textAlign: 'left', fontSize: '0.9rem', color: '#666'}}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDonations.map(donation => (
                                <tr 
                                    key={donation.id} 
                                    style={{borderBottom: '1px solid #eee', cursor: 'pointer', transition: 'background 0.2s'}}
                                    onClick={() => setSelectedDonation(donation)}
                                    onMouseEnter={(e) => e.currentTarget.style.background = '#fafafa'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                                >
                                    <td style={{padding: '15px'}}>
                                        {new Date(donation.created_at).toLocaleDateString()}
                                    </td>
                                    <td style={{padding: '15px'}}>
                                        <div style={{fontWeight: 600}}>{donation.first_name} {donation.last_name}</div>
                                        <div style={{fontSize: '0.85rem', color: '#888'}}>{donation.phone}</div>
                                        <div style={{fontSize: '0.85rem', color: '#888'}}>{donation.email}</div>
                                    </td>
                                    <td style={{padding: '15px'}}>
                                        <div style={{maxWidth: '200px'}}>
                                            {donation.items && donation.items.map((item, i) => (
                                                <span key={i} style={{
                                                    display: 'inline-block',
                                                    background: '#eee', 
                                                    padding: '2px 8px', 
                                                    borderRadius: '12px', 
                                                    fontSize: '0.8rem',
                                                    margin: '2px'
                                                }}>
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td style={{padding: '15px'}}>
                                        {donation.vehicle_type?.replace('_', ' ')}
                                    </td>
                                    <td style={{padding: '15px'}}>
                                        <span style={{
                                            padding: '4px 10px', 
                                            borderRadius: '12px', 
                                            fontSize: '0.85rem', 
                                            fontWeight: 600,
                                            background: 
                                                donation.status === 'pending' ? '#fff3cd' : 
                                                donation.status === 'completed' ? '#d4edda' :
                                                donation.status === 'cancelled' ? '#f8d7da' : '#e2e3e5',
                                            color: 
                                                donation.status === 'pending' ? '#856404' : 
                                                donation.status === 'completed' ? '#155724' :
                                                donation.status === 'cancelled' ? '#721c24' : '#383d41'
                                        }}>
                                            {donation.status?.toUpperCase()}
                                        </span>
                                    </td>
                                    <td style={{padding: '15px'}} onClick={(e) => e.stopPropagation()}>
                                        <select 
                                            value={donation.status} 
                                            onChange={(e) => handleStatusUpdate(donation.id, e.target.value)}
                                            style={{padding: '6px', borderRadius: '4px', border: '1px solid #ddd'}}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="scheduled">Scheduled</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
        
        {selectedDonation && (
            <DonationDetailModal 
                donation={selectedDonation} 
                onClose={() => setSelectedDonation(null)} 
            />
        )}
    </div>
  );
};

export default AdminDashboard;
