import React, { useEffect, useState } from 'react';
import FlipBook from './components/FlipBook/FlipBook';
import NavBar from './components/NavBar/NavBar';
import './App.css'
import { doApiGet } from './services/springbootAPI';
import Loader from './general_comps/loader/loader';

function App() {

    const [currentPage, setCurrentPage] = useState(0);
    const [language, setLanguage] = useState();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showLanguageSelection, setShowLanguageSelection] = useState(true); // New state for language selection visibility


    const fetchJSONS = async () => {
        let url = '/file/fetch?folder=' + language;
        try {
            const response = await doApiGet(url);
            setData(response);
            setLoading(false)
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (language) { // Only fetch when a language is selected
            fetchJSONS();
        }
    }, [language])

    const handleLanguageSelection = (selectedLanguage) => {
        setLanguage(selectedLanguage);
        setShowLanguageSelection(false); // Hide language selection screen
    };

    useEffect(() => {
        let timeoutId;
        if (!showLanguageSelection) {
            timeoutId = setTimeout(() => {
                if (loading) alert("Try to reload or no connection to the server")
            }, 10000)
        }
        return () => clearTimeout(timeoutId); // Clear timeout if the component is unmounted or if the effect re-runs
    }, [showLanguageSelection, loading])
    

    return (
        <>
            {showLanguageSelection ?
                <div className="language-selection">
                    <button className=' btn-lang' onClick={() => handleLanguageSelection('deutsch')}>Deutsch</button>
                    <button className=' btn-lang' onClick={() => handleLanguageSelection('english')}>English</button>
                </div>
                : (!loading ?
                    <div className="App">
                        <NavBar pages={data} lang={language} onPageSelect={setCurrentPage} />
                        <FlipBook className='mt-5' pages={data} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </div>
                    : <Loader />)
            }
        </>
    );

}

export default App;
