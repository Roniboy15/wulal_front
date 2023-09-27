import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FlipBook from './components/FlipBook/FlipBook';
import NavBar from './components/NavBar/NavBar';
import './App.css'
import { doApiGet } from './services/springbootAPI';
import Loader from './general_comps/loader/loader';
import useWindowWidth from './general_comps/useWidth';
import Quotes from './components/Quotes/Quotes';
import LanguageSelection from './components/LanguageSelection/Language';

function App() {

    const [currentPage, setCurrentPage] = useState(localStorage.getItem('savedCurrentPage') ? parseInt(localStorage.getItem('savedCurrentPage'), 10) : 0);
    const [language, setLanguage] = useState();
    const [prayers, setPrayers] = useState([]);
    const [quotes, setQuotes] = useState([]);
    const [loadingPrayers, setLoadingPrayers] = useState(true);
    const [loadingQuotes, setLoadingQuotes] = useState(true);
    const [showMenu, setShowMenu] = useState(true); // New state for language selection visibility
    const [dropDownActive, setDropDownActive] = useState(false);

    const [showLangBtn, setShowLangBtn] = useState(false);

    const width = useWindowWidth();
    const timeoutRef = useRef(null);


    const fetchJSONS = async () => {
        let url = '/file/fetch?folder=' + language;
        try {
            const response = await doApiGet(url);
            response.sort((a, b) => a.id - b.id);

            setPrayers(response);
            setLoadingPrayers(false)

        } catch (err) {
            console.log(err);
        }
    };

    const fetchQuotes = async () => {
        let url = '/file/download/quotes.json';
        try {
            const response = await doApiGet(url);
            // response.sort((a, b) => a.id - b.id);
            setQuotes(response);
            setLoadingQuotes(false)
            setShowMenu(!showMenu)
        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        localStorage.setItem('savedCurrentPage', currentPage);
        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set a new timeout to clear the saved page after one hour
        timeoutRef.current = setTimeout(() => {
            localStorage.removeItem('savedCurrentPage');
        }, 3600000); // 3600000ms is one hour

        // When the component is unmounted or before setting a new timeout, clear the existing one
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [currentPage]);

    useEffect(() => {
        if (language) { // Only fetch when a language is selected
            fetchJSONS();
        }
    }, [language])





    const handleLanguageSelection = (selectedLanguage) => {
        if (selectedLanguage != language) {
            setLoadingPrayers(true)
            setLanguage(selectedLanguage); //this will trigger the useEffect which then calls the fetchJSONS()
        }
    };

    useEffect(() => {
        let timeoutId;
        timeoutId = setTimeout(() => {
            if (loadingPrayers && loadingQuotes) alert("Try to reload or no connection to the server")
            
        }, 10000)

        return () => clearTimeout(timeoutId); // Clear timeout if the component is unmounted or if the effect re-runs
    }, [loadingPrayers, loadingQuotes])

    return (
        <>
            {showLanguageSelection ?
                <div className="language-selection">
                    <div className='row'>
                        <div className='col-12 text-center'>
                            <img width={width < 500 ? 250 : 350} src='https://res.cloudinary.com/dg4sxlbfs/image/upload/v1693400461/wulal/091596CA-1BB3-4C99-9A78-25308D9CDA3D_xiqj8i.jpg'></img>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <button className=' btn-lang' onClick={() => handleLanguageSelection('deutsch')}>Deutsch</button>
                            <button className=' btn-lang' onClick={() => handleLanguageSelection('english')}>English</button>
                        </div>
                    </div>
                </div>
                : (!loading ?
                    <div className="App">
                        <NavBar pages={data} lang={language} onPageSelect={setCurrentPage} setDropDownActive={setDropDownActive} dropDownActive={dropDownActive} />
                        <div className='flipBook'>
                            <FlipBook className='mt-5' pages={data} currentPage={currentPage} setCurrentPage={setCurrentPage} dropDownActive={dropDownActive} />

                        </div>
                    </div>
                    : <Loader />)
            }
        </>
    );

}

export default App;