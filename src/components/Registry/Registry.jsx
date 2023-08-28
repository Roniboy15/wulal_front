import React from 'react';
import './Registry.scss';

function Registry({ pages, onPageSelect, setShowRegistry }) {

    function handleLanguageClick() {
        window.location.reload();
    }
    
    return (
        <div className="registry-container text-center">
            <ul>
                {pages.map((page, index) => (
                    <li key={page.id  || index}>
                        <button onClick={() => {
                            onPageSelect(index)
                            setShowRegistry(false)
                            console.log(index)
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
