import React, {useState} from 'react';
import './Header.css';
import LogoutIcon from "@mui/icons-material/Logout.js";


function Header() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

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
                                <button onClick={toggleDropdown} className="dropdown-item">
                                    Выход
                                </button>
                                <LogoutIcon onClick={toggleDropdown} sx={{ fontSize: 15, marginRight:1, cursor: "pointer"}}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;