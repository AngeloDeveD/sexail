import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setLogin } from '../../features/authSlice';
import axios from 'axios';

import './Login.scss';

export default function LoginComponent() {

    const [login, setLog] = useState('');
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
                const response = await axios.get('45.10.246.34:3000/profile', {
                    headers: {
                        'Authorization': `Basic ${toBase64(`${login}: ${pass}`)}`
                    }
                }); // Замените URL на ваш эндпоинт 

                if (response.status === 200) {
                    const token = toBase64(`${login}: ${pass}`);
                    localStorage.setItem('authToken', token);
                    dispatch(setLogin(response.data.login));

                    console.log(`Данные: ${toBase64(`${login}: ${pass}`)} добавлена в localstorage`)

                    console.log("Перенаправление на /")
                    navigate('/');
                }

                console.log(response.status);
            }
            catch (error) {
                //setError(error);
                console.error('Ошибка при настройке запроса:', error.message);
            }
        };
        fetchData();
    }

    return (
        <>
            <div className="EnterComponent">
                <h1 className="EnterTitle">Login</h1>
                <div className="EnterComponents">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="EnterTextComponent"
                            placeholder="Login"
                            value={login}
                            onChange={(e) => setLog(e.target.value)}
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
                        <button type="submit">Enter</button>
                    </form>
                </div>
                <div className="EnterHelperComponent">
                    <button className="EnterHelperButton" onClick={() => navigate('/register')}>Register</button>
                    <button className="EnterHelperButton" onClick={() => navigate('/forgot')}>Forgot</button>
                </div>
            </div>
        </>
    );
}