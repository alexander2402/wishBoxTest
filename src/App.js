import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import ReservationList from "./components/reservation-list";
import ViewReservation from "./components/view-reservation";
import ReservationManipulator from "./components/reservation-manipulator";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Route path="/" exact component={ReservationList} />
        <Route path="/create" exact component={ReservationManipulator} />
        <Route path="/edit/:id" exact component={ReservationManipulator} />
        <Route path="/view/:id" exact component={ViewReservation} />
      </div>
    </BrowserRouter>
  );
}

export default App;
