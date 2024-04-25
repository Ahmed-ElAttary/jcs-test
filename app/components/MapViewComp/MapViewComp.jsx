"use client";

import { useEffect, useRef, useState } from "react";

import MapView from "@arcgis/core/views/MapView.js";
import Map from "@arcgis/core/Map.js";
import "./MapViewComp.styles.css";

import WidgetsComp from "../widgetsComp/widgetsComp";
import FeedbackLayerComp from "../FeedbackLayerComp/FeedbackLayerComp";
const MapViewComp = () => {
  const mapRef = useRef(null);
  const [mapView, setMapView] = useState(null);
  useEffect(() => {
    if (!mapRef?.current) return;
    const map = new Map({ basemap: "satellite" });

    new MapView({
      map,

      container: mapRef.current,
      center: [30, 30],
      zoom: 6,
    }).when((view) => setMapView(view));

    return () => mapView && mapView.destroy();
  }, []);
  return (
    <>
      <div className="map-view" ref={mapRef}>
        {mapView && (
          <>
            <WidgetsComp mapView={mapView} />
            <FeedbackLayerComp mapView={mapView} />
          </>
        )}
      </div>
    </>
  );
};

export default MapViewComp;
