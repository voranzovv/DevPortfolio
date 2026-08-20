import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProjectsPage from "./pages/ProjectsPage";
import SkillsPage from "./pages/SkillsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import AddProjectPage from "./pages/AddProjectPage";

export default function App() {
  return (
    <Router>
      <Navbar />

      <main className="pt-5 mt-3">
        <Routes>
          <Route path="/" element={<ProjectsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/add-project" element={<AddProjectPage />} />
        </Routes>
      </main>
    </Router>
  );
}
