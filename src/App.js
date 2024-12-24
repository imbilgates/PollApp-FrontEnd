import React, { useContext } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import CreatePoll from "./component/CreatePoll";
import ListOfPolls from "./component/ListOfPolls";
import Home from "./Pages/Home";
import Nav from "./Pages/Nav";
import { AuthContext } from './context/AuthContex';
import UserPages from "./component/UserPage";
import Button from "./component/Button";
import axios from "axios";

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;


  return (
    <Routes>
      <Route path="/" element={!isAuthenticated ? <Home /> : <Navigate to="/polls" />} />
      
      <Route path="/polls" element={<PrivateRoute isAuthenticated={isAuthenticated} redirectTo="/" />}>
        <Route index element={
          <>
            <CreatePoll />
            <ListOfPolls />
          </>
        } />
      </Route>

      <Route path="/user" element={isAuthenticated ? <UserLayout /> :  <Navigate to="/" /> } />
    </Routes>
  );
}

export default App;

const PrivateRoute = ({ isAuthenticated, redirectTo }) => {
  return isAuthenticated ? <PollsLayout /> : <Navigate to={redirectTo} />;
};

const MainLayout = ({ children }) => (
  <>
    <Nav />
    <div style={{ marginTop: '100px' }}>
      {children}
    </div>
  </>
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
