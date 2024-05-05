import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import Doctors from "../components/Doctors";

const Home = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("/api/user/get-all-approved-doctors");
        setDoctors(response.data.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    getData();
  }, []);

  const handleDoctorClick = (doctorId) => {
    localStorage.setItem("selectedDoctorId", doctorId);
  };

  return (
    <Layout>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {doctors.map((doctor) => (
          <div className="col" key={doctor._id}>
            <Link
              to={`/book-appointment/${doctor._id}`}
              style={{ textDecoration: "none" }}
              onClick={() => handleDoctorClick(doctor._id)}
            >
              <Doctors doctor={doctor} />
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
