const express = require('express');
require('dotenv').config();
const colors = require('colors');
const app = express();
const PORT = process.env.PORT | 5000;
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const connectDB = require('./libs/db');

connectDB();

app.all('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}));

app.listen(PORT , () => console.log(`Express server running on port ${PORT}`));
