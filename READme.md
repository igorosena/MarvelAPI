Conexao SHELL para o Banco de dados
docker exec -it mongodb mongosh -u admin -p senhaadmin --authenticationDatabase admin

//////////////////////
CONEXAO VIA DOCKER RUN
docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin \
    -d \
    mongo:latest


##OPICIONAL PARA CRIAR UMA INTERFACE
docker run \
    --name mongoclient \
    -p 3000:3000 \
    --link mongodb:mongodb \
    -d \
    mongoclient/mongoclient


docker exec -it mongodb \
mongosh --username admin --password senhaadmin --authenticationDatabase admin \
--eval "db.getSiblingDB('marvel').createUser({user: 'igorsena', pwd: 'marvel', roles: [{role: 'readWrite', db: 'marvel'}]})"


