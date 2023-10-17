import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Quotes.css';
import { doApiPost } from '../../services/springbootAPI';

const Quotes = ({ quotesData }) => {
const Quotes = ({ quotesData }) => {
  const [quotes, setQuotes] = useState(quotesData);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [addingQuote, setAddingQuote] = useState(false);
  const [newQuote, setNewQuote] = useState('');
  const [addingMessage, setAddingMessage] = useState('');

  useEffect(() => {
    if (quotes.length === 0) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [quotes]);



  const addQuote = async () => {
    setAddingMessage("Your quote is being checked...");
    try {
      const result = await doApiPost('/file/addquote', newQuote);
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
    <div className="quotesComponent" >
      <div className="quoteNavigation">
        <button onClick={() => navigateQuotes('left')} disabled={quotes.length === 0}>&lt;</button>
        {quotes.length > 0 ? (
          <h2 className='quote-field'>"{quotes[currentQuoteIndex].quote}"</h2>
        ) : (
          <h2 className='quote-field'>No quotes available</h2>
        )}
        <button onClick={() => navigateQuotes('right')} disabled={quotes.length === 0}>&gt;</button>
      </div>


    {addingMessage && <p className="addingMessage">{addingMessage}</p>}

      e{addingQuote ? (
        <div className="quoteInput">
          <textarea className='mt-5' value={newQuote} onChange={e => setNewQuote(e.target.value)} placeholder="Add a quote..."></textarea>
          <button onClick={addQuote}>Submit</button>
          <button onClick={() => setAddingQuote(false)}>Cancel</button>
        </div>
      ) : (
        <div className='w-100 text-center'>        
          <button className='mt-5' onClick={() => setAddingQuote(true)}>Add Quote</button>
        </div>
      )}
    </div>
  );
};

export default Quotes;
