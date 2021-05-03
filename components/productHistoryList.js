import Button from '../components/generics/button';
import IconButton from '@material-ui/core/IconButton';

const ProductHistoryList = ({currentPoints, redeemProducts,removeProductFromRedeemProducts, claimProductList}) => {
  return(<div className="productRedeemSection">
    <div className="productRedeemHeaderSection">
      <p style={{color: "#A3A3A3"}}>{`Available: ${currentPoints}`}</p>
      <img src="/coin.svg" width="30px" />
    </div>

    <div className="productRedeemItemContainer">
    {redeemProducts?.map((product, index) => 
       <div className="productRedeemItem" key={index}>
          <p>{product?.name}</p>
          <p className="productPrice">{`${product?.cost} pts.`}</p>
          <IconButton edge="start"  color="inherit" aria-label="menu" onClick={()=> removeProductFromRedeemProducts(product)}>
             <img src="/iconClose.svg" width="10px" />
          </IconButton> 
       </div>
    )}
    </div>
    
    {redeemProducts?.length > 0 && <div style={{display: "flex" ,justifyContent:"center" ,width: "100%", margin: "10px"}}>  
      <Button className="buttonRedeemSection" title="Redeem all" onClick={()=> claimProductList()}></Button>
    </div>} 
  </div>)
}
export default ProductHistoryList;