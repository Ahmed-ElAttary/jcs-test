import { useContext, useEffect } from "react";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import Graphic from "@arcgis/core/Graphic.js";
import { EssentialsContext } from "../../EssentialsProvider";

// Feedback Types Icons
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
    // intializing the layer
    layer.current = new GraphicsLayer({});
    mapView.map.add(layer.current);
  }, []);
  useEffect(() => {
    // Feeding the layer with features
    layer.current.removeAll();
    feedbacks.map(({ id, name, email, type, message, coordinates }) => {
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
            id,
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
  }, [feedbacks]);
  return null;
};

export default FeedbackLayerComp;
