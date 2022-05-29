import React from "react";

import "./App.css";

//Components
import CarForm from "./components/carform";
import DisplayCars from "./components/viewcars";
import EditCar from "./components/editcar";
import EditManyCars from "./components/editmany";

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas); // passing all icons in @fortawesome/free-solid-svg-icons

class App extends React.Component {
  state = {
    cars: [],
    error: "Error - Please try again",
    showModal: false,
    showEditMany: false,
    editCar: null,
    carheading: "Car Database - All Cars",
  };

  // GET api, fetches all cars from the DB
  getCars = () => {
    fetch("/api")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            cars: result,
            carheading: "Car Database - All Cars",
          });
        },
        (error) => {
          console.log(error);
          this.setState({
            issue: error,
          });
        }
      );
  };

  // on load, calls getCars() to fetch data from the DB
  componentDidMount = () => {
    this.getCars();
  };

  //GET cars older than 5 years
  oldCars = () => {
    fetch("/old")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            cars: result,
            carheading: "Car Database - Older Than 5 Years",
          });
        },
        (error) => {
          console.log(error);
          this.setState({
            issue: error,
          });
        }
      );
  };

  // addCar to the database, POST
  addCar = (e) => {
    e.preventDefault();
    const newcar = {
      Model: e.target.Model.value,
      Make: e.target.Make.value,
      Colour: e.target.Colour.value,
      RegNo: e.target.RegNo.value,
      Owner: e.target.Owner.value,
      Address: e.target.Address.value,
    };
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(newcar),
    })
      .then((res) => {
        res.json();
      })
      .then((response) => alert("Cars updated", response))
      .catch((error) => console.log(error));

    // update this.state.cars to show the new car
    this.getCars();
  };

  // Remove car from DB, DELETE /:id
  deleteCar = (_id) => {
    const carid = _id;

    fetch(`/${carid}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json;charset=utf-8" },
    })
      .then((res) => res.json())

      .catch((error) => console.log(error));

    // update this.state.cars to remove deleted car

    const filtercar = this.state.cars.filter(
      (updtcars) => updtcars._id !== carid
    );
    this.setState({ cars: filtercar });
  };

  //display modal
  showModal = (car) => {
    this.setState({ showModal: true, editCar: car });
  };

  showManyModal = () => {
    this.setState({ showEditMany: true });
  };

  //Hide modal
  hideModal = () => {
    this.setState({ showModal: false, editCar: null });
  };

  onHideMany = () => {
    this.setState({ showEditMany: false });
  };

  // Updates the RegNo, Owner or Address for one car, PUT /:id
  editCar = (e) => {
    e.preventDefault();
    const car = this.state.editCar;
    const modcar = {
      RegNo: e.target.regno.value,
      Owner: e.target.owner.value,
      Address: e.target.address.value,
    };

    // Replace any empty fields in modcar with the original data
    if (modcar.RegNo === "") {
      modcar.RegNo = car.RegNo;
    }
    if (modcar.Owner === "") {
      modcar.Owner = car.Owner;
    }
    if (modcar.Address === "") {
      modcar.Address = car.Address;
    }
    console.log(modcar);

    // Update the database
    fetch(`/${car._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(modcar),
    })
      .then((res) => res.json())
      .then((response) => alert("Car updated", response))
      .catch((error) => console.log(error));
    this.getCars();
    this.hideModal();
  };

  //Updates Many - updates the owner and address for models 10 years and older
  //PUT /updatemany

  updateMany = (e) => {
    e.preventDefault();
    const carInfo = {
      Owner: e.target.owner.value,
      Address: e.target.address.value,
    };
    fetch("/many", {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(carInfo),
    })
      .then((res) => res.json())
      .then((response) => alert("Cars updated", response))
      .catch((error) => console.log(error));

    this.getCars();
    this.onHideMany();
  };

  render() {
    return (
      <div className="App App-header">
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
          integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
          crossOrigin="anonymous"
        />
        <CarForm onSubmit={this.addCar} />
        <DisplayCars
          cars={this.state.cars}
          editCar={this.showModal}
          deleteCar={this.deleteCar}
          oldCars={this.oldCars}
          allCars={this.getCars}
          carheading={this.state.carheading}
          updateMany={this.showManyModal}
        />
        <EditCar
          show={this.state.showModal}
          onHide={this.hideModal}
          submitEdit={this.editCar}
        />
        <EditManyCars
          show={this.state.showEditMany}
          onHide={this.onHideMany}
          editMany={this.updateMany}
        />
      </div>
    );
  }
}

export default App;
