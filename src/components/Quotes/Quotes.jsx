import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Quotes.css';
import { doApiPost } from '../../services/springbootAPI';
import getAdaptiveFontSize from '../../general_comps/fontSize';

const Quotes = ({ quotesData }) => {
  const [quotes, setQuotes] = useState(quotesData);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [addingQuote, setAddingQuote] = useState(false);
  const [newQuote, setNewQuote] = useState('');
  const [mail, setMail] = useState('');
  const [addingMessage, setAddingMessage] = useState('');
  const [fontSize, setFontSize] = useState(0);

  useEffect(() => {
    const fontS = getAdaptiveFontSize(quotes[currentQuoteIndex].quote, 190);
    setFontSize(fontS);
  }, [currentQuoteIndex])

  useEffect(() => {
    if (quotes.length === 0) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [quotes]);



  const addQuote = async () => {
    setAddingMessage("Your quote is being checked...");
    try {
      const result = await doApiPost('/file/addquote', { quote: newQuote, mail: mail });
      if (result == 10) {
        setAddingMessage('You reached the limit of possible requests');
        setTimeout(() => {
          setAddingMessage('')
        }, 5000);
      }
      else {
        setNewQuote('');
        setAddingQuote(false);
        setAddingMessage('Your quote was successfully submitted and is being reviewed now');
        setTimeout(() => {
          setAddingMessage('')
        }, 5000);
      }
    } catch (error) {
      console.error('Error:', error.code);

    }
  }



  const navigateQuotes = (direction) => {
    if (direction === 'left') {
      setCurrentQuoteIndex((prevIndex) => (prevIndex - 1 + quotes.length) % quotes.length);
    } else if (direction === 'right') {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }
  };

  return (
    <div className='container-fluid'>

      <div className='row justify-content-center '>

        <div className="quotesComponent text-center" >
          <button className='button-left' onClick={() => navigateQuotes('left')} disabled={quotes.length === 0}>&lt;</button>
          <button className='button-right' onClick={() => navigateQuotes('right')} disabled={quotes.length === 0}>&gt;</button>
          <div className="quoteNavigation row">

            {quotes.length > 0 ? (
              <h2 className='quote-field' style={{ fontSize: fontSize }}>"{quotes[currentQuoteIndex].quote}"</h2>
            ) : (
              <h2 className='quote-field'>No quotes available</h2>
            )}

            <div className='w-100 text-center' style={{ position: "" }}>
              {addingMessage && <p className="addingMessage">{addingMessage}</p>}

            </div>

          </div>



          {addingQuote ? (
            <div className="quoteInput" style={{ marginRight: "20px" }}>
              <input type='email' className='mt-5' value={mail} onChange={e => setMail(e.target.value)} placeholder={"Your email..." || mail}></input>
              <textarea className='' value={newQuote} onChange={e => setNewQuote(e.target.value)} placeholder="Add a quote..."></textarea>
              <button onClick={addQuote}>Submit</button>
              <button onClick={() => setAddingQuote(false)}>Cancel</button>
            </div>
          ) : ""}
          {addingQuote ? "" :
            <button className='add-quote-btn' onClick={() => setAddingQuote(true)}>Add Quote</button>
          }

        </div>
      </div>
    </div>
  );
};

export default Quotes;
