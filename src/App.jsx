import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import axios from 'axios';

import LoginComponent from './components/FRL/loginComponent';
import RegistrationComponent from './components/FRL/regComponent';
import ForgotComponent from './components/FRL/forgotComponent';
import MainComponent from './components/mainComponents/mainComponent';

import Error404 from './components/404';

import './App.scss'

const App = () => {

  const [userID, setUserID] = useState(useSelector((state) => state.auth.login));

  useEffect(() => {
    const user = localStorage.getItem('authToken');

    console.log(`user: ${user}`);

    if (user) {
      const fetchData = async () => {
        try {
          const response = await axios.get('45.10.246.34:3000/profile', {
            headers: {
              'Authorization': `Basic ${user}`
            }
          }); // Замените URL на ваш эндпоинт 

          if (response.status === 200) {
            setUserID(user);
          }
          console.log(response.status);
        }
        catch (error) {
          //setError(error);
          console.error('Ошибка при настройке запроса:', error.message);
          localStorage.removeItem('authToken');
        }
      };
      fetchData();
    }
  }, [userID]);

  return (
    <>
      <div className={`${!userID ? "login_page" : "main_page"}`}>
        <Routes>
          <Route path='/' element={userID !== 0 ? <MainComponent /> : <Navigate to={"/login"} />} />
          <Route path='/login' element={userID !== 0 ? <MainComponent /> : <LoginComponent />} />
          <Route path='/register' element={userID !== 0 ? <MainComponent /> : <RegistrationComponent />} />
          <Route path='/forgot' element={userID !== 0 ? <MainComponent /> : <ForgotComponent />} />

          <Route path='/channels' element={userID !== 0 ? <MainComponent /> : <Navigate to={"/"} />} />
          <Route path='/settings' element={userID !== 0 ? <MainComponent /> : <Navigate to={"/"} />} />
          <Route path='/exit' element={userID !== 0 ? <MainComponent /> : <Navigate to={"/"} />} />
          <Route path='*' element={<Error404 />} />
        </Routes>

      </div>
    </>
  )
}

export default App;
