import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import AdminLayout from '../layout/AdminLayout'; // Ensure correct import path
import '../styles/RepairRequests.css';

const RepairRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/repairs/admin`);
      setRequests(res.data);
    } catch (err) {
      console.error('Error fetching repair requests:', err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`${API_BASE_URL}/api/repairs/${id}/status`, null, {
        params: { status: newStatus }
      });
      fetchRequests();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  return (
    <AdminLayout>
      <div className="repair-requests-container">
        <h3 className="mb-4">Repair Requests</h3>
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Device</th>
              <th>Issue</th>
              <th>Preferred Time</th>
              <th>Status</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((req, index) => (
                <tr key={req.id}>
                  <td>{index + 1}</td>
                  <td>{req.name}</td>
                  <td>{req.contact}</td>
                  <td>{req.email}</td>
                  <td>{req.deviceType}</td>
                  <td>{req.issue}</td>
                  <td>{req.preferredTime}</td>
                  <td>{req.status}</td>
                  <td>
                    <select
                      className="form-select"
                      value={req.status}
                      onChange={(e) => handleStatusChange(req.id, e.target.value)}
                    >
                      <option value="PENDING">Pending</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">No repair requests found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default RepairRequests;
