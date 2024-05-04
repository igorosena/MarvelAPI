const { fetchCaracterData } = require('../marvelApi');
const fs = require('fs');
const { addCharacter,getCharacters,deleteCharacter,updateCharacter } = require('../db/firebase/fireb_characters');
const express = require('express');

const appExpress = express();

// Middleware para permitir solicitações JSON
appExpress.use(express.json());

appExpress.post('/characters/add', async (req, res) => {
  try {
    const { name, description, resourceURI, marvelID } = req.body;
    await addCharacter(name, description, resourceURI, marvelID);
    res.status(201).send('Character added successfully');
  } catch (error) {
    console.error('Error adding character:', error);
    res.status(500).send('Error adding character');
  }
});

appExpress.post('/characters/delete/:id', async(req,res)=>{
    try{
        const marvelID = req.params.id;
        await deleteCharacter(marvelID);
        res.status(201).send('Character deleted succesfully')
    }
    catch(error){
        console.error('Error deleting character',error)
        res.status(500).send('Error deleting character')
    }
})

appExpress.post('/characters/update/:id',async(req,res)=>{
    try{
        const marvelID = req.params.id;
        await updateCharacter(marvelID,newParams);
        res.status(201).send('Character updated succesfully')
    }
    catch(error){
        console.error('Error updating character')
        res.status(500).send('Error updating character')

    }
})

appExpress.post('/characters',async(req,res)=>{
    try{
        const characterList = await getCharacters();
        res.status(201).send('Caracters fetch succesfully')
    }
    catch(error){
        console.error('Error fetching character')
        res.status(500).send('Error fetching character')
    }
})

// Porta em que o servidor irá escutar
const PORT = process.env.PORT || 3000;

// Inicie o servidor
appExpress.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

fetchCaracterData().then(apiResponse => {
    const characters = apiResponse.data.results.flatMap(serie => {
        return {
            name: serie.name,
            description: serie.description || "", // Handle cases where description is missing
            resourceURI: serie.thumbnail.path,
            marvelID: serie.id
        };
    });

    //Salva os personagens no banco de dados Firestore
    // characters.forEach(async characterData => {
    //     await addCharacter(characterData.name, characterData.description, characterData.resourceURI, characterData.marvelID);
    // });

    
    // deleteCharacter(1009185)
    
    // updateCharacter(1009220,{
    //     name: 'Teste teste',
    //     description:'Teste teste',
    //     resourceURI: 'testetest',
    //     marvelID: 12345
    // })

    // getCharacters().then((characters) => {
    //     console.log('test', characters);
    // });
    
    
    // Salva os personagens em um arquivo ndJson separado por linha 
    // (APENAS PARA TESTE)
    // const writeStream = fs.createWriteStream('characters.ndjson', { flags: 'a' });
    // characters.forEach(characterData => {
    //     writeStream.write(JSON.stringify(characterData) + '\n');
    // });
    // writeStream.end();
    // writeStream.on('finish', () => console.log('All characters saved.'));
    // writeStream.on('error', (err) => console.error('Error writing characters to file:', err));
});
