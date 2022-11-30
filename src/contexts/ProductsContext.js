import React, { useState, createContext } from 'react';

export const ProductsContext = createContext(null);

export const ProductsContextProvider = (props) => {
  const [state, setState] = useState({
    isLoading: false,
    products: [],
    cartProducts: [],
    isError: null,
  });
  return (
    <ProductsContext.Provider value={{ state, setState }}>
      {props.children}
    </ProductsContext.Provider>
  );
};
