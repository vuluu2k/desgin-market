import React from 'react'
import {FormControl,Button,Form} from 'react-bootstrap';
import './Style.css';

export default function NavBarAdmin() {
    return (
        <div className="head d-flex justify-content-between align-items-center">
            <div className="container d-flex justify-content-between align-items-center">
                <Form className="d-flex">
                    <FormControl
                        type="search"
                        placeholder="Tìm kiếm"
                        className="me-2"
                        aria-label="Search"
                        size="sm"
                    />
                    <Button className="ml-2" variant="outline-primary" size="sm">
                        <i className="fas fa-search"></i>
                    </Button>
                </Form>
                <div>
                    <i className="fas fa-bell" style={{color:'#0091FF'}}></i>
                </div>
            </div>
        </div>
    )
}
