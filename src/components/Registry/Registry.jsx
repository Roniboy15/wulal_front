import React from 'react';
import './Registry.scss';

function Registry({ pages, onPageSelect, setShowRegistry }) {
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
        </div>
    );
}

export default Registry;
