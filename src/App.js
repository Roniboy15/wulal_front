import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppContent from './AppContent'

const App = () => {
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
