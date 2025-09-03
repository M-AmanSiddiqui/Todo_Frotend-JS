import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // ✅ Footer import kiya
import Todo from "./components/Todo";
import Home from "./pages/Home";
import SignUp from "./pages/Signup";
import SignIn from "./pages/Signin";
import React from "react";
import { useEffect } from "react";
import { authActions } from "./store";
import { useDispatch } from "react-redux";

export default function App() {

   const dispatch = useDispatch()
  useEffect(() => {
   const id = sessionStorage.getItem("id")
  if (id){
    dispatch(authActions.login())  
  }
    
  }, [])
  
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}
