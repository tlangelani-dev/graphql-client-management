import { gql } from '@apollo/client';

export const GET_CLIENTS = gql`
    query getClients {
        clients {
            id
            name
            email
            phone
        }
    }
`;

export const CREATE_CLIENT = gql`
    mutation createClient($name: String!, $email: String!, $phone: String!) {
        createClient(name: $name, email: $email, phone: $phone) {
            id
            name
            email
            phone
        }
    }
`;

export const DELETE_CLIENT = gql`
    mutation deleteClient($id: String!) {
        deleteClient(id: $id) {
            id
            name
            email
            phone
        }
    }
`;
