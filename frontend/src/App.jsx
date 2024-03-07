import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "../src/Pages/Signup";
import Login from "../src/Pages/Login";

import Navbar from "./components/Navbar";
import Home from "./Pages/Home";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
