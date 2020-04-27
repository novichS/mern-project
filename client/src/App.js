import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import "materialize-css";

function App() {
  const { token, login, logout, userId } = useAuth();
  const IsAuthenticated = !!token
  const routes = useRoutes(IsAuthenticated);

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, IsAuthenticated
    }}>
      <Router>
        <div className="container">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
