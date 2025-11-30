// src/pages/manager/Dashboard.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getManagerStats } from '../../store/slices/dashboardSlice';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './ManagerDashboard.css';

function ManagerDashboard() {
  const dispatch = useDispatch();
  const { stats, isLoading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getManagerStats());
  }, [dispatch]);

  if (isLoading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="manager-dashboard">
      <div className="dashboard-header">
        <h1>Manager Dashboard</h1>
        <p>Team Attendance Overview</p>
      </div>

      {/* Summary Cards */}
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{stats?.totalEmployees || 0}</h3>
            <p>Total Employees</p>
          </div>
        </div>

        <div className="stat-card present">
          <div className="stat-icon">✓</div>
          <div className="stat-content">
            <h3>{stats?.todayStats?.present || 0}</h3>
            <p>Present Today</p>
          </div>
        </div>

        <div className="stat-card late">
          <div className="stat-icon">⏰</div>
          <div className="stat-content">
            <h3>{stats?.todayStats?.late || 0}</h3>
            <p>Late Today</p>
          </div>
        </div>

        <div className="stat-card absent">
          <div className="stat-icon">✗</div>
          <div className="stat-content">
            <h3>{stats?.todayStats?.absent || 0}</h3>
            <p>Absent Today</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        {/* Weekly Trend Chart */}
        <div className="chart-card">
          <h2>Weekly Attendance Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats?.weeklyTrend || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#4f46e5" 
                strokeWidth={2}
                name="Present Employees"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Department Stats */}
        <div className="chart-card">
          <h2>Department-wise Attendance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats?.departmentStats || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="present" fill="#10b981" name="Present" />
              <Bar dataKey="total" fill="#e5e7eb" name="Total" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Late Arrivals */}
      {stats?.lateArrivals && stats.lateArrivals.length > 0 && (
        <div className="info-card">
          <h2>⏰ Late Arrivals Today</h2>
          <div className="employee-list">
            {stats.lateArrivals.map((record) => (
              <div key={record._id} className="employee-item">
                <div className="employee-avatar">
                  {record.userId.name.charAt(0)}
                </div>
                <div className="employee-details">
                  <p className="name">{record.userId.name}</p>
                  <p className="id">{record.userId.employeeId} - {record.userId.department}</p>
                </div>
                <div className="time">
                  {new Date(record.checkInTime).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Absent Employees */}
      {stats?.absentEmployees && stats.absentEmployees.length > 0 && (
        <div className="info-card">
          <h2>✗ Absent Today</h2>
          <div className="employee-list">
            {stats.absentEmployees.map((employee) => (
              <div key={employee._id} className="employee-item">
                <div className="employee-avatar">
                  {employee.name.charAt(0)}
                </div>
                <div className="employee-details">
                  <p className="name">{employee.name}</p>
                  <p className="id">{employee.employeeId} - {employee.department}</p>
                </div>
                <div className="status absent-badge">Absent</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ManagerDashboard;