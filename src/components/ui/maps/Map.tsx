'use client';

import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// Interfaz para las propiedades del componente
interface MapProps {
  lat?: number; // Coordenadas opcionales para centrar el mapa
  lng?: number;
}

// Componente Map
export const Map: React.FC<MapProps> = ({ lat = -34.603722, lng = -58.381592 }) => {
  const containerStyle = {
    width: '100%',
    height: '400px', // Ajusta el tamaño según tu diseño
  };

  return (
    // <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
    //   <GoogleMap mapContainerStyle={containerStyle} center={{ lat, lng }} zoom={12}>
    //     <Marker position={{ lat, lng }} />
    //   </GoogleMap>
    // </LoadScript>

    <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105056.99950138609!2d-58.45458805935386!3d-34.62865096625379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca3b4ef90cbd%3A0xa0b3812e88e88e87!2sBuenos%20Aires%2C%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1733527094295!5m2!1ses-419!2sar"
    width="80%"
    height="400"
    style={{
      border: 0, // Esto se define como un objeto
    }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
  );
};
