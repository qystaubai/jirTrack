import React, {useContext} from "react";
import {MainCard} from "../component/MainCard";
import {AuthContext} from "../context/auth.context";
import {TopBar} from "../component/TopBar";

export const MainPage = () => {
    const auth = useContext(AuthContext);

    const logout = () => {
        auth.logout();
    }

    return (
        <>
            <div className="row">
                <TopBar logout={logout} />
                <MainCard />
            </div>
        </>
    )
}