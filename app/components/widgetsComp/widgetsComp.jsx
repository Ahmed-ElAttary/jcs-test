import React, { useContext, useEffect, useRef } from "react";

import { createRoot } from "react-dom/client";
import Home from "@arcgis/core/widgets/Home.js";
import ScaleBar from "@arcgis/core/widgets/ScaleBar.js";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle.js";

import Form from "./Form";
import { EssentialsContext } from "../../EssentialsProvider";
import List from "./List";

const WidgetsComp = () => {
  const { mapView, feedbacks, setFeedbacks, layer } =
    useContext(EssentialsContext);
  const formRoot = useRef();
  const listRoot = useRef();

  useEffect(() => {
    ///////////////////////////// Widgets //////////////////////////
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

    // Feedback Form Widget Intitialization
    var form = document.createElement("div");
    formRoot.current = createRoot(form);

    formRoot.current.render(
      <Form mapView={mapView} setFeedbacks={setFeedbacks}></Form>
    );
    // Feedback List Widget Intitialization
    var list = document.createElement("div");
    listRoot.current = createRoot(list);
    ////////////////////////////////////////////////////////////////////////
    mapView.ui.add([form, list], { position: "top-right" });
    mapView.ui.move("zoom", "bottom-right");
    mapView.ui.add(scaleBar, { position: "bottom-right" });
    mapView.ui.add([homeWidget], { position: "top-left" });
    mapView.ui.add(basemapToggle, { position: "bottom-left" });
  }, []);
  useEffect(() => {
    listRoot.current.render(
      <List mapView={mapView} feedbacks={feedbacks} layer={layer}></List>
    );
  }, [feedbacks]);
  return null;
};

export default WidgetsComp;
