import {useContext} from 'react';
import Button from '../components/generics/button';
import { UserContext } from '../context/userContext';
import { dataProvider } from '../utils/dataProvider';

/**********************************ProductCardDetail**************************************
 I separated this section from products component because the code it's more cleaner
*******************************************************************************************/

const RedeemProduct = async (productId) => {
   try{
    await dataProvider('CUSTOM_POST', {
        url: "redeem",
        data: {
         productId
        }
    })
   } catch(err) {
       console.log("ups! something happen", err)
   }
} // reedem product calls to redeem endpoint and then push productId into historyRedeem on user context

const ProductCardDetail = ({ product }) =>{ 
    const {currentUser, claimProduct, addIntoHistory} = useContext(UserContext);
    const disabledRedeem = currentUser?.points < product?.cost;
    return(
    <div className="listedContent" key={product?._id}>
        <div className="listedHeader">
            <div>
                <span style={{
                     backgroundImage: `url("${product?.img?.hdUrl}")`,
                }}>
                </span>
            </div>
        </div>
        <div className="listedInfo">
           <div>
               <span>{product?.name}</span>
               <p>{product?.category}</p>
               {disabledRedeem ? 
                 <p>{`you need ${product?.cost - currentUser?.points} pts.`}</p>
                :
                <p>{`${product?.cost} pts available.`}</p>
               }
            </div>
            <Button title="redeem" disabled={disabledRedeem} onClick={()=>{
                claimProduct(product?.cost)
                RedeemProduct(product._id)
            }}/>
        </div>
      </div>)
}
export default ProductCardDetail; 