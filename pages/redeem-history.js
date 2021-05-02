import { useContext } from "react";
import { UserContext } from '../context/userContext';


const RedeemHistory = () => {
   const {currentUser} = useContext(UserContext);
   return (
   <div>
    {currentUser?.redeemHistory?.map((product, index) => 
      <div style={{display: "flex", justifyContent: "space-around"}} key={index}>
          <p>{product?.name}</p>
          <p>{product?.category}</p>
          <p>{product?.cost}</p>
      </div>
    )}
   </div>);
}
export default RedeemHistory;