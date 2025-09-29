import React from 'react';
import { 
  Users, 
  Wrench, 
  Clock, 
  Calendar, 
  FileText, 
  Settings, 
  Bell,
  DollarSign,
  BarChart,
  CheckCircle
} from 'lucide-react';
import './Dashboard.css';

const ProviderDashboard = () => {
  const serviceRequests = [
    {
      id: 'SR001',
      customerName: 'Rahul Kumar',
      type: 'Battery Repair',
      status: 'Pending',
      date: '2024-02-15',
      vehicle: 'Ather 450X'
    },
    {
      id: 'SR002',
      customerName: 'Priya Singh',
      type: 'Vehicle Service',
      status: 'In Progress',
      date: '2024-02-16',
      vehicle: 'Mahindra Treo'
    }
  ];

  const statistics = {
    totalRequests: 150,
    completedServices: 142,
    activeRequests: 8,
    totalEarnings: '₹45,000'
  };

  return (
    <div className="dashboard provider-dashboard">
      <div className="dashboard-header">
        <div className="container">
          <h1>Service Provider Dashboard</h1>
          <div className="quick-actions">
            <button className="quick-action-btn">
              <Wrench size={20} />
              New Service
            </button>
            <button className="quick-action-btn">
              <Users size={20} />
              Team
            </button>
            <button className="notification-btn">
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-content container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <FileText size={24} />
            </div>
            <div className="stat-details">
              <h3>Total Requests</h3>
              <p>{statistics.totalRequests}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <CheckCircle size={24} />
            </div>
            <div className="stat-details">
              <h3>Completed</h3>
              <p>{statistics.completedServices}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Clock size={24} />
            </div>
            <div className="stat-details">
              <h3>Active</h3>
              <p>{statistics.activeRequests}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <DollarSign size={24} />
            </div>
            <div className="stat-details">
              <h3>Earnings</h3>
              <p>{statistics.totalEarnings}</p>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card service-requests">
            <h2>Recent Service Requests</h2>
            <div className="request-list">
              {serviceRequests.map(request => (
                <div key={request.id} className="request-item">
                  <div className="request-details">
                    <h3>{request.customerName}</h3>
                    <p>{request.vehicle} - {request.type}</p>
                    <div className="request-meta">
                      <span className={`status ${request.status.toLowerCase().replace(' ', '-')}`}>
                        {request.status}
                      </span>
                      <span className="date">
                        <Calendar size={14} />
                        {request.date}
                      </span>
                    </div>
                  </div>
                  <div className="request-actions">
                    <button className="action-btn">View Details</button>
                    <button className="action-btn">Update Status</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-card performance">
            <h2>Performance Metrics</h2>
            <div className="metrics-grid">
              <div className="metric-item">
                <h4>Response Time</h4>
                <p>Average: 2.5 hours</p>
                <div className="progress-bar">
                  <div className="progress" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="metric-item">
                <h4>Customer Satisfaction</h4>
                <p>Rating: 4.8/5</p>
                <div className="progress-bar">
                  <div className="progress" style={{ width: '96%' }}></div>
                </div>
              </div>
              <div className="metric-item">
                <h4>Completion Rate</h4>
                <p>94.6%</p>
                <div className="progress-bar">
                  <div className="progress" style={{ width: '94.6%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card earnings">
            <h2>Earnings Overview</h2>
            <div className="earnings-chart">
              <BarChart size={24} />
              {/* Add your chart component here */}
            </div>
            <div className="earnings-summary">
              <div className="summary-item">
                <h4>This Month</h4>
                <p>₹15,000</p>
              </div>
              <div className="summary-item">
                <h4>Last Month</h4>
                <p>₹12,500</p>
              </div>
              <div className="summary-item">
                <h4>Pending</h4>
                <p>₹3,500</p>
              </div>
            </div>
          </div>

          <div className="dashboard-card quick-links">
            <h2>Quick Links</h2>
            <div className="links-grid">
              <button className="quick-link">
                <Users size={24} />
                Team Management
              </button>
              <button className="quick-link">
                <Settings size={24} />
                Settings
              </button>
              <button className="quick-link">
                <FileText size={24} />
                Reports
              </button>
              <button className="quick-link">
                <Wrench size={24} />
                Resources
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;