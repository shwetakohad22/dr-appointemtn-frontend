import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BsCalendar2Date } from "react-icons/bs";

const BookAppointment = () => {
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getDoctorData = async () => {
      try {
        const doctorId = localStorage.getItem("selectedDoctorId");
        if (doctorId) {
          const response = await axios.post("/api/doctor/get-doctor-id", {
            doctorId: doctorId,
          });
          setDoctorInfo(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    getDoctorData();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const bookAppointment = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.post("/api/user/book-appointment", {
        userId: userId,
        doctorId: doctorInfo._id,
        doctorInfo: doctorInfo,
        userInfo: {},
        date: selectedDate,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/appointments");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Error booking appointment");
    }
  };

  return (
    <Layout>
      {doctorInfo ? (
        <div className="d-flex ">
          <div className=" w-100">
            <div className="d-flex">
              <div className="  w-50 p-4">
                <div className="d-flex">
                  <h1 className="mt-3 mb-4 ">Doctor Details</h1>
                </div>
                <hr />
                <br />
                <h3 className="page-title">
                  {doctorInfo.firstName} {doctorInfo.lastName}
                </h3>
                <br />
                <h5 style={{ color: "gray" }}>
                  <b>Speciallization : </b> {doctorInfo.specialization}
                </h5>
                <br />
                <p>
                  <b>Phone Number: </b> {doctorInfo.phoneNumber}
                </p>
                <p>
                  <b>Address </b> {doctorInfo.address}
                </p>
                <p>
                  <b>Fee Per Visit: </b>
                  {doctorInfo.feePerCunsultation}
                </p>
              </div>
              <div className="image-container m-3  ">
                <img
                  src="https://thumbs.dreamstime.com/b/finger-press-book-now-button-booking-reservation-icon-online-149789867.jpg"
                  alt=""
                  className="appointment-image "
                />

                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center border justify-content-between input-date">
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                      placeholderText="Select a date "
                      className=" datePicker"
                    />
                    <BsCalendar2Date className="date-icon " />
                  </div>
                  <button
                    className="primary-button mt-4 bookAppointment-btn"
                    onClick={bookAppointment}
                    disabled={!selectedDate}
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  );
};

export default BookAppointment;
