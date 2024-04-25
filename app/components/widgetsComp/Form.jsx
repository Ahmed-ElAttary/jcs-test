import React from "react";
import "@esri/calcite-components/dist/calcite/calcite.css";
import {
  CalciteInput,
  CalciteLabel,
  CalciteButton,
  CalciteSelect,
  CalciteOption,
  CalciteCard,
} from "@esri/calcite-components-react";

import "@esri/calcite-components/dist/components/calcite-input";
import "@esri/calcite-components/dist/components/calcite-select";

const Form = () => {
  return (
    <div style={{ backgroundColor: "white", padding: "10px" }}>
      <CalciteLabel>
        Name
        <CalciteInput></CalciteInput>
      </CalciteLabel>
      <CalciteLabel>
        Email
        <CalciteInput></CalciteInput>
      </CalciteLabel>

      <CalciteLabel>
        Type of feedback
        <CalciteSelect>
          <CalciteOption value="" label=""></CalciteOption>

          <CalciteOption value="Complain" label="Complain"></CalciteOption>
          <CalciteOption
            value="Request Information"
            label="Request Information"
          ></CalciteOption>
          <CalciteOption
            value="Missed Services"
            label="Missed Services"
          ></CalciteOption>
          <CalciteOption
            value="Add information"
            label="Add information"
          ></CalciteOption>
          <CalciteOption value="Others" label="Others"></CalciteOption>
        </CalciteSelect>
      </CalciteLabel>
      <CalciteLabel>
        Message
        <CalciteInput></CalciteInput>
      </CalciteLabel>
      <CalciteButton>Save</CalciteButton>
    </div>
  );
};

export default Form;
