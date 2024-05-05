import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import toast from "react-hot-toast";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const changeAppointmentStatus = async (appointmentId, status) => {
    try {
      const response = await axios.post(
        "/api/doctor/change-appointment-status",
        {
          appointmentId,
          status,
        }
      );
      toast.success(response.data.message);
      getAppointmentsData();
    } catch (error) {
      toast.error("Error changing appointment status");
      console.log(error);
    }
  };

  const getAppointmentsData = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(
        `/api/doctor/get-appointments-by-doctor-id`,
        {
          params: {
            userId: userId,
          },
        }
      );
      if (response.data.success) {
        const formattedAppointments = await Promise.all(
          response.data.data.map(async (appointment) => {
            const userResponse = await axios.get(`/api/user/get-user-by-id`, {
              params: {
                userId: appointment.userId,
              },
            });
            const user = userResponse.data.data;
            return {
              ...appointment,
              user: user ? { name: user.name, email: user.email } : null,
              date: new Date(appointment.date).toLocaleDateString("en-GB"),
            };
          })
        );
        formattedAppointments.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
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
            {/* <th scope="col">Patient ID</th> */}
            <th scope="col">Patient Name</th>
            <th scope="col">Patient Email</th>
            <th scope="col">Appointment Date</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <td>{appointment.user ? appointment.user.name : "N/A"}</td>
              <td>{appointment.user ? appointment.user.email : "N/A"}</td>
              <td>{appointment.date}</td>
              <td>{appointment.status}</td>
              <td className="text-decoration-underline tableData">
                {appointment.status.toLowerCase() === "pending" && (
                  <div>
                    <button
                      className="doctor-btn"
                      onClick={() =>
                        changeAppointmentStatus(appointment._id, "approved")
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="doctor-btn-reject "
                      onClick={
                        () =>
                          changeAppointmentStatus(appointment._id, "rejected") // Corrected status
                      }
                    >
                      Reject
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default DoctorAppointments;
