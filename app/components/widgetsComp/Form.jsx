"use client";
import React, { useState } from "react";
import "@esri/calcite-components/dist/calcite/calcite.css";
import {
  CalciteInput,
  CalciteLabel,
  CalciteButton,
  CalciteSelect,
  CalciteOption,
  CalciteAlert,
} from "@esri/calcite-components-react";

import "@esri/calcite-components/dist/components/calcite-input";
import "@esri/calcite-components/dist/components/calcite-select";
import "@esri/calcite-components/dist/components/calcite-alert";
const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [valid, setValid] = useState(true);
  const handleSave = (e) => {
    if (name && email && type && message) {
      console.log({ name, email, type, message });
    } else {
      setValid(false);
    }
  };
  return (
    <div style={{ backgroundColor: "white", padding: "10px" }}>
      <CalciteAlert
        label="Please fill all form fields"
        open={!valid}
        onCalciteAlertClose={() => setValid(true)}
        icon="exclamation-mark-triangle-f"
      >
        <div slot="title">Please fill all form fields</div>
      </CalciteAlert>
      <CalciteLabel>
        Name
        <CalciteInput
          onCalciteInputChange={(e) => setName(e.target.value)}
        ></CalciteInput>
      </CalciteLabel>
      <CalciteLabel>
        Email
        <CalciteInput
          onCalciteInputChange={(e) => setEmail(e.target.value)}
        ></CalciteInput>
      </CalciteLabel>

      <CalciteLabel>
        Type of feedback
        <CalciteSelect onCalciteSelectChange={(e) => setType(e.target.value)}>
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
        <CalciteInput
          onCalciteInputChange={(e) => setMessage(e.target.value)}
        ></CalciteInput>
      </CalciteLabel>
      <CalciteButton onClick={handleSave}>Save</CalciteButton>
    </div>
  );
};

export default Form;
