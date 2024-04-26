"use client";

import { useContext, useEffect, useRef, useState } from "react";

import MapView from "@arcgis/core/views/MapView.js";
import Map from "@arcgis/core/Map.js";
import "./MapViewComp.styles.css";

import WidgetsComp from "../widgetsComp/widgetsComp";
import FeedbackLayerComp from "../FeedbackLayerComp/FeedbackLayerComp";
import { EssentialsContext } from "../../EssentialsProvider";
const MapViewComp = () => {
  const mapRef = useRef(null);
  const { mapView, setMapView } = useContext(EssentialsContext);

  useEffect(() => {
    if (!mapRef?.current) return;
    const map = new Map({ basemap: "satellite" });

    new MapView({
      map,
      container: mapRef.current,
      center: [31.2, 30.05],
      zoom: 12,
 
    }).when((view) => {
    
      setMapView(view);
    });

    //   return () => mapView && mapView.destroy();
  }, []);
  return (
    <>
      <div className="map-view" ref={mapRef}>
        {mapView && (
          <>
            <WidgetsComp />
            <FeedbackLayerComp />
          </>
        )}
      </div>
    </>
  );
};

export default MapViewComp;
