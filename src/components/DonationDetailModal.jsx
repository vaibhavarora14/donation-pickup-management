import 'leaflet/dist/leaflet.css';
import { Calendar, Mail, MapPin, Package, Phone, Truck, User, X } from 'lucide-react';
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';

// Fix for default marker icon in Leaflet with React
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const DonationDetailModal = ({ donation, onClose }) => {
  if (!donation) return null;

  const position = [donation.latitude || 0, donation.longitude || 0];

  return (
    <div style={{
        position: 'fixed',
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
    }} onClick={onClose}>
        
        <div style={{
            background: 'white',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '900px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column'
        }} onClick={e => e.stopPropagation()}>
            
            {/* Header */}
            <div style={{
                padding: '20px 24px', 
                borderBottom: '1px solid #eee', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                background: '#f8f9fa'
            }}>
                <div>
                    <h2 style={{margin: 0, fontSize: '1.25rem', color: '#111'}}>Donation Details</h2>
                    <span style={{fontSize: '0.85rem', color: '#666'}}>ID: {donation.id}</span>
                </div>
                <button 
                    onClick={onClose}
                    style={{
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer', 
                        padding: '8px', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: '#666'
                    }}
                >
                    <X size={24} />
                </button>
            </div>

            <div style={{display: 'flex', flexWrap: 'wrap', height: '100%'}}>
                
                {/* Left Column: Text Details */}
                <div style={{flex: '1 1 400px', padding: '24px', borderRight: '1px solid #eee'}}>
                    
                    {/* Status Badge */}
                    <div style={{marginBottom: '24px'}}>
                        <span style={{
                            padding: '6px 12px', 
                            borderRadius: '20px', 
                            fontSize: '0.9rem', 
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
                            Status: {donation.status?.toUpperCase()}
                        </span>
                        <div style={{marginTop: '8px', fontSize: '0.85rem', color: '#888'}}>
                            Submitted on {new Date(donation.created_at).toLocaleString()}
                        </div>
                    </div>

                    <h3 style={{fontSize: '1rem', color: '#444', borderBottom: '1px solid #eee', paddingBottom: '8px', marginBottom: '16px', marginTop: 0}}>Donor Information</h3>
                    
                    <div style={{display: 'grid', gap: '16px', marginBottom: '24px'}}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <User size={18} color="#666" />
                            <div>
                                <div style={{fontWeight: 500}}>{donation.first_name} {donation.last_name}</div>
                            </div>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <Phone size={18} color="#666" />
                            <div>{donation.phone}</div>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <Mail size={18} color="#666" />
                            <div>{donation.email}</div>
                        </div>
                    </div>

                    <h3 style={{fontSize: '1rem', color: '#444', borderBottom: '1px solid #eee', paddingBottom: '8px', marginBottom: '16px'}}>Pickup Details</h3>
                    
                    <div style={{display: 'grid', gap: '16px', marginBottom: '24px'}}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <Calendar size={18} color="#666" />
                            <div>Scheduled: <strong>{donation.pickup_date}</strong></div>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <Truck size={18} color="#666" />
                            <div>Vehicle: {donation.vehicle_type?.replace('_', ' ')} (Helpers: {donation.helpers_needed})</div>
                        </div>
                        <div style={{display: 'flex', alignItems: 'start', gap: '10px'}}>
                            <MapPin size={18} color="#666" style={{marginTop: '3px'}} />
                            <div>
                                <div>{donation.address_line}</div>
                                <div>{donation.city}, {donation.state} - {donation.pincode}</div>
                            </div>
                        </div>
                    </div>

                    <h3 style={{fontSize: '1rem', color: '#444', borderBottom: '1px solid #eee', paddingBottom: '8px', marginBottom: '16px'}}>Donation Items</h3>
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
                        {donation.items && donation.items.map((item, i) => (
                            <span key={i} style={{
                                background: '#f0f2f5', 
                                padding: '6px 12px', 
                                borderRadius: '6px', 
                                fontSize: '0.9rem',
                                border: '1px solid #e1e4e8',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}>
                                <Package size={14} color="#666" />
                                {item}
                            </span>
                        ))}
                    </div>

                </div>

                {/* Right Column: Map */}
                <div style={{flex: '1 1 400px', height: '500px', minHeight: '300px', background: '#eee'}}>
                    {donation.latitude && donation.longitude ? (
                        <MapContainer 
                            center={position} 
                            zoom={15} 
                            style={{ height: '100%', width: '100%' }}
                            scrollWheelZoom={false}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={position}>
                                <Tooltip permanent>Pickup Location</Tooltip>
                            </Marker>
                        </MapContainer>
                    ) : (
                        <div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888'}}>
                            No Map Location Provided
                        </div>
                    )}
                </div>

            </div>
        </div>
    </div>
  );
};

export default DonationDetailModal;
