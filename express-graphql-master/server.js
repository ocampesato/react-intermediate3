
var express = require("express");
var graphqlHTTP = require('express-graphql');
var app = express();

// send a message for the root path ("/"):
app.get('/', function(req, res){
    res.send('hello world');
});

app.use('/graphql', graphqlHTTP({ schema: MyGraphQLSchema, graphiql: true }));

console.log("Listening on port 3000");
app.listen(3000);

