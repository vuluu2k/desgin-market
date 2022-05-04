import React from 'react'
import {Row, Col} from 'react-bootstrap';
import LineCard from '../../../../components/card/LineCard';

export default function LineCarView({products}) {
    return (
        <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 g-10 mx-auto mt-3">
            {products.map(product=>(
                <Col key={product._id}>
                    <LineCard product={product} />
                </Col>
            ))}
        </Row>
    )
}
