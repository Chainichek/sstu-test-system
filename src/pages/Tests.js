import React, { useState } from 'react'
import { Link } from "react-router-dom";
import Test from '../components/Test'
import axios from 'axios'

const baseURL ="https://maile.fita.cc"

const Tests = () => {
  const [tests, setTests] = useState([]);
  const [buttonClick, setButtonClick] = useState(true); 

  function getTests(){                                          /* Функция  запрашивающая по нажатию кнопки с сервера доступные пользователю тесты */
    setButtonClick(!buttonClick)
    if(buttonClick){
        axios.get(baseURL + "/tests").then((tests) => {
            console.log(tests);
        setTests(tests.data)
      })
    }else{
      setTests([])
    }
  }
 
    return (
        <main>
        <div className="content-block">
            <div className="distant"><h2>Тесты текущего семестра</h2></div>
            
            <button className="accordion" onClick={getTests}>Доступные тесты</button> 
            <div className="panel">
                <div>
              
                  {tests &&
                    tests.map(test => (
                        <Test tid={test.id} name={test.name} status={test.status} method={test.method} />
                    ))   
                  }
                </div>
            </div>

            <div><Link to="/preview/">Информатика 2 курс</Link></div> 

        </div>
    </main>
    )
}

export default Tests
//            <script>
//               var acc = document.getElementsByclassNameName("accordion");
//                var i;

//                for (i = 0; i < acc.length; i++) {
//                    acc[i].addEventListener("click", function() {
//                        this.classNameList.toggle("active");
//                        var panel = this.nextElementSibling;
//                        if (panel.style.maxHeight) {
//                            panel.style.maxHeight = null;
//                        } else {
//                            panel.style.maxHeight = panel.scrollHeight + "px";
//                       }
//                    });
//                }
//            </script>