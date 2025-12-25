import { useEffect, useState } from 'react';
import '../../styles/map.css'; // Import map styles
import { ORGANIZATION_ID } from '../config';
import { supabase } from '../supabaseClient';
import LocationPicker from './LocationPicker';
import { Book, Plug, Sofa, Home, Medal, HeartPulse, Utensils, Package } from 'lucide-react';

const iconMap = {
  'book': Book,
  'plug': Plug,
  'sofa': Sofa,
  'home': Home,
  'medal': Medal,
  'heart-pulse': HeartPulse,
  'utensils': Utensils,
  'default': Package
};

const DonationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address_line: '',
    city: '',
    state: '',
    pincode: '',
    pickup_date: '',
    vehicle_type: '',
    helpers_needed: 0,
    items: [] // Multi-select
  });
  
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // success | error
  const [itemCategories, setItemCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
        // Fetch categories with their subcategories
        const { data, error } = await supabase
            .from('item_categories')
            .select(`
                id,
                label, 
                value, 
                icon,
                item_subcategories (
                    label,
                    value
                )
            `)
            .eq('organization_id', ORGANIZATION_ID)
            .order('label');
        
        if (error) {
            console.error('Error fetching categories:', error);
        } else {
            // console.log('Categories fetched:', data);
            if (data && data.length > 0) {
                 setItemCategories(data);
            } else {
                 setItemCategories([]);
            }
        }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'items') {
        // Legacy handler, though we use handleItemToggle now for items
        const newItems = checked 
            ? [...formData.items, value]
            : formData.items.filter(item => item !== value);
        setFormData({ ...formData, items: newItems });
    } else {
        setFormData({ ...formData, [name]: value });
    }
  };

  const handleLocationChange = (loc) => {
      setLocation(loc);
  };

  // Helper to handle selection of either category (if no subs) or specific subitems
  const handleItemToggle = (value) => {
      const newItems = formData.items.includes(value)
        ? formData.items.filter(i => i !== value)
        : [...formData.items, value];
      setFormData({ ...formData, items: newItems });
  };

  const nextStep = () => {
      // Validation per step
      if (step === 1) {
          if (!formData.vehicle_type) {
              alert("Please select a vehicle type.");
              return;
          }
      }
      if (step === 2) {
          if (formData.items.length === 0) {
              alert("Please select at least one item category.");
              return;
          }
      }
      setStep(prev => prev + 1);
      window.scrollTo(0,0);
  };

  const prevStep = () => {
      setStep(prev => prev - 1);
      window.scrollTo(0,0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const { data, error } = await supabase.functions.invoke('submit-donation', {
        body: {
            ...formData,
            latitude: location.lat,
            longitude: location.lng,
            organization_id: ORGANIZATION_ID
        }
      });

      if (error) throw error;
      if (data && data.error) throw new Error(data.error);

      setStatus('success');
      setFormData({
        first_name: '', last_name: '', email: '', phone: '',
        address_line: '', city: '', state: '', pincode: '',
        pickup_date: '', vehicle_type: '', helpers_needed: 0, items: []
      });
      setStep(1);
      window.scrollTo(0,0);

    } catch (err) {
      console.error("Submission error:", err);
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  if (status === 'success') {
      return (
          <div className="form-container fade-in" style={{ textAlign: 'center', padding: '50px' }}>
              <h2 style={{ color: 'var(--secondary-color)' }}>Thank You!</h2>
              <p>Your donation request has been received. We will contact you shortly.</p>
              <button onClick={() => setStatus(null)} className="submit-btn" style={{ marginTop: '20px' }}>Make Another Donation</button>
          </div>
      )
  }

  const renderStep1 = () => (
      <div className="form-section fade-in">
          <h3>Step 1: Mode of Pickup</h3>
          <p style={{marginBottom: '20px', color: '#666'}}>Select the vehicle required for your donation size.</p>
          
          <div className="input-group">
              <label>Vehicle Needed</label>
              <select name="vehicle_type" required value={formData.vehicle_type} onChange={handleChange} style={{padding: '16px', fontSize: '1.1rem'}}>
                  <option value="">Select a vehicle</option>
                  <option value="2_wheeler">2 Wheeler (Bike/Scooter) - Small items</option>
                  <option value="3_wheeler">3 Wheeler (Auto/Tempo) - Medium load</option>
                  <option value="4_wheeler">4 Wheeler (Truck/Van) - Large load</option>
                  <option value="bulk_pickup">Bulk Pickup Truck - Moving house/Office</option>
              </select>
          </div>

          <div className="input-group">
              <label>Helpers Needed (Optional)</label>
              <input type="number" name="helpers_needed" min="0" value={formData.helpers_needed} onChange={handleChange} placeholder="0" />
              <small style={{color: '#888', marginTop: '5px'}}>Number of people required to load the items.</small>
          </div>
      </div>
  );

  const renderStep2 = () => (
      <div className="form-section fade-in">
          <h3>Step 2: What are you donating?</h3>
          <p style={{marginBottom: '20px', color: '#666'}}>Select the specific items you verify.</p>
          
          <div className="category-grid">
              {itemCategories.map(cat => {
                  const Icon = iconMap[cat.icon] || iconMap['default'];
                  
                  return (
                    <div key={cat.value} className="category-card">
                        <div className="category-header">
                            <Icon size={20} color="var(--primary-color)" />
                            <span style={{fontWeight: 600}}>{cat.label}</span>
                        </div>
                        
                        {/* If subcategories exist, show them */}
                        {cat.item_subcategories && cat.item_subcategories.length > 0 ? (
                            <div className="subcategory-list">
                                {cat.item_subcategories.map(sub => (
                                    <label key={sub.value} className={`subcategory-chip ${formData.items.includes(sub.value) ? 'selected' : ''}`}>
                                        <input 
                                            type="checkbox" 
                                            value={sub.value}
                                            checked={formData.items.includes(sub.value)}
                                            onChange={() => handleItemToggle(sub.value)}
                                            style={{display: 'none'}}
                                        />
                                        {sub.label}
                                    </label>
                                ))}
                            </div>
                        ) : (
                             /* If no subcategories, allow selecting the category itself */
                             <label className={`subcategory-chip ${formData.items.includes(cat.value) ? 'selected' : ''}`}>
                                <input 
                                    type="checkbox" 
                                    value={cat.value}
                                    checked={formData.items.includes(cat.value)}
                                    onChange={() => handleItemToggle(cat.value)}
                                    style={{display: 'none'}}
                                />
                                Select {cat.label}
                            </label>
                        )}
                    </div>
                  );
              })}
          </div>
      </div>
  );

  const renderStep3 = () => (
      <div className="form-section fade-in">
          <h3>Step 3: Pickup Details</h3>
          
          {/* Summary of Selection */}
          <div className="summary-box">
              <div className="summary-item">
                  <strong>Vehicle:</strong> {formData.vehicle_type?.replace('_', ' ')}
              </div>
              <div className="summary-item">
                  <strong>Helpers:</strong> {formData.helpers_needed}
              </div>
              <div className="summary-item">
                  <strong>Items:</strong> {formData.items.join(', ')}
              </div>
          </div>

          <div style={{marginTop: '20px'}}></div>

          <div className="input-group-row">
            <div className="input-group">
                <label>First Name</label>
                <input type="text" name="first_name" required value={formData.first_name} onChange={handleChange} placeholder="John" />
            </div>
            <div className="input-group">
                <label>Last Name</label>
                <input type="text" name="last_name" required value={formData.last_name} onChange={handleChange} placeholder="Doe" />
            </div>
          </div>

          <div className="input-group-row">
            <div className="input-group">
                <label>Email</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="john@example.com" />
            </div>
            <div className="input-group">
                <label>Mobile Number</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+91 9876543210" />
            </div>
          </div>

          <div className="input-group">
              <label>Pickup Date</label>
              <input type="date" name="pickup_date" required value={formData.pickup_date} onChange={handleChange} />
          </div>

          <hr style={{border: '0', borderTop: '1px solid #eee', margin: '20px 0'}} />
          
          <h4>Pickup Location</h4>
          <LocationPicker onChange={handleLocationChange} />
          
          <div className="input-group">
              <label>Street Address</label>
              <input type="text" name="address_line" required value={formData.address_line} onChange={handleChange} placeholder="Flat No, Building, Street" />
          </div>
          <div className="input-group-row">
              <div className="input-group">
                  <label>City</label>
                  <input type="text" name="city" required value={formData.city} onChange={handleChange} />
              </div>
              <div className="input-group">
                  <label>State</label>
                  <input type="text" name="state" required value={formData.state} onChange={handleChange} />
              </div>
              <div className="input-group">
                  <label>Pincode</label>
                  <input type="text" name="pincode" required value={formData.pincode} onChange={handleChange} />
              </div>
          </div>
      </div>
  );

  return (
    <div className="form-wrapper">
      <div className="form-header">
        <h1>Happy Soul Donation</h1>
        <div className="step-indicator">
            <span className={step >= 1 ? 'active' : ''}>1. Mode</span>
            <span className="line"></span>
            <span className={step >= 2 ? 'active' : ''}>2. Items</span>
            <span className="line"></span>
            <span className={step >= 3 ? 'active' : ''}>3. Details</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="donation-form">
        
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}

        {status === 'error' && <div className="error-banner">Something went wrong. Please try again.</div>}

        <div className="form-actions" style={{display: 'flex', gap: '10px', marginTop: '20px'}}>
            {step > 1 && (
                <button type="button" onClick={prevStep} className="secondary-btn" style={{flex: 1, padding: '16px', justifyContent: 'center'}}>
                    Back
                </button>
            )}
            
            {step < 3 ? (
                <button type="button" onClick={nextStep} className="submit-btn" style={{flex: 1, marginTop: 0}}>
                    Next
                </button>
            ) : (
                <button type="submit" className="submit-btn" disabled={submitting} style={{flex: 1, marginTop: 0}}>
                    {submitting ? 'Submitting...' : 'Schedule Pickup'}
                </button>
            )}
        </div>

      </form>
    </div>
  );
};

export default DonationForm;

/* Inline Styles for Form Layout */
const styles = `
.form-wrapper {
    background: var(--glass-bg);
    backdrop-filter: blur(10px);
    border: 1px solid var(--glass-border);
    border-radius: var(--border-radius);
    padding: 2rem;
    width: 100%;
    max-width: 800px;
    box-shadow: var(--shadow);
}

.form-header {
    text-align: center;
    margin-bottom: 2rem;
}

.form-header h1 {
    color: var(--primary-color);
    margin-bottom: 0.5rem;
}

.form-section {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid rgba(0,0,0,0.05);
}

.form-section:last-child {
    border-bottom: none;
}

.form-section h3 {
    margin-bottom: 1rem;
    color: var(--text-main);
    font-size: 1.2rem;
}

.input-group-row {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
}

.input-group {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}

label {
    margin-bottom: 0.5rem;
    font-weight: 500;
    font-size: 0.9rem;
    color: var(--text-muted);
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="date"],
input[type="number"],
select {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    background: rgba(255,255,255,0.9);
    transition: all 0.2s;
}

input:focus, select:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
}

/* Category Grid Styles */
.category-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
}

.category-card {
    background: rgba(255,255,255,0.5);
    border-radius: 12px;
    padding: 15px;
    border: 1px solid rgba(0,0,0,0.05);
}

.category-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(0,0,0,0.05);
}

.subcategory-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.subcategory-chip {
    display: inline-flex;
    align-items: center;
    padding: 6px 12px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 20px;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s;
}

.subcategory-chip:hover {
    background: #f8f8f8;
    border-color: #ccc;
}

.subcategory-chip.selected {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
    box-shadow: 0 4px 6px rgba(255, 107, 107, 0.2);
}

/* Legacy Checkbox styles (if needed) */
.checkbox-group {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 1rem;
}

.submit-btn {
    width: 100%;
    padding: 16px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s;
    margin-top: 1rem;
}

.submit-btn:hover {
    background: var(--primary-hover);
    transform: translateY(-2px);
}

.submit-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
}

@media (max-width: 600px) {
    .input-group-row {
        flex-direction: column;
        gap: 0;
    }
}


.step-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 30px;
    font-size: 0.9rem;
    color: var(--text-muted);
}

.step-indicator span.active {
    color: var(--primary-color);
    font-weight: 700;
}

.step-indicator .line {
    width: 30px;
    height: 2px;
    background: #eee;
}

.step-indicator .active + .line {
    background: var(--primary-color);
}

.summary-box {
    background: rgba(255,255,255,0.6);
    padding: 15px;
    border-radius: 12px;
    border: 1px dashed var(--secondary-color);
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.summary-item strong {
    color: var(--text-muted);
    font-weight: 500;
    font-size: 0.85rem;
    display: block;
    margin-bottom: 4px;
}
`;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

