import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignUpPage'
import PreferencesPage from './pages/PreferencesPage';
import AdminDashboard from './pages/AdminDashboard';
import MyEvents from './pages/MyEvents';
import RsvpPage from './pages/RsvpPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/rsvp" element={<RsvpPage />} />
        <Route path="/preferences" element={<PreferencesPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App