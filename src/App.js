import React, { useContext } from "react";
import { Outlet, Route, Routes, Navigate, useLocation } from "react-router-dom";
import CreatePoll from "./component/CreatePoll";
import ListOfPolls from "./component/ListOfPolls";
import Home from "./Pages/Home";
import Nav from "./Pages/Nav";
import UserPages from "./component/UserPage";
import Button from "./component/Button";
import axios from "axios";
import { AuthContext } from "./context/AuthContex";

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <Nav />}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/polls" replace /> : <Home />
          }
        />
        <Route path="/polls" element={<PrivateRoute />}>
          <Route
            index
            element={
              <>
                <CreatePoll />
                <ListOfPolls />
              </>
            }
          />
        </Route>
        <Route path="/user" element={<UserLayout />} />
      </Routes>
    </>
  );
}

export default App;

const PrivateRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated === null) {
    return <p>Loading...</p>;
  }

  return isAuthenticated ? <PollsLayout /> : <Navigate to="/" replace />;
};

const MainLayout = ({ children }) => (
  <div style={{ marginTop: "100px" }}>
    {children}
  </div>
);

const PollsLayout = () => (
  <MainLayout>
    <Button />
    <Outlet />
  </MainLayout>
);

const UserLayout = () => (
  <MainLayout>
    <Button />
    <UserPages />
  </MainLayout>
);
