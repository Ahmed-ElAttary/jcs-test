import React, { useContext, useEffect, useRef } from "react";

import { CalciteButton } from "@esri/calcite-components-react";
import { createRoot } from "react-dom/client";
import Home from "@arcgis/core/widgets/Home.js";
import ScaleBar from "@arcgis/core/widgets/ScaleBar.js";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle.js";
import Draw from "@arcgis/core/views/draw/Draw.js";
import Form from "./Form";
import { EssentialsContext } from "../../EssentialsProvider";
const WidgetsComp = () => {
  const { mapView } = useContext(EssentialsContext);
  const root = useRef();
  const draw = useRef(new Draw({ view: mapView }));
  const handleDraw = (e) => {
    mapView.surface.style.cursor = "crosshair";
    let pointAction = draw.current.create("point");
    pointAction.on("draw-complete", (evt) => {
      console.log(evt.vertices);
      root.current.render(<Form />);
    });
  };
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
      // <CalciteButton onClick={handleDraw}>Feedback</CalciteButton>
      <Form></Form>
    );

    //////////////////// form /////////////////////

    //////////////////////

    mapView.ui.move("zoom", "bottom-right");
    mapView.ui.add(scaleBar, { position: "bottom-right" });
    mapView.ui.add([homeWidget], { position: "top-left" });
    mapView.ui.add(basemapToggle, { position: "bottom-left" });
  }, []);
  return null;
};

export default WidgetsComp;
