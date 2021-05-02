import styles from '../styles/Home.module.css'
import ProductList from '../components/productList';

const Home = () => {
  return (
    <div className={styles.container}>
      <ProductList />
    </div>
  )
}

export default Home;
