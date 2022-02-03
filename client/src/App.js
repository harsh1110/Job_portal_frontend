import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./components/LoginSystem/Registration";
import LoginPage from "./components/LoginSystem/LoginPage";
import HomePage from "./components/HomePage";
import ResponsiveDrawer from "./components/Admin/SideBar";
import Profile from "./components/Admin/Profile";
import TopSection from "./components/Admin/TopSection";
import Logout from "./components/LoginSystem/Logout";
import CreateJob from "./components/Admin/CreateJob";
import ShowAllJob from "./components/Admin/ShowAllJob";
import MemberProfile from "./components/Home/MemberProfile";
import AllJob from "./components/Home/AllJob";
import AppliedJob from "./components/Home/AppliedJob";
import ApplyJob from "./components/Home/ApplyJob";

function App() {
  return (
    <>
      {localStorage.getItem("user") ? (
        <>
          {localStorage.getItem("role") === "admin" ? (
            <BrowserRouter>
              <ResponsiveDrawer />
              <Routes>
                <Route exact path="/Profile" element={<Profile />} />
                <Route exact path="/Dashboard" element={<TopSection />} />
                <Route
                  exact
                  path="/Create%20Job%20Post"
                  element={<CreateJob />}
                />
                <Route
                  exact
                  path="/Show%20All%20Data"
                  element={<ShowAllJob />}
                />
                <Route exact path="/Log%20Out" element={<Logout />} />
              </Routes>
            </BrowserRouter>
          ) : (
            <BrowserRouter>
              <Navigation />
              <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/Profile" element={<MemberProfile />} />
                <Route exact path="/All%20Job%20List" element={<AllJob />} />
                <Route exact path="/Applied%20Job" element={<AppliedJob />} />
                <Route exact path="/job/:id" element={<ApplyJob />} />
              </Routes>
            </BrowserRouter>
          )}
        </>
      ) : (
        <>
          <Navigation />
          <BrowserRouter>
            <Routes>
              <Route exact path="/create-user" element={<Registration />} />
              <Route exact path="/login" element={<LoginPage />} />
            </Routes>
          </BrowserRouter>
        </>
      )}
    </>
  );
}

export default App;
