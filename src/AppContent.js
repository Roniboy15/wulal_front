import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import FlipBook from './components/FlipBook/FlipBook';
import NavBar from './components/NavBar/NavBar';
import './App.css'
import { doApiGet } from './services/springbootAPI';
import Loader from './general_comps/loader/loader';
import useWindowWidth from './general_comps/useWidth';
import Quotes from './components/Quotes/Quotes';
import LanguageSelection from './components/LanguageSelection/Language';

function AppContent() {

    const [currentPage, setCurrentPage] = useState(localStorage.getItem('savedCurrentPage') ? parseInt(localStorage.getItem('savedCurrentPage'), 10) : 0);
    const [language, setLanguage] = useState();
    const [prayers, setPrayers] = useState([]);
    const [quotes, setQuotes] = useState([]);
    const [loadingPrayers, setLoadingPrayers] = useState(true);
    const [loadingQuotes, setLoadingQuotes] = useState(true);
    const [showMenu, setShowMenu] = useState(true); // New state for language selection visibility
    const [dropDownActive, setDropDownActive] = useState(false);
    const [hasAttemptedLoading, setHasAttemptedLoading] = useState(false);

    const [showLangBtn, setShowLangBtn] = useState(false);

    const width = useWindowWidth();
    const timeoutRef = useRef(null);

    const nav = useNavigate();  // Initialize the useHistory hook

    const location = useLocation();

    let timeoutId;

    useEffect(() => {
        if(loadingPrayers === true){
            alert("jetztz")
        console.log(loadingPrayers, loadingQuotes);
        }
      }, [loadingPrayers]);
      

    useEffect(() => {
        if (location.pathname == "/") {
            setHasAttemptedLoading(false)
        }
    }, [location])


    const fetchJSONS = async () => {
        let url = '/file/fetch?folder=' + language;
        try {
            const response = await doApiGet(url);
            response.sort((a, b) => a.id - b.id);
            setPrayers(response);
            setLoadingPrayers(false)
            clearTimeout(timeoutId);

        } catch (err) {
            console.log(err);
        }
    };

    const fetchQuotes = async () => {
        setHasAttemptedLoading(true)
        setLoadingQuotes(true)
        let url = '/file/download/quotes.json';
        try {
            const response = await doApiGet(url);
            // response.sort((a, b) => a.id - b.id);
            setQuotes(response);
            setShowMenu(!showMenu)
            setHasAttemptedLoading(false)
            setLoadingQuotes(false)
            clearTimeout(timeoutId);

        } catch (err) {
            console.log(err);
        }
        setTimeout(() => {
            setHasAttemptedLoading(false)
        }, 11000)
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

        setLoadingPrayers(true);
        setHasAttemptedLoading(true);
        setLanguage(selectedLanguage);  // Then set to the desired language
        setTimeout(() => {
            setHasAttemptedLoading(false)
        }, 11000)
    };




    useEffect(() => {

        if (!hasAttemptedLoading) return;
    
        timeoutId = setTimeout(() => {
            if (loadingPrayers && loadingQuotes) {
                console.log(loadingPrayers, loadingQuotes)
                alert("Try to reload or no connection to the server");
                setShowLangBtn(false)
                nav("/")
            }
        }, 10000);
    
        // Here we return a cleanup function that clears the timeout if either loadingPrayers or loadingQuotes becomes false (data has loaded).
        return () => clearTimeout(timeoutId);
    }, [hasAttemptedLoading, loadingPrayers, loadingQuotes]);
    


    return (
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
    );
}



export default AppContent;