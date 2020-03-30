const axios = require('axios');

const token = '2cd5c27519cc4b75f7df6704472422954608ab2a';
const instance = axios.create({
  baseURL: 'https://api.codenation.dev/v1/challenge/dev-ps'
})

const api = {
  token,
  instance
}

module.exports  = api;