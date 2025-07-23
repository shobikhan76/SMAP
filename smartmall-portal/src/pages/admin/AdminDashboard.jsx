import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaStore,
  FaUserPlus,
  FaClipboardList,
  FaChartLine,
  FaClipboardCheck,
} from "react-icons/fa";

const dashboardOptions = [
  {
    title: "Register Store Manager",
    icon: <FaUserPlus size={30} className="text-primary" />,
    path: "/admin/users",
    bg: "bg-white",
  },
  {
    title: "Manage Stores",
    icon: <FaStore size={30} className="text-success" />,
    path: "/admin/stores",
    bg: "bg-white",
  },
  {
    title: "Monitor Walk-In Logs",
    icon: <FaClipboardList size={30} className="text-info" />,
    path: "/admin/walkins",
    bg: "bg-white",
  },
  {
    title: "View Telco Trends",
    icon: <FaChartLine size={30} className="text-warning" />,
    path: "/admin/telco-trends",
    bg: "bg-white",
  },
  {
    title: "Recommendations",
    icon: <FaClipboardCheck size={30} className="text-danger" />,
    path: "/admin/recommendations",
    bg: "bg-white",
  },
];

const AdminDashboard = () => {
  return (
    <div className="p-4">
     <h2 className="text-center fw-bold mb-5 mt-3 display-5 text-primary">
  Admin Dashboard
</h2>
      <Row xs={1} sm={2} md={3} className="g-4">
        {dashboardOptions.map((item, idx) => (
          <Col key={idx}>
            <Link to={item.path} className="text-decoration-none">
              <Card
                className={`shadow-lg border-0 ${item.bg} h-100 transition hover-scale`}
                style={{ borderRadius: "16px" }}
              >
                <Card.Body className="text-center">
                  <div className="mb-3">{item.icon}</div>
                  <Card.Title className="text-dark fw-semibold">
                    {item.title}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AdminDashboard;
