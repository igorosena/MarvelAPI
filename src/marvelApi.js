const axios = require('axios');
const crypto = require('crypto');
const moment = require('moment');

const credential = Object.freeze({
    'ts': moment().format('ms'),
    'public_key': '77961a1a65450eff8436c8e87343ab6c',
    'private_key': 'afae7ac565942d58aa043c1316a3d956bf8c108a'
});

let hash = credential.ts + credential.private_key + credential.public_key;
hash = crypto.createHash('md5').update(hash).digest('hex');

const spiderManSerieID = `24396`;
// const baseSeriesURL = `http://gateway.marvel.com/v1/public/series/${spiderManSerieID}?ts=${credential.ts}&apikey=${credential.public_key}&hash=${hash}`;

const charactersBaseURL = `https://gateway.marvel.com:443/v1/public/series/${spiderManSerieID}/characters?limit=100&ts=${credential.ts}&apikey=${credential.public_key}&hash=${hash}
`

function fetchCaracterData() {
  return axios.get(charactersBaseURL)
    .then(response => response.data)
    .catch(error => {
      console.error('Erro ao fazer a requisição:', error);
      throw error; 
    });
}

const comicsBaseURL = `https://gateway.marvel.com:443/v1/public/series/${spiderManSerieID}/comics?limit=100&ts=${credential.ts}&apikey=${credential.public_key}&hash=${hash}
`
function fetchComicsdata(){
  return axios.get(comicsBaseURL)
  .then(response => response.data)
  .catch(error => {
    console.error('Erro ao requisitar COMICS', error);
    throw error;
  })
}

const creatorsBaseURL = `https://gateway.marvel.com:443/v1/public/series/${spiderManSerieID}/creators?limit=100&ts=${credential.ts}&apikey=${credential.public_key}&hash=${hash}
`
function fetchCreatorsData(){
  return axios.get(creatorsBaseURL)
  .then(response => response.data)
  .catch(error =>{
    console.error('Erro pegando os CRIADORES',error);
    throw error;
  })
}

module.exports = { fetchCaracterData, fetchComicsdata , fetchCreatorsData};