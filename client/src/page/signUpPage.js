import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import {useApi} from "../hook/api.hook";

export const SignUpPage = () => {

    const api = useApi();

    const [userInfo, setUserInfo] = useState({});
    const [passEqual, setPassEqual] = useState({touched: false, equal: false});

    const handleChange = (e) => {
        setUserInfo({...userInfo, [e.target.id]: e.target.value});
        if (userInfo.password === userInfo.passCheck) {
            setPassEqual({...passEqual, equal: true});
        }
    }

    const register = () => {
        api.callApi('/api/auth/register', userInfo, 'POST')
            .then((r) => {
                if (r.status === 201) {
                    window.location.href = '/auth'
                }
            })
        console.log(userInfo);
    }

    const passCheck = () => {
        if (userInfo.passCheck === userInfo.password) {
            setPassEqual({touched: true, equal: true});
        } else {
            setPassEqual({touched: true, equal: false});
        }
    }

    useEffect(() => {
        passCheck()},
        [userInfo.password, userInfo.passCheck])



    return (
        <>
            <div className="row">
                <div className="col s12 m6 push-m3">
                    <div className="card">
                        <div className="card-content">
                            <div className="card-title">Регистрация</div>
                            <p className="right-align teal-text text-lighten-1"><Link to={`/auth`}>Уже есть аккаунт?</Link></p>
                            <div className="input-field" >
                                <input id="username" onChange={handleChange}/>
                                <label className="active" htmlFor="username">Никнейм</label>
                            </div>
                            <div className="input-field" >
                                <input id="password" type="password" onChange={handleChange}/>
                                <label className="active" htmlFor="password">Пароль</label>
                            </div>
                            <div className="input-field">
                                <input id="passCheck" type="password" onChange={handleChange}/>
                                <label className="active" htmlFor="passCheck">Повторите Пароль</label>
                                <span className={`helper-text red-text ${passEqual.touched && !passEqual.equal?'': 'hide'}`}>Пароли должны совпадать</span>
                            </div>
                            <div className="col s12">
                                <button className="btn col s12" onClick={register} disabled={!(userInfo.username && userInfo.password && passEqual.equal)}>Зарегистрироваться</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}