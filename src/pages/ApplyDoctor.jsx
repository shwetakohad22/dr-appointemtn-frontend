import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const ApplyDoctor = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    specialization: "",
    experience: "",
    feePerCunsultation: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = localStorage.getItem("userId");

      const response = await axios.post("/api/user/apply-doctor-account", {
        ...formData,
        userId,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/home");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error applying for doctor:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <h1 className="page-title">Apply Doctor</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-wrap justify-content-between">
          <div className="form-group mr-3" style={{ width: "48%" }}>
            <label>First Name</label>
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
        </div>

        {/* Submit Button */}
        <div className="mt-auto d-flex justify-content-end">
          <button type="submit" className="btn btn-primary mt-4 apply-form-btn">
            Submit
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default ApplyDoctor;
