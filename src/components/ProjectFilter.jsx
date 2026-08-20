export default function ProjectFilter({
  searchQuery,
  onSearchChange,
  selectedTech,
  onTechSelect,
  technologies,
}) {
  return (
    <div className="row g-3 mt-3 pt-3 border-top border-light-subtle align-items-center">
      {/* Search Input */}
      <div className="col-md-6 col-lg-5">
        <div className="input-group">
          <span className="input-group-text bg-light border-light-subtle text-secondary">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control bg-light border-light-subtle text-dark"
            placeholder="Search projects or tools..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      {/* Tech Filter Pills */}
      <div className="col-md-6 col-lg-7 d-flex flex-wrap gap-2 align-items-center justify-content-md-end">
        <span className="text-muted small fw-semibold me-1 d-none d-lg-inline">
          Filter:
        </span>
        {technologies.slice(0, 6).map((tech) => (
          <button
            key={tech}
            onClick={() => onTechSelect(tech)}
            className={`btn btn-sm rounded-pill px-3 fw-medium transition ${
              selectedTech === tech
                ? "btn-primary shadow-sm"
                : "btn-light border border-light-subtle text-secondary"
            }`}
          >
            {tech}
          </button>
        ))}
      </div>
    </div>
  );
}
