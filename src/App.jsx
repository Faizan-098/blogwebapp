import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router } from "react-router";
import { Routes } from "react-router";
import { Route } from "react-router";
import Signup from "./pages/registeration/Signup";
import Login from "./pages/registeration/Login"
import Nopage from "./pages/Nopage";
import Dashboard from "./pages/dashboard/dashboard";
import Createblog from "./pages/dashboard/Createblog";
import MyState from "./context/MyState";
import Detailpage from "./pages/Detailpage";
import { ToastContainer } from "react-toastify";
import UserRouteProtect from "./routeprotect/UserRouteProtect";
import Updateblog from "./pages/dashboard/Updateblog";

const App = () => {
  return (
    <Router>
      <MyState>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />

        <Routes>
          {/* Auth */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* Home */}
          <Route path="/" element={<Home />} />
          {/* No Page */}
          <Route path="/*" element={<Nopage />} />
          {/* Dashboard */}
          <Route path="/dashboard" element={<UserRouteProtect><Dashboard /></UserRouteProtect>} />
          {/* Create Blog */}
          <Route path="/createblog" element={<UserRouteProtect><Createblog /></UserRouteProtect>} />
          {/* Updateblog */}
          <Route path="/updateblog" element={<UserRouteProtect><Updateblog /></UserRouteProtect>} />
          {/* DetaildBlog */}
          <Route path={"/detaild/:id"} element={<Detailpage />} />
        </Routes>
      </MyState>
    </Router>
  );
};

export default App;
