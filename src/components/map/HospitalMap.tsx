"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

export interface HospitalLocation {
  id: string;
  name: string;
  type: string;
  lat: number;
  lng: number;
  area: string;
  district: string;
  icu_available: boolean;
  total_icu_beds: number;
  phone: string;
}

// Leaflet SSR issue fix korar jonno dynamic import
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

export default function HospitalMap({ hospitals }: { hospitals: HospitalLocation[] }) {
  const [customIcon, setCustomIcon] = useState<any>(null);

  useEffect(() => {
    // Leaflet marker default icon fix
    import("leaflet").then((L) => {
      const redPin = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
      setCustomIcon(redPin);
    });
  }, []);

  return (
    <div className="w-full h-[400px] sm:h-[480px] rounded-3xl overflow-hidden border border-[#E5EBF2] shadow-sm relative z-0">
      {customIcon && (
        <MapContainer
          center={[23.777176, 90.399452]} // Dhaka Center
          zoom={12}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {hospitals.map((hosp) => (
            <Marker key={hosp.id} position={[hosp.lat, hosp.lng]} icon={customIcon}>
              <Popup>
                <div className="p-1 space-y-1 font-sans text-xs">
                  <span className="font-extrabold text-[#0D4C3B] block text-sm">
                    {hosp.name}
                  </span>
                  <p className="text-slate-600 font-medium">📍 {hosp.area}, {hosp.district}</p>
                  <p className="text-rose-600 font-bold">
                    🚨 ICU বেড: {hosp.total_icu_beds}+
                  </p>
                  <div className="pt-2 flex gap-2">
                    <a
                      href={`tel:${hosp.phone}`}
                      className="px-2.5 py-1 bg-[#0D4C3B] text-white font-bold rounded-lg text-[10px] inline-block"
                    >
                      📞 কল দিন ({hosp.phone})
                    </a>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${hosp.lat},${hosp.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 bg-blue-600 text-white font-bold rounded-lg text-[10px] inline-block"
                    >
                      🗺️ ডিরেকশন
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
}