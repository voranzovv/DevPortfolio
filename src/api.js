const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Helper to safely parse JSON or fallback to status check
const parseResponse = async (res) => {
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  }
  return { success: res.ok };
};

// --- PROJECTS API ---

export const getProjects = async () => {
  const res = await fetch(`${API_BASE}/api/projects`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
};

export const getProjectById = async (id) => {
  const res = await fetch(`${API_BASE}/api/projects/${id}`);
  if (!res.ok) {
    const allProjects = await getProjects();
    const found = allProjects.find((p) => p._id === id);
    if (found) return found;
    throw new Error("Project not found");
  }
  return res.json();
};

export const createProject = async (projectData) => {
  const res = await fetch(`${API_BASE}/api/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(projectData),
  });

  if (!res.ok) {
    const errorData = await parseResponse(res);
    throw new Error(errorData?.message || `Server error: ${res.status}`);
  }

  return parseResponse(res);
};

export const deleteProject = async (id) => {
  const res = await fetch(`${API_BASE}/api/projects/${id}/delete`, {
    method: "POST",
  });

  if (!res.ok) throw new Error(`Server returned status ${res.status}`);
  return parseResponse(res);
};

// --- SKILLS API ---

export const getSkills = async () => {
  const res = await fetch(`${API_BASE}/api/skills`);
  if (!res.ok) throw new Error("Failed to fetch skills");
  return res.json();
};

export const createSkill = async (skillData) => {
  const res = await fetch(`${API_BASE}/api/skills`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(skillData),
  });

  if (!res.ok) {
    const errorData = await parseResponse(res);
    throw new Error(errorData?.message || `Server error: ${res.status}`);
  }

  return parseResponse(res);
};

export const deleteSkill = async (id) => {
  const res = await fetch(`${API_BASE}/api/skills/${id}/delete`, {
    method: "POST",
  });

  if (!res.ok) throw new Error(`Server returned status ${res.status}`);
  return parseResponse(res);
};

// --- GITHUB API ---

export const getGitHubDetails = async (username) => {
  const res = await fetch(`https://api.github.com/users/${username}`);
  if (!res.ok) throw new Error("Failed to fetch GitHub profile");
  return res.json();
};

export const getGitHubRepos = async (username) => {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
  );
  if (!res.ok) throw new Error("Failed to fetch GitHub repositories");
  return res.json();
};
