import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../queries/project.queries';
import ProjectCard from './ProjectCard';

const Projects = () => {
    const { loading, error, data } = useQuery(GET_PROJECTS);

    return (
        <main className="my-6">
            <div className="container mx-auto px-6">
                <div className="flex justify-between">
                    <h3 className="font-bold text-xl mb-4">Projects</h3>
                </div>
                
                { loading && <p className="my-4">Loading...</p> }
                { error && <p className="text-red-700 my-4">There was a problem loading projects!</p> }
                <div className="grid grid-cols-2 gap-4">
                    {data?.projects?.length > 0 && (
                        data.projects.map(project => (
                            <ProjectCard key={project.id} project={project} />
                        ))
                    )}
                </div>
            </div>
        </main>
    )
}

export default Projects
