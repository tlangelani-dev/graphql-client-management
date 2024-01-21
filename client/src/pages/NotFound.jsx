import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex justify-center items-center flex-col my-8">
            <FaExclamationTriangle size={80} className="text-red-700" />
            <p className="my-6 font-bold text-2xl">404</p>
            <p className="text-2xl font-light">
                Sorry, this page does not exist!
            </p>
            <Link to="/" className="my-8 bg-gray-300 py-2 px-4 rounded">Go Back</Link>
        </div>
    )
}

export default NotFound
