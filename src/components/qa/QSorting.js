import React from 'react'
import ASorting from './ASorting'
import PictureQ from './PictureQ'

export default function QSorting({ qname, cnt, a_arr, Qpic }) {
    
    let componentsArr = [];
    let aids = [];
    let i;

    for (i = 0; i < cnt; i++) {
        aids.push(a_arr[i].id);
    }

    /*for (i = 0; i < a_arr.length; i++) {
        console.log(a_arr[i].number);
    }*/

    for (i = 0; i < cnt; i++) {
        componentsArr.push(<li key={i}><ASorting cnt={cnt} aid_arr={aids} aname={a_arr[i].answer} anum={a_arr[i].number} /></li>);
    }

    return (
        /* 
        Компонент условия вопроса с сортировкой
        ДОБАВИТЬ картинку в ОТВЕТ
        */

        <div>
                
                <div className="question">
                    <br/>
                <p className="questiontext">{qname}</p>
                <br />
                <PictureQ src={Qpic} />
                <br />
                
                    <ul className="match">{componentsArr}</ul>

                </div>
                <br />

        </div>

    )
}