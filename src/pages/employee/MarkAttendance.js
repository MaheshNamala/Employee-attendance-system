import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkIn, checkOut, getTodayStatus } from '../../store/slices/attendanceSlice';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import './Dashboard.css';

function MarkAttendance() {
  const dispatch = useDispatch();
  const { todayStatus, isLoading } = useSelector((state) => state.attendance);

  useEffect(() => {
    dispatch(getTodayStatus());
  }, [dispatch]);

  const handleCheckIn = async () => {
    try {
      await dispatch(checkIn()).unwrap();
      toast.success('Checked in successfully!');
      dispatch(getTodayStatus());
    } catch (error) {
      toast.error(error);
    }
  };

  const handleCheckOut = async () => {
    try {
      await dispatch(checkOut()).unwrap();
      toast.success('Checked out successfully!');
      dispatch(getTodayStatus());
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Mark Attendance</h1>
        <p className="date">{format(new Date(), 'EEEE, MMMM dd, yyyy')}</p>
      </div>

      <div className="status-card">
        <h2>Today's Status</h2>
        {todayStatus ? (
          <div className="checked-in">
            <div className="status-badge success">✓ Checked In</div>
            <div className="time-info">
              <div>
                <span className="label">Check In Time:</span>
                <span className="time">
                  {format(new Date(todayStatus.checkInTime), 'hh:mm:ss a')}
                </span>
              </div>
              {todayStatus.checkOutTime && (
                <div>
                  <span className="label">Check Out Time:</span>
                  <span className="time">
                    {format(new Date(todayStatus.checkOutTime), 'hh:mm:ss a')}
                  </span>
                </div>
              )}
            </div>
            <div className={`status-label ${todayStatus.status}`}>
              {todayStatus.status.toUpperCase()}
            </div>
            {!todayStatus.checkOutTime && (
              <button 
                onClick={handleCheckOut} 
                className="btn-checkout"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Check Out'}
              </button>
            )}
            {todayStatus.checkOutTime && (
              <p style={{ marginTop: '20px', color: '#10b981', fontWeight: 'bold' }}>
                ✓ You have completed your attendance for today
              </p>
            )}
          </div>
        ) : (
          <div className="not-checked-in">
            <div className="status-badge warning">⚠ Not Checked In</div>
            <p>Click the button below to mark your attendance</p>
            <button 
              onClick={handleCheckIn} 
              className="btn-checkin"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Check In Now'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MarkAttendance;