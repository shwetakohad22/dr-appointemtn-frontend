// Doctors.js
import React from "react";

const Doctors = ({ doctor }) => {
  return (
    <div className="card-deck ">
      <div className="card home-cards " style={{ width: "22rem" }}>
        <div className="card-body">
          <h4 className="card-title dr-card-name">
            {doctor.firstName} {doctor.lastName}
          </h4>
          <hr />
          <h5 className="card-subtitle mb-2 text-muted">
            {doctor.specialization}
          </h5>
          <br />
          <p className="card-text">
            <b>Phone Number: </b>
            {doctor.phoneNumber}
          </p>
          <p className="card-text">
            <b>Address: </b>
            {doctor.address}
          </p>
          <p className="card-text">
            <b>Fee Per Visit: </b>
            {doctor.feePerCunsultation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
