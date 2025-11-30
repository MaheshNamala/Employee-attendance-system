// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './store/store';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';

// Employee Pages
import EmployeeDashboard from './pages/employee/Dashboard';
import MarkAttendance from './pages/employee/MarkAttendance';
import MyHistory from './pages/employee/MyHistory';
import Profile from './pages/employee/Profile';

// Manager Pages
import ManagerDashboard from './pages/manager/Dashboard';
import AllAttendance from './pages/manager/AllAttendance';
import TeamCalendar from './pages/manager/TeamCalendar';
import Reports from './pages/manager/Reports';

// Components
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Employee Routes */}
          <Route path="/employee" element={
            <PrivateRoute role="employee">
              <Layout />
            </PrivateRoute>
          }>
            <Route index element={<Navigate to="/employee/dashboard" />} />
            <Route path="dashboard" element={<EmployeeDashboard />} />
            <Route path="mark-attendance" element={<MarkAttendance />} />
            <Route path="history" element={<MyHistory />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Manager Routes */}
          <Route path="/manager" element={
            <PrivateRoute role="manager">
              <Layout />
            </PrivateRoute>
          }>
            <Route index element={<Navigate to="/manager/dashboard" />} />
            <Route path="dashboard" element={<ManagerDashboard />} />
            <Route path="attendance" element={<AllAttendance />} />
            <Route path="calendar" element={<TeamCalendar />} />
            <Route path="reports" element={<Reports />} />
          </Route>

          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;