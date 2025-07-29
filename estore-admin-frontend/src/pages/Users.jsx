import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api'; // adjust path if needed
import '../styles/adminLayout.css'; // optional: for custom styles
import AdminLayout from '../layout/AdminLayout';
import '../styles/user.css'; // Import custom styles for Users page

const UsersTab = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get(`${API_BASE_URL}/api/users`)
      .then(response => setUsers(response.data))
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  return (
    <AdminLayout>
    <div className="admin-users-tab">
      <h2 className="section-title">All Registered Users</h2>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td> {/* Serial number */}
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.contact}</td>
                <td>{user.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </AdminLayout>
  );
};

export default UsersTab;
