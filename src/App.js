import React, { useContext, useEffect } from "react";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import CreatePoll from "./component/CreatePoll";
import ListOfPolls from "./component/ListOfPolls";
import Home from "./Pages/Home";
import Nav from "./Pages/Nav";
import { AuthContext } from './context/AuthContex';
import UserPages from "./component/UserPage";
import Button from "./component/Button";
import axios from "axios";

function App() {
  
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/polls" element={<PrivateRoute />}>
        <Route index element={
          <>
            <CreatePoll />
            <ListOfPolls />
          </>
        } />
      </Route>
      <Route path="/user" element={<UserLayout />} />
    </Routes>
  );
}
export default App;

const PrivateRoute = () => {
  return <PollsLayout />;
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
