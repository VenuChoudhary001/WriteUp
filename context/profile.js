import React, { useState, useContext, useReducer } from "react";

const ProfileContext = React.createContext();

export const ProfileContextProvider = ({ children }) => {
  const [profile, setProfile] = useState();

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
