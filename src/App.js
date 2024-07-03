import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Contacts from './Contacts';
import { AuthProvider, useAuth } from './AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
  const { state } = useAuth();
  return state.token ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/contacts" element={<PrivateRoute element={<Contacts />} />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
