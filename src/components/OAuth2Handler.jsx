import React, { Component, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { setCredentials, setUserInfo } from '../features/auth/authSlice';
import { useGetUserInfoMutation } from '../features/auth/authApiSlice';
import Cookies from 'universal-cookie';

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();
    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const access_token = urlParams.get('access_token')
    const refresh_token = urlParams.get('refresh_token')
    const cookies = new Cookies();
    cookies.set('java_jwt', refresh_token, { path: '/', secure: true, maxAge: 2592000})
    const error =  urlParams.get('error')
    const [getUserInfo] = useGetUserInfoMutation();
    

    const dispatch = useDispatch();

    useEffect(() => {
        const handleUserInfo = async () => {
            if(refresh_token) {
                console.log({refresh_token})
            }
            if(access_token) {
                try {
                    dispatch(setCredentials({ accessToken: access_token, user: null}));
                    const res = await getUserInfo({token: access_token}).unwrap();
                    dispatch(setUserInfo({ user: res}))
                }
                catch(err) {
                    console.log(err);
                }
                
                navigate('/'); 
            } else {
                navigate('/login'); 
            }
        }

        handleUserInfo();
    }, [])
    return (
        <div>
            <h1>Loading...</h1>
        </div>
    )
}

export default OAuth2RedirectHandler;