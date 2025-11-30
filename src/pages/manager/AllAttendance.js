// src/pages/manager/AllAttendance.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAttendance } from '../../store/slices/attendanceSlice';
import { format } from 'date-fns';
import './ManagerDashboard.css';

function AllAttendance() {
  const dispatch = useDispatch();
  const { allAttendance, isLoading } = useSelector((state) => state.attendance);
  
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    status: '',
    employeeId: ''
  });

  useEffect(() => {
    dispatch(getAllAttendance({}));
  }, [dispatch]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleApplyFilter = () => {
    const filterParams = {};
    if (filters.startDate) filterParams.startDate = filters.startDate;
    if (filters.endDate) filterParams.endDate = filters.endDate;
    if (filters.status) filterParams.status = filters.status;
    if (filters.employeeId) filterParams.employeeId = filters.employeeId;
    
    dispatch(getAllAttendance(filterParams));
  };

  const handleResetFilter = () => {
    setFilters({
      startDate: '',
      endDate: '',
      status: '',
      employeeId: ''
    });
    dispatch(getAllAttendance({}));
  };

  if (isLoading) {
    return <div className="loading">Loading attendance data...</div>;
  }

  return (
    <div className="manager-dashboard">
      <div className="dashboard-header">
        <h1>All Employees Attendance</h1>
        <p>View and filter attendance records</p>
      </div>

      {/* Filters */}
      <div className="info-card" style={{ marginBottom: '24px' }}>
        <h2>🔍 Filters</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={labelStyle}>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>End Date</label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              style={inputStyle}
            >
              <option value="">All Status</option>
              <option value="present">Present</option>
              <option value="late">Late</option>
              <option value="half-day">Half Day</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Employee ID</label>
            <input
              type="text"
              name="employeeId"
              value={filters.employeeId}
              onChange={handleFilterChange}
              placeholder="e.g., EMP001"
              style={inputStyle}
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={handleApplyFilter} style={applyBtnStyle}>
            Apply Filters
          </button>
          <button onClick={handleResetFilter} style={resetBtnStyle}>
            Reset
          </button>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="info-card">
        <h2>📋 Attendance Records ({allAttendance?.length || 0})</h2>
        {allAttendance && allAttendance.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Employee ID</th>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Department</th>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Check In</th>
                  <th style={thStyle}>Check Out</th>
                  <th style={thStyle}>Hours</th>
                  <th style={thStyle}>Status</th>
                </tr>
              </thead>
              <tbody>
                {allAttendance.map((record) => (
                  <tr key={record._id} style={trStyle}>
                    <td style={tdStyle}>{record.userId?.employeeId}</td>
                    <td style={tdStyle}>{record.userId?.name}</td>
                    <td style={tdStyle}>{record.userId?.department}</td>
                    <td style={tdStyle}>
                      {format(new Date(record.date), 'MMM dd, yyyy')}
                    </td>
                    <td style={tdStyle}>
                      {format(new Date(record.checkInTime), 'hh:mm a')}
                    </td>
                    <td style={tdStyle}>
                      {record.checkOutTime 
                        ? format(new Date(record.checkOutTime), 'hh:mm a')
                        : '-'}
                    </td>
                    <td style={tdStyle}>{record.totalHours}h</td>
                    <td style={tdStyle}>
                      <span className={`status-badge-small ${record.status}`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: '#6b7280', padding: '40px' }}>
            No attendance records found.
          </p>
        )}
      </div>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: '14px',
  fontWeight: '600',
  color: '#374151',
  marginBottom: '8px'
};

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  border: '2px solid #e5e7eb',
  borderRadius: '8px',
  fontSize: '14px',
  outline: 'none'
};

const applyBtnStyle = {
  padding: '12px 24px',
  background: '#4f46e5',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontWeight: '600',
  cursor: 'pointer',
  fontSize: '14px'
};

const resetBtnStyle = {
  padding: '12px 24px',
  background: '#e5e7eb',
  color: '#374151',
  border: 'none',
  borderRadius: '8px',
  fontWeight: '600',
  cursor: 'pointer',
  fontSize: '14px'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '16px'
};

const thStyle = {
  background: '#f9fafb',
  padding: '12px 16px',
  textAlign: 'left',
  fontWeight: '700',
  fontSize: '14px',
  color: '#1f2937',
  borderBottom: '2px solid #e5e7eb'
};

const trStyle = {
  borderBottom: '1px solid #f3f4f6'
};

const tdStyle = {
  padding: '12px 16px',
  fontSize: '14px',
  color: '#374151'
};

export default AllAttendance;