import React from 'react';
// import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart;
    // console.log(cart);
    // const totalPrice = cart.reduce((total, prd) => total + prd.price, 0);
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        console.log(product.price, product.quantity)
        totalPrice = totalPrice + product.price * product.quantity || 1;
    }

    let shipping = 0;
    if(totalPrice > 35){
        shipping = 0;
    }else if(totalPrice > 15){
        shipping = 4.99;
    }else if(totalPrice > 0){
        shipping = 12.99;
    }

    const tax = (totalPrice/10);
    const grandTotal = (totalPrice + shipping + tax);

    const formatNumber = num => {
        const precession = num.toFixed(2);
        return Number(precession)
    }

    return (
        <div>
            <h4>Order Summary!</h4>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Price: {formatNumber(totalPrice)}</p>
            <p><small>Shipping cost: {formatNumber(shipping)}</small></p>
            <p><small>Tax + VAT: {formatNumber(tax)}</small></p>
            <p>Total price: {formatNumber(grandTotal)}</p>
            <br/>
            {
                props.children
            }
        </div>
    );
};

export default Cart;