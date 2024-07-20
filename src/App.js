import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(response => {
        setProducts(response.data.products);
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  const handleBuy = (product) => {
    const botToken = '7267506140:AAEHhJBrHmIyiqbqxefjdLMU4yubr9-7dk8';
    const chatId = '6959587043';
    const message = `Product: ${product.title}\nPrice: $${product.price}\nImage: ${product.thumbnail}`;

    axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text: message
    })
    .then(response => {
      console.log(`Message sent: ${response.data.result.text}`);
    })
    .catch(error => {
      console.error('Error sending message:', error);
    });
  };

  return (
    <div className="App">
      <h1>Product List</h1>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.thumbnail} alt={product.title} />
            <h2>{product.title}</h2>
            <p>${product.price}</p>
            <button onClick={() => handleBuy(product)}>Buy</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
