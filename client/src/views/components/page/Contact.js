import React from 'react'
import Map from '../../../components/map/Map'
import {Container} from 'react-bootstrap';
import InforContact from '../../../components/inforContact/InforContact';
import './css/Contact.css'

export default function Contact() {
    return (
        <div>
            <Container style={{padding:'36px 0'}}>
                <Map height="80vh" />
                <InforContact css='font_contact-link'/>
            </Container>
        </div>
    )
}
