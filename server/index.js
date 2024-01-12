const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT | 5000;
// const { createHandler } = require('graphql-http/lib/use/express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

app.all('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}));

app.listen(PORT , () => console.log(`Express server running on port ${PORT}`));
