import React, { useState, useEffect } from 'react';
export const UserContext = React.createContext({});
import { dataProvider } from '../utils/dataProvider';

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  
  const getUser = async () => {
   try {
      const user = JSON.parse(localStorage.getItem('user'))
      if(!user) {
        const fetchedUser = await dataProvider('CUSTOM_GET', {
          url: "user/me"
        })
        localStorage.setItem('user', JSON.stringify(fetchedUser))
        setCurrentUser(fetchedUser)
      } // if the user doesn't exist on localstorage we should get it from api
      else setCurrentUser(user)
    }  catch(err) {
      console.log("ups, somethings happen!")
    }
  }

  const claimProduct = (pointRedeemed) => {
    currentUser.points -= pointRedeemed; 
    setCurrentUser({...currentUser})
    localStorage.setItem('user', JSON.stringify({...currentUser}));
  }
  const logout = () => localStorage.removeItem('user'); // remove local storage when user wants logout
  
  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        logout,
        claimProduct,
        // addIntoHistory
      }}
    >
      {children} 
    </UserContext.Provider>
  );
};
export default UserProvider;
