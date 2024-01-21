import { FaTrash } from 'react-icons/fa';
import { DELETE_CLIENT, GET_CLIENTS } from '../queries/client.queries';
import { useMutation } from '@apollo/client';

const ClientItem = ({ client }) => {
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: {
            id: client.id,
        },
        // refetchQueries: [ { query: GET_CLIENTS } ],
        update(cache, { data: { deleteClient } }) {
            const { clients } = cache.readQuery({
                query: GET_CLIENTS
            });
            cache.writeQuery({
                query: GET_CLIENTS,
                data: {
                    clients: clients.filter(client => {
                        return client.id !== deleteClient.id;
                    }),
                }
            });
        }
    });

    return (
        <tr key={client.id}>
            <td className="py-1 px-2 border border-slate-200">{ client.name }</td>
            <td className="py-1 px-2 border border-slate-200">{ client.email }</td>
            <td className="py-1 px-2 border border-slate-200">{ client.phone }</td>
            <td className="py-1 px-2 border border-slate-200">
                <button onClick={deleteClient}>
                    <FaTrash className="text-red-700" />
                </button>
            </td>
        </tr>
    )
}

export default ClientItem
