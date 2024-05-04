const fs = require('fs');
const {fetchComicsdata} = require ('../marvelApi');
const {addComics,updateComics,getComics,deleteComics} = require('../db/firebase/fireb_comics')
const express = require('express');

const appExpress = express();

appExpress.use(express.json());

appExpress.post('/comics/add',async (req,res)=>{
    try{
        const{title,description,marvelID} = req.body;

        await addComics(title,marvelID,description);
        res.status(201).send('Comics added succesfully');

    }
    catch(error){
        console.error('Error add comics',error)
        res.status(500).send('Error add comics')
    }
})

appExpress.post('/comics/delete/:id',async(req,res)=>{
    try{
        const marvelID = req.params.id;
        await deleteComics(marvelID);
        res.status(201).send('Character deleted succesfully')
    }
    catch(error){
        console.error('Error deleting comics',error)
        res.status(500).send('Error deleting comics')
    }
})

appExpress.post('/comics/update/:id',async(req,res)=>{
    try{
        const marvelID = req.params.id;
        await updateComics(marvelID,newParams);
        res.status(201).send('Comics updated successfully')
    }
    catch(error){
        console.error('Error updating comics', error)
        res.status(500).send('Error updating comics')
    }
})

appExpress.post('/comics',async(req,res)=>{
    try{
        const comicsList = await getCharacters();
        res.status(201).send('Comics fetch succesfully')
    }
    catch(error){
        console.error('Error fetching comics',error)
        res.status(500).send('Error fetching comics')
    }
})

const PORT = process.env.PORT || 3000;

appExpress.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})

fetchComicsdata().then(apiResponse =>{
    const comics = apiResponse.data.results.flatMap(serie => {
       return {
           title: serie.title,
           marvelID: serie.id,
           comicsDescription : serie.description,
        }
    });

    // comics.forEach(async comicsData =>{
    //     await addComics(comicsData.title,comicsData.marvelID,comicsData.comicsDescription)
    // })
    
    //deleteComics(101017);

    // updateComics(100545,{
    //     title:'Teste test',
    //     marvelID: 123,
    //     comicsDescription: 'teste'
    // })

    // getComics().then((comics)=>{
    //     console.log('test',comics)
    // })

    // //Salva os COMICS dentro de um arquivo nJson
    // const writeStream = fs.createWriteStream('comics.ndjson',{flags:'a'});
    // comics.forEach(comicsData =>{
    //     writeStream.write(JSON.stringify(comicsData) + '\n');
    // });

    // writeStream.end();
    // writeStream.on('finish',()=> console.log('All comics saved'));
    // writeStream.on('error',(err)=> console.error('Error saving comics',err));
});