import React, { useContext, useEffect } from "react";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import Graphic from "@arcgis/core/Graphic.js";
import { EssentialsContext } from "../../EssentialsProvider";
const FeedbackLayerComp = () => {
  const { mapView } = useContext(EssentialsContext);
  useEffect(() => {
    let graphicB = new Graphic({
      // graphic with point geometry
      geometry: { type: "point", x: 30, y: 30 },
      symbol: { type: "simple-marker", color: "red", size: 16 },
    });
    let layer = new GraphicsLayer({
      graphics: [graphicB],
    });

    mapView.map.add(layer);
  }, []);
  return null;
};

export default FeedbackLayerComp;
