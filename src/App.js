import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppContent from './AppContent'

const App = () => {
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
