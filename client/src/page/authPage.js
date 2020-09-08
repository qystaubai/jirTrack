import React, {useContext, useState} from "react";
import {AuthContext} from '../context/auth.context';
import {useApi} from "../hook/api.hook";
import {Link} from "react-router-dom";

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const {callApi} = useApi();

    const [userInfo, setUserInfo] = useState({
        username: '', password: ''
    })

    const handleChange = (e) => {
        setUserInfo({...userInfo, [e.target.id]: e.target.value});
    }

    const login = async () => {
        try {
            const data = await callApi('/api/auth/login', {...userInfo}, 'POST')
            console.log(data)
            auth.login(data.data.token, data.data.userId)
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <>
            <div className="row">
                <div className="col s6 push-s3">
                    <div className="card">
                        <div className="card-content">
                            <div className="card-title">Вход</div>
                            <p className="right-align teal-text text-lighten-1"><Link to={`/signup`}>Нет аккаунта?</Link></p>
                            <div className="input-field" >
                                <input id="username" onChange={handleChange}/>
                                <label className="active" htmlFor="username">Никнейм</label>
                            </div>
                            <div className="input-field" >
                                <input id="password" type="password" onChange={handleChange}/>
                                <label className="active" htmlFor="password">Пароль</label>
                            </div>
                            <div className="col s12">
                                <button className="btn col s12" onClick={login} disabled={!(userInfo.username && userInfo.password)}>Войти</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}