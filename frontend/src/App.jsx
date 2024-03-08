import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "../src/Pages/Signup";
import Login from "../src/Pages/Login";
import { useAuthContext } from "../src/hooks/useAuthContext";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Header from "./components/Header";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="">
      <BrowserRouter>
        <Header />
        {/* <Navbar /> */}
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <Signup />}
          />
          <Route
            path="/*"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
