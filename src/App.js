import { Fragment, useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { sendCart } from "./store";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./components/UI/Notification";
import { fetchData } from "./store";
let isInitial = true;

function App() {
  const toggleCart = useSelector((state) => state.cart.toggleCart);
  const cart = useSelector((state) => state.cart.items);
  const notification = useSelector((state) => state.cart.notification);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    dispatch(sendCart(cart));
  }, [cart, dispatch]);

// useEffect(()=>{
//  dispatch(fetchData());
// },[dispatch])

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {toggleCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
