import { useContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  //TODO сделать контекст user и доставать его оттуда
  const currentUser = useContext(AuthContext);
  // const [currentUser, setCurrentUser] = useState(true);
  console.log(currentUser);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to={"/login"} />;
    }
    return children;
  };

  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" />
        <Route
          index
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="register" element={<SignUp />} />
        <Route path="login" element={<SignIn />} />
        <Route />
      </Routes>
    </div>
  );
}

export default App;
