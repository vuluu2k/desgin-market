import React from 'react'
import {AccountContext} from '../../contexts/AccountContext';
import {useContext} from 'react';
import {Spinner} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import AdminLogin from '../components/page/AdminLogin';

export default function Admin({AdminRoute}) {
    const {accountState:{accountLoading,isAuthenticated}}=useContext(AccountContext);

    let body;
    if(accountLoading) {
        body=(
            <div className="d-flex justify-content-center mt-2">
                <Spinner animation="border" variant='info' />
            </div>
        )
    }else if(isAuthenticated) {
        return <Redirect to='/admin/products' />
    }
    else {
        body=(
            <>
                {AdminRoute==="AdminLogin" && <AdminLogin />}
            </>
        )
    }

    return (
        <>
            {body}
        </>
    )
}
