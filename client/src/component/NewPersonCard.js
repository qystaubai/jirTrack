import React, {useState} from "react";

export const NewPersonCard = () => {

    const [newJir, setNewJir] = useState(null)

    const handleChange = (e) => {
        setNewJir({...newJir, [e.target.id]: e.target.value});
    }


    return (
        <>
            <div className="col s12 m4">
                <div className="card">
                    <div className="card-content">
                        <div className="input-field" >
                            <input id="weight" type='number' onChange={handleChange}/>
                            <label className="active" htmlFor="weight">Вес</label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}