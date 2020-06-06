require('dotenv').config();
const axios = require('axios');

const symbols = process.env.SYMBOLS || 'EUR,USD,GBP';

const result = dotenv.config();
if (result.error){
  throw result.error;
};

console.log(result.parsed);

// Axios Client declaration
const api = axios.create({
  baseURL: 'http://data.fixer.io/api',
  params: {
    access_key: '0abfbc1e8610c78b364a092c70d52ee3',
  },
  timeout: 5000,
});

// Generic GET request function
const get = async (url) => {
  const response = await api.get(url);
  const { data } = response;
  if (data.success) {
    return data;
  }
  throw new Error(data.error.type);
};

module.exports = {
  getRates: () => get(`/latest&symbols=${symbols}&base=EUR`),
};