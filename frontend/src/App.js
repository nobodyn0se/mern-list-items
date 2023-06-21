import { BrowserRouter as Router, Route, Link, Routes, Navigate } from "react-router-dom";

import LoginPage from "./pages/Login";
import ListItems from "./pages/ListItems";
import "./App.css";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<ListItems />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
