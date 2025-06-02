import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  Calendar, 
  FileText, 
  Settings, 
  Bell, 
  Battery, 
  Car,
  AlertCircle
} from 'lucide-react';
import './Dashboard.css';

const CustomerDashboard = () => {
  const serviceRequests = [
    {
      id: 'SR001',
      type: 'Battery Repair',
      status: 'In Progress',
      date: '2024-02-15',
      description: 'Battery not charging properly'
    },
    {
      id: 'SR002',
      type: 'Vehicle Service',
      status: 'Scheduled',
      date: '2024-02-20',
      description: 'Regular maintenance'
    }
  ];

  const vehicles = [
    {
      id: 'V001',
      type: '2-Wheeler',
      model: 'Ather 450X',
      regNumber: 'DL01AB1234'
    },
    {
      id: 'V002',
      type: '3-Wheeler',
      model: 'Mahindra Treo',
      regNumber: 'DL01CD5678'
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="container">
          <h1>Welcome back, User!</h1>
          <div className="quick-actions">
            <Link to="/battery-repair" className="quick-action-btn">
              <Battery size={20} />
              Battery Service
            </Link>
            <Link to="/vehicle-repair" className="quick-action-btn">
              <Car size={20} />
              Vehicle Service
            </Link>
            <button className="notification-btn">
              <Bell size={20} />
              <span className="notification-badge">2</span>
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-content container">
        <div className="dashboard-grid">
          <div className="dashboard-card service-requests">
            <h2>Recent Service Requests</h2>
            <div className="request-list">
              {serviceRequests.map(request => (
                <div key={request.id} className="request-item">
                  <div className="request-icon">
                    {request.type.includes('Battery') ? <Battery size={24} /> : <Car size={24} />}
                  </div>
                  <div className="request-details">
                    <h3>{request.type}</h3>
                    <p>{request.description}</p>
                    <div className="request-meta">
                      <span className={`status ${request.status.toLowerCase()}`}>
                        {request.status}
                      </span>
                      <span className="date">
                        <Calendar size={14} />
                        {request.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/services" className="view-all">View All Requests</Link>
          </div>

          <div className="dashboard-card vehicles">
            <h2>My Vehicles</h2>
            <div className="vehicle-list">
              {vehicles.map(vehicle => (
                <div key={vehicle.id} className="vehicle-item">
                  <div className="vehicle-icon">
                    {vehicle.type === '2-Wheeler' ? 
                      <Car size={24} /> : 
                      <Car size={24} />
                    }
                  </div>
                  <div className="vehicle-details">
                    <h3>{vehicle.model}</h3>
                    <p>{vehicle.regNumber}</p>
                    <button className="service-history-btn">
                      <Clock size={14} />
                      Service History
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="add-vehicle-btn">+ Add New Vehicle</button>
          </div>

          <div className="dashboard-card upcoming">
            <h2>Upcoming Services</h2>
            <div className="upcoming-list">
              <div className="upcoming-item">
                <div className="upcoming-icon">
                  <AlertCircle size={24} />
                </div>
                <div className="upcoming-details">
                  <h3>Battery Check Due</h3>
                  <p>Ather 450X</p>
                  <button className="schedule-btn">Schedule Now</button>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card quick-links">
            <h2>Quick Links</h2>
            <div className="links-grid">
              <Link to="/services" className="quick-link">
                <FileText size={24} />
                Service History
              </Link>
              <Link to="/profile" className="quick-link">
                <Settings size={24} />
                Settings
              </Link>
              <Link to="/support" className="quick-link">
                <Bell size={24} />
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;