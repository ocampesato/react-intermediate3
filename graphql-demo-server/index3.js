var graphql = require('graphql');
var graphqlHTTP = require('express-graphql');
var express = require('express');

// Import our data set from above
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

var users = [  
  {
    "id": "100",
    "fname": "Dan",
    "lname": "Smith"
  },
  {
    "id": "200",
    "fname": "Lee",
    "lname": "Jones"
  },
  {
    "id": "300",
    "fname": "Nick",
    "lname": "Stone"
  }
];

var queryType = new graphql.GraphQLObjectType({  
  name: 'Query',
  fields: function () {
    return {
      todos: {
        type: new graphql.GraphQLList(UserType),
        resolve: function () {
console.log("returning users: "+JSON.stringify(this.users));
          return this.users;
        }
      }
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
        //resolve: function () {
        //return this.users;
        resolve: function (_, args) {
          return data[args.id];
        }
      }
    }
  })
});

console.log('Server online: port 3000');

// http://localhost:3000/graphql?query={user(id:%22100%22){fname}}
// http://localhost:3000/graphql?query={user(lname:%22Stone%22){id}}

express()
  .use('/graphql', graphqlHTTP({ schema: schema, pretty: true }))
  .listen(3000);

