import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createProject } from "../api";

export default function AddProjectPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    githubLink: "",
    liveLink: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProject(formData);
      navigate("/projects");
    } catch (err) {
      console.error("Project Creation Error:", err.message);
      alert(`Failed to add project: ${err.message}`);
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <Link
            to="/projects"
            className="btn btn-link text-primary text-decoration-none mb-3 p-0 fw-semibold"
          >
            <i className="bi bi-arrow-left me-1"></i> Back to Projects
          </Link>

          <div className="card bg-white border border-light-subtle shadow-sm rounded-4 p-4">
            <h2 className="fw-bold text-dark mb-4 border-bottom border-light-subtle pb-3">
              Add New Project
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-dark fw-semibold small">
                  Project Title <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter project title"
                  className="form-control bg-light-subtle border-light-subtle text-dark py-2"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-dark fw-semibold small">
                  Description <span className="text-danger">*</span>
                </label>
                <textarea
                  placeholder="Enter project description"
                  className="form-control bg-light-subtle border-light-subtle text-dark py-2"
                  rows="4"
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label text-dark fw-semibold small">
                  Technologies <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  placeholder="HTML, CSS, JavaScript, Node.js"
                  className="form-control bg-light-subtle border-light-subtle text-dark py-2"
                  required
                  value={formData.technologies}
                  onChange={(e) =>
                    setFormData({ ...formData, technologies: e.target.value })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-dark fw-semibold small">
                  GitHub Link <span className="text-danger">*</span>
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/username/project"
                  className="form-control bg-light-subtle border-light-subtle text-dark py-2"
                  required
                  value={formData.githubLink}
                  onChange={(e) =>
                    setFormData({ ...formData, githubLink: e.target.value })
                  }
                />
              </div>

              <div className="mb-4">
                <label className="form-label text-dark fw-semibold small">
                  Live Demo Link
                </label>
                <input
                  type="url"
                  placeholder="https://yourproject.com"
                  className="form-control bg-light-subtle border-light-subtle text-dark py-2"
                  value={formData.liveLink}
                  onChange={(e) =>
                    setFormData({ ...formData, liveLink: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary fw-bold w-100 py-2 rounded-3 shadow-sm"
              >
                <i className="bi bi-plus-circle me-1"></i> Add Project
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
