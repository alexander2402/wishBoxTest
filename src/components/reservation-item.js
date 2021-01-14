import React from "react";
const styles = {
  list: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "80px",
    borderBottom: "1px solid #a1a1a1",
    listStyle: "none",
    background: "#fff",
    cursor: "pointer",
  },
  item: {
    padding: "0 0 0 20px",
    width: "120px",
    textAlign: "left",
    overflow: "hidden",
  },
};
export default function ReservationItem({ reservation, viewReservation }) {
  return (
    <ul style={styles.list} onClick={() => viewReservation(reservation._id)}>
      <li style={styles.item}>{reservation.firstname}</li>
      <li style={styles.item}>{reservation.lastname}</li>
      <li style={styles.item}>
        {new Date(reservation.startdate).toDateString()}
      </li>
      <li style={styles.item}>
        {new Date(reservation.enddate).toDateString()}
      </li>
      <li style={styles.item}>{reservation.phonenumber}</li>
      <li style={styles.item}>{reservation.email}</li>
      <li style={styles.item}>{reservation.members}</li>
      <li style={styles.item}>{reservation.price}</li>
      <li style={styles.item}>{reservation.country}</li>
      <li style={styles.item}>{reservation.city}</li>
    </ul>
  );
}
