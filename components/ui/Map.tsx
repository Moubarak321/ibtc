import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
}

const center = {
  lat: 48.8566,
  lng: 2.3522,
}

export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  })

  if (loadError) return <div>Error loading maps</div>
  if (!isLoaded) return <div>Loading maps</div>

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={14}
      center={center}
      options={{
        styles: [
          {
            featureType: 'all',
            elementType: 'all',
            stylers: [
              { saturation: -100 },
            ],
          },
        ],
      }}
    >
      <Marker position={center} />
    </GoogleMap>
  )
}