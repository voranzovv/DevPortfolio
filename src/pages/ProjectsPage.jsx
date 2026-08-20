import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { getProjects, deleteProject, getSkills } from "../api";
import { GitHubProfile } from "../components/GitHubProfile";
import ProjectCard from "../components/ProjectCard";
import ProjectFilter from "../components/ProjectFilter";
import EmptyProjectsState from "../components/EmptyProjectsState";
import Skills from "../components/Skills";
import ContactSection from "../components/ContactSection"; // 1. Import ContactSection

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState("All");

  useEffect(() => {
    let isMounted = true;

    async function loadPageData() {
      try {
        const [projectsData, skillsData] = await Promise.all([
          getProjects(),
          getSkills(),
        ]);

        if (isMounted) {
          setProjects(projectsData || []);
          setSkills(skillsData || []);
        }
      } catch (err) {
        console.error("Error loading portfolio data:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadPageData();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(`Error deleting project: ${err.message}`);
    }
  }

  const allTechnologies = useMemo(() => {
    const techSet = new Set(["All"]);
    projects.forEach((proj) => {
      if (proj.technologies) {
        proj.technologies.split(",").forEach((t) => techSet.add(t.trim()));
      }
    });
    return Array.from(techSet);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      const matchesSearch =
        proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.technologies.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTech =
        selectedTech === "All" ||
        proj.technologies.toLowerCase().includes(selectedTech.toLowerCase());

      return matchesSearch && matchesTech;
    });
  }, [projects, searchQuery, selectedTech]);

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center my-5 py-5">
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        ></div>
        <p className="mt-3 text-secondary fw-semibold">
          Loading your portfolio...
        </p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* 1. Header & GitHub Profile */}
      <GitHubProfile />

      {/* 2. Technical Skills */}
      <Skills skills={skills} />

      {/* 3. Projects Header & Filters */}
      <div className="bg-white border border-light-subtle rounded-4 p-4 shadow-sm my-4">
        <div className="row align-items-center g-3">
          <div className="col-md-7">
            <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-2 fw-medium mb-2">
              <i className="bi bi-folder2-open me-1"></i> Portfolio Overview
            </span>
            <h2 className="fw-bold text-dark mb-1">Featured Projects</h2>
            <p className="text-secondary small mb-0">
              Explore my software engineering projects, applications, and
              builds.
            </p>
          </div>
          <div className="col-md-5 text-md-end">
            <Link
              to="/add-project"
              className="btn btn-primary fw-bold shadow-sm rounded-3 px-4 py-2 text-nowrap"
            >
              <i className="bi bi-plus-lg me-2"></i> Add New Project
            </Link>
          </div>
        </div>

        {projects.length > 0 && (
          <ProjectFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedTech={selectedTech}
            onTechSelect={setSelectedTech}
            technologies={allTechnologies}
          />
        )}
      </div>

      {/* 4. Projects Grid */}
      {filteredProjects.length === 0 ? (
        <EmptyProjectsState
          hasFilter={Boolean(searchQuery || selectedTech !== "All")}
          onClearFilters={() => {
            setSearchQuery("");
            setSelectedTech("All");
          }}
        />
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
          {filteredProjects.map((proj) => (
            <ProjectCard
              key={proj._id}
              project={proj}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* 5. Contact Section placed at the bottom */}
      <ContactSection />
    </div>
  );
}
