import React, { useState } from 'react';
import './NavBar.scss';
import Registry from '../Registry/Registry';

function NavBar({ pages, lang, onPageSelect }) {
    const [showRegistry, setShowRegistry] = useState(false);

    return (
        <nav className="navbar ">
            <a className="navbar-brand text-center" href="/">
                <h2>🦁</h2>
                {lang == "deutsch" ?
                    <h4>Wake up Like a Lion <br />
                        Im Andenken an Josh Carr z”l</h4>
                    :
                    <h4>Wake up Like a Lion <br />
                        In loving memory of Josh Carr z”l</h4>
                }
            </a>

            <button className="navbar-toggler" type="button" onClick={() => setShowRegistry(!showRegistry)}>
                <span className={`navbar-toggler-icon ${showRegistry? 'bg-wulal' : ''}`}></span>
            </button>

            <h6 id="bzh"
            >בס“ד</h6>

            <div className='Registry'>
                {showRegistry && <Registry pages={pages} onPageSelect={onPageSelect} setShowRegistry={setShowRegistry} />}
            </div>

        </nav>
    );
}
export default NavBar;
