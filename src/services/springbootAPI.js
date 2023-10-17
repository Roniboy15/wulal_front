import axios from 'axios';

const API_KEY = 'http://localhost:8000';

// // Function to get the token from local storage
// const getToken = () => {
//     return localStorage.getItem(TOKEN_KEY) || '';
//   };
  
//   export const doApiMethod = async (url, method, data = {}) => {
//     try {
//       let res = await axios({
//         method,
//         url: API_KEY + url,
//         data,
//         headers: {
//           'Content-Type': 'application/json',
//           'authorization': `${getToken()}`
//         },
//       });
//       return res.data;
//     } catch (err) {
//       console.log(err);
//       throw err;
//     }
//   };
  
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
      console.error('Error:', error);
    }
  };
  