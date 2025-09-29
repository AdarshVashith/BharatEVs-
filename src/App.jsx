import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServiceOptionsPage from './pages/ServiceOptionsPage';
import BatteryRepairPage from './pages/BatteryRepairPage';
import VehicleRepairPage from './pages/VehicleRepairPage';
import BatteryServicePage from './pages/BatteryServicePage';
import VehicleServicePage from './pages/VehicleServicePage';
import ContactPage from './pages/ContactPage';
import JoinUsPage from './pages/JoinUsPage';
import SignInPage from './pages/SignInPage';
import CustomerDashboard from './pages/CustomerDashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServiceOptionsPage />} />
            <Route path="/battery-repair" element={<BatteryRepairPage />} />
            <Route path="/vehicle-repair" element={<VehicleRepairPage />} />
            <Route path="/battery-service" element={<BatteryServicePage />} />
            <Route path="/vehicle-service" element={<VehicleServicePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/join-us" element={<JoinUsPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
            <Route path="/provider-dashboard" element={<ProviderDashboard />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;