import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from "axios";

import Explore from './Components/Explore/Explore';
import Navbar from './Components/Navbar/Navbar';
import ExploreNew from "./Components/Explore/ExploreNew";
import MediaPage from "./Components/MediaPage/MediaPage";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Profile from './Components/Profile/Profile';
import Upload from './Components/Upload/Upload';
import SearchResults from './Components/SearchResults/SearchResults';
import CheckAge from './Components/Explore/CheckAge';
import { UserContextProvider } from './UserContext';
import RedirectToExplore from './Components/Redirect/RedirectToExplore';

const App = () => {
  axios.defaults.baseURL = "https://blisio-backend-d30f62efe387.herokuapp.com/api"; //live
  axios.defaults.withCredentials = true;

  const [ageConfirmed, setAgeConfirmed] = useState(false);

  useEffect(() => {
    const ageConfirmation = Cookies.get('ageConfirmed');
    if (ageConfirmation === 'true') {
      setAgeConfirmed(true);
    }
  }, []);

  const handleAgeConfirmation = () => {
    Cookies.set('ageConfirmed', 'true', { expires: 36500 }); // Set a very long expiry
    setAgeConfirmed(true);
  };

  if (!ageConfirmed) {
    return <CheckAge checkAgeToParent={handleAgeConfirmation} />;
  }

  return (
    <UserContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<RedirectToExplore />} /> {/* Use the RedirectToExplore component */}
          <Route path="/explore" element={<Explore />} />
          <Route path="/explore/new" element={<ExploreNew />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/user/:username" element={<Profile />} />
          <Route path="/media/:albumCode" element={<MediaPage />} />
          <Route path="/search/:query" element={<SearchResults />} />
          {/* Additional routes can be added here */}
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
};

export default App;
