"use client";
// import esriConfig from "@arcgis/core/config.js";
// esriConfig.assetsPath = "./assets";
import { useEffect, useRef } from "react";
import MapView from "@arcgis/core/views/MapView.js";
import Map from "@arcgis/core/Map.js";
import "./MapViewComp.styles.css";

import Home from "@arcgis/core/widgets/Home.js";
import ScaleBar from "@arcgis/core/widgets/ScaleBar.js";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle.js";

const MapViewComp = () => {
  const mapRef = useRef(null);
  useEffect(() => {
    if (!mapRef?.current) return;
    const map = new Map({ basemap: "satellite" });

    const mapView = new MapView({
      map,

      container: mapRef.current,
      center: [30, 30],
      zoom: 6,
    });
    let scaleBar = new ScaleBar({
      view: mapView,
    });
    let homeWidget = new Home({
      view: mapView,
    });
    let basemapToggle = new BasemapToggle({
      view: mapView,
      nextBasemap: "dark-gray",
    });
    mapView.ui.add(scaleBar, { position: "bottom-right" });
    mapView.ui.add(homeWidget, { position: "top-right" });
    // mapView.ui.add(basemapToggle, { position: "bottom-left" });
    return () => mapView && mapView.destroy();
  }, []);
  return <div className="map-view" ref={mapRef}></div>;
};

export default MapViewComp;
