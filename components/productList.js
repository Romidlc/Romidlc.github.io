import {useState, useEffect, useContext} from 'react';
import { dataProvider } from '../utils/dataProvider';
import ProductCardDetail from './productCardDetail';
import ProductHistoryList from './productHistoryList';
import { UserContext } from '../context/userContext';

const ProductList = () => {
   const [products, setProducts] = useState([]); // products from api
   const [currentPoints, setCurrentPoints] = useState(0);  // show the amount points that user has. 
   const [redeemProducts, setRedeemProducts] = useState([]);  // on every user context update I update de redeem products state
   const [currentSort, setCurrentSort] = useState('ASC-DATE'); // save current sort and sort products depending on this state 
   const {currentUser, removeProductFromRedeemProducts, updateUser} = useContext(UserContext)
  
   const sortOptions = [
    {
     name: "More recent",
     sortBy: "DESC-DATE"
    },
    {
      name: "Lowest price",
      sortBy: "ASC-COST"
    },
    {
      name: "Highest price",
      sortBy: "DESC-COST"
    }] // sort options

   const getProducts = async () => {
    try{
        let fetchedProducts = await dataProvider('CUSTOM_GET', {
        url: "products"
         })
        fetchedProducts = fetchedProducts.sort(function(a, b) {
          return parseFloat(a.cost) - parseFloat(b.cost);
        }); // SORT PRODUCT ASCENDING BY DEFAULT
        setProducts([...fetchedProducts])
    } catch(err) {
      console.log("ups! something happen", err)
    }
   } // get product list from api

   const handleSortChange = (sortType) => {
        let sortedProducts = products.sort((a, b) => {
          if(sortType === "DESC-COST" ||  sortType === "DESC-DATE") return parseFloat(a.cost) - parseFloat(b.cost);
          return parseFloat(b.cost) - parseFloat(a.cost);
        }); // SORT PRODUCT ASCENDING BY DEFAULT

        console.log("sorted products", sortedProducts)
        setProducts(sortedProducts)
        setCurrentSort(sortType)
    }
   
   const claimProductList = async () => {
    try{
        redeemProducts.map(async(product)=>
         await dataProvider('CUSTOM_POST', {
           url: "redeem",
           data: {
            productId: product._id
           }
         }))
        updateUser({redeemProducts: []})

    } catch(err) {
       console.log("ups! something happen", err)
    }
   } // reedem product calls to redeem endpoint

   useEffect(() => {
     getProducts()  
   }, [])
  
   useEffect(() => {
       setCurrentPoints(currentUser?.points)
       setRedeemProducts(currentUser?.redeemProducts)
   }, [currentUser])

   return(
       <>
       <ProductHistoryList currentPoints={currentPoints} redeemProducts={redeemProducts} removeProductFromRedeemProducts={removeProductFromRedeemProducts} claimProductList={claimProductList} /> 
       <div className="productListSort">
          <p>32 of 32</p>
          <p>Sort By:</p>
          {sortOptions.map(sort=>
            <div className={`productListSortOptions ${sort.sortBy === currentSort && "productSortSelected"}`} onClick={()=> handleSortChange(sort.sortBy)}>
              <p>{sort.name}</p>
            </div>
          )}
       </div>
       <div className="productListContainer">
        {products?.map(product => 
            <ProductCardDetail product={product} getProducts={getProducts} key={product._id}/> 
        )}
        </div>
       </>
   )
}

// export const getStaticProps = async () => {
//     const prefetchedProducts = await dataProvider('CUSTOM_GET', {
//         url: "products"
//     }) this endpoint should has a limit and skip params and only get por example the first 20 products. this will be a better experience for the user.

//     return {
//         props: {
//           prefetchedProducts,
//         },
//         revalidate: 20
//     }
// }

export default ProductList;