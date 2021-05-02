import Button from '../components/generics/button';
import IconButton from '@material-ui/core/IconButton';

const ProductHistoryList = ({currentPoints, redeemProducts,removeProductFromRedeemProducts, claimProductList}) => {
  return(<div className="productRedeemSection">
    <p>{`your points: ${currentPoints}`}</p>
    {redeemProducts?.map((product, index) => 
      <div style={{display: "flex", justifyContent: "space-between"}} key={index}>
          <p>{product?.name}</p>
          <p>{product?.category}</p>
          <p>{product?.cost}</p>
          <IconButton edge="start"  color="inherit" aria-label="menu" onClick={()=> removeProductFromRedeemProducts(product)}>
             <img src="/iconClose.svg" width="10px" />
          </IconButton> 
      </div>
    )}
    <Button title="redeem all" onClick={()=> claimProductList()}></Button>
  </div>)
}
export default ProductHistoryList;