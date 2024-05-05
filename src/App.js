import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import ApplyDoctor from "./pages/ApplyDoctor";
import UsersList from "./pages/Admin/UsersList";
import DoctorsList from "./pages/Admin/DoctorsList";
import Profile from "./pages/Doctor/Profile";
import BookAppointment from "./pages/BookAppointment";
import Appointments from "./pages/Appointments";
import DoctorAppointments from "./pages/Doctor/DoctorAppointment";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/apply-doctor" element={<ApplyDoctor />} />
        <Route path="/admin-userslist" element={<UsersList />} />
        <Route path="/admin-doctorslist" element={<DoctorsList />} />
        <Route path="/doctor/profile/:doctorId" element={<Profile />} />
        <Route
          path="/book-appointment/:doctorId"
          element={<BookAppointment />}
        />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/doctor/appointments" element={<DoctorAppointments />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
