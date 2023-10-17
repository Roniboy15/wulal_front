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
        <BrowserRouter>
            <div className="App">

                <Routes>
                    {/* Route for Language Selection */}
                    <Route path="/" element={
                        <LanguageSelection
                            setShowLangBtn={setShowLangBtn}
                            handleLanguageSelection={handleLanguageSelection}
                            width={width}
                            fetchQuotes={fetchQuotes}
                            showLangBtn={showLangBtn}
                        />}
                    />

                    {/* Route for FlipBook */}
                    <Route path="/flipbook" element={loadingPrayers ? <Loader /> :
                        <>
                            <NavBar
                                pages={prayers}
                                lang={language}
                                onPageSelect={setCurrentPage}
                                setDropDownActive={setDropDownActive}
                                dropDownActive={dropDownActive}

                            />
                            <FlipBook
                                className='mt-5'
                                pages={prayers}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                dropDownActive={dropDownActive}
                            />
                        </>
                    } />


                    {/* Route for Quotes */}
                    <Route path="/quotes" element={loadingQuotes ? <Loader /> :
                        <>
                            <NavBar
                                lang={language}
                                setDropDownActive={setDropDownActive}
                                dropDownActive={dropDownActive}

                            />
                            <Quotes quotesData={quotes} />
                        </>
                    } />
                </Routes>
            </div>
        </BrowserRouter>
    );
}



export default App;