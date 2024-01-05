import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    toggleCart: false,
    items: [],
    totalQuantity: 0,
    notification: null,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    showCart(state) {
      state.toggleCart = !state.toggleCart;
    },
    addToCart(state, action) {
      const newItem = action.payload;
      state.totalQuantity++;

      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity = existingItem.quantity + 1;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      state.totalQuantity--;

      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

const store = configureStore({
  reducer: { cart: cartSlice.reducer },
});

export const sendCart = (cart) => {
  return async (dispatch) => {
    dispatch(
      cartAction.showNotification({
        status: "pending",
        title: "..Sending",
        message: "Sending cart item",
      })
    );
    const sendCartData = async (cart) => {
      const response = await fetch(
        "https://react-6403c-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("sending failed");
      }
    };

    try {
      await sendCartData(cart);
      dispatch(
        cartAction.showNotification({
          status: "Success",
          title: "Success!",
          message: "Send successfully",
        })
      );
    } catch (error) {
      dispatch(
        cartAction.showNotification({
          status: "Failed",
          title: "Error!",
          message: "Sending failed",
        })
      );
    }
  };
};

export const fetchData=()=>{
  return async(dispatch)=>{
    dispatch(cartAction.showNotification({
      status:"Fetching",
      title:"Fetching",
      message:"Loading Cart"
    }));
   
    const fetchCartData=async()=>{
      const response = await fetch(
        "https://react-6403c-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("sending failed");
      }
      const data=await response.json();
      return data;
    }
    try {
      const data=await fetchCartData();
      dispatch(cartAction.replaceCart(data));
    } catch (error) {
      dispatch(
        cartAction.showNotification({
          status: "Failed",
          title: "Error!",
          message: "Fetching failed",
        })
      );
    }
  }
}

export const cartAction = cartSlice.actions;
export default store;
