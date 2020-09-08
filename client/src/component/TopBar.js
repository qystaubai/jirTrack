import React from "react";

export const TopBar = (props) => {

    return (
        <>
            <div className='top-bar row text-light'>
                <button className="btn exit col s1" onClick={props.logout}>
                    <i className="material-icons">exit_to_app</i>
                </button>
                <div className='col s11'> textin bitchin</div>
            </div>
        </>
    )
}