import React from "react";

export default function CarForm(props) {
  return (
    <div className="form">
      <h3 className="formheading"> Add Car</h3>
      <form className="mainForm" onSubmit={props.onSubmit}>
        <input type="text" name="Model" placeholder="Model..."></input>
        <input type="text" name="Make" placeholder=" Make.."></input>
        <input type="text" name="Colour" placeholder=" Color.."></input>
        <input type="text" name="RegNo" placeholder=" Registration"></input>
        <input type="text" name="Owner" placeholder=" Owner.."></input>
        <input type="text" name="Address" placeholder=" Address.."></input>
        <button className="formbutton">ADD-CAR</button>
      </form>
    </div>
  );
}
