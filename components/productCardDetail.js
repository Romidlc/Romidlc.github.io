import { useContext } from 'react';
import Button from '../components/generics/button';
import { UserContext } from '../context/userContext';

const ProductCardDetail = ({ product }) => { 
    const {currentUser, claimProduct} = useContext(UserContext);
    const disabledRedeem = currentUser?.points < product?.cost; // if this happen, I'll disable the redeem now button
    return(
    <div className="listedContent" key={product?._id}>
        <div className="listedHeader">
            <div>
                <span style={{ backgroundImage: `url("${product?.img?.hdUrl}")` }}>
                </span>
            </div>
        </div>
        <div className="listedInfo">
           <div>
               <p>{product?.category}</p>
               <span>{product?.name}</span>
            </div>
        </div>
        <div className="redeemSection">
           <div className="redeemPointSection">
            <p>{ !disabledRedeem ? `${product?.cost}` : `you need ${product?.cost - currentUser?.points}`}</p>
            <img src="/coin.svg" width="25px" />
            </div> 
            <Button title="redeem now" disabled={disabledRedeem} onClick={()=> claimProduct(product) // update points & push the product in redeemProducts array from user context 
            }/>
        </div>
      </div>)
}
export default ProductCardDetail; 