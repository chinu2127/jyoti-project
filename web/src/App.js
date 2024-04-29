import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { AuthState } from "./atom/authState";
import Home from "./pages/Home";
import Available from "./pages/Available";
import Admin from "./pages/Admin";
import Categories from "./pages/Categories";
import SubCategories from "./pages/SubCategories";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import "./App.css";
import ServiceProvider from "./pages/ServiceProvider";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import ChattingWindow from "./views/chat/ChattingWindow";
import PhotoModal from "./views/modals/PhotoModal";
import { PhotoState } from "./atom/photoState";

const PrivateRoute = ({ element, ...props }) => {
  const userData = useRecoilValue(AuthState);
  if (!userData._id) {
    return element;
  }
  return <Navigate to="/" />;
};

const App = () => {
  const [userData, setUserData] = useRecoilState(AuthState);
  const photoModalValue = useRecoilValue(PhotoState);

  useEffect(() => {  
    console.log("parsed user data")
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [userData?._id]);


  useEffect(() => {
    console.log("App Useffect called")
  },[])

  return (
    <div className="relative">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:id" element={<SubCategories />} />
        <Route path="/subcategory/:id" element={<Available />} />

        <Route path="/signin" element={<PrivateRoute element={<SignIn />} />} />
        <Route path="/signup" element={<PrivateRoute element={<SignUp />} />} />
        <Route path="/serviceProvider" element={<ServiceProvider />} />
        <Route path="/search/:query" element={<SearchPage />} />
        <Route path="/user/:id" element={<ProfilePage />} />

        {/* ADMIN ROUTE */}
        <Route path="/admin*" element={<Admin />} />
      </Routes>
      {userData?._id && <ChattingWindow />}
      {photoModalValue.isOpen && <PhotoModal />}
    </div>
  );
};

export default App;
