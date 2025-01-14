import React from 'react'
import PictureA from './PictureA'

export default function ASorting({ cnt, aid_arr, aname, anum, picture }) {

    let componentsArr = [];
    for (let i = 0; i < cnt; i++) {
        componentsArr.push(<option key={i} value={aid_arr[i]}>{i + 1}</option>);
    }
    
    return (
        /* 
        Компонент выбора ответа вопроса с сортировкой
        */

        <div className="matches">
            <label className="accesshide"><PictureA src={picture} /> {aname} - </label>

            <select className="orderboxes select custom-select menuquest_897580_0" defaultValue={anum}>
                {componentsArr}
            </select><br/>
            <br/>
        </div>

    )
}