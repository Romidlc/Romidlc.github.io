import {useContext} from 'react';
import Button from '../components/generics/button';
import { UserContext } from '../context/userContext';

const ProductCardDetail = ({ product }) =>{ 
    const {currentUser, claimProduct} = useContext(UserContext);
    const disabledRedeem = currentUser?.points < product?.cost; // if this happen, I'll disable the redeem button
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
            <Button title="redeem" disabled={disabledRedeem} onClick={()=> claimProduct(product) // update points & push the product in redeemProducts array from user context 
            }/>
        </div>
      </div>)
}
export default ProductCardDetail; 