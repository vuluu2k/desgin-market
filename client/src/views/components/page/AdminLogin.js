import React from 'react'
import {Form,Button} from 'react-bootstrap'
import './css/AdminLogin.css'
import {AccountContext} from '../../../contexts/AccountContext';
import {useContext,useState} from 'react';
import AlertMessage from '../../../components/layout/AlertMessage';
export default function AdminLogin() {

    const {loginAccount} = useContext(AccountContext);
    const [loginForm,setLoginForm]=useState({
        nameAccount:'',
        passwordAccount:''
    })
    const {nameAccount,passwordAccount} =loginForm;
    const [alert,setAlert]=useState(null);
    const onChangeLoginForm=(event)=>setLoginForm({
        ...loginForm,
        [event.target.name]:event.target.value
    })
    const login = async (event)=>{
        event.preventDefault();
        try {
            const loginData=await loginAccount(loginForm);
            if(!loginData.success){
                setAlert({type:'danger',message:loginData.message});
                setTimeout(()=>setAlert(null),3000);
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className="full-height">
            <div className="dark-overlay">
                <div className="login-inner">
                    <h2>Admin</h2>
                    <h5>Đăng nhập để quản lí shop của bạn</h5>
                    <Form className="mb-4" style={{ width: '30%'}} onSubmit={login}>
                        <Form.Group className="mb-2">
                            <Form.Control type='text' placeholder='Tài khoản' name='nameAccount' required value={nameAccount} onChange={onChangeLoginForm} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Control type='password' className="mb-2"  placeholder='Mật khẩu' name='passwordAccount' required value={passwordAccount} onChange={onChangeLoginForm} />
                            <AlertMessage info={alert}/>
                        </Form.Group>
                        <Button variant='success' type='submit'>Đăng nhập</Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}
