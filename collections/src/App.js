import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth } from "./pages/auth/index";
import { Collections } from "./pages/collections-manager/index";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/collections" element={<Collections />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
