
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from './ui/card';
import { MapPin } from 'lucide-react';

// This is a placeholder for the API key
// In production, this should be an environment variable
let mapboxToken = '';

interface MapViewProps {
  ngos: Array<{
    id: string;
    name: string;
    location: {
      address: string;
      lat?: number;
      lng?: number;
    };
  }>;
  onSelectNGO?: (id: string) => void;
}

const MapView = ({ ngos, onSelectNGO }: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [apiKeyEntered, setApiKeyEntered] = useState(false);
  const [tokenInput, setTokenInput] = useState('');

  // Mock coordinates for demonstration
  // In a real app, these would come from the NGO data
  const mockCoordinates: Record<string, [number, number]> = {
    '1': [-74.006, 40.7128], // New York
    '2': [-87.6298, 41.8781], // Chicago
    '3': [-122.3321, 47.6062], // Seattle
    '4': [-71.0589, 42.3601], // Boston
  };

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-95.7129, 37.0902], // Center of US
      zoom: 3
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Add markers for each NGO
    ngos.forEach(ngo => {
      if (!map.current) return;
      
      // Use mock coordinates for this example
      const coordinates = mockCoordinates[ngo.id];
      if (!coordinates) return;
      
      const el = document.createElement('div');
      el.className = 'ngo-marker';
      el.innerHTML = `<div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white cursor-pointer shadow-lg transform transition-transform hover:scale-110"">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
      </div>`;
      
      el.addEventListener('click', () => {
        if (onSelectNGO) {
          onSelectNGO(ngo.id);
        }
        
        // Create popup
        new mapboxgl.Popup({ offset: 25 })
          .setLngLat(coordinates)
          .setHTML(`<h3 class="font-bold">${ngo.name}</h3>
                    <p>${ngo.location.address}</p>
                    <button class="text-blue-500 text-sm mt-2">View Details</button>`)
          .addTo(map.current!);
      });
      
      // Add marker to map
      new mapboxgl.Marker(el)
        .setLngLat(coordinates)
        .addTo(map.current);
    });
  };

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tokenInput.trim()) {
      mapboxToken = tokenInput.trim();
      setApiKeyEntered(true);
      initializeMap();
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);
  
  // Initialize map when API key is available
  useEffect(() => {
    if (apiKeyEntered) {
      initializeMap();
    }
  }, [apiKeyEntered, ngos]);

  if (!apiKeyEntered) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-center mb-6">
          <MapPin className="h-10 w-10 text-blue-500 mx-auto mb-2" />
          <h3 className="text-lg font-medium mb-2">Mapbox API Key Required</h3>
          <p className="text-gray-500 mb-4">
            To view the map, please enter your Mapbox public token.
            You can get one for free at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">mapbox.com</a>
          </p>
        </div>
        
        <form onSubmit={handleApiKeySubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Enter your Mapbox public token"
              className="w-full p-2 border rounded"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              This token will only be stored in your browser for this session.
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition"
          >
            Submit Token and Load Map
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden border border-gray-200">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default MapView;
