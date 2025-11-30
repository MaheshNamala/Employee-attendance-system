// src/pages/employee/Dashboard.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeStats } from '../../store/slices/dashboardSlice';
import { checkIn, checkOut, getTodayStatus } from '../../store/slices/attendanceSlice';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import './Dashboard.css';

function EmployeeDashboard() {
  const dispatch = useDispatch();
  const { stats, isLoading } = useSelector((state) => state.dashboard);
  const { todayStatus } = useSelector((state) => state.attendance);

  useEffect(() => {
    dispatch(getEmployeeStats());
    dispatch(getTodayStatus());
  }, [dispatch]);

  const handleCheckIn = async () => {
    try {
      await dispatch(checkIn()).unwrap();
      toast.success('Checked in successfully!');
      dispatch(getEmployeeStats());
      dispatch(getTodayStatus());
    } catch (error) {
      toast.error(error);
    }
  };

  const handleCheckOut = async () => {
    try {
      await dispatch(checkOut()).unwrap();
      toast.success('Checked out successfully!');
      dispatch(getEmployeeStats());
      dispatch(getTodayStatus());
    } catch (error) {
      toast.error(error);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Employee Dashboard</h1>
        <p className="date">{format(new Date(), 'EEEE, MMMM dd, yyyy')}</p>
      </div>

      {/* Today's Status Card */}
      <div className="status-card">
        <h2>Today's Attendance</h2>
        {stats?.todayStatus?.checkedIn ? (
          <div className="checked-in">
            <div className="status-badge success">✓ Checked In</div>
            <div className="time-info">
              <div>
                <span className="label">Check In:</span>
                <span className="time">
                  {format(new Date(stats.todayStatus.checkInTime), 'hh:mm a')}
                </span>
              </div>
              {stats.todayStatus.checkOutTime && (
                <div>
                  <span className="label">Check Out:</span>
                  <span className="time">
                    {format(new Date(stats.todayStatus.checkOutTime), 'hh:mm a')}
                  </span>
                </div>
              )}
            </div>
            <div className={`status-label ${stats.todayStatus.status}`}>
              {stats.todayStatus.status.toUpperCase()}
            </div>
            {!stats.todayStatus.checkOutTime && (
              <button onClick={handleCheckOut} className="btn-checkout">
                Check Out
              </button>
            )}
          </div>
        ) : (
          <div className="not-checked-in">
            <div className="status-badge warning">⚠ Not Checked In</div>
            <p>Click below to mark your attendance for today</p>
            <button onClick={handleCheckIn} className="btn-checkin">
              Check In Now
            </button>
          </div>
        )}
      </div>

      {/* Monthly Summary */}
      <div className="summary-grid">
        <div className="summary-card">
          <div className="card-icon present">✓</div>
          <div className="card-content">
            <h3>{stats?.thisMonth?.present || 0}</h3>
            <p>Present Days</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon late">⏰</div>
          <div className="card-content">
            <h3>{stats?.thisMonth?.late || 0}</h3>
            <p>Late Arrivals</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon half-day">◐</div>
          <div className="card-content">
            <h3>{stats?.thisMonth?.halfDay || 0}</h3>
            <p>Half Days</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon hours">⏱</div>
          <div className="card-content">
            <h3>{stats?.thisMonth?.totalHours || 0}h</h3>
            <p>Total Hours</p>
          </div>
        </div>
      </div>

      {/* Recent Attendance */}
      <div className="recent-attendance">
        <h2>Recent Attendance (Last 7 Days)</h2>
        <div className="attendance-list">
          {stats?.recentAttendance?.map((record) => (
            <div key={record._id} className="attendance-item">
              <div className="date-col">
                {format(new Date(record.date), 'MMM dd, yyyy')}
              </div>
              <div className="time-col">
                <span>In: {format(new Date(record.checkInTime), 'hh:mm a')}</span>
                {record.checkOutTime && (
                  <span>Out: {format(new Date(record.checkOutTime), 'hh:mm a')}</span>
                )}
              </div>
              <div className="hours-col">
                {record.totalHours}h
              </div>
              <div className={`status-col ${record.status}`}>
                {record.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;