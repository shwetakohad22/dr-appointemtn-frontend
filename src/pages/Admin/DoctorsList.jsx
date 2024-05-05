import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import toast from "react-hot-toast";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);

  const getDoctorsData = async () => {
    try {
      const response = await axios.get("/api/admin/get-all-doctors");
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeDoctorStatus = async (doctorId, status) => {
    try {
      const response = await axios.post("/api/admin/change-doctor-status", {
        doctorId,
        status,
      });
      toast.success(response.data.message);
      getDoctorsData();
    } catch (error) {
      toast.error("Error changing doctor account status");
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  return (
    <Layout>
      <h1 className="page-title">Doctors List</h1>
      <br />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Specialization</th>
            <th scope="col">createdAt</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => (
            <tr key={index}>
              <td>
                {doctor.firstName} {doctor.lastName}
              </td>
              <td>{doctor.phoneNumber}</td>
              <td>{doctor.specialization}</td>
              <td>{doctor.createdAt}</td>
              <td>{doctor.status}</td>
              <td className="text-decoration-underline tableData">
                {doctor.status.toLowerCase() === "pending" && (
                  <button
                    className="doctor-btn"
                    onClick={() => changeDoctorStatus(doctor._id, "approved")}
                  >
                    Approve
                  </button>
                )}
                {doctor.status.toLowerCase() === "approved" && (
                  <button
                    className="doctor-block-btn"
                    onClick={() => changeDoctorStatus(doctor._id, "blocked")}
                  >
                    Block
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default DoctorsList;
