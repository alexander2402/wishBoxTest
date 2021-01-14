import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ReservationItem from "./reservation-item";
const styles = {
  container: {
    position: "relative",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  button: {
    position: "absolute",
    top: 0,
    right: 0,
    border: "none",
    width: "120px",
    height: "30px",
    background: "#34b634",
    color: "#fff",
    borderRadius: "6px",
    display: "block",
    marginTop: "20px",
    cursor: "pointer",
  },
  h2: {
    alignSelf: "flex-start",
    marginBottom: "30px",
  },
  titleList: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  titleListItem: {
    fontWeight: "bold",
    width: "120px",
    padding: "0 0 0 20px",
  },
};

export default function ReservationList() {
  const history = useHistory();
  const [reservations, setReservations] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/reservations/")
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  function navToCreatePage() {
    history.push(`/create/`);
  }
  function viewReservation(id) {
    history.push(`/view/${id}`);
  }
  return (
    <div style={styles.container}>
      <h2 style={styles.h2}>RESERVATIONS</h2>
      <button style={styles.button} onClick={() => navToCreatePage()}>
        Add Reservation
      </button>
      <div style={styles.titleList}>
        <div style={styles.titleListItem}>First Name</div>
        <div style={styles.titleListItem}>Last Name</div>
        <div style={styles.titleListItem}>Start Date</div>
        <div style={styles.titleListItem}>End Date</div>
        <div style={styles.titleListItem}>Phone Number</div>
        <div style={styles.titleListItem}>Email</div>
        <div style={styles.titleListItem}>Members</div>
        <div style={styles.titleListItem}>Price</div>
        <div style={styles.titleListItem}>Country</div>
        <div style={styles.titleListItem}>City</div>
      </div>
      {reservations &&
        reservations.map((reservation) => (
          <ReservationItem
            reservation={reservation}
            viewReservation={viewReservation}
            key={reservation._id}
          ></ReservationItem>
        ))}
    </div>
  );
}
