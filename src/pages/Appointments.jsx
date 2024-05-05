import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointmentsData = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(
        `/api/user/get-appointments-by-user-id?userId=${userId}`
      );
      if (response.data.success) {
        const formattedAppointments = response.data.data.map((appointment) => ({
          ...appointment,

          date: new Date(appointment.date).toLocaleDateString("en-GB"),
        }));
        setAppointments(formattedAppointments);
      } else {
        console.error("Error fetching appointments:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    getAppointmentsData();
  }, []);

  return (
    <Layout>
      <h1 className="page-title">Appointments</h1>
      <hr />
      <table className="table">
        <thead>
          <tr>
            {/* <th scope="col">Doctor ID</th> */}
            <th scope="col">Doctor Name</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Specialization</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              {/* <td>{appointment.doctorId}</td> */}
              <td>
                {appointment.doctorInfo.firstName}{" "}
                {appointment.doctorInfo.lastName}
              </td>
              <td>{appointment.doctorInfo.phoneNumber}</td>
              <td>{appointment.doctorInfo.specialization}</td>
              <td>{appointment.date}</td>
              <td>{appointment.status}</td>
              <td className="text-decoration-underline tableData"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Appointments;
