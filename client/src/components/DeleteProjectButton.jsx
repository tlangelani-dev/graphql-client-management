import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { GET_PROJECTS, DELETE_PROJECT } from '../queries/project.queries';
import { useMutation } from '@apollo/client';

const DeleteProjectButton = ({ projectId }) => {
    const navigate = useNavigate();
    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables: {
            id: projectId
        },
        refetchQueries: [{ query: GET_PROJECTS }],
        onCompleted: () => navigate('/')
    });

    return (
        <button className="flex items-center gap-2 bg-red-500 py-2 px-3 my-4 rounded" onClick={deleteProject}>
            <FaTrash /> Delete Project
        </button>
    )
}

export default DeleteProjectButton
