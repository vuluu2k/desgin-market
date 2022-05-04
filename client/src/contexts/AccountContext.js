import React from 'react';
import { createContext,useReducer,useEffect } from 'react';
import {apiUrl,LOCAL_STORAGE_ACCOUNT_NAME,SET_ACCOUNT} from './contants';
import { accountReducer } from '../reducers/accountReducer';
import setAccountToken from '../utils/setAccountToken';
import axios from 'axios'

export const AccountContext= createContext();

const AccountContextProvider = ({children}) =>{
    const [accountState,dispatch]=useReducer(accountReducer,{
        accountLoading:true,
        isAuthenticated:false,
        account:null
    })
    const loadAccount= async () =>{
        if(localStorage[LOCAL_STORAGE_ACCOUNT_NAME]){
            setAccountToken(localStorage[LOCAL_STORAGE_ACCOUNT_NAME]);
        }
        try {
            const response = await axios.get(`${apiUrl}/accounts`)
            if(response.data.success){
                dispatch({
                    type:SET_ACCOUNT,
                    payload:{isAuthenticated:true, account:response.data.account}
                })
            }
        } catch (e) {
            localStorage.removeItem(LOCAL_STORAGE_ACCOUNT_NAME);
            setAccountToken(null);
            dispatch({
                type:SET_ACCOUNT,
                payload:{isAuthenticated:false, account:null}
            })
        }
    }
    useEffect(()=>loadAccount(),[])
    const loginAccount= async (accountForm) =>{
        try {
            const response = await axios.post(`${apiUrl}/accounts/login`,accountForm);
            if(response.data.success){
                localStorage.setItem(
                    LOCAL_STORAGE_ACCOUNT_NAME,
                    response.data.accessToken
                )
            }
            await loadAccount();
            return response.data;
        } catch (e) {
            return e.response.data ? e.response.data: ({success:false,message:e.message});
        }
    }
    const logoutAccount= ()=>{
        localStorage.removeItem(LOCAL_STORAGE_ACCOUNT_NAME);
        dispatch({
            type:SET_ACCOUNT,
            payload:{isAuthenticated:false,account:null}
        });
    }



    const accountContextData={accountState,loginAccount,logoutAccount}
    return (
        <AccountContext.Provider value={accountContextData}>
            {children}
        </AccountContext.Provider>
    )
}
export default AccountContextProvider;