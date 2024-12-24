import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import './Login.scss';

export default function ForgotComponent() {
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()

        const fetchData = async () => {
            try {
                const response = await axios.post('https://api.example.com/data', { //TODO
                    email: email
                });

                switch (response.status) {
                    case 200:
                        break; //TODO

                    case 418:
                        console.log("ПЗаебс!!!");
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
                <h1 className="EnterTitle">Forgot</h1>
                <div className="EnterComponents">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            className="EnterTextComponent"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit">Continue</button>
                    </form>
                </div>
                <div className="EnterHelperComponent">
                    <button className="EnterHelperButton" onClick={() => navigate('/login')}>Login</button>
                    <button className="EnterHelperButton" onClick={() => navigate('/register')}>Register</button>
                </div>
            </div>
        </>
    );
}