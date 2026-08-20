import { Link } from "react-router-dom";

export default function EmptyProjectsState({ hasFilter, onClearFilters }) {
  return (
    <div className="text-center py-5 bg-white rounded-4 border border-light-subtle shadow-sm my-4">
      <i className="bi bi-slash-circle fs-1 text-muted d-block mb-2"></i>
      <h5 className="text-dark fw-bold">No Matching Projects</h5>
      <p className="text-secondary small mb-3">
        {hasFilter
          ? "Try adjusting your search criteria or active filters."
          : "Get started by adding your first project to your portfolio."}
      </p>
      {hasFilter && (
        <button
          onClick={onClearFilters}
          className="btn btn-outline-secondary btn-sm rounded-3 me-2"
        >
          Clear Filters
        </button>
      )}
      <Link to="/add-project" className="btn btn-primary btn-sm rounded-3">
        Add Project
      </Link>
    </div>
  );
}
