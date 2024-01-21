import Clients from '../components/Clients';
import Projects from '../components/Projects';
import AddClient from '../components/AddClient';
import AddProject from '../components/AddProject';

const Home = () => {
    return (
        <div>
            <div className="container mx-auto px-6 pt-6 flex gap-4">
                <AddClient />
                <AddProject />
            </div>
            <Projects />
            <Clients />
        </div>
    )
}

export default Home
