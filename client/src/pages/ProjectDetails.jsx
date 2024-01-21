import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client'
import { GET_PROJECT } from '../queries/project.queries';
import { Card } from 'flowbite-react';
import { FaIdBadge, FaEnvelope, FaPhone } from 'react-icons/fa';

const ProjectDetails = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_PROJECT, {
        variables: {
            id
        }
    });

    console.log(data);

    return (
        <div className="container mx-auto px-6 py-6">
            { loading && <p className="my-4">Loading...</p> }
            { error && <p className="text-red-700 my-4">There was a problem loading projects!</p> }

            {!loading && !error && (
                <div className="bg-gray-700 rounded text-white p-6">
                    <h1 className="font-bold flex justify-between">
                        <span>{data.project.name}</span>
                        <Link className="bg-gray-100 text-gray-800 rounded py-1 px-3 mb-4 inline-block" to="/">Back</Link>
                    </h1>
                    <p>{data.project.description}</p>
                    <div className="my-4">
                        <p className="font-semibold">Project Status</p>
                        <p>{data.project.status}</p>
                    </div>
                    
                    {data.project.client && (
                        <div key={data.project.client.id}>
                            <Card className="w-full mt-4">
                                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Client Information
                                </h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400 flex items-center gap-2">
                                    <FaIdBadge />
                                    <span>{data.project.client.name}</span>
                                </p>
                                <p className="font-normal text-gray-700 dark:text-gray-400 flex items-center gap-2">
                                    <FaEnvelope />
                                    <span>{data.project.client.email}</span>
                                </p>
                                <p className="font-normal text-gray-700 dark:text-gray-400 flex items-center gap-2">
                                    <FaPhone />
                                    <span>{data.project.client.phone}</span>
                                </p>
                            </Card>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default ProjectDetails
