import {useState, useEffect, useContext} from 'react';
import { dataProvider } from '../utils/dataProvider';
import ProductCardDetail from './productCardDetail';
import { UserContext } from '../context/userContext';

const ProductList = ({ prefetchedProducts }) => {
   const [products, setProducts] = useState([]); 
   const [currentPoints, setCurrentPoints] = useState(0); 
   const [redeemProducts, setRedeemProducts] = useState([]); 
   const {currentUser} = useContext(UserContext)

   const getProducts = async () => {
    const fetchedProducts = await dataProvider('CUSTOM_GET', {
        url: "products"
    })
    setProducts([...fetchedProducts])
   } // get products from api

   useEffect(() => {
     getProducts()  
   }, [])

   useEffect(() => {
       setCurrentPoints(currentUser?.points)
       setRedeemProducts(currentUser?.redeemHistory)
   }, [currentUser])

   return(
       <>
       <div>
           <p>{`your points: ${currentPoints}`}</p>
           {redeemProducts?.map(product => 
           <div style={{display: "flex", justifyContent: "space-around"}}>
               <p>{product?.name}</p>
               <p>{product?.category}</p>
               <p>{product?.cost}</p>
           </div>)}
        </div>
       <div className="productListContainer">
       {products?.map(product => 
            <ProductCardDetail product={product} getProducts={getProducts} key={product._id}/> 
        )}
        </div>
       </>
   )
}

export const getStaticProps = async () => {
    const prefetechedProducts = await dataProvider('CUSTOM_GET', {
        url: "products" // this endpoint should has a limit and skip params and only get por example the first 20 products. this will be a better experience for the user.
    });
    return {
        props: {
          prefetechedProducts,
        },
        revalidate: 20
    }
}

export default ProductList;