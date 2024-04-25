import { setAssetPath } from "@esri/calcite-components/dist/components";
setAssetPath("https://js.arcgis.com/calcite-components/2.7.1/assets");
import "@esri/calcite-components/dist/components/calcite-button.js";
import "@esri/calcite-components/dist/calcite/calcite.css";

import React, { useEffect } from "react";
import { CalciteButton } from "@esri/calcite-components-react";

import { createRoot } from "react-dom/client";
import Home from "@arcgis/core/widgets/Home.js";
import ScaleBar from "@arcgis/core/widgets/ScaleBar.js";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle.js";
const WidgetsComp = ({ mapView }) => {
  useEffect(() => {
    let scaleBar = new ScaleBar({
      view: mapView,
    });
    let homeWidget = new Home({
      view: mapView,
    });

    mapView.ui.move("zoom", "bottom-right");
    mapView.ui.add(scaleBar, { position: "bottom-right" });
    mapView.ui.add([homeWidget], { position: "top-left" });
    var node = document.createElement("div");
    const root = createRoot(node);
    mapView.ui.add(node, { position: "top-right" });
    root.render(
      <CalciteButton onClick={(e) => alert("fdfd")}>Reset</CalciteButton>
    );

    let basemapToggle = new BasemapToggle({
      view: mapView,
      nextBasemap: "dark-gray",
    });
    mapView.ui.add(basemapToggle, { position: "bottom-left" });
  }, []);
  return null;
};

export default WidgetsComp;
