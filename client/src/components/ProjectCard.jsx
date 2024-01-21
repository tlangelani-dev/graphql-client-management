import { FaTrash } from 'react-icons/fa';
import { GET_PROJECTS } from '../queries/project.queries';
import { useMutation } from '@apollo/client';

const ProjectCard = ({ project }) => {

    return (
        <section className="border rounded-md py-3 px-4">
            <h4 className="flex justify-between mb-3">
                <span className="font-bold ">{ project.name }</span>
                <a href={`/projects/${project.id}`} className="bg-gray-300 py-1 px-2 text-sm rounded">View</a>
            </h4>
            
            <p>
                Status: <span className="font-semibold">{project.status}</span>
            </p>
        </section>
    )
}

export default ProjectCard
