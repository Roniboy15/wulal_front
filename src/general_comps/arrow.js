import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, useRef } from 'react';

const ArrowComponent = ({ pagesLength, currentPage}) => {
    const [showArrow, setShowArrow] = useState(false);

    const intervalId = useRef(null); // use useRef to store the interval ID
    const timeoutId = useRef(null);


    useEffect(() => {

        timeoutId.current = setTimeout(() => {
            let count = 0;
            intervalId.current = setInterval(() => {
                setShowArrow((prev) => !prev);
                count++;
                if (count >= 10) {
                    clearInterval(intervalId.current);
                }
            }, 1000);
        }, 1000);

        return () => {
            clearTimeout(timeoutId.current);
            clearInterval(intervalId.current); // clear interval here as well
            setShowArrow(false)
        };
    }, []);
   
    const handleIconClick = () => {


       
        clearTimeout(timeoutId.current);
        clearInterval(intervalId.current); // clear interval here as well
        setShowArrow(false)
    };

    return (
        <div
            style={
                currentPage < pagesLength-1 ?{
                position: 'fixed',
                top: '60%',
                right:20,
                transform: 'translateY(-50%)',
                opacity: showArrow ? 1 : 0,
                transition: 'opacity 0.5s',
            }
            :
            {
                position: 'fixed',
                top: '60%',
                left: 20,
                transform: 'translateY(-50%)',
                opacity: showArrow ? 1 : 0,
                transition: 'opacity 0.5s',
            }
        }
        >
            <FontAwesomeIcon
                onClick={handleIconClick}
                icon={currentPage < pagesLength-1 ? faArrowRight : faArrowLeft}
                size="xl"
                style={{ color: "orange", fontSize: "5rem", opacity: "50%", cursor: "pointer" }} />
        </div>
    );
};

export default ArrowComponent;
