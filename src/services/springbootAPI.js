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
  

  export const doApiPost = async (url, text) => {
    try {
      let res = await axios.post(API_KEY + url, text, {
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    } catch (error) {
      console.error('Error:', error.response);
      if(error.response.status == 429)return 10;
    }
  };
  