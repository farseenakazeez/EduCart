export const addDecimals = (num) =>{
    return(Math.round(num*100)/100).toFixed(2);
};
export const updateCart = (state,item)=>{
   
            console.log(state.cartItems)
            state.itemsPrice = addDecimals(state.cartItems.reduce((acc,item) => acc + (Number(item.price) ||0)* (Number(item.qty)||1),0));

            console.log(state.itemsPrice);

            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 100);
            state.taxPrice = addDecimals(Number(0.15*state.itemsPrice));
            state.totalPrice = addDecimals(
                Number(state.itemsPrice) +
                Number(state.shippingPrice)+
                Number(state.taxPrice));
                localStorage.setItem("cart",JSON.stringify(state));
                return state;
            
    
       
};