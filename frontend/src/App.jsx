import { useState } from "react";
import { Routes, Route } from "react-router";
import { useAuthContext } from "./context/AuthContext.jsx";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Mainlayout from "./components/Mainlayout.jsx";
import Dashboard from "./components/Dashboard.jsx";
import NewApplication from "./components/NewApplication.jsx";
import { ToastContainer } from "react-toastify";
import Applications from "./components/Applications.jsx";

function App() {
  const { authUser } = useAuthContext();

  return (
    <div className="root">
      <Routes>
        <Route path="/" element={authUser ? <Mainlayout /> : <SignIn />}>
          <Route path="/" element={<NewApplication />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/applications/new" element={<NewApplication />} />
          <Route path="/profile" element={<Dashboard />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
