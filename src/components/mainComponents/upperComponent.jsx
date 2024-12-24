import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import './mainComponent.scss';

export default function UpperComponent() {

    const navigate = useNavigate();
    const location = useLocation();

    const [currentId, setCurrentId] = useState(1);

    let upperButtons = useRef([
        { url: "/", text: "Главная" },
        { url: "/channels", text: "Каналы" },
        { url: "/settings", text: "Настройки" },
        { url: "/exit", text: "Выйти" },
    ]);

    const navigateTo = (id, url) => {
        setCurrentId(id);
        navigate(url);
    };

    useEffect(() => {

        console.log(`currentId: ${currentId}`);
    }, [currentId]);

    return (
        <>
            <div className="">
                {upperButtons.current.map((button, index) => (
                    <button className={`upperMainButtons ${location.pathname === button.url ? "active" : "disable"}`} key={index} onClick={() => navigateTo(button.id, button.url)}>{button.text}</button>
                ))}
            </div>
        </>
    );
}