import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./components/LoginSystem/Registration";
import LoginPage from "./components/LoginSystem/LoginPage";
import ResponsiveDrawer from "./components/Admin/SideBar";
import Profile from "./components/Admin/Profile";
import TopSection from "./components/Admin/TopSection";
import Logout from "./components/LoginSystem/Logout";
import CreateJob from "./components/Admin/CreateJob";
import ShowAllJob from "./components/Admin/ShowAllJob";
import JobApplyForm from "./components/Home/JobApplyForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JobDetails from "./components/Admin/JobDetails";


function App() {
  return (
    <>
      {localStorage.getItem("user") ? (
        //Admin Routes
        <>
          <ToastContainer />
          <BrowserRouter>
            <ResponsiveDrawer />
            <Routes>
              <Route exact path="/Profile" element={<Profile />} />
              <Route exact path="/Dashboard" element={<TopSection />} />
              <Route exact path="/Create%20Job%20Post" element={<CreateJob />} />
              <Route exact path="/Show%20All%20Data" element={<ShowAllJob />} />
              <Route exact path="/jobdetails/:id" element={<JobDetails />} />
              <Route exact path="/Log%20Out" element={<Logout />} />
            </Routes>
          </BrowserRouter>
        </>
      ) : (
        // job seeker routes
        <>
          <BrowserRouter>
            <Routes>
              <Route exact path="/create-user" element={<Registration />} />
              <Route exact path="/login" element={<LoginPage />} />
              <Route exact path="/job/:id" element={<JobApplyForm />} />
              <Route exact path="/thankyou" element={<h1>Thank You</h1>} />
            </Routes>
          </BrowserRouter>
        </>
      )}
    </>
  );
}

export default App;
