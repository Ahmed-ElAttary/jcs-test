import React, { useRef, useState } from "react";
import "@esri/calcite-components/dist/calcite/calcite.css";
import {
  CalciteTable,
  CalciteTableRow,
  CalciteTableHeader,
  CalciteButton,
  CalciteTableCell,
} from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-table";
import "@esri/calcite-components/dist/components/calcite-table-header";
import "@esri/calcite-components/dist/components/calcite-table-row";
import "@esri/calcite-components/dist/components/calcite-table-cell";
const List = ({ mapView, feedbacks, layer }) => {
  const highlightRef = useRef();
  const [openList, setOpenList] = useState(false);

  const zoomTo = (id) => {
    mapView.goTo({
      target: layer.current.graphics.find((el) => el.attributes.id == id),
      zoom: 18,
    });
  };

  const highlight = (id) => {
    const graphic = layer.current.graphics.find((el) => el.attributes.id == id);
    mapView.whenLayerView(graphic.layer).then(function (layerView) {
      clearHighlight();
      highlightRef.current = layerView.highlight(graphic);
    });
  };

  const clearHighlight = () => {
    highlightRef.current?.remove();
  };
  return (
    <>
      {openList ? (
        <div style={{ backgroundColor: "white", padding: "10px" }}>
          <CalciteButton
            onClick={() => {
              setOpenList(false);
            }}
          >
            X
          </CalciteButton>
          <CalciteTable caption="Simple table">
            <CalciteTableRow slot="table-header">
              <CalciteTableHeader heading="ID"></CalciteTableHeader>
              <CalciteTableHeader heading="Name"></CalciteTableHeader>
              <CalciteTableHeader heading="Email"></CalciteTableHeader>
              <CalciteTableHeader heading="Type of feedback"></CalciteTableHeader>
              <CalciteTableHeader heading="Message"></CalciteTableHeader>
            </CalciteTableRow>

            {feedbacks.map(({ id, name, email, type, message }) => {
              return (
                <CalciteTableRow
                  key={id}
                  onClick={() => {
                    zoomTo(id);
                  }}
                  onMouseEnter={() => highlight(id)}
                  onMouseLeave={clearHighlight}
                >
                  <CalciteTableCell>{id}</CalciteTableCell>
                  <CalciteTableCell>{name}</CalciteTableCell>
                  <CalciteTableCell>{email}</CalciteTableCell>
                  <CalciteTableCell>{type}</CalciteTableCell>
                  <CalciteTableCell>{message}</CalciteTableCell>
                </CalciteTableRow>
              );
            })}
          </CalciteTable>
        </div>
      ) : (
        <CalciteButton
          onClick={() => {
            setOpenList(true);
          }}
        >
          List
        </CalciteButton>
      )}
    </>
  );
};

export default List;
