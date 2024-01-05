import { useDispatch } from 'react-redux';
import classes from './CartItem.module.css';
import { cartAction } from '../../store';

const CartItem = (props) => {
  const { title, quantity, total, price,id } = props.item;
  
const dispatch=useDispatch();

  const increaseHandler=(event)=>{
dispatch(cartAction.addToCart({title:title, id:id, price:price}));
  }

  const decreaseHandler=(event)=>{
    dispatch(cartAction.removeItem(id));
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
        ₹{total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={decreaseHandler}>-</button>
          <button onClick={increaseHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
