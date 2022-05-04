import React from 'react';
import {Card, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import parse from 'html-react-parser';

export default function cardinfor({product}) {
    function taskDate(date) {
        var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
    }
    return (
        <Card className="mt-5" style={{border:0}}>
            
            <Card.Img variant="top" src={product.imageNewUrl} />
            <Card.Body>
            {/* <Card.Text>
                {parse(product.contentNew.slice(0, 250) + "...")}
            </Card.Text> */}
            <h4>{product.titleNew}</h4>
            <p>Ngày tạo : {taskDate(product.createdAt)}</p>
            <Button variant="outline-danger" to={`/news/${product._id}`}  as={Link}><strong>Xem chi tiết <i class="fas fa-chevron-right"></i></strong></Button>
            </Card.Body>
        </Card>
    )
}
