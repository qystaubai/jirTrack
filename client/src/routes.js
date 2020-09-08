import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {AuthPage} from "./page/authPage";
import {SignUpPage} from "./page/signUpPage";
import {MainPage} from "./page/MainPage";

export const Routes = (isAuth) => {
    if (!isAuth) {
        return (

            <Switch>
                <Route path={`/auth`} component={AuthPage} exact />
                <Route path={`/signup`} component={SignUpPage} exact />
                <Redirect to={'/auth'}/>
            </Switch>
        )

    }
    return (
        <Switch>
            <Route path={`/`} component={MainPage} exact />
            <Redirect to={`/`} />
        </Switch>
    )
}