import { useState } from "react";
import { Routes, Route } from "react-router";
import { useAuthContext } from "./context/AuthContext.jsx";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import Sidebar from "./components/Sidebar.jsx";

function App() {
  const { authUser } = useAuthContext();

  return (
    <div className="root">
      <Routes>
        <Route
          path="/dashboard"
          element={authUser ? <Sidebar /> : <SignIn />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
