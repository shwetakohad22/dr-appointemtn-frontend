import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { TimePicker } from "antd";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [doctorInfo, setDoctorInfo] = useState(null);
  const navigate = useNavigate();

  const getDoctorData = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.post("/api/doctor/get-doctor-info-by-id", {
        userId: userId,
      });
      setDoctorInfo(response.data.data);
    } catch (error) {
      console.error("Error fetching doctor data:", error);
    }
  };

  useEffect(() => {
    getDoctorData();
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    specialization: "",
    experience: "",
    feePerCunsultation: "",
    timing: [],
  });

  useEffect(() => {
    if (doctorInfo) {
      setFormData(doctorInfo);
    }
  }, [doctorInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTimeChange = (value) => {
    setFormData({
      ...formData,
      timing: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/api/doctor/update-doctor-profile",
        formData
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/home");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating doctor profile:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <h1 className="page-title">Doctor Profile</h1>
      <br />
      <div>
        <form onSubmit={handleSubmit}>
   
          <div className="d-flex flex-wrap justify-content-between">
            <div className="form-group mr-3" style={{ width: "48%" }}>
              <label >First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>

            {/* Last Name */}
            <div className="form-group mr-3" style={{ width: "48%" }}>
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>

            {/* Phone Number */}
            <div className="form-group mt-3" style={{ width: "100%" }}>
              <label>Phone Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Address */}
          <div className="form-group mt-3">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>

          {/* Specialization and Experience */}
          <div className="d-flex flex-wrap justify-content-between mt-3">
            <div className="form-group mr-3" style={{ width: "48%" }}>
              <label>Specialization</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group mr-3" style={{ width: "48%" }}>
              <label>Experience</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Fee per Consultation and Timing */}
          <div className="d-flex flex-wrap justify-content-between mt-3">
            <div className="form-group mr-3" style={{ width: "48%" }}>
              <label>Fee per Consultation</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Fee per Consultation"
                name="feePerCunsultation"
                value={formData.feePerCunsultation}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group" style={{ width: "48%" }}>
              <label>Timings</label>
              <br />
              <TimePicker.RangePicker
                className="antd-timePicker"
                value={formData.timing}
                onChange={(value) => handleTimeChange(value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-auto d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-primary mt-4 apply-form-btn"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Profile;
