const { ApolloServer, gql } = require('apollo-server')
const { importSchema } = require('graphql-import')
require('dotenv').config()

const context = require('./src/config/context')

const resolvers = require('./src/resolvers')

const schemaPath = './src/schema/index.graphql'

const server = new ApolloServer({
    typeDefs: importSchema(schemaPath),
    resolvers,
    context
})

server.listen({port: process.env.PORT || 4000}).then(({ url }) => {
    console.log(`Executando em ${url}`)
})