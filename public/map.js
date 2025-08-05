// Initialize the map
if (typeof mapToken === 'undefined') {
    console.error('Mapbox access token is not defined.');
}
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 9,
    center: listing.geometry.coordinates // Default center longitude and latitude
});

// Create a custom Airbnb-style marker element (red circle with white home icon)
const airbnbIcon = document.createElement('div');
airbnbIcon.innerHTML = `
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="22" cy="22" r="20" fill="#FF385C"/>
    <rect x="10" y="18" width="24" height="14" rx="3" fill="none"/>
    <path d="M22 14L13 21.5V32a1 1 0 0 0 1 1h6v-6h4v6h6a1 1 0 0 0 1-1V21.5L22 14z" fill="#fff"/>
  </svg>
`;
airbnbIcon.style.display = 'flex';
airbnbIcon.style.alignItems = 'center';
airbnbIcon.style.justifyContent = 'center';

// Create the popup with styled HTML content
const popup = new mapboxgl.Popup({ offset: 25 })
    .setHTML(`
      <div style="font-family: Arial, sans-serif; padding: 8px 12px; color: #222; text-align: center;">
        <strong style="font-size: 1.1em; color: #FF385C;">You'll be here</strong>
        <div style="margin-top: 6px; font-size: 0.98em; color: #555;">
          ${listing.title}
        </div>
      </div>
    `);

// Use the custom Airbnb-style icon for the marker
const marker = new mapboxgl.Marker({
    element: airbnbIcon
})
    .setLngLat(listing.geometry.coordinates)
    .setPopup(popup) // Attach the popup to the marker
    .addTo(map);
