var graphql = require('graphql');
var graphqlHTTP = require('express-graphql');
var express = require('express');

var data = require('./data2.json');

// Define a user type with three string fields 
var UserType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: function() { 
    return { 
       id:    { type: graphql.GraphQLString },
       fname: { type: graphql.GraphQLString },
       lname: { type: graphql.GraphQLString }
    }
  }
});

// Define our schema, with one top level field 'user', that
// takes an 'id' argument and returns the User with that ID.
var schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: UserType,
        args: {
          id:    { type: graphql.GraphQLString },
          fname: { type: graphql.GraphQLString },
          lname: { type: graphql.GraphQLString }
        },
        resolve: function (_, args) {
          return data[args.id];
        }
      }
    }
  })
});

console.log('Server online: port 3000');

express()
  .use('/graphql', graphqlHTTP({ schema: schema, pretty: true }))
  .listen(3000);

