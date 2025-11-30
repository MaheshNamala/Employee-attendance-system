import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyHistory, getMySummary } from '../../store/slices/attendanceSlice';
import { format } from 'date-fns';
import './Dashboard.css';

function MyHistory() {
  const dispatch = useDispatch();
  const { attendance, summary, isLoading } = useSelector((state) => state.attendance);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    dispatch(getMyHistory({ month: selectedMonth, year: selectedYear }));
    dispatch(getMySummary({ month: selectedMonth, year: selectedYear }));
  }, [dispatch, selectedMonth, selectedYear]);

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  if (isLoading) {
    return <div className="loading">Loading attendance history...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>My Attendance History</h1>
        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
          <select value={selectedMonth} onChange={handleMonthChange} style={selectStyle}>
            {months.map(m => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
          <select value={selectedYear} onChange={handleYearChange} style={selectStyle}>
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      {summary && (
        <div className="summary-grid">
          <div className="summary-card">
            <div className="card-icon present">✓</div>
            <div className="card-content">
              <h3>{summary.present}</h3>
              <p>Present Days</p>
            </div>
          </div>
          <div className="summary-card">
            <div className="card-icon late">⏰</div>
            <div className="card-content">
              <h3>{summary.late}</h3>
              <p>Late Arrivals</p>
            </div>
          </div>
          <div className="summary-card">
            <div className="card-icon half-day">◐</div>
            <div className="card-content">
              <h3>{summary.halfDay}</h3>
              <p>Half Days</p>
            </div>
          </div>
          <div className="summary-card">
            <div className="card-icon hours">⏱</div>
            <div className="card-content">
              <h3>{summary.totalHours}h</h3>
              <p>Total Hours</p>
            </div>
          </div>
        </div>
      )}

      <div className="recent-attendance">
        <h2>Attendance Records</h2>
        {attendance && attendance.length > 0 ? (
          <div className="attendance-list">
            {attendance.map((record) => (
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
        ) : (
          <p style={{ textAlign: 'center', color: '#6b7280', padding: '40px' }}>
            No attendance records found for this period.
          </p>
        )}
      </div>
    </div>
  );
}

const selectStyle = {
  padding: '10px 16px',
  border: '2px solid #e5e7eb',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: '500',
  cursor: 'pointer',
  outline: 'none'
};

export default MyHistory;