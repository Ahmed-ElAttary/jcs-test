import React, { useContext, useEffect, useRef } from "react";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import Graphic from "@arcgis/core/Graphic.js";
import { EssentialsContext } from "../../EssentialsProvider";
const icon = {
  Complain: "/complain.png",
  "Request Information": "/request_information.png",
  "Missed Services": "/missed_services.png",
  "Add information": "/add_information.png",
  Others: "/others.png",
};
const FeedbackLayerComp = () => {
  const { mapView, feedbacks, layer } = useContext(EssentialsContext);

  useEffect(() => {
    layer.current = new GraphicsLayer({});
    // const popup =new popup
    mapView.map.add(layer.current);
  }, []);
  useEffect(() => {
    feedbacks.map(({ name, email, type, message, coordinates }) => {
      layer.current.add(
        new Graphic({
          geometry: {
            type: "point",
            spatialReference: {
              wkid: 3857,
            },
            x: coordinates[0],
            y: coordinates[1],
          },
          attributes: {
            name,
            email,
            type,
            message,
            coordinates,
          },
          symbol: {
            type: "picture-marker",
            url: icon[type],
            width: "50px",
            height: "50px",
          },

          popupTemplate: {
            title: "{name}",
            content: `
            name: {name} <br>
            email : {email} <br>
            type : {type} <br>
            message : {message} <br>
            `,
          },
        })
      );
    });
    console.log(layer.current);
  }, [feedbacks]);
  return null;
};

export default FeedbackLayerComp;
