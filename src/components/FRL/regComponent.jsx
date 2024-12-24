import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { setLogin } from '../../features/authSlice';

import './Login.scss';

export default function RegistrationComponent() {
    const [login, setLog] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function toBase64(str) {
        return btoa(unescape(encodeURIComponent(str)));
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const fetchData = async () => {
            try {
                const response = await axios.post('45.10.246.34:3000/register', { //TODO
                    email: email,
                    login: login,
                    password: pass
                });

                console.log(response.status);

                switch (response.status) {
                    case 200: {
                        const token = toBase64(`${login}: ${pass}`);
                        localStorage.setItem('authToken', token);
                        dispatch(setLogin(token));

                        navigate('/');
                    }

                        break; //TODO

                    case 418:
                        console.log("Пользователь существует!!!");
                        break;

                    default:
                        console.log("Ответ не получен!");
                }
            }
            catch (error) {
                if (error.response) { // Сервер ответил с кодом, который выходит за пределы 2xx 
                    console.error('Ошибка сервера. Код статуса:', error.response.status);
                    console.error('Сообщение об ошибке:', error.response.data);
                }
                else if (error.request) { // Запрос был сделан, но ответа не было получено 
                    console.error('Нет ответа от сервера:', error.request);
                }
                else { // Произошла ошибка при настройке запроса 
                    console.error('Ошибка при настройке запроса:', error.message);
                }
            }
        };
        fetchData();
    }

    return (
        <>
            <div className="EnterComponent">
                <h1 className="EnterTitle">Registration</h1>
                <div className="EnterComponents">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="EnterTextComponent"
                            placeholder="Your login"
                            value={login}
                            onChange={(e) => setLog(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            className="EnterTextComponent"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            className="EnterTextComponent"
                            placeholder="Password"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            required
                        />
                        <button type="submit">Continue</button>
                    </form>
                </div>
                <div className="EnterHelperComponent">
                    <button className="EnterHelperButton" onClick={() => navigate('/login')}>Login</button>
                    <button className="EnterHelperButton" onClick={() => navigate('/forgot')}>Forgot</button>
                </div>
            </div>
        </>
    );
}