import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { UserProvider } from './UserContext'; // Import the UserProvider
import Navbar from "./navbar";
import Home from "./home";
// import Footer from "./footer";
import About from "./about";
import Login from "./login";
import Register from "./register";
import Admin from "./admin";
import AdminDashboard from "./adminDashboard";
import Votes from "./votes"; // Add this import
import VoterDashboard from "./voterDashboard";

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith('/admin');

  return (
    <div>
      {!hideNavbar && <Navbar />}
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />}>
            <Route path="register" element={<Register />} />
            <Route path="votes" element={<Votes />} />
          </Route>
          <Route path="/voter-dashboard" element={<VoterDashboard />}>
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <UserProvider> {/* Wrap the entire app in the UserProvider */}
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
}

export default App;