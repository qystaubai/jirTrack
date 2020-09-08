import React, {useContext, useEffect, useState} from "react";
import {useApi} from '../hook/api.hook'
import {AuthContext} from "../context/auth.context";

export const PersonCard = (props) => {

    const api = useApi();
    const auth = useContext(AuthContext);

    const [weightGain, setWeightGain] = useState(false);
    const [jirNow, setJirNow] = useState(null);
    const [prevJir, setPrevJir] = useState(null);
    const [newJir, setNewJir] = useState('');

    const handleChange = (e) => {
        setNewJir(e.target.value)
    }

    const getAnswer = async () => {
        const today = new Date();
        const date = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
        await api.callApi('/api/user/track', {id: auth.userId, date: date, weight: newJir}, 'POST');
        props.getJir();
        setNewJir('');
    }

    const updateJirCard = () => {
        if (props.jir) {
        const now = props.jir[props.jir.length-1][1]
        const prev = props.jir[props.jir.length-2][1];
        setJirNow(now);
        setPrevJir(prev);
        if (prev) {
            if (now.weight > prev.weight) {
                setWeightGain(true);
            } else {
                setWeightGain(false);
            }
        }
        }
    }

    useEffect( () => {
    updateJirCard(props.jir);
    }, [props.jir])

    return (
        <>
            <div className="col s12 m4 inner">
            <div className={`card ${!weightGain? 'main-green': 'main-red'}`}>
                <div className="card-content jir-card">
                    <div className='row'>
                    <div className='col s7'>
                        <div className="weight">{jirNow?jirNow.weight: '-'}</div>
                        <div className="date">{jirNow?jirNow.date: '-'}</div>
                    </div>

                    <div className='prevJir col s5'>
                        {prevJir? <>
                            <div className="weight">{prevJir?prevJir.weight: '-'}</div>
                            <div className="date">{prevJir?jirNow.date: '-'}</div>
                        </>:<div>-</div>
                        }
                        <div className="input-field" >
                            <input id="weight" type='number' value={newJir} onChange={handleChange}/>
                            <label className="active" htmlFor="weight">Вес</label>
                        </div>
                        <button className='btn' disabled={!newJir} onClick={getAnswer}>Track</button>
                    </div>

                    </div>
                </div>
            </div>
            </div>
        </>
    )
}