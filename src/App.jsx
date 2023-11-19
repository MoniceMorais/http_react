import './App.css'

import { useState, useEffect } from 'react'

// 4- Custom hook para resgate de dados
import { useFetch } from './hooks/useFetch';

const url = "http://localhost:3500/products";

function App() {

  const [products, setProducts] = useState([]);

  // 4- Custom hook para resgate de dados
  const { data: items, httpConfig, loading, error } = useFetch(url);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // 1- Resgatando dados
  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await fetch(url);

  //     const data = await res.json();

  //     setProducts(data);
  //   }
  //   fetchData();
  // }, []);

  // 2- Adicionando dados
  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      name,
      price
    };

    // const res = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(product)
    // });

    // // 3- Carregamento de dados dinâmico
    // const addedProduct = await res.json();

    // setProducts((prevProducts) => [...prevProducts, addedProduct]);


    // 5- Refatorando o POST
    httpConfig(product, "POST");

    setName("");
    setPrice("");
  }

  return (
    <>
      <h1>Lista de produtos</h1>

      {/* 6- Loading */}
      {loading && <p>Carregando dados...</p>}
      {error && <p>{error}</p>}

      {!error && (
        <ul>
          {items && items.map((product) => (
            <li key={product.id}>{product.name} - R$ {product.price}</li>
          ))}
        </ul>
      )}


      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Preço:
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          {/* 7 -  State de loading do POST */}
          {loading && <input type="submit" value="Aguarde ... " disabled/>}
          {!loading && <input type="submit" value="Criar" />}
        </form>
      </div>
    </>
  )
}

export default App
