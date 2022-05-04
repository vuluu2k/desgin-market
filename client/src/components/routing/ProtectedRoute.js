import React from 'react'
import {AccountContext} from '../../contexts/AccountContext';
import {ConfirmContext} from '../../contexts/ConfirmContext';
import { useContext } from "react";
import {Spinner,Row,Col} from 'react-bootstrap';
import { Route, Redirect } from "react-router-dom";
import MenuAdmin from '../menu/MenuAdmin';
import ConfirmModal from '../modal/ConfirmModal';
import NavBarAdmin from '../navbar/NavBarAdmin';

export default function ProtectedRoute({component:Component,...rest}) {
    const {accountState:{accountLoading,isAuthenticated},logoutAccount}=useContext(AccountContext);
    const {showConfirmLogout,setShowConfirmLogout}=useContext(ConfirmContext);
    if(accountLoading){
        return (
            <div className="spinner-container">
                <Spinner animation="border" variant="info" />
            </div>
        )
    }
    const loginout=()=>{
        logoutAccount();
        closeLogoutConfirm();
    }
    const closeLogoutConfirm=()=>setShowConfirmLogout(false)
    return (
        <Route
            {...rest}
            render={(props)=>
                isAuthenticated ? (
                    <>
                        <Row>
                            <Col xs={3}>
                                <MenuAdmin />
                            </Col>
                            <Col xs={9} style={{paddingLeft:'7.5px'}}>
                                <NavBarAdmin />
                                <div style={{marginTop:'50px'}}>
                                    <Component {...rest} {...props}/>
                                </div>
                            </Col>
                        </Row>
                        <ConfirmModal title="Xác nhận" content="Bạn đang có ý định đăng xuất" show={showConfirmLogout} onClick={loginout} onClose={closeLogoutConfirm} />
                    </>
                ):(
                    <Redirect to="/admin" />
                )
            }
        />
    )
}
