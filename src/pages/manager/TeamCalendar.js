// src/pages/manager/TeamCalendar.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAttendance } from '../../store/slices/attendanceSlice';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import './ManagerDashboard.css';

function TeamCalendar() {
  const dispatch = useDispatch();
  const { allAttendance, isLoading } = useSelector((state) => state.attendance);
  
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const start = startOfMonth(new Date(selectedYear, selectedMonth));
    const end = endOfMonth(new Date(selectedYear, selectedMonth));
    
    dispatch(getAllAttendance({
      startDate: format(start, 'yyyy-MM-dd'),
      endDate: format(end, 'yyyy-MM-dd')
    }));
  }, [dispatch, selectedMonth, selectedYear]);

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
  const months = [
    { value: 0, label: 'January' },
    { value: 1, label: 'February' },
    { value: 2, label: 'March' },
    { value: 3, label: 'April' },
    { value: 4, label: 'May' },
    { value: 5, label: 'June' },
    { value: 6, label: 'July' },
    { value: 7, label: 'August' },
    { value: 8, label: 'September' },
    { value: 9, label: 'October' },
    { value: 10, label: 'November' },
    { value: 11, label: 'December' },
  ];

  // Group attendance by date
  const attendanceByDate = {};
  if (allAttendance) {
    allAttendance.forEach(record => {
      const dateKey = format(new Date(record.date), 'yyyy-MM-dd');
      if (!attendanceByDate[dateKey]) {
        attendanceByDate[dateKey] = [];
      }
      attendanceByDate[dateKey].push(record);
    });
  }

  // Calculate stats
  const calculateDayStats = (records) => {
    if (!records || records.length === 0) return null;
    return {
      total: records.length,
      present: records.filter(r => r.status === 'present').length,
      late: records.filter(r => r.status === 'late').length,
      halfDay: records.filter(r => r.status === 'half-day').length
    };
  };

  if (isLoading) {
    return <div className="loading">Loading calendar data...</div>;
  }

  return (
    <div className="manager-dashboard">
      <div className="dashboard-header">
        <h1>Team Calendar View</h1>
        <p>Monthly attendance overview</p>
      </div>

      {/* Month/Year Selector */}
      <div className="info-card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <label style={labelStyle}>Select Month:</label>
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

      {/* Calendar View */}
      <div className="info-card">
        <h2>📅 {months[selectedMonth].label} {selectedYear}</h2>
        
        {/* Legend */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', marginTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ ...legendBox, background: '#d1fae5' }}></div>
            <span style={legendText}>Present</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ ...legendBox, background: '#fef3c7' }}></div>
            <span style={legendText}>Late</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ ...legendBox, background: '#fed7aa' }}></div>
            <span style={legendText}>Half Day</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ ...legendBox, background: '#f3f4f6' }}></div>
            <span style={legendText}>No Data</span>
          </div>
        </div>

        {/* Attendance List by Date */}
        <div style={{ display: 'grid', gap: '12px' }}>
          {Object.keys(attendanceByDate).sort().reverse().map(dateKey => {
            const records = attendanceByDate[dateKey];
            const stats = calculateDayStats(records);
            const date = new Date(dateKey);
            const dayName = format(date, 'EEEE');
            const formattedDate = format(date, 'MMM dd, yyyy');

            return (
              <div key={dateKey} style={calendarDayCard}>
                <div style={calendarDayHeader}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>
                      {dayName}
                    </h3>
                    <p style={{ margin: '4px 0 0 0', color: '#6b7280', fontSize: '14px' }}>
                      {formattedDate}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={statBadge}>
                      <span style={statValue}>{stats.present}</span>
                      <span style={statLabel}>Present</span>
                    </div>
                    <div style={statBadge}>
                      <span style={statValue}>{stats.late}</span>
                      <span style={statLabel}>Late</span>
                    </div>
                    <div style={statBadge}>
                      <span style={statValue}>{stats.total}</span>
                      <span style={statLabel}>Total</span>
                    </div>
                  </div>
                </div>
                
                <div style={{ marginTop: '12px', display: 'grid', gap: '8px' }}>
                  {records.map(record => (
                    <div key={record._id} style={employeeRecordCard}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                        <div style={smallAvatar}>
                          {record.userId?.name?.charAt(0)}
                        </div>
                        <div>
                          <p style={{ margin: 0, fontWeight: '600', fontSize: '14px' }}>
                            {record.userId?.name}
                          </p>
                          <p style={{ margin: 0, color: '#6b7280', fontSize: '12px' }}>
                            {record.userId?.employeeId} - {record.userId?.department}
                          </p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <span style={{ fontSize: '13px', color: '#6b7280' }}>
                          {format(new Date(record.checkInTime), 'hh:mm a')}
                          {record.checkOutTime && ` - ${format(new Date(record.checkOutTime), 'hh:mm a')}`}
                        </span>
                        <span className={`status-badge-small ${record.status}`}>
                          {record.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {Object.keys(attendanceByDate).length === 0 && (
          <p style={{ textAlign: 'center', color: '#6b7280', padding: '60px' }}>
            No attendance data for this month
          </p>
        )}
      </div>
    </div>
  );
}

const labelStyle = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#374151'
};

const selectStyle = {
  padding: '10px 16px',
  border: '2px solid #e5e7eb',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: '500',
  cursor: 'pointer',
  outline: 'none'
};

const legendBox = {
  width: '20px',
  height: '20px',
  borderRadius: '4px',
  border: '1px solid #e5e7eb'
};

const legendText = {
  fontSize: '14px',
  color: '#374151',
  fontWeight: '500'
};

const calendarDayCard = {
  background: '#f9fafb',
  borderRadius: '12px',
  padding: '20px',
  border: '1px solid #e5e7eb'
};

const calendarDayHeader = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: '16px',
  borderBottom: '2px solid #e5e7eb'
};

const statBadge = {
  textAlign: 'center'
};

const statValue = {
  display: 'block',
  fontSize: '24px',
  fontWeight: '700',
  color: '#1f2937'
};

const statLabel = {
  display: 'block',
  fontSize: '12px',
  color: '#6b7280',
  fontWeight: '500'
};

const employeeRecordCard = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px',
  background: 'white',
  borderRadius: '8px',
  border: '1px solid #e5e7eb'
};

const smallAvatar = {
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  fontWeight: '700',
  flexShrink: 0
};

export default TeamCalendar;