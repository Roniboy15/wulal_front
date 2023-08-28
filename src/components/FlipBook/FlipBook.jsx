import React, { useRef, useEffect, useState } from 'react';
import HTMLFlipBook from "react-pageflip";
import './FlipBook.scss';
import useWindowWidth from '../../general_comps/useWidth';
import getAdaptiveFontSize from '../../general_comps/fontSize';

function FlipBook({ pages, currentPage, setCurrentPage }) {

    const flipBookRef = useRef(null);
    const bookArea = useRef(null);
    const pageContentRef = useRef(null); // ref for the page-content div
    const [bookHeight, setBookHeight] = useState(2000); // default height

    let width = useWindowWidth();
    const [windowWidth, setWindowWidth] = useState(undefined);

    const [startX, setStartX] = useState(0);  // Store the initial touch position

    useEffect(() => {
        let startY = 0;

        const handleTouchStart = (e) => {
            startY = e.touches[0].clientY;
        };

        const handleTouchMove = (e) => {
            const threshold = 10;  // Adjust this value based on sensitivity preference
            const currentY = e.touches[0].clientY;
            const differenceY = startY - currentY;

            if (Math.abs(differenceY) > threshold) {
                // Manually scroll the document
                window.scrollBy(0, differenceY);
                
                // Prevent default touch move behavior
                e.preventDefault();
            }
        };

        document.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('touchmove', handleTouchMove, { passive: false });  // Set passive to false to enable e.preventDefault()

        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);
    // useEffect(() => {
    //     const handleTouchStart = (e) => {
    //         if (!bookArea.current.contains(e.target)) {
    //             // If the touch started outside the flipbook, return early
    //             return;
    //         }
    //         setStartX(e.touches[0].clientX);  // Store the initial touch position
    //     };
    
    //     const handleTouchEnd = (e) => {
    //         if (!bookArea.current.contains(e.target)) {
    //             // If the touch ended outside the flipbook, return early
    //             return;
    //         }
    //         const endX = e.changedTouches[0].clientX;
    //         const distance = Math.abs(startX - endX);
    
    //         if (distance < 50) {  // This is the threshold; adjust as needed
    //             e.preventDefault();  // Prevent the default behavior
    //         }
    //     };
    
    //     // Add the event listeners
    //     document.addEventListener('touchstart', handleTouchStart);
    //     document.addEventListener('touchend', handleTouchEnd);
    
    //     // Cleanup the event listeners
    //     return () => {
    //         document.removeEventListener('touchstart', handleTouchStart);
    //         document.removeEventListener('touchend', handleTouchEnd);
    //     };
    // }, [startX]);
    
    


    useEffect(() => {
        setWindowWidth(width - 50);

        // Set the height of the book based on the height of the page-content div
        if (pageContentRef.current) {
            setBookHeight(pageContentRef.current.offsetHeight);
        }
    }, []);

    let upLeftFontSize = getAdaptiveFontSize(pages[currentPage].up_left, width < 500 ? 400 : 180);
    let upRightFontSize = getAdaptiveFontSize(pages[currentPage].up_right, width < 500 ? 400 : 180);
    let middleLeftFontSize = getAdaptiveFontSize(pages[currentPage].middle_left, width < 450 ? 500 : 300);
    let middleRightFontSize = getAdaptiveFontSize(pages[currentPage].middle_left, width < 450 ? 500 : 300);
    let quoteFontSize = getAdaptiveFontSize(pages[currentPage].middle_left, width < 500 ? 300 : 300);

    useEffect(() => {
        console.log("currentPage updated to:", currentPage);
        if (flipBookRef.current && flipBookRef.current.pageFlip()) {
            flipBookRef.current.pageFlip().turnToPage(currentPage);
        }
    }, [currentPage]);


    return (
        <div ref={bookArea} className="flipbook-container mt-5">
            <HTMLFlipBook
                ref={flipBookRef}
                className='book'
                width={windowWidth}
                height={bookHeight}
                mobileScrollSupport={false}
                onFlip={(e) => setCurrentPage(e.data)}

            >
                {pages.map((page, index) => {

                    return (
                        <div ref={pageContentRef} key={index} className="page-content container-fluid">
                            <div className='row justify-content-around'>
                                <div className="section up-left col-12 col-md-5" >
                                    <p style={{ fontSize: upLeftFontSize }} className="paragraph "><span className='title-bold'>{page.up_left_bold}{" "}</span>{page.up_left}</p>
                                </div>
                                <div className="section up-right col-12 col-md-5">
                                    <p style={{ fontSize: upRightFontSize }} className="paragraph "><span className='title-bold'>{page.up_right_bold}{" "}</span>{page.up_right}</p>
                                </div>
                            </div>
                            <div className='row justify-content-around'>
                                <div className="section middle-left col-12 col-md-11 mt-1">
                                    <p style={{ fontSize: middleLeftFontSize }} className="paragraph">{page.middle_left}</p>
                                </div>
                                <div className="section middle-right col-12 col-md-11 mt-5">
                                    <p style={{ fontSize: middleRightFontSize }} className="paragraph">{page.middle_right}</p>
                                </div>
                                <div className='row justify-content-around'>

                                    <blockquote className="quote-section col-12 col-md-9 mt-5 rounded-3">
                                        <p style={{ fontSize: quoteFontSize, marginTop: "2vh" }} >{page.quote}</p>
                                        <cite>{page.author}</cite>
                                    </blockquote>
                                </div>

                            </div>
                        </div>
                    )
                })}
            </HTMLFlipBook>
        </div>
    );
}

export default FlipBook;