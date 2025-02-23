import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import About from "./pages/About";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Privateroutes from "./components/Privateroutes";
import Userdashboard from "./pages/user-routes/Userdashboard";
import ProfileInfo from "./pages/user-routes/ProfileInfo";
import PostPage from "./pages/PostPage";
import Categories from "./pages/Categories";
import UpdateBlog from "./pages/UpdateBlog";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/posts/:postId" element={<PostPage />} />
        <Route path="/categories/:categoryId" element={<Categories />} />

        <Route path="/user" element={<Privateroutes />}>
          <Route path="dashboard" element={<Userdashboard />} />
          <Route path="profile-info/:id" element={<ProfileInfo />} />
          <Route path="update-blog/:postId" element={<UpdateBlog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
