import { useEffect, useState } from "react";

export function GitHubProfile({ username = "voranzovv" }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (!res.ok) throw new Error("GitHub profile not found");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Error fetching GitHub profile:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchGitHubData();
  }, [username]);

  if (loading) {
    return (
      <div className="card border-0 bg-primary-subtle rounded-4 p-4 mb-4 text-center">
        <div
          className="spinner-border spinner-border-sm text-primary me-2"
          role="status"
        ></div>
        <span className="text-primary fw-medium small">
          Connecting to GitHub...
        </span>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="card border-0 bg-dark text-white rounded-4 shadow-sm mb-4 overflow-hidden position-relative">
      {/* Decorative Gradient Background Accent */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100 opacity-25"
        style={{
          background: "linear-gradient(135deg, #0d6efd 0%, #6610f2 100%)",
          pointerEvents: "none",
        }}
      ></div>

      <div className="card-body p-4 position-relative z-1">
        <div className="row align-items-center g-3">
          {/* Avatar Column */}
          <div className="col-auto">
            <img
              src={profile.avatar_url}
              alt={`${profile.name || username}'s GitHub Avatar`}
              className="rounded-circle border border-2 border-white shadow-sm"
              style={{ width: "72px", height: "72px", objectFit: "cover" }}
            />
          </div>

          {/* User Information */}
          <div className="col">
            <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
              <h4 className="fw-bold text-white mb-0">
                {profile.name || username}
              </h4>
              <span className="badge bg-secondary-subtle text-dark-emphasis rounded-pill small">
                @{profile.login}
              </span>
            </div>
            <p
              className="text-light-50 small mb-2 text-truncate"
              style={{ maxWidth: "500px" }}
            >
              {profile.bio || "Software Developer & Open Source Contributor"}
            </p>

            {/* GitHub Stats Badges */}
            <div className="d-flex flex-wrap gap-2 align-items-center">
              <span className="badge bg-white bg-opacity-10 text-white border border-white-50 rounded-pill px-3 py-1">
                <i className="bi bi-journal-code me-1 text-info"></i>{" "}
                {profile.public_repos} Repos
              </span>
              <span className="badge bg-white bg-opacity-10 text-white border border-white-50 rounded-pill px-3 py-1">
                <i className="bi bi-people me-1 text-warning"></i>{" "}
                {profile.followers} Followers
              </span>
              {profile.location && (
                <span className="badge bg-white bg-opacity-10 text-white border border-white-50 rounded-pill px-3 py-1">
                  <i className="bi bg-opacity-10 bi-geo-alt me-1 text-danger"></i>{" "}
                  {profile.location}
                </span>
              )}
            </div>
          </div>

          {/* Direct GitHub Profile Link */}
          <div className="col-md-auto text-md-end mt-3 mt-md-0">
            <a
              href={profile.html_url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-light btn-sm rounded-3 px-3 py-2 fw-semibold"
            >
              <i className="bi bi-github me-1"></i> View GitHub Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
