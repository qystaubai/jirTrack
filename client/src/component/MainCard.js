import React, {useContext, useEffect, useState} from "react";
import {PersonCard} from "./PersonCard";
import {GraphCard} from "./GraphCard";
import {AuthContext} from "../context/auth.context";
import {useApi} from "../hook/api.hook";

export const MainCard = () => {

    const [jirData, setJirData] = useState(null)


    const auth = useContext(AuthContext);
    const api = useApi();

    const getJir = async () => {
        if(auth.userId) {
            const jir = await api.callApi('/api/user/jir/' + auth.userId, {id: auth.userId}, 'GET')
            setJirData(jir.data);
        }
    }

    useEffect(() => {
        getJir()
    }, [auth.userId])

    return (
        <>
            <div className="col s12">
                <div className="card main-card">
                    <div className="card-content main-content">
                            <div className='row'>
                                <PersonCard jir={jirData} getJir={getJir}/>
                                <GraphCard jir={jirData}/>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}