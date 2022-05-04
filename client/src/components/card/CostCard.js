import React from 'react';
import {Card,Table} from 'react-bootstrap';

export default function CostCard() {
    return (
        <Card  border="light" style={{ width: '100%' }}>
            <Card.Header as="h5">Hyundai Grand i10</Card.Header>
            <center>
                <img src="http://hyundaimotorvn.com/wp-content/uploads/2019/12/GRAND-I10-hackback-1.png" alt="Hyundai Grand i10" width="50%" height="50%"/>
            </center>
            <Card.Body>
                <Table  hover style={{borderBottom: '1px solid #DEE2E6'}}>
                    <thead>
                        <tr>
                            <th colSpan="3">Loại xe</th>
                            <th>Giá xe</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="3">Hyundai Grand I10 1.2 AT</td>
                            <td>390 triệu</td>
                        </tr>
                        <tr>
                            <td colSpan="3">Hyundai Grand I10 1.2 AT</td>
                            <td>390 triệu</td>
                        </tr>
                        <tr>
                            <td colSpan="3">Hyundai Grand I10 1.2 AT</td>
                            <td>390 triệu</td>
                        </tr>
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    )
}
