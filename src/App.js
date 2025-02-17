
import './App.css';
import data from './Data';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './components/Products';
import Cart from './components/Cart';
import { useState } from 'react';

function App() {
  const {productItems} = data;
  // initializing the array to empty
  const [cartItems, setCartItems] = useState([]);

  const handleAddProduct = (product) =>{
    const productExist = cartItems.find((item)=> item.id === product.id);
    if(productExist){
      setCartItems(cartItems.map((item)=> item.id === product.id ?
    {...productExist, quantity: productExist.quantity + 1} : item))
    }
    else{
      setCartItems([...cartItems, {...product, quantity: 1}])
    }
  }

  const handleRemoveProduct = (product) =>{
    const productExist = cartItems.find((item)=> item.id === product.id);
    if(productExist.quantity === 1){
      setCartItems(cartItems.filter((item)=> item.id !== product.id));
    }
    else{
      setCartItems(
        cartItems.map((item)=> item.id === product.id ? 
      {...productExist, quantity:productExist.quantity - 1}: item)
      )
    }
  }

  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Products productItems={productItems} handleAddProduct={handleAddProduct}/>}/>
          <Route path="/cart" element={<Cart cartItems={cartItems} handleAddProduct={handleAddProduct} handleRemoveProduct={handleRemoveProduct}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
