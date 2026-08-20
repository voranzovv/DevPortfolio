import { Link } from "react-router-dom";
import { getProjectImage } from "../utils/imageUtils";

export default function ProjectCard({ project, onDelete }) {
  const projectImageUrl = getProjectImage(project, 800);

  return (
    <div className="col">
      <div className="card h-100 bg-white border border-light-subtle rounded-4 shadow-sm hover-shadow transition overflow-hidden">
        <div
          className="position-relative bg-light"
          style={{ height: "160px", overflow: "hidden" }}
        >
          <img
            src={projectImageUrl}
            alt={`${project.title} preview`}
            className="w-100 h-100 object-fit-cover"
            onError={(e) => {
              e.target.src =
                "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800";
            }}
          />
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              className="badge bg-primary text-white position-absolute top-0 end-0 m-3 p-2 text-decoration-none shadow-sm"
              title="Live Demo"
            >
              <i className="bi bi-box-arrow-up-right me-1"></i> Live Demo
            </a>
          )}
        </div>

        <div className="card-body p-3 d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title fw-bold text-dark mb-2 text-truncate">
              {project.title}
            </h5>
            <p
              className="card-text text-secondary small mb-3 lh-sm"
              style={{ minHeight: "2.6rem" }}
            >
              {project.description.length > 100
                ? `${project.description.substring(0, 100)}...`
                : project.description}
            </p>
          </div>

          <div>
            <div className="mb-3 d-flex flex-wrap gap-1">
              {project.technologies.split(",").map((tech, idx) => (
                <span
                  key={idx}
                  className="badge bg-primary-subtle text-primary border border-primary-subtle fw-medium px-2 py-1 rounded-pill"
                  style={{ fontSize: "0.725rem" }}
                >
                  {tech.trim()}
                </span>
              ))}
            </div>

            <div className="d-flex gap-2 pt-3 border-top border-light-subtle align-items-center">
              <Link
                to={`/projects/${project._id}`}
                className="btn btn-primary btn-sm flex-grow-1 fw-semibold rounded-3 py-2"
              >
                <i className="bi bi-eye me-1"></i> View Details
              </Link>
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-dark btn-sm rounded-3 py-2 px-3"
                  title="GitHub Repository"
                >
                  <i className="bi bi-github"></i>
                </a>
              )}
              <button
                onClick={() => onDelete(project._id)}
                className="btn btn-outline-danger btn-sm rounded-3 py-2 px-3"
                title="Delete project"
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
