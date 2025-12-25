import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';


// Fix Leaflet's default icon issue with Webpack/Vite

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to update map center when location changes
function ChangeView({ center }) {
  const map = useMap();
  map.setView(center);
  return null;
}

// Component to handle click events
function LocationMarker({ position, onPositionChange }) {
  const map = useMapEvents({
    click(e) {
      onPositionChange(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker 
      position={position} 
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          onPositionChange(e.target.getLatLng());
        },
      }}
    />
  );
}

const LocationPicker = ({ error, onChange }) => {
  const [position, setPosition] = useState({ lat: 28.6139, lng: 77.2090 }); // Default: New Delhi
  const [loading, setLoading] = useState(false);
  
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    // Notify parent of location change
    onChange(position);
  }, [position]);

  // Debounced Search Suggestions
  useEffect(() => {
    // ... (existing debounce logic)
      const delayDebounceFn = setTimeout(async () => {
          if (searchText.length > 2 && showSuggestions) {
              try {
                  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchText)}&limit=5`);
                  const data = await response.json();
                  setSuggestions(data || []);
              } catch (error) {
                  console.error("Autosuggest error:", error);
              }
          } else {
              setSuggestions([]);
          }
      }, 500);

      return () => clearTimeout(delayDebounceFn);
  }, [searchText, showSuggestions]);

  const fetchAddress = async (lat, lng) => {
      try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
          const data = await response.json();
          if (data && data.display_name) {
              setSearchText(data.display_name);
          }
      } catch (error) {
          console.error("Reverse geocoding error:", error);
      }
  };

  const handleMapInteraction = (newLatLng) => {
      setPosition(newLatLng);
      fetchAddress(newLatLng.lat, newLatLng.lng);
  };

  const handleLocateMe = () => {
    setLoading(true);
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const newPos = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
        setPosition(newPos);
        fetchAddress(newPos.lat, newPos.lng); // Update text too
        setLoading(false);
      },
      () => {
        alert("Unable to retrieve your location");
        setLoading(false);
      }
    );
  };

  const selectSuggestion = (suggestion) => {
      const { lat, lon, display_name } = suggestion;
      setPosition({ lat: parseFloat(lat), lng: parseFloat(lon) });
      setSearchText(display_name); 
      setSuggestions([]);
      setShowSuggestions(false);
      // No need to fetchAddress here, we trust the suggestion name
  };

  const handleSearch = async (e) => {
      if (e) e.preventDefault(); 
      if(!searchText) return;
      
      setIsSearching(true);
      setShowSuggestions(false); 
      try {
          const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchText)}`);
          const data = await response.json();
          
          if(data && data.length > 0) {
              const { lat, lon } = data[0];
              const newPos = { lat: parseFloat(lat), lng: parseFloat(lon) };
              setPosition(newPos);
              // user typed this, so no need to reverse geocode immediately unless we want to normalize it
          } else {
              alert('Location not found. Please try a different query.');
          }
      } catch (err) {
          console.error("Search error:", err);
          alert('Failed to search location.');
      } finally {
          setIsSearching(false);
      }
  };

  return (
    <div className="location-picker-section">
      <div className="map-controls" style={{display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '10px'}}>
        
        {/* Search Bar - Note: Using div instead of form to avoid nested form submission issues */}
        <div style={{display: 'flex', gap: '10px', position: 'relative'}}>
            <input 
                type="text" 
                placeholder="Search location (e.g. MG Road, Bangalore)" 
                value={searchText}
                onChange={(e) => {
                    setSearchText(e.target.value);
                    setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Delay hiding to allow click
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault(); // Prevent main form submission
                        handleSearch(e);
                    }
                }}
                style={{flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ddd'}}
            />
            {showSuggestions && suggestions.length > 0 && (
                <ul style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    marginTop: '4px',
                    padding: 0,
                    margin: 0,
                    listStyle: 'none',
                    zIndex: 1000,
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}>
                    {suggestions.map((s) => (
                        <li 
                            key={s.place_id}
                            onClick={() => selectSuggestion(s)}
                            style={{
                                padding: '10px',
                                borderBottom: '1px solid #eee',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                color: '#333'
                            }}
                            onMouseEnter={(e) => e.target.style.background = '#f9f9f9'}
                            onMouseLeave={(e) => e.target.style.background = 'white'}
                        >
                            {s.display_name}
                        </li>
                    ))}
                </ul>
            )}
            <button 
                type="button" 
                onClick={handleSearch}
                className="secondary-btn" 
                disabled={isSearching}
                style={{whiteSpace: 'nowrap', padding: '0 20px', background: 'var(--primary-color)', color: 'white', border: 'none'}}
            >
                {isSearching ? '...' : 'Search'}
            </button>
        </div>

        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <button type="button" onClick={handleLocateMe} className="secondary-btn" disabled={loading} style={{padding: '8px 16px', fontSize: '0.9rem'}}>
            {loading ? 'Locating...' : '📍 Use Current Location'}
            </button>
            <div style={{ fontSize: '0.8rem', color: '#666' }}>
                {position.lat.toFixed(4)}, {position.lng.toFixed(4)}
            </div>
        </div>
      </div>
      
      {error && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}

      <div className="map-container">
        <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
          <ChangeView center={position} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker position={position} onPositionChange={handleMapInteraction} />
        </MapContainer>
      </div>
      <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '-10px', marginBottom: '15px' }}>
        * Drag the pin to adjust your pickup location precisely.
      </div>
    </div>
  );
};

export default LocationPicker;
