import "./App.css";
import { AfterLogin, AfterLogut } from "./Protect/Protect";
import Logout from "./component/Logout";
import Navbar from "./component/Navbar";
import "./output.css"
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Otp from "./pages/Otp";
import Post from "./pages/Post";
import PostDetails from "./pages/PostDetails";
import Signup from "./pages/Signup";
import { useParams } from "react-router-dom";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Profile from "./pages/Profile";
import Footer from "./component/Footer";
function App() {
  return (
    <div className="App">
      <Navbar />
      <div style={{minHeight:'78.9vh'}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />} />
          <Route path={`/post-details/:id`} element={<PostDetails />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/post" element={<Post />} />
          <Route path={`/post/edit-post/:id`} element={<EditPost />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
