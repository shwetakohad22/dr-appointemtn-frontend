import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  const getUsersData = async () => {
    try {
      const response = await axios.get("/api/admin/get-all-users");
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <Layout>
      <h1 className="page-title">Users List</h1>
      <br />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">createdAt</th>
            {/* <th scope="col">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.createdAt}</td>
              {/* <td className="text-decoration-underline tableData">Block</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default UsersList;
