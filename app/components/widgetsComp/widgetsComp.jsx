import React, { useContext, useEffect, useRef } from "react";

import { CalciteButton } from "@esri/calcite-components-react";
import { createRoot } from "react-dom/client";
import Home from "@arcgis/core/widgets/Home.js";
import ScaleBar from "@arcgis/core/widgets/ScaleBar.js";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle.js";

import Form from "./Form";
import { EssentialsContext } from "../../EssentialsProvider";


const WidgetsComp = () => {
  const { mapView, feedbacks, setFeedbacks } = useContext(EssentialsContext);
  const root = useRef();

  useEffect(() => {
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

    // DRAW WIDGET

    var node = document.createElement("div");
    root.current = createRoot(node);
    mapView.ui.add(node, { position: "top-right" });
    root.current.render(
      <Form
        mapView={mapView}
        feedbacks={feedbacks}
        setFeedbacks={setFeedbacks}
      ></Form>
    );

    mapView.ui.move("zoom", "bottom-right");
    mapView.ui.add(scaleBar, { position: "bottom-right" });
    mapView.ui.add([homeWidget], { position: "top-left" });
    mapView.ui.add(basemapToggle, { position: "bottom-left" });
  }, []);
  return null;
};

export default WidgetsComp;
