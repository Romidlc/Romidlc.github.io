import { stringify } from 'query-string';

const API_URL = 'https://coding-challenge-api.aerolab.co';
const axios = require('axios');

/**
 * @param {String} type One of the constants
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} { url, options } The HTTP request parameters
 */

const convertDataProviderRequestToHTTP = (type, params) => {
  switch (type) {
    case 'CUSTOM_GET':
      return {
        url: `${API_URL}/${params.url}?${stringify(params.query)}`,
        options: {
          method: params.method,
        },
      };
    case 'CUSTOM_POST':
      return {
        url: `${API_URL}/${params.url}`,
        options: {
          method: 'POST',
          data: params.data,
        },
      };
    default:
      throw new Error(`Unsupported fetch action type ${type}`);
  }
};

const dataProvider = async (type, params) => {
  let { url, options } = convertDataProviderRequestToHTTP(type, params);
  if (!options) options = {};
  options.headers = { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDhkZDlkMDc2NmZiNTAwMjRhYTg3YWIiLCJpYXQiOjE2MTk5MDkwNzN9.ui7DJMvSTNQIyDz_8bOWMfcrkB2qsYaGmiYMHQJ3yB0` }; // danger!
  try {
    const { data } = await axios(url, { ...options });
    return data;
  } catch (err) {
    throw err;
  }
};


export { dataProvider };
