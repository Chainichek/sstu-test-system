import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from 'axios';

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Home from '../pages/Home';
import Tests from '../pages/Tests';
import ActiveTest from '../pages/ActiveTest';
import Result from '../pages/Result';
import Guid from '../pages/Guid';

import setAuthTokenStored from '../components/setTokenStored';

export default function Header() {

    /* авторизация через модальное окно */ 
    const [open, setOpen] = React.useState(false);
    const [open2, setOpenRemind] = React.useState(false);
    const [open3, setOpenWrongPass] = React.useState(false);
    const baseURL = "https://maile.fita.cc";

    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const handleClickOpenRemind = () => {
        setOpenRemind(true);
    }
    const handleCloseRemind = () => {
        setOpenRemind(false);
    }

    const handleCloseWrongPass = () => {
        setOpenWrongPass(false);
    }


    const handleAuth = () => {  //Запрос авторизации
        const loginPayload = {
            "login": document.getElementById("name").value,
            "password": document.getElementById("pass").value
        }
        console.log(loginPayload);
        localStorage.removeItem("accessToken");
        delete axios.defaults.headers.common["Authorization"];

        axios.post(baseURL + '/auth/login', loginPayload)
            .then(function (response) {
                //console.log(response);
                const token = response.data.accessToken;
                localStorage.setItem("accessToken", token);
                setAuthTokenStored();
                //console.log(token);

                //setAuthToken(token);
                //localStorage.getItem("token") ? flag=true : flag=false
            })
            .catch((err) => {
                if (err.toJSON().status === 500) {
                    setOpenWrongPass(true);
                }
                console.log(err);
            });
        setOpen(false);
    }

  return (
    <>

        <header>
            <div className="container">
                <div className="header-inner">

                      <div className="logo">&nbsp;Система тестирования&nbsp;АИСТ</div>

                    <div>
                        <nav>
                            <a className="nav-link" href="/"> &nbsp;Домашняя страница&nbsp;</a>
                            <a className="nav-link" href="/tests"> &nbsp;Тестирование&nbsp; </a>

                            <a className="nav-link" onClick={handleClickOpen}> &nbsp;Авторизация&nbsp; </a>
                            <Dialog open={open} onClose={handleClose} aria-labelledby="authorization">
                               <DialogTitle id="authorization">Авторизация</DialogTitle> 
                                <DialogContent>
                                    <DialogContentText>Авторизуйтесь для работы в системе</DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Логин"
                                        type="text"
                                        fullWidth
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="pass"
                                        label="Пароль"
                                        type="password"
                                        fullWidth
                                    />
                                </DialogContent>

                                <DialogActions>
                                    <Button onClick={handleClickOpenRemind} color="primary">Забыли логин или пароль?</Button>
                                </DialogActions>

                                <DialogActions>     
                                    <Button onClick={handleAuth} color="primary">Авторизация</Button>  
                                </DialogActions>

                            </Dialog>

                            <Dialog open={open2} onClose={handleCloseRemind} aria-labelledby="reminder">
                               <DialogTitle id="reminder">Восстановление данных</DialogTitle> 
                                <DialogContent>
                                    <DialogContentText>Введите почту для восстановления своих данных</DialogContentText>
                                    <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Почта"
                                    type="email"
                                    fullWidth
                                    />
                                </DialogContent>                      
                                <DialogActions>
                                    <Button onClick={handleCloseRemind} color="primary">Напомнить данные</Button>
                                </DialogActions>
                            </Dialog>

                            <Dialog open={open3} onClose={handleCloseWrongPass} aria-labelledby="warning">
                                <DialogTitle id="warning">Ошибка</DialogTitle> 
                                <DialogContent>
                                    <DialogContentText>Логин или пароль введены неверно.</DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                      <Button onClick={() => { setOpenWrongPass(false); setOpen(true); } } color="primary">Ввести заново</Button>                           
                                </DialogActions>
                            </Dialog>


                        </nav>
                    </div>
                </div>
            </div>
        </header>

        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/tests" element={<Tests/>} />
                <Route exact path="/activetest" element={<ActiveTest/>} />
                <Route exact path="/Result" element={<Result/>} />
                <Route exact path="/Guid" element={<Guid/>} />
            </Routes>
        </Router>

    </>
  )
}

//