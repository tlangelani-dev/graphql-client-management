import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Modal, Label, TextInput, Select, Textarea } from 'flowbite-react';
import { CREATE_PROJECT, GET_PROJECTS } from '../queries/project.queries';
import { GET_CLIENTS } from '../queries/client.queries';

const AddProject = () => {
    const [openModal, setOpenModal] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('new');
    const [clientId, setClientId] = useState('');
    const [processing, setProcessing] = useState(false);

    const [createProject] = useMutation(CREATE_PROJECT, {
        variables: { name, description, status, clientId },
        update(cache, { data: createProject }) {
            const { projects } = cache.readQuery({
                query: GET_PROJECTS
            });
            cache.writeQuery({
                query: GET_PROJECTS,
                data: {
                    projects: [...projects, createProject]
                }
            });
        }
    });

    const { loading, error, data } = useQuery(GET_CLIENTS);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            setProcessing(true);
            await createProject(name, description, status, clientId);
            clearForm();
            setOpenModal(false);
        } catch (error) {
            console.error(error);
        } finally {
            setProcessing(false);
        }
    }

    const clearForm = () => {
        setName('');
        setDescription('');
        setStatus('new');
        setClientId('');
    }

    if (loading) return null;
    if (error) return "<p>There was a problem loading clients</p>";

    return (
        <div>
            <Button onClick={() => setOpenModal(true)}>Add Project</Button>
            <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Add Project</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <form className="flex w-full flex-col" onSubmit={onSubmit}>
                            <div className="mb-3">
                                <div className="mb-1 block">
                                    <Label htmlFor="name" value="Name" />
                                </div>
                                <TextInput id="name" type="text" placeholder="Mobile App" required onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <div className="mb-1 block">
                                    <Label htmlFor="description" value="Description" />
                                </div>
                                <Textarea id="description" placeholder="Build a mobile application using React Native" required rows={4} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <div className="mb-1 block">
                                    <Label htmlFor="status" value="Status" />
                                </div>
                                <Select id="status" required value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="new">Not Started</option>
                                    <option value="progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </Select>
                            </div>
                            <div className="mb-3">
                                <div className="mb-1 block">
                                    <Label htmlFor="client" value="Client" />
                                </div>
                                <Select id="client" required value={clientId} onChange={(e) => setClientId(e.target.value)}>
                                    {data.clients.length > 0 && data.clients.map(client => (
                                        <option key={client.id} value={client.id}>{client.name}</option>
                                    ))}
                                </Select>
                            </div>
                            <div className="mt-3 flex justify-between">
                                <Button className="mt-3" color="warning" type="button" onClick={() => setOpenModal(false)}>Cancel</Button>
                                <Button isProcessing={processing} className="mt-3" color="success" type="submit">Submit</Button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default AddProject
