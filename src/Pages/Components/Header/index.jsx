import React, {useState} from 'react';
import './Header.css';
import LogoutIcon from "@mui/icons-material/Logout.js";
import {useLocalState} from "../../useLocalStorage/index.js";


function Header() {

    const [isOpen, setIsOpen] = useState(false);
    const [jwt, setJwt] = useLocalState('', 'jwt')


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const LogOut = () => {
        setJwt(null)
        window.location.href = "login"
    }


    const handleOptionClick = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <div className="wrapper">
                <div className="container">
                    <a href="/"><div className="logo"></div></a>
                    <div className="dropdown">
                        <button onClick={toggleDropdown} className="dropdown-toggle">
                            Имя пользователя
                        </button>
                        {isOpen && (
                            <div className="dropdown-menu" onClick={() => handleOptionClick()}>
                                <div onClick={toggleDropdown} >
                                   <button className="dropdown-item" onClick={LogOut}> Выход <LogoutIcon onClick={toggleDropdown} sx={{ fontSize: 15, marginLeft:1, cursor: "pointer"}}/> </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;