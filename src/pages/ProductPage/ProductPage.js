import React, { useState, useEffect } from 'react';
import { PRODUCTS_API_URL } from '../../helpers/config';
import { getJson } from '../../helpers/helperFns';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './ProductPage.scss';

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

  const { isLoading, products, isError } = state;
  console.log(products);
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
                      <Button variant="dark">
                        <i className="icofont icofont-shopping-cart"></i>
                      </Button>
                      <Button variant="warning">
                        <i className="icofont icofont-heart-alt"></i>
                      </Button>
                      <Button variant="danger">
                        <i className="icofont icofont-ui-delete"></i>
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
