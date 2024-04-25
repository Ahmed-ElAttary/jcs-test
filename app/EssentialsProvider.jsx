"use client";
import { createContext, useRef, useState } from "react";

export const EssentialsContext = createContext();

const EssentialsProvider = ({ children }) => {
  const [mapView, setMapView] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  return (
    <EssentialsContext.Provider
      value={{ mapView, setMapView, feedbacks, setFeedbacks }}
    >
      {children}
    </EssentialsContext.Provider>
  );
};
export default EssentialsProvider;
