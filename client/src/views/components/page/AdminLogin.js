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
                    <div style={{background:'rgba(0,0,0,0.2)',padding:25,borderRadius:8 }}>

                    <h2>❤️❤️❤️ Đi tới trình quản lý ❤️❤️❤️</h2>
                    <h5>----👍😍😍😍😍👍----</h5>
                    <Form className="mb-4"  onSubmit={login}>
                        <Form.Group className="mb-2">
                            <Form.Control type='text' placeholder='Tài khoản' name='nameAccount' required value={nameAccount} onChange={onChangeLoginForm} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Control type='password' className="mb-2"  placeholder='Mật khẩu' name='passwordAccount' required value={passwordAccount} onChange={onChangeLoginForm} />
                            <AlertMessage info={alert}/>
                        </Form.Group>
                        <Button variant='danger' type='submit' block>Đăng nhập</Button>
                    </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}
