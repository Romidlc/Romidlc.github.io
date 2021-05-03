import React, {useContext} from 'react';
import styles from '../styles/Home.module.css'
import { UserContext } from '../context/userContext';

  const  Header = () =>  {
    const { currentUser } = useContext(UserContext); // get user context
   
    return (
      <>
      <div className={styles.headerPointContainer}>
      <img src="/aerolab-logo.svg" width="30px" />
      <p>{`Hi, ${currentUser?.name}`}</p>
      </div>
      <div className={styles.headerImageContainer}>
      <p>Electronics</p>
      </div>
      </>
    );
  }

  export default Header;