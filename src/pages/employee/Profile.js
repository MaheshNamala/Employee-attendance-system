import React from 'react';
import { useSelector } from 'react-redux';
import './Dashboard.css';

function Profile() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>My Profile</h1>
      </div>

      <div className="status-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            fontWeight: '700'
          }}>
            {user?.name?.charAt(0)}
          </div>
          <div>
            <h2 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>{user?.name}</h2>
            <p style={{ margin: 0, color: '#6b7280' }}>{user?.role?.toUpperCase()}</p>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '16px' }}>
          <div style={infoRowStyle}>
            <span style={labelStyle}>Employee ID:</span>
            <span style={valueStyle}>{user?.employeeId}</span>
          </div>
          <div style={infoRowStyle}>
            <span style={labelStyle}>Email:</span>
            <span style={valueStyle}>{user?.email}</span>
          </div>
          <div style={infoRowStyle}>
            <span style={labelStyle}>Department:</span>
            <span style={valueStyle}>{user?.department}</span>
          </div>
          <div style={infoRowStyle}>
            <span style={labelStyle}>Role:</span>
            <span style={valueStyle}>{user?.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const infoRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '16px',
  background: '#f9fafb',
  borderRadius: '8px'
};

const labelStyle = {
  fontWeight: '600',
  color: '#6b7280'
};

const valueStyle = {
  fontWeight: '700',
  color: '#1f2937'
};

export default Profile;