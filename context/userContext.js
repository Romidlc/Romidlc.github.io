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
        fetchedUser.redeemProducts = [];
        localStorage.setItem('user', JSON.stringify(fetchedUser))
        setCurrentUser(fetchedUser)
      } // if the user doesn't exist on localstorage we should get it from api
      else setCurrentUser(user)
    }  catch(err) {
      console.log("ups, somethings happen!")
    }
  }

  const claimProduct = (currentProduct) => {
    currentUser.points -= currentProduct?.cost; // remove product cost from user point
    const fetchedProduct = currentUser?.redeemProducts?.find(product => product._id === currentProduct._id);
    if(!fetchedProduct) currentUser?.redeemProducts?.push(currentProduct) // add product on redeemProducts 
    setCurrentUser({...currentUser})
    localStorage.setItem('user', JSON.stringify({...currentUser}));
  }

  const removeProductFromRedeemProducts = (currentProduct) => {
    currentUser.redeemProducts = currentUser?.redeemProducts?.filter(product => product._id !== currentProduct._id) // remove product from redeem products
    currentUser.points += currentProduct?.cost; // add product cost on user points
    setCurrentUser({...currentUser})
    localStorage.setItem('user', JSON.stringify({...currentUser}));
  }

  
  const updateUser = (userData) => {
    if (!userData) return;
    const oldData = JSON.parse(localStorage.getItem('user'));
    if (oldData && oldData._id) {
      userData = {
        ...oldData,
        ...userData,
      };
    }
    setCurrentUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

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
        removeProductFromRedeemProducts,
        updateUser
      }}
    >
      {children} 
    </UserContext.Provider>
  );
};
export default UserProvider;
