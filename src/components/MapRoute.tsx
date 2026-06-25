import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import parsedRoutes from '../data/parsed_routes.json';

interface MapRouteProps {
  courseId: 'mont_blanc' | 'miage';
  accentColor: string;
  descentColor: string;
}

export const MapRoute: React.FC<MapRouteProps> = ({ courseId, accentColor, descentColor }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Load data based on courseId
    const data = parsedRoutes[courseId];
    if (!data) return;

    // Destroy existing map if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize Map
    const map = L.map(containerRef.current, {
      scrollWheelZoom: false,
      dragging: !L.Browser.mobile,
      tap: !L.Browser.mobile
    } as any);
    mapInstanceRef.current = map;

    // OpenTopoMap & OpenStreetMap tile layer urls
    const topoUrl = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
    const topoAttrib = 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, SRTM | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)';
    
    // Add Layer to Map
    L.tileLayer(topoUrl, {
      maxZoom: 17,
      attribution: topoAttrib
    }).addTo(map);

    const allCoords: [number, number][] = [];

    // Draw Track Lines
    data.tracks.forEach(track => {
      const polyCoords = track.coords.map(c => [c[0], c[1]] as [number, number]);
      allCoords.push(...polyCoords);

      const isDescent = track.type === 'descent';
      const color = isDescent ? descentColor : accentColor;

      L.polyline(polyCoords, {
        color: color,
        weight: 4,
        opacity: 0.85,
        dashArray: isDescent ? '6, 6' : undefined
      }).addTo(map).bindPopup(`<strong>${track.name}</strong>`);
    });

    // Fit map bounds to coordinate coverage
    if (allCoords.length > 0) {
      map.fitBounds(L.polyline(allCoords).getBounds(), { padding: [20, 20] });
    } else {
      map.setView([45.90, 6.90], 12);
    }

    // Add Waypoint markers
    data.waypoints.forEach(wp => {
      const marker = L.circleMarker([wp.coords[0], wp.coords[1]], {
        radius: 6,
        fillColor: '#ffffff',
        color: accentColor,
        weight: 3,
        opacity: 1,
        fillOpacity: 1
      }).addTo(map);

      let popupContent = `<strong>${wp.name}</strong>`;
      if (wp.elevation) {
        popupContent += `<br/>Altitude : ${wp.elevation} m`;
      }
      marker.bindPopup(popupContent);
    });

    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [courseId, accentColor, descentColor]);

  return (
    <div className="map-container">
      <div ref={containerRef} className="route-map" style={{ height: '380px', width: '100%', zIndex: 1 }}></div>
    </div>
  );
};
