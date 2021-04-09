import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    console.log(products);

    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState('');

    // useEffect(()=>{
    //     fetch('https://emajohn.herokuapp.com/products')
    //     .then(res => res.json())
    //     .then(data => setProducts(data))
    // }, []);
    
    useEffect(()=>{
        fetch('https://emajohn.herokuapp.com/product?search='+search)
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [search]);

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('https://emajohn.herokuapp.com/productsByKeys',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
    }, [])
    
    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart ;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others  = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }

    const handleSearch = event => {
        setSearch(event.target.value);
    }

    return (
        <div className="twin-container">
            <div className="product-container">
                <input placeholder='Search your product here...' type="text" onChange={handleSearch} className="product-search form-control mt-4 mb-3"/>
                {
                    products.length === 0 && <h1>Loading!......!</h1>
                    
                }
                {
                    products.map(product => 
                            <Product key={product.key} showAddToCart={true} handleAddProduct= {handleAddProduct} product={product}></Product>
                        )
                }
            </div>

            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-button">Review Order!</button>
                    </Link>
                </Cart>
            </div>
            
        </div>
    );
};

export default Shop;