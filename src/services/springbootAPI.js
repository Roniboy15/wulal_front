import axios from 'axios';

const API_KEY = 'https://wulal-886ecc4c7ff3.herokuapp.com';


export const doApiGet = async (url) => {
  try {
    let res = await axios.get(API_KEY + url);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};


export const doApiPost = async (url, _body) => {
  try {
    let res = await axios.post(API_KEY + url, {
      quote: _body.quote,
      mail: _body.mail
    },{
        headers: {
        'Content-Type': 'application/json',
      }
    });
    return res.data;
  } catch (error) {
    console.error('Error:', error.response.status);
    if (error.response.status === 429) {
      return 10;
    }
    throw error; // rethrow error to be caught in `addQuote`
  }

};
