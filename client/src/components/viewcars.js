import React from "react";
import Table from "react-bootstrap/Table";

//Styling

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DisplayCars({
  cars,
  editCar,
  deleteCar,
  oldCars,
  carheading,
  allCars,
  updateMany,
}) {
  const trow = cars.map((car) => (
    <tr key={car._id}>
      <td>{car.Model}</td>
      <td>{car.Make}</td>
      <td>{car.Colour}</td>
      <td>{car.RegNo}</td>
      <td>{car.Owner}</td>
      <td>{car.Address}</td>
      <td className="tableButtons">
        <FontAwesomeIcon
          icon={["fas", "edit"]}
          className="icons"
          name="trash-bin"
          onClick={() => editCar(car)}
        />

        <FontAwesomeIcon
          icon={["fas", "trash-alt"]}
          className="icons"
          name="trash-bin"
          onClick={() => deleteCar(car._id)}
        />
      </td>
    </tr>
  ));

  return (
    <div className="tablecontainer">
      <h1 className="tableheader">{carheading}</h1>
      <Table striped hover variant="dark" size="md" className="dataTable">
        <thead className="tableHead">
          <tr>
            <th>Model</th>
            <th>Make</th>
            <th>Colour</th>
            <th>RegNo</th>
            <th>Owner</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>{trow}</tbody>
      </Table>
      <button onClick={oldCars} className="formbutton">
        Cars Older than 5 years
      </button>
      <button onClick={allCars} className="formbutton">
        All Cars
      </button>
      <button onClick={updateMany} className="formbutton">
        Update Cars
      </button>
    </div>
  );
}
