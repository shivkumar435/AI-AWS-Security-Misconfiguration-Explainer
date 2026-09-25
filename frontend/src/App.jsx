import { Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { Dashboard } from "./pages/Dashboard";
import Findings from "./pages/Findings";
import FindingDetail from "./pages/FindingDetail";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/findings" element={<Findings />} />
        <Route path="/findings/:id" element={<FindingDetail />} />
      </Routes>
    </div>
  );
}

export default App;
