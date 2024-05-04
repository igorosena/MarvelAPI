const fs = require('fs')
const {fetchCreatorsData} = require('../marvelApi');

const { addCreator,getCreators,deleteCreator,updateCreator } = require('../db/firebase/fireb_creators');
const express = require('express');


const appExpress = express();

// Middleware para permitir solicitações JSON
appExpress.use(express.json());

appExpress.post('/creators/add', async (req, res) => {
  try {
    const { name, description, resourceURI, marvelID } = req.body;
    await addCharacter(name, description, resourceURI, marvelID);
    res.status(201).send('Character added successfully');
  } catch (error) {
    console.error('Error adding creator:', error);
    res.status(500).send('Error adding creator');
  }
});

appExpress.post('/creators/delete/:id', async(req,res)=>{
    try{
        const marvelID = req.params.id;
        await deleteCharacter(marvelID);
        res.status(201).send('Creator deleted succesfully')
    }
    catch(error){
        console.error('Error deleting Creator',error)
        res.status(500).send('Error deleting Creator')
    }
})

appExpress.post('/creators/update/:id',async(req,res)=>{
    try{
        const marvelID = req.params.id;
        await updateCharacter(marvelID,newParams);
        res.status(201).send('Character updated succesfully')
    }
    catch(error){
        console.error('Error updating creator')
        res.status(500).send('Error updating creator')

    }
})

appExpress.post('/creators',async(req,res)=>{
    try{
        const characterList = await getCharacters();
        res.status(201).send('creators fetch succesfully')
    }
    catch(error){
        console.error('Error fetching creators')
        res.status(500).send('Error fetching creators')
    }
})

// Porta em que o servidor irá escutar
const PORT = process.env.PORT || 3000;

// Inicie o servidor
appExpress.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


fetchCreatorsData().then(apiResponse =>{
    const creators = apiResponse.data.results.flatMap(serie =>{
        return {
            fullName: serie.fullName,
        }
    });
    
    creators.forEach(async characterData =>{
        await addCreator(creators.fullName)
    });

    deleteCreator(1009185);

    updateCreator(10009185,{
        fullName: 'Teste NAME'
    })

    getCreators().then((creators)=>{
        console.log('Test',creators)
    })

    
    //Salva os criadores em um arquivo ndJson
    // const writeStream = fs.createWriteStream('creators.ndjson',{flags: 'a'});
    // creators.forEach(creatorData =>{
    //     writeStream.write(JSON.stringify(creatorData)+ '\n');
    // });

    // writeStream.end();
    // writeStream.on('finish',()=>console.log('All creators saved'));
    // writeStream.on('error',(err)=>console.error('Error saving creators',err));
}) 