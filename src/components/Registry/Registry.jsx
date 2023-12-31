import React from 'react';
import './Registry.scss';
import { Link, useLocation } from 'react-router-dom';
import WhatsAppIcon from '../../general_comps/whatsapp_icon/whatsappIcon';

function Registry({ pages, onPageSelect, setShowRegistry, setDropDownActive }) {

    function handleLanguageClick() {
    }

    const location = useLocation().pathname;

    return (
        <div className="registry-container text-center">
            {location === "/flipbook" ?
                <ul>
                    {pages.map((page, index) => (
                        <li key={page.id || index}>
                            <button onClick={() => {
                                onPageSelect(index)
                                setShowRegistry(false)
                                setTimeout(() => {
                                    setDropDownActive(false)
                                }, 500)
                            }}>{page.title}</button>
                        </li>
                    ))}
                </ul>
                : null
            }
            <Link to={"/"} className="language-switcher" onClick={handleLanguageClick}>
                🌐
            </Link>

            <WhatsAppIcon className="whatsapp-icon" phoneNumber={'41786536543'} />



        </div>
    );
}

export default Registry;
