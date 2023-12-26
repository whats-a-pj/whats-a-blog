import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import './App.css';
const httpLink = createHttpLink({
	uri: '/graphql',
});

//todo do i need this here if im the only one that will be signing in?

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('id_token');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});
const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});
////////////////////////////////////////////////////////////////////////
function App() {
	return (
		
			<ApolloProvider client={client}>
				<Navbar />
				<Outlet />
				<Footer />
			</ApolloProvider>
		
	);
}

export default App;
