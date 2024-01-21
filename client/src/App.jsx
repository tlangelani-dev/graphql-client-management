import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import NotFound from './pages/NotFound';
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
            <Router>
                <div>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/projects/:id" element={<ProjectDetails />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </Router>
        </ApolloProvider>
    )
}

export default App
