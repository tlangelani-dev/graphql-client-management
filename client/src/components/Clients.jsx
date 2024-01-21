import { useQuery } from '@apollo/client';
import { GET_CLIENTS } from '../queries/client.queries';
import ClientItem from './ClientItem';

const Clients = () => {
    const { loading, error, data } = useQuery(GET_CLIENTS);

    return (
        <main className="my-6">
            <div className="container mx-auto px-6">
                <div className="flex justify-between">
                    <h3 className="font-bold text-xl">Clients</h3>
                </div>
                
                { loading && <p className="my-4">Loading...</p> }
                { error && <p className="text-red-700 my-4">There was a problem loading clients!</p> }
                {data?.clients?.length > 0 && (
                    <table className="w-full table-fixed border-collapse border border-slate-400 my-4">
                        <thead>
                            <tr>
                                <th className="py-1 px-2 border border-slate-200">Name</th>
                                <th className="py-1 px-2 border border-slate-200">Email</th>
                                <th className="py-1 px-2 border border-slate-200">Phone</th>
                                <th className="py-1 px-2 border border-slate-200"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.clients.map(client => (
                                <ClientItem key={client.id} client={client} />
                            ))}
                        </tbody>
                    </table>
                )}
                
            </div>
        </main>
    )
}

export default Clients
