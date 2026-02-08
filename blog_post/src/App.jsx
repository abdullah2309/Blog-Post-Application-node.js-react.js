import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";

const SidebarLink = ({ to, icon, label, isCollapsed }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <li className="nav-item mb-2">
      <Link 
        to={to} 
        className={`nav-link text-white py-3 px-4 d-flex align-items-center ${isActive ? "bg-primary shadow-sm rounded-start-pill" : "opacity-75"}`}
        style={{ transition: "all 0.3s" }}
      >
        <i className={`bi ${icon} fs-5 ${isCollapsed ? "" : "me-3"}`}></i>
        {!isCollapsed && <span>{label}</span>}
      </Link>
    </li>
  );
};

function App() {
  const [blogs, setBlogs] = useState([]);
  const [editBlog, setEditBlog] = useState(null);
  // State to manage sidebar toggle
  const [isCollapsed, setIsCollapsed] = useState(false);

  const fetchBlogs = async () => {
    const res = await fetch("http://localhost:5000/api/blogs");
    const data = await res.json();
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <Router>
      <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f4f7f6" }}>
        
        {/* Sidebar */}
        <aside 
          className="bg-dark text-white shadow-lg sticky-top d-flex flex-column" 
          style={{ 
            width: isCollapsed ? "80px" : "280px", 
            transition: "width 0.3s ease",
            height: "100vh" 
          }}
        >
          <div className="p-4 mb-2 d-flex align-items-center justify-content-between">
            {!isCollapsed && (
              <h4 className="fw-bold mb-0">ADMIN PRO</h4>
            )}
            <button 
              className="btn btn-dark btn-sm border-0" 
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <i className={`bi ${isCollapsed ? 'bi-list' : 'bi-arrow-left'} fs-4`}></i>
            </button>
          </div>
          
          <ul className="nav flex-column mt-4 flex-grow-1">
            <SidebarLink to="/" icon="bi-speedometer2" label="Dashboard" isCollapsed={isCollapsed} />
            <SidebarLink to="/create" icon="bi-plus-square" label="Create Blog" isCollapsed={isCollapsed} />
            <SidebarLink to="/settings" icon="bi-gear" label="Settings" isCollapsed={isCollapsed} />
          </ul>

          {!isCollapsed && (
            <div className="p-4 border-top border-secondary">
              <div className="d-flex align-items-center">
                <div className="bg-secondary rounded-circle" style={{ width: "35px", height: "35px" }}></div>
                <div className="ms-3">
                  <p className="mb-0 small fw-bold text-truncate" style={{maxWidth: "150px"}}>Abdullah</p>
                  <p className="mb-0 text-muted" style={{ fontSize: "10px" }}>Super Admin</p>
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow-1 overflow-auto">
          <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom px-4 py-3 sticky-top">
            <div className="container-fluid p-0">
              <span className="navbar-text fw-semibold text-uppercase">
                Overview / {window.location.pathname === "/" ? "Dashboard" : "Blog Manager"}
              </span>
              <div className="d-flex align-items-center">
                <button className="btn btn-light btn-sm rounded-circle me-3"><i className="bi bi-bell"></i></button>
                <button className="btn btn-primary btn-sm px-3 rounded-pill">Logout</button>
              </div>
            </div>
          </nav>

          <div className="p-4 p-lg-5">
            <div className="row g-4 mb-5">
              <StatCard title="Total Blogs" count={blogs.length} icon="bi-journal-text" color="primary" />
              <StatCard title="Total Views" count="12.4k" icon="bi-eye" color="success" />
              <StatCard title="Drafts" count="3" icon="bi-file-earmark-text" color="warning" />
            </div>

            <div className="fade-in">
              <Routes>
                <Route path="/" element={<BlogList blogs={blogs} fetchBlogs={fetchBlogs} setEditBlog={setEditBlog} />} />
                <Route path="/create" element={<BlogForm fetchBlogs={fetchBlogs} editBlog={null} setEditBlog={setEditBlog} />} />
                <Route path="/edit/:id" element={<BlogForm fetchBlogs={fetchBlogs} editBlog={editBlog} setEditBlog={setEditBlog} />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </Router>
  );
}

const StatCard = ({ title, count, icon, color }) => (
  <div className="col-md-4">
    <div className="card border-0 shadow-sm rounded-4 p-3">
      <div className="d-flex align-items-center">
        <div className={`bg-${color} bg-opacity-10 text-${color} rounded-4 p-3 me-3`}>
          <i className={`bi ${icon} fs-3`}></i>
        </div>
        <div>
          <h6 className="text-muted mb-1">{title}</h6>
          <h3 className="fw-bold mb-0">{count}</h3>
        </div>
      </div>
    </div>
  </div>
);

export default App; 