export default function Skills({ skills = [], onDelete }) {
  if (!skills.length) return null;

  return (
    <div className="card bg-white border border-light-subtle shadow-sm rounded-4 p-3 mb-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-2.5 px-1">
        <h6 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
          <i className="bi bi-cpu text-primary fs-5"></i> Technical Skills
        </h6>
        <span className="badge bg-primary-subtle text-primary rounded-pill px-2.5 py-1">
          {skills.length}
        </span>
      </div>

      {/* all the skills    */}
      <div className="d-flex flex-wrap gap-2 mt-3">
        {skills.map((skill) => (
          <div
            key={skill._id}
            className="d-inline-flex align-items-center bg-light-subtle border border-light-subtle rounded-pill px-3 py-1.5 shadow-2xs hover-shadow transition"
          >
            <span className="fw-semibold text-dark small">{skill.name}</span>

            {onDelete && (
              <button
                onClick={() => onDelete(skill._id)}
                className="btn btn-link text-danger p-0 border-0 ms-2 d-flex align-items-center opacity-75 hover-opacity-100"
                title={`Delete ${skill.name}`}
              >
                <i className="bi bi-x-lg" style={{ fontSize: "0.7rem" }}></i>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
