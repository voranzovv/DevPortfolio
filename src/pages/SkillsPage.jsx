import { useEffect, useState } from "react";
import { getSkills, createSkill, deleteSkill } from "../api";

export default function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadSkills() {
      try {
        const data = await getSkills();
        if (isMounted) setSkills(data);
      } catch (err) {
        console.error("Error loading skills:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadSkills();
    return () => {
      isMounted = false;
    };
  }, []);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!formData.name.trim() || !formData.description.trim()) return;

    setSubmitting(true);
    try {
      const newSkill = await createSkill(formData);
      setSkills((prev) => [...prev, newSkill]);
      setFormData({ name: "", description: "" });
    } catch (err) {
      alert(`Failed to add skill: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this skill?")) return;

    const previousSkills = skills;
    setSkills((prev) => prev.filter((s) => s._id !== id));

    try {
      await deleteSkill(id);
    } catch (err) {
      alert(`Error deleting skill: ${err.message}`);
      setSkills(previousSkills);
    }
  }

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="border-bottom border-light-subtle pb-3 mb-4">
        <h2 className="fw-bold text-dark mb-1">Skills</h2>
        <p className="text-secondary small mb-0">
          Manage your technical skills and competencies
        </p>
      </div>

      {/* Add Skill Form */}
      <div className="card bg-white border border-light-subtle shadow-sm rounded-4 p-3 mb-4">
        <form onSubmit={handleAdd} className="row g-2">
          <div className="col-md-4">
            <input
              type="text"
              name="name"
              placeholder="Skill Name (e.g. JavaScript) *"
              className="form-control bg-light-subtle border-light-subtle text-dark py-2"
              required
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="description"
              placeholder="Description *"
              className="form-control bg-light-subtle border-light-subtle text-dark py-2"
              required
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-2">
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary fw-bold w-100 py-2 rounded-3 shadow-sm"
            >
              {submitting ? "Adding..." : "Add Skill"}
            </button>
          </div>
        </form>
      </div>

      {/* Loading & Empty States */}
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted fw-semibold">Loading skills...</p>
        </div>
      ) : skills.length === 0 ? (
        <div className="text-center py-5 bg-white rounded-4 border border-light-subtle shadow-sm">
          <i className="bi bi-award fs-1 text-muted d-block mb-2"></i>
          <h5 className="text-dark fw-bold">No Skills Found</h5>
          <p className="text-secondary small mb-0">
            Add your technical skills using the form above.
          </p>
        </div>
      ) : (
        /* Skills Display Grid */
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
          {skills.map((skill) => (
            <div key={skill._id} className="col">
              <div className="card bg-white border border-light-subtle shadow-sm rounded-4 h-100 p-3 hover-shadow transition">
                <div className="card-body p-0 d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title fw-bold text-dark mb-2">
                      {skill.name}
                    </h5>
                    <p className="card-text text-secondary small mb-3">
                      {skill.description}
                    </p>
                  </div>
                  <div className="text-end pt-2 border-top border-light-subtle">
                    <button
                      onClick={() => handleDelete(skill._id)}
                      className="btn btn-outline-danger btn-sm rounded-3"
                    >
                      <i className="bi bi-trash me-1"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
