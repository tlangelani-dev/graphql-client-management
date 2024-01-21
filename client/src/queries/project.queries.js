import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
    query getProjects {
        projects {
            id
            name
            status
        }
    }
`;

export const GET_PROJECT = gql`
    query getProject($id: ID!) {
        project(id: $id) {
            id
            name
            description
            status
            client {
                id
                name
                email
                phone
            }
        }
    }
`;

export const CREATE_PROJECT = gql`
    mutation createProject($name: String!, $description: String!, $status: ProjectStatus!, $clientId: String!) {
        createProject(name: $name, description: $description, status: $status, clientId: $clientId) {
            id
            name
            description
            status
            client {
                id
                name
                email
                phone
            }
        }
    }
`;

export const DELETE_PROJECT = gql`
    mutation deleteProject($id: String!) {
        deleteProject(id: $id) {
            id
            name
            description
            status
            client {
                id
                name
                email
                phone
            }
        }
    }
`;
