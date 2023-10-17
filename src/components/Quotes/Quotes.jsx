import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Quotes.css';
import { doApiPost } from '../../services/springbootAPI';

const Quotes = ( {quotesData} ) => {
  const [quotes, setQuotes] = useState(quotesData);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [addingQuote, setAddingQuote] = useState(false);
  const [newQuote, setNewQuote] = useState('');
  const [addingMessage, setAddingMessage] = useState('');

  console.log(quotesData)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [quotes]);

  const addQuote = async () => {
    setAddingMessage("Your quote is being checked...");
    try {
      await doApiPost('/file/addquote', newQuote);
      setNewQuote('');
      setAddingQuote(false);
      setAddingMessage('Your quote was successfully submitted and is being reviewed now');  
      setTimeout(()=>{
        setAddingMessage('')
      },5000)
    } catch (error) {
      console.error('Error:', error);
      setAddingMessage('There was an error adding the quote. Please try again.');
    }
  };

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
        <button onClick={() => navigateQuotes('left')}>&lt;</button>
        <h2 className='quote-field'>"{quotes[currentQuoteIndex].quote}"</h2>
        <button onClick={() => navigateQuotes('right')}>&gt;</button>
      </div>

      {addingMessage && <p className="addingMessage">{addingMessage}</p>}

      {addingQuote ? (
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
