"use client";
import { createContext, useRef, useState } from "react";

export const EssentialsContext = createContext();

const EssentialsProvider = ({ children }) => {
  const [mapView, setMapView] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const layer = useRef();

  return (
    <EssentialsContext.Provider
      value={{ mapView, setMapView, feedbacks, setFeedbacks, layer }}
    >
      {children}
    </EssentialsContext.Provider>
  );
};
export default EssentialsProvider;
