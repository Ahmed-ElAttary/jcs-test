import React, { useContext, useEffect, useRef } from "react";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import Graphic from "@arcgis/core/Graphic.js";
import { EssentialsContext } from "../../EssentialsProvider";
const FeedbackLayerComp = () => {
  const { mapView, feedbacks } = useContext(EssentialsContext);
  const layer = useRef();

  useEffect(() => {
    layer.current = new GraphicsLayer({});

    mapView.map.add(layer.current);
  }, []);
  useEffect(() => {
    feedbacks.map((el) => {
      console.log(el.coordinates);
      layer.current.add(
        new Graphic({
          geometry: {
            type: "point",
            spatialReference: {
              wkid: 3857,
            },
            x: el.coordinates[0],
            y: el.coordinates[1],
          },
          symbol: { type: "simple-marker", color: "red", size: 16 },
        })
      );
    });
  }, [feedbacks]);
  return null;
};

export default FeedbackLayerComp;
