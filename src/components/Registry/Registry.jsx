import React from 'react';
import './Registry.scss';

function Registry({ pages, onPageSelect, setShowRegistry, setDropDownActive }) {

    function handleLanguageClick() {
        window.location.reload();
    }

    return (
        <div className="registry-container text-center">
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
            <div className="language-switcher" onClick={handleLanguageClick}>
                🌐
            </div>
        </div>
    );
}

export default Registry;
