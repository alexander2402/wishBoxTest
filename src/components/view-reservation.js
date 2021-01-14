import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
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
  listItem: {
    width: "120px",
    padding: "0 0 0 20px",
    overflow: "auto",
  },
  backBtn: {
    position: "absolute",
    top: "25px",
    left: "0",
    fontSize: "28px",
    cursor: "pointer",
  },
};

export default function ViewReservation({ match }) {
  const history = useHistory();
  const [reservation, setReservation] = useState([]);
  useEffect(() => {
    if (match.params.id) {
      axios
        .get("http://localhost:5000/reservations/" + match.params.id)
        .then((response) => {
          setReservation(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [match]);

  function editReservation() {
    history.push(`/edit/${match.params.id}`);
  }

  function back() {
    history.push("/");
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.h2}>RESERVATION</h2>
      <span style={styles.backBtn} onClick={() => back()}>
        ←
      </span>
      <button style={styles.button} onClick={() => editReservation()}>
        Edit or Delete
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
      <div style={styles.titleList}>
        <div style={styles.listItem}>{reservation.firstname}</div>
        <div style={styles.listItem}>{reservation.lastname}</div>
        <div style={styles.listItem}>
          {new Date(reservation.startdate).toDateString()}
        </div>
        <div style={styles.listItem}>
          {new Date(reservation.enddate).toDateString()}
        </div>
        <div style={styles.listItem}>{reservation.phonenumber}</div>
        <div style={styles.listItem}>{reservation.email}</div>
        <div style={styles.listItem}>{reservation.members}</div>
        <div style={styles.listItem}>{reservation.price}</div>
        <div style={styles.listItem}>{reservation.country}</div>
        <div style={styles.listItem}>{reservation.city}</div>
      </div>
    </div>
  );
}
