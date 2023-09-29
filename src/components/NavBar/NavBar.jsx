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
                <img width={width < 500 ? 200 : 250} src={lang == "deutsch" ? `https://res.cloudinary.com/dg4sxlbfs/image/upload/v1695978355/wulal/WhatsApp_Image_2023-09-29_at_12.05.07_peesu4.jpg`: `https://res.cloudinary.com/dg4sxlbfs/image/upload/v1695978355/wulal/WhatsApp_Image_2023-09-29_at_12.05.07_1_akvzot.jpg`}></img>

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
