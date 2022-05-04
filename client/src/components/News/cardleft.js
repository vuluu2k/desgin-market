import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function cardleft({product}) {
  return (
      <Row className="mb-2">
        <Col md={4}>
            <Link to={`/news/${product._id}`} as={Link} style={{color:'black',textDecoration: 'none'}}>
                <Card.Img src={product.imageNewUrl} alt="..." />
            </Link>
        </Col>
        <Col md={8}>
            <Card.Text>
                <Link to={`/news/${product._id}`} as={Link} style={{color:'black',textDecoration: 'none'}}>
                    <h6>{product.titleNew} </h6>
                </Link>
            </Card.Text>
        </Col>
    </Row>
  )
}
