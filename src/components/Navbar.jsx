import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm border-bottom border-white border-opacity-10 overflow-hidden position-fixed w-100 top-0 start-0 z-3">
      {/* Matching Gradient Background Accent */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100 opacity-25"
        style={{
          background: "linear-gradient(135deg, #0d6efd 0%, #6610f2 100%)",
          pointerEvents: "none",
        }}
      ></div>

      <div className="container position-relative z-1">
        <Link
          className="navbar-brand fw-bold text-white fs-4 d-inline-flex align-items-center gap-2"
          to="/"
        >
          <span className="badge bg-primary rounded-circle p-2 d-inline-flex align-items-center justify-center">
            <i className="bi bi-code-slash text-white fs-6"></i>
          </span>
          <span>DevPortfolio</span>
        </Link>

        <button
          className="navbar-toggler border-white border-opacity-25"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-2 align-items-lg-center mt-3 mt-lg-0">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link fw-medium px-3 py-1 rounded-pill transition ${
                    isActive
                      ? "bg-white bg-opacity-25 text-white active fw-semibold"
                      : "text-white-50 hover-text-white"
                  }`
                }
                to="/projects"
              >
                Projects
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link fw-medium px-3 py-1 rounded-pill transition ${
                    isActive
                      ? "bg-white bg-opacity-25 text-white active fw-semibold"
                      : "text-white-50 hover-text-white"
                  }`
                }
                to="/skills"
              >
                Skills
              </NavLink>
            </li>

            <li className="nav-item ms-lg-2">
              <NavLink
                className={({ isActive }) =>
                  `btn btn-sm rounded-3 px-3 py-2 fw-semibold d-inline-flex align-items-center transition ${
                    isActive
                      ? "btn-primary text-white shadow-sm"
                      : "btn-outline-light"
                  }`
                }
                to="/add-project"
              >
                <i className="bi bi-plus-circle me-1"></i> Add Project
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
