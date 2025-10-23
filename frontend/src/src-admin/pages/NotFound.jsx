import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/Dashboard";
// other imports...

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* other routes */}
        <Route path="*" element={<NotFound />} /> {/* catches all unknown routes */}
      </Routes>
    </Router>
  );
}

export default App;

