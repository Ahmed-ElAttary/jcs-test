import React, { useContext, useEffect, useRef } from "react";

import { CalciteButton } from "@esri/calcite-components-react";
import { createRoot } from "react-dom/client";
import Home from "@arcgis/core/widgets/Home.js";
import ScaleBar from "@arcgis/core/widgets/ScaleBar.js";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle.js";

import TableList from "@arcgis/core/widgets/TableList.js";
import FeatureTable from "@arcgis/core/widgets/FeatureTable.js";
import Form from "./Form";
import { EssentialsContext } from "../../EssentialsProvider";

const WidgetsComp = () => {
  const { mapView, feedbacks, setFeedbacks, layer } =
    useContext(EssentialsContext);
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
    //////////////////////////////////////////////
    var form = document.createElement("div");
    root.current = createRoot(form);

    root.current.render(
      <Form
        mapView={mapView}
        feedbacks={feedbacks}
        setFeedbacks={setFeedbacks}
      ></Form>
    );
    ////////////////////////////////////////////////////////
    const tableList = new TableList({
      map: mapView, // takes any tables associated with the map and displays in widget

      listItemCreatedFunction: function (event) {
        let item = event.item;
        item.actionsSections = [
          {
            title: "Show table",
            className: "esri-icon-table",
            id: "table",
            type: "toggle",
          },
          {
            title: "Layer information",
            className: "esri-icon-description",
            id: "information",
          },
        ];
      },
    });

    // const featureTable = new FeatureTable({
    //   view: mapView, // The view property must be set for the select/highlight to work
    //   layer: layer.current,
    //   container: tableList, // the table must be assigned to the container via the constructor
    // });
    ////////////////////////////////////////////////////////
    mapView.ui.add([form, tableList], { position: "top-right" });
    mapView.ui.move("zoom", "bottom-right");
    mapView.ui.add(scaleBar, { position: "bottom-right" });
    mapView.ui.add([homeWidget], { position: "top-left" });
    mapView.ui.add(basemapToggle, { position: "bottom-left" });
  }, []);
  return null;
};

export default WidgetsComp;
