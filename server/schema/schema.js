const Client = require('../models/Client');
const Project = require('../models/Project');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
} = require('graphql');

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args) {
                return Client.findById(parent.clientId);
            }
        }
    })
});

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        projects: {
            type: new GraphQLList(ProjectType),
            resolve() {
                return Project.find();
            }
        },
        project: {
            type: ProjectType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return Project.findById(args.id);
            }
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve() {
                return Client.find();;
            }
        },
        client: {
            type: ClientType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return Client.findById(args.id);
            }
        }
    }
});

// mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createClient: {
            type: ClientType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                phone: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });
                return client.save();
            }
        },
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                return Client.findByIdAndDelete(args.id);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
});
