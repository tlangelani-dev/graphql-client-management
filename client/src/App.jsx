import Header from './components/Header';
import Clients from './components/Clients';
import {
    ApolloProvider,
    ApolloClient,
    InMemoryCache,
} from '@apollo/client';

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                clients: {
                    merge(existing, incoming) {
                        return incoming;
                    }
                },
                projects: {
                    merge(existing, incoming) {
                        return incoming;
                    }
                },
            }
        }
    }
});

const client = new ApolloClient({
    uri: import.meta.env.VITE_GRAPHQL_URI,
    cache
});

const App = () => {
    return (
        <ApolloProvider client={client}>
            <div>
                <Header />
                <Clients />
            </div>
        </ApolloProvider>
    )
}

export default App
