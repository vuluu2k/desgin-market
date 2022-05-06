import React from 'react'
import { Card} from 'react-bootstrap';
import {Link} from 'react-router-dom'
export default function LineCard({product}) {
    return (
        <Card to={`/products/${product.slug}`} as={Link} style={{ width: '100%',marginTop: '5px'}}>
            <Card.Img variant="top" src={product.imgCarUrl} />
            <Card.Body style={{backgroundColor:'#9796f0',padding:'10px'}}>
                <Card.Text style={{textAlign:'center',fontSize:'14px',fontWeight:'bolder',color:'white'}}>{product.nameCar}</Card.Text>
            </Card.Body>
        </Card>
    )
}
