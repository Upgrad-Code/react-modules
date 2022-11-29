import React, { useState, useEffect } from 'react';
import { PRODUCTS_API_URL } from '../../helpers/config';
import { getJson } from '../../helpers/helperFns';

const ProductPage = () => {
  const [state, setState] = useState({
    isLoading: false,
    products: [],
    isError: null,
  });

  useEffect(() => {
    setState((prev) => {
      return { ...prev, isLoading: true };
    });

    (async () => {
      try {
        const data = await getJson(PRODUCTS_API_URL);
        const productsData = [...data.products];

        setState((prev) => {
          return { ...prev, products: productsData, isLoading: false };
        });
      } catch (err) {
        setState((prev) => {
          return { ...prev, isError: err, isLoading: false };
        });
      }
    })();
  }, []);

  console.log(state);
  return null;
};

export default ProductPage;
