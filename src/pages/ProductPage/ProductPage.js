import React, { useState, useEffect, useContext } from 'react';
import { PRODUCTS_API_URL } from '../../helpers/config';
import { getJson } from '../../helpers/helperFns';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

import { ProductsContext } from '../../contexts/ProductsContext';
console.log(ProductsContext);
import './ProductPage.scss';

const ProductPage = () => {
  // const [state, setState] = useState({
  //   isLoading: false,
  //   products: [],
  //   isError: null,
  // });

  const { state, setState } = useContext(ProductsContext);
  const { isLoading, products, cartProducts, isError } = state;

  console.log(state);

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

  const handleAddToCart = (id) => {
    const product = products.filter((p) => p.id === id);
    setState((prev) => {
      return { ...prev, cartProducts: prev.cartProducts.concat(product) };
    });
  };

  const handleRemoveFromCart = (id) => {
    setState((prev) => {
      return {
        ...prev,
        cartProducts: prev.cartProducts.filter((cp) => cp.id !== id),
      };
    });
  };

  return (
    <section className="product__page">
      <Container>
        <Row>
          {products &&
            products.map((p) => {
              return (
                <Col md={3} key={p.id}>
                  <Card>
                    <Card.Img variant="top" src={p.thumbnail} />
                    <Card.Body>
                      <Card.Title>{p.title}</Card.Title>
                      <Card.Text>
                        <strong>$</strong>
                        {p.price}
                      </Card.Text>

                      {cartProducts.find((cp) => cp.id === p.id) ? (
                        <Button
                          variant="danger"
                          onClick={() => handleRemoveFromCart(p.id)}
                        >
                          <i className="icofont icofont-ui-delete"></i>
                        </Button>
                      ) : (
                        <Button
                          variant="dark"
                          onClick={() => handleAddToCart(p.id)}
                        >
                          <i className="icofont icofont-shopping-cart"></i>
                        </Button>
                      )}

                      <Button variant="warning">
                        <i className="icofont icofont-heart-alt"></i>
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Container>
    </section>
  );
};

export default ProductPage;
