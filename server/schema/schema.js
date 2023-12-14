import Project from "../models/ProjectModel.js";
import Client from "../models/ClientModel.js";
import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType
} from "graphql";

const ClientType = new GraphQLObjectType({
    name: "Client",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
    })
});
const ProjectType = new GraphQLObjectType({
    name: "Project",
    fields: () => ({
        id: { type: GraphQLID },
        clientId: { type: GraphQLID },
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

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Client.findById(args.clientId);
            }
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return Client.find({});
            }
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Project.findById(args.id);
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return Project.find({});
            }
        }
    }
});

//mutation
const mutation = new GraphQLObjectType({
    name: "mutation",
    fields: {
        addClient: {
            type: ClientType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Client.create({
                    name: args.name,
                    phone: args.phone,
                    email: args.email
                });
            }
        },
        deleteClient: {
            type: ClientType,
            args: { id: { type: GraphQLNonNull(GraphQLString) } },
            resolve(parent, args) {
                return Client.findByIdAndDelete(args.id);
            }
        },
        addProject: {
            type: ProjectType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                clientId: { type: GraphQLNonNull(GraphQLString) },
                status: {
                    type: new GraphQLEnumType({
                        name: "ProjectStatus",
                        values: {
                            uninitiated: { value: "Not Started" },
                            progress: { value: "In Progress" },
                            completed: { value: "Completed" }
                        }
                    }),
                    defaultValue: "Not Started"
                }
            },
            resolve(parent, args) {
                return Project.create({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId
                });
            }
        },
        updateProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLString) },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                status: {
                    type: new GraphQLEnumType({
                        name: "ProjectStatusUpdate",
                        values: {
                            uninitiated: { value: "Not Started" },
                            progress: { value: "In Progress" },
                            completed: { value: "Completed" }
                        }
                    })
                }
            },
            resolve(parent, args) {
                return Project.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            description: args.description,
                            status: args.status
                        }
                    },
                    { new: true }
                );
            }
        },
        deleteProject: {
    type: ProjectType,
    args: {
        id: { type: GraphQLNonNull(GraphQLID) }
    },
    resolve(parent, args) {
        return Project.findOneAndDelete(args.id);
    }
}

    }
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation
});
