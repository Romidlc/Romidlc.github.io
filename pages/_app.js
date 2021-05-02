import '../styles/globals.css'
import Head from 'next/head';
import UserProvider from '../context/userContext';
import Header from '../components/header';

const MyApp = ({ Component, pageProps }) => {
  return(
    <UserProvider>
        <Head>
          <title>AeroMarket! | Redeem your points</title>
          <link rel="shortcut icon" href="favicon.ico" />
        </Head>
      <Header/>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
