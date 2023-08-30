import React, { useRef, useEffect, useState } from 'react';
import './FlipBook.scss';
import useWindowWidth from '../../general_comps/useWidth';
import getAdaptiveFontSize from '../../general_comps/fontSize';

function FlipBook({ pages, currentPage, setCurrentPage, dropDownActive }) {

    const flipBookRef = useRef(null);
    const pageContentRef = useRef(null); // ref for the page-content div
    const [bookHeight, setBookHeight] = useState(2000); // default height

    let width = useWindowWidth();
    const [windowWidth, setWindowWidth] = useState(undefined);

    const [startX, setStartX] = useState(0);  // Store the initial touch position



    useEffect(() => {
        setWindowWidth(width - 50);

        // Set the height of the book based on the height of the page-content div
        if (pageContentRef.current) {
            setBookHeight(pageContentRef.current.offsetHeight);
        }
    }, []);

    let upLeftFontSize = getAdaptiveFontSize(pages[currentPage].up_left, width < 500 ?500 : 180);
    let upRightFontSize = getAdaptiveFontSize(pages[currentPage].up_right, width < 500 ? 500 : 180);
    let middleLeftFontSize = getAdaptiveFontSize(pages[currentPage].middle_left, width < 450 ? 700 : 300);
    let middleRightFontSize = getAdaptiveFontSize(pages[currentPage].middle_left, width < 450 ? 700 : 300);
    let quoteFontSize = getAdaptiveFontSize(pages[currentPage].middle_left, width < 500 ? 600 : 300);


      // Helper function to go to the next page
      const goToNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Helper function to go to the previous page
    const goToPreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    useEffect(() => {
        const handleInteractionEnd = (e) => {
            if (dropDownActive || e.target.closest('.navbar-toggler')) {
                return;
            }
    
            let endX = e.clientX;
    
            if (endX < window.innerWidth / 2) {
                goToPreviousPage();
            } else {
                goToNextPage();
            }
        };
    
        document.addEventListener('click', handleInteractionEnd);
        
        return () => {
            document.removeEventListener('click', handleInteractionEnd);
        };
    }, [currentPage, pages.length, dropDownActive]);
    
    

    return (
        <div className="flipbook-container mt-5">
            <div ref={pageContentRef} className="page-content container-fluid">
                <div className='row justify-content-around'>
                    <div className="section up-left col-12 col-md-5" >
                        <p style={{ fontSize: upLeftFontSize }} className="paragraph ">
                            <span className='title-bold'>{pages[currentPage].up_left_bold}{" "}</span>
                            {pages[currentPage].up_left}
                        </p>
                    </div>
                    <div className="section up-right col-12 col-md-5">
                        <p style={{ fontSize: upRightFontSize }} className="paragraph ">
                            <span className='title-bold'>{pages[currentPage].up_right_bold}{" "}</span>
                            {pages[currentPage].up_right}
                        </p>
                    </div>
                </div>
                <div className='row justify-content-around'>
                    <div className="section middle-left col-12 col-md-11 mt-1">
                        <p style={{ fontSize: middleLeftFontSize }} className="paragraph">
                            {pages[currentPage].middle_left}
                        </p>
                    </div>
                    <div className="section middle-right col-12 col-md-11 mt-5">
                        <p style={{ fontSize: middleRightFontSize }} className="paragraph">
                            {pages[currentPage].middle_right}
                        </p>
                    </div>
                    <div className='row justify-content-around'>
                        <blockquote className="quote-section col-12 col-md-9 mt-5 rounded-3">
                            <p style={{ fontSize: quoteFontSize, marginTop: "2vh" }} >
                                {pages[currentPage].quote}
                            </p>
                            <cite>{pages[currentPage].author}</cite>
                        </blockquote>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default FlipBook;