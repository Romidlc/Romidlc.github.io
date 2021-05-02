import '../styles/globals.css'
import Head from 'next/head';
import UserProvider from '../context/userContext';

const MyApp = ({ Component, pageProps }) => {
  return(
    <UserProvider>
        <Head>
          <title>AeroMarket! | Redeem your points</title>
          <link rel="shortcut icon" href="favicon.ico" />
        </Head>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
