import React, { useContext, useRef, useState } from "react";
import "@esri/calcite-components/dist/calcite/calcite.css";
import {
  CalciteInput,
  CalciteLabel,
  CalciteButton,
  CalciteSelect,
  CalciteOption,
  CalciteAlert,
} from "@esri/calcite-components-react";
import Draw from "@arcgis/core/views/draw/Draw.js";
import "@esri/calcite-components/dist/components/calcite-input";
import "@esri/calcite-components/dist/components/calcite-select";
import "@esri/calcite-components/dist/components/calcite-alert";

function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}
const Form = ({ mapView, feedbacks, setFeedbacks }) => {
  const draw = useRef(new Draw({ view: mapView }));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  const [error, setError] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const handleReset = () => {
    setName("");
    setEmail("");
    setType("");
    setMessage("");
    setCoordinates([]);
    setOpenForm(false);
    mapView.surface.style.cursor = "default";
  };
  const handleSave = () => {
    if (name && email && type && message) {
      // if (ValidateEmail(email)) {
      setFeedbacks([...feedbacks, { name, email, type, message, coordinates }]);
      handleReset();
      // } else {
      //   setError("You have entered an invalid email address!");
      // }
    } else {
      setError("Please fill all form fields!");
    }
  };
  const handleDraw = () => {
    mapView.surface.style.cursor = "crosshair";
    let pointAction = draw.current.create("point");
    pointAction.on("draw-complete", (e) => {
      console.log(e);
      setCoordinates(e.coordinates);
      setOpenForm(true);
    });
  };
  return (
    <>
      {openForm ? (
        <div style={{ backgroundColor: "white", padding: "10px" }}>
          {error && (
            <CalciteAlert
              label="Please fill all form fields"
              open={error}
              onCalciteAlertClose={() => setError("")}
              icon="exclamation-mark-triangle-f"
            >
              <div slot="title">{error}</div>
            </CalciteAlert>
          )}
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
            <CalciteSelect
              onCalciteSelectChange={(e) => setType(e.target.value)}
            >
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
      ) : (
        <CalciteButton onClick={handleDraw}>Feedback</CalciteButton>
      )}
    </>
  );
};

export default Form;
