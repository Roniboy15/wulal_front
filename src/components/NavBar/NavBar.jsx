import React, { useState } from 'react';
import './NavBar.scss';
import Registry from '../Registry/Registry';
import useWindowWidth from '../../general_comps/useWidth';

function NavBar({ pages, lang, onPageSelect, setDropDownActive, dropDownActive }) {
    const [showRegistry, setShowRegistry] = useState(false);
    const width = useWindowWidth();

    return (
        <nav className="navbar">
            <a className="navbar-brand text-center" href="/">
                {/* <h2>🦁</h2> */}
                {/* {lang == "deutsch" ?
                    <h4>Wake up Like a Lion <br />
                        Im Andenken an Josh Carr z”l</h4>
                    :
                    <h4>Wake up Like a Lion <br />
                        In loving memory of Josh Carr z”l</h4>
                } */}
                <img width={width < 500 ? 200 : 250} src='https://res.cloudinary.com/dg4sxlbfs/image/upload/v1693400461/wulal/091596CA-1BB3-4C99-9A78-25308D9CDA3D_xiqj8i.jpg'></img>

            </a>

            <button className="navbar-toggler" type="button" onClick={() => {
                setShowRegistry(!showRegistry)
                setDropDownActive(!dropDownActive)
            }
            }
            >
                <span className={`navbar-toggler-icon ${showRegistry ? 'bg-wulal' : ''}`}></span>
            </button>

            <h6 id="bzh"
            >בס“ד</h6>

            <div className={`Registry`}>
                {showRegistry && <Registry pages={pages} onPageSelect={onPageSelect} setShowRegistry={setShowRegistry} setDropDownActive={setDropDownActive}/>}
            </div>

        </nav>
    );
}
export default NavBar;
