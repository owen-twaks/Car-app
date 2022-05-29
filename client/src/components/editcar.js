import React from "react";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";

export default function EditCar(props) {
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <ModalHeader className="modalContainer" closeButton>
        <Modal.Title className="formheading">Edit Car </Modal.Title>
      </ModalHeader>
      <Modal.Body className="modalContainer">
        <form onSubmit={props.submitEdit}>
          <input
            type="text"
            name="regno"
            placeholder="New registration number.."
          ></input>
          <input type="text" name="owner" placeholder="New Owner.."></input>
          <input type="text" name="address" placeholder="New Address.."></input>
          <button className="formbutton">Update</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
