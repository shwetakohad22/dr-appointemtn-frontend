import React, { useState, useEffect } from "react";
import "./css/layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaClipboardList, FaHome, FaRegHospital } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut, IoIosNotificationsOutline } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import axios from "axios";
import admin from "../images/admin.png";
import user from "../images/user.jpg";
import doctor from "../images/doctor.png";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userRole, setUserRole] = useState("user");
  const [menuItems, setMenuItems] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetchUserRole();
  }, []);

  const fetchUserRole = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(`/api/user/userRole/${userId}`);
      setUserRole(response.data.role);
      setUserName(response.data.name);
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  useEffect(() => {
    const userMenu = [
      {
        name: "Home",
        path: "/home",
        icon: <FaHome className="menu-icon" />,
      },
      {
        name: "Appointments",
        path: "/appointments",
        icon: <FaClipboardList className="menu-icon" />,
      },
      {
        name: "Apply Doctor",
        path: "/apply-doctor",
        icon: <FaRegHospital className="menu-icon" />,
      },
    ];

    const adminMenu = [
      {
        name: "Home",
        path: "/home",
        icon: <FaHome className="menu-icon" />,
      },
      {
        name: "Users",
        path: "/admin-userslist",
        icon: <FaUserFriends className="menu-icon" />,
      },
      {
        name: "Doctors",
        path: "/admin-doctorslist",
        icon: <FaRegHospital className="menu-icon" />,
      },
    ];

    const doctorMenu = [
      {
        name: "Home",
        path: "/home",
        icon: <FaHome className="menu-icon" />,
      },
      {
        name: "Appointments",
        path: "/doctor/appointments",
        icon: <FaClipboardList className="menu-icon" />,
      },
      {
        name: "Profile",
        path: `/doctor/profile/${localStorage.getItem("userId")}`,
        icon: <CgProfile className="menu-icon" />,
      },
    ];

    setMenuItems(
      userRole === "admin"
        ? adminMenu
        : userRole === "doctor"
        ? doctorMenu
        : userMenu
    );
  }, [userRole]);

  const getUserImage = () => {
    if (userRole === "admin") {
      return admin;
    } else if (userRole === "doctor") {
      return doctor;
    } else {
      return user;
    }
  };

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <img className="image" src={getUserImage()} alt="" />
            <br />
            <h6 className="text-white role">Role: {userRole}</h6>
          </div>
          <div className="menu ">
            {menuItems.map((menu, index) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                  key={index}
                >
                  {menu.icon}
                  <Link to={menu.path}>{menu.name}</Link>
                </div>
              );
            })}
            <div
              className={`d-flex menu-item `}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <IoMdLogOut className="menu-icon" />
              <Link to="/login">Logout</Link>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header d-flex justify-content-end align-items-center">
            <div className="d-flex align-items-center justify-content-center">
              <Link to="/home" className="header-username">
                <h1>{userName}</h1>
              </Link>
              <IoIosNotificationsOutline className="header-action-icon m-4" />
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
