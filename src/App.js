import { Container } from "react-bootstrap";
import React from "react";

import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import HomeScreen from "./screens/HomeScreen";
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/cartScreen'

function App() {
  return (
    <>
      <Header />
      <main className={"py-3"}>
        <Container>
        <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/cart/:id?' element={<CartScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
      </>
  );
}

export default App;
