import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
const styles = {
  container: {
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    position: "relative",
  },
  h2: {
    alignSelf: "flex-start",
    marginBottom: "30px",
  },
  button: {
    border: "none",
    width: "80px",
    height: "30px",
    background: "#ca4fe8",
    color: "#fff",
    borderRadius: "6px",
    display: "block",
    marginTop: "20px",
    cursor: "pointer",
  },
  buttonDanger: {
    border: "none",
    width: "80px",
    height: "30px",
    background: "red",
    color: "#fff",
    borderRadius: "6px",
    display: "block",
    marginTop: "20px",
    cursor: "pointer",
  },
  backBtn: {
    position: "absolute",
    top: "25px",
    left: "0",
    fontSize: "28px",
    cursor: "pointer",
  },
};
export default function ReservationManipulator({ match }) {
  const history = useHistory();
  const [isEditMode, setIsEditMode] = useState(false);
  const [formValue, setFormValue] = useState({
    firstname: "",
    lastname: "",
    startdate: "",
    enddate: "",
    phonenumber: "",
    email: "",
    members: "",
    price: "",
    country: "",
    city: "",
  });
  useEffect(() => {
    if (match.params.id) {
      setIsEditMode(true);
      axios
        .get("http://localhost:5000/reservations/" + match.params.id)
        .then((response) => {
          //   const validDates = {
          //     startdate: new Date(response.data.startdate),
          //     enddate: new Date(response.data.enddate),
          //   };
          const validObj = response.data;
          validObj.startdate = new Date(response.data.startdate);
          validObj.enddate = new Date(response.data.enddate);
          setFormValue(validObj);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [match]);
  function edit() {
    axios
      .post(
        `http://localhost:5000/reservations/update/${match.params.id}`,
        formValue
      )
      .then(() => history.push("/"));
  }
  function deleteReservation() {
    axios
      .delete(`http://localhost:5000/reservations/${match.params.id}`)
      .then(() => history.push("/"));
  }
  function submitHandler(event) {
    event.preventDefault();
    if (!isEditMode) {
      const reservation = {
        firstname: formValue.firstname,
        lastname: formValue.lastname,
        startdate: formValue.startdate,
        enddate: formValue.enddate,
        phonenumber: formValue.phonenumber,
        email: formValue.email,
        members: formValue.members,
        price: formValue.price,
        country: formValue.country,
        city: formValue.city,
      };

      axios
        .post("http://localhost:5000/reservations/add", reservation)
        .then(() => history.push("/"));
    }
  }
  function back() {
    history.goBack();
  }
  return (
    <div style={styles.container}>
      <h2 style={styles.h2}>RESERVATION</h2>
      <span style={styles.backBtn} onClick={() => back()}>
        ←
      </span>
      <form onSubmit={submitHandler}>
        <input
          placeholder="First Name"
          value={formValue.firstname}
          onChange={(event) =>
            setFormValue({ ...formValue, firstname: event.target.value })
          }
        ></input>
        <input
          placeholder="Last Name"
          value={formValue.lastname}
          onChange={(event) =>
            setFormValue({ ...formValue, lastname: event.target.value })
          }
        ></input>
        <input
          placeholder="Phone Number"
          value={formValue.phonenumber}
          onChange={(event) =>
            setFormValue({ ...formValue, phonenumber: event.target.value })
          }
        ></input>
        <input
          placeholder="Email"
          value={formValue.email}
          onChange={(event) =>
            setFormValue({ ...formValue, email: event.target.value })
          }
        ></input>
        <input
          placeholder="Members"
          value={formValue.members}
          onChange={(event) =>
            setFormValue({ ...formValue, members: event.target.value })
          }
        ></input>
        <div className="form-group">
          <label>Start Date</label>
          <div>
            <DatePicker
              selected={formValue.startdate}
              onChange={(value) =>
                setFormValue({ ...formValue, startdate: value })
              }
            />
          </div>
        </div>
        <div className="form-group">
          <label>End Date</label>
          <div>
            <DatePicker
              selected={formValue.enddate}
              onChange={(value) =>
                setFormValue({ ...formValue, enddate: value })
              }
            />
          </div>
        </div>
        <input
          placeholder="Price"
          value={formValue.price}
          onChange={(event) =>
            setFormValue({ ...formValue, price: event.target.value })
          }
        ></input>
        <input
          placeholder="Country"
          value={formValue.country}
          onChange={(event) =>
            setFormValue({ ...formValue, country: event.target.value })
          }
        ></input>
        <input
          placeholder="City"
          value={formValue.city}
          onChange={(event) =>
            setFormValue({ ...formValue, city: event.target.value })
          }
        ></input>
        {isEditMode ? (
          <div>
            <button style={styles.button} onClick={() => edit()}>
              Edit
            </button>
            <button
              style={styles.buttonDanger}
              onClick={() => deleteReservation()}
            >
              Delete
            </button>
          </div>
        ) : (
          <button style={styles.button} type="submit">
            Create
          </button>
        )}
      </form>
    </div>
  );
}
