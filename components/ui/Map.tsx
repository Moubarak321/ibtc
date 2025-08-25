// import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api';

// const mapContainerStyle = {
//   width: '100%',
//   height: '100%',
// }

// const center = {
//   lat: 48.8566,
//   lng: 2.3522,
// }

// export default function Map() {
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
//   })

//   if (loadError) return <div>Error loading maps</div>
//   if (!isLoaded) return <div>Loading maps</div>

//   return (
//     <GoogleMap
//       mapContainerStyle={mapContainerStyle}
//       zoom={14}
//       center={center}
//       options={{
//         styles: [
//           {
//             featureType: 'all',
//             elementType: 'all',
//             stylers: [
//               { saturation: -100 },
//             ],
//           },
//         ],
//       }}
//     >
//       <Marker position={center} />
//     </GoogleMap>
//   )
// }
export default function Map() {
  return (
    <div className="w-full h-full">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.0366177221163!2d2.3788354749917624!3d6.3892765936012035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x102355411077be95%3A0x4c185212bf674a26!2sInternational%20Business%20and%20Tourism%20Company%20(BTIC)!5e0!3m2!1sfr!2sbj!4v1756144151542!5m2!1sfr!2sbj" 
        width="100%" 
        height="100%" 
        style={{ border: 0 }} 
        allowFullScreen 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}