import React from 'react'
import {Container} from 'react-bootstrap';
import CostCard from '../../../components/card/CostCard';

export default function PriceList() {
    return (
        <Container style={{padding:'36px 0'}}>
            <CostCard />
            <CostCard />
            <CostCard />
        </Container>
    )
}
