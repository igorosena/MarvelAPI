const { fetchCaracterData } = require('./marvelApi');

fetchCaracterData().then(data => {
  console.log("Dados da série:", data);
  
  const characters = data.data.results.map(character => character.name) //forEach((charac)=> console.log('personagens',charac));
  // const creators = data.data.results.map(serie => serie.creators.items);
  // const comics = data.data.results.map(serie => serie.comics.items);

  console.log("Personagens:", characters);
  // console.log("Criadores:", creators);
  // console.log("Comics:", comics);
}).catch(error => {
  console.log('Erro ao acessar os dados da série:', error);
});