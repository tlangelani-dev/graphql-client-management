import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { Button, Modal, Label, TextInput } from 'flowbite-react';
import { CREATE_CLIENT, GET_CLIENTS } from '../queries/client.queries';

const AddClient = () => {
    const [openModal, setOpenModal] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [processing, setProcessing] = useState(false);

    const [createClient] = useMutation(CREATE_CLIENT, {
        variables: { name, email, phone },
        update(cache, { data: createClient }) {
            const { clients } = cache.readQuery({
                query: GET_CLIENTS
            });
            cache.writeQuery({
                query: GET_CLIENTS,
                data: {
                    clients: [...clients, createClient]
                }
            });
        }
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            setProcessing(true);
            await createClient(name, email, phone);
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
        setEmail('');
        setPhone('');
    }

    return (
        <>
            <Button onClick={() => setOpenModal(true)}>Add Client</Button>
            <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Add Client</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <form className="flex w-full flex-col" onSubmit={onSubmit}>
                            <div className="mb-3">
                                <div className="mb-1 block">
                                    <Label htmlFor="name" value="Name" />
                                </div>
                                <TextInput id="name" type="text" placeholder="ABC Ltd." required onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <div className="mb-1 block">
                                    <Label htmlFor="email" value="Email" />
                                </div>
                                <TextInput id="email" type="email" placeholder="john@gmail.com" required onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <div className="mb-1 block">
                                    <Label htmlFor="phone" value="Phone" />
                                </div>
                                <TextInput id="phone" type="text" placeholder="0110001234" required onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div className="mt-3 flex justify-between">
                                <Button className="mt-3" color="warning" type="button" onClick={() => setOpenModal(false)}>Cancel</Button>
                                <Button isProcessing={processing} className="mt-3" color="success" type="submit">Submit</Button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AddClient
