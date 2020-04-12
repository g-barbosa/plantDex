const { ApolloServer, gql } = require('apollo-server')
const { importSchema } = require('graphql-import')

const context = require('./src/config/context')

const resolvers = require('./src/resolvers')

const schemaPath = './src/schema/index.graphql'

const server = new ApolloServer({
    typeDefs: importSchema(schemaPath),
    resolvers,
    context
})

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`)
})