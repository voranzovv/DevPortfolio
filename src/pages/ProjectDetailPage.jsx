import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProjectById } from "../api";
import { getProjectImage } from "../utils/imageUtils";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getProjectById(id);
        setProject(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center my-5 py-5">
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        ></div>
        <p className="mt-3 text-secondary fw-semibold">
          Loading project details...
        </p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container py-5">
        <div
          className="card bg-white border border-light-subtle shadow-sm rounded-4 p-5 text-center mx-auto"
          style={{ maxWidth: "500px" }}
        >
          <i className="bi bi-exclamation-circle text-warning fs-1 mb-3"></i>
          <h4 className="fw-bold text-dark">Project Not Found</h4>
          <p className="text-secondary small mb-4">
            The project you are looking for does not exist or has been removed.
          </p>
          <Link
            to="/projects"
            className="btn btn-primary rounded-3 fw-semibold"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const heroImageUrl = getProjectImage(project, 1200);

  return (
    <div className="container py-4">
      <div className="mx-auto" style={{ maxWidth: "850px" }}>
        <Link
          to="/projects"
          className="btn btn-link text-primary text-decoration-none mb-3 p-0 fw-semibold d-inline-flex align-items-center"
        >
          <i className="bi bi-arrow-left me-2 fs-5"></i> Back to Projects
        </Link>

        <div className="card bg-white border border-light-subtle shadow-sm rounded-4 overflow-hidden">
          <div
            className="position-relative bg-light"
            style={{ height: "320px", overflow: "hidden" }}
          >
            <img
              src={heroImageUrl}
              alt={project.title}
              className="w-100 h-100 object-fit-cover"
              onError={(e) => {
                e.target.src =
                  "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1200";
              }}
            />
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noreferrer"
                className="badge bg-primary text-white position-absolute top-0 end-0 m-3 px-3 py-2 text-decoration-none shadow-sm rounded-pill fw-medium"
              >
                <i className="bi bi-box-arrow-up-right me-1"></i> Live Demo
                Available
              </a>
            )}
          </div>

          <div className="p-4 p-md-5">
            <h2 className="card-title fw-bold text-dark mb-3 fs-2">
              {project.title}
            </h2>
            <p className="card-text text-secondary fs-5 mb-4 lh-base">
              {project.description}
            </p>

            <div className="mb-4 pt-2">
              <h6 className="text-dark fw-bold mb-3 text-uppercase small tracking-wide">
                Technologies Used
              </h6>
              <div className="d-flex flex-wrap gap-2">
                {project.technologies.split(",").map((tech, idx) => (
                  <span
                    key={idx}
                    className="badge bg-primary-subtle text-primary border border-primary-subtle fs-6 fw-medium px-3 py-2 rounded-pill"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </div>

            <div className="d-flex flex-wrap gap-3 mt-4 pt-4 border-top border-light-subtle">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary fw-bold rounded-3 py-2 px-4 shadow-sm d-inline-flex align-items-center"
                >
                  Visit Live Project{" "}
                  <i className="bi bi-box-arrow-up-right ms-2"></i>
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-dark fw-semibold rounded-3 py-2 px-4 shadow-sm d-inline-flex align-items-center"
                >
                  <i className="bi bi-github me-2 fs-5"></i> View Source Code
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
